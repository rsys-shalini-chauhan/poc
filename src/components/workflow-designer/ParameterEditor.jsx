import React from "react";

const ParameterEditor = ({ parameters, schema, onChange }) => {
  if (!schema) {
    return (
      <div className="text-sm text-gray-500 italic text-black">
        No parameter schema available for this handler.
      </div>
    );
  }

  const handleChange = (key, value) => {
    const newParameters = { ...parameters, [key]: value };
    onChange(newParameters);
  };

  const renderParameterField = (key, paramSchema) => {
    const currentValue =
      parameters[key] !== undefined
        ? parameters[key]
        : paramSchema.default || "";

    switch (paramSchema.type) {
      case "boolean":
        return (
          <input
            type="checkbox"
            checked={Boolean(currentValue)}
            onChange={(e) => handleChange(key, e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded text-black"
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={currentValue}
            onChange={(e) => handleChange(key, Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-1 text-sm text-black"
          />
        );

      case "array":
        // Simple handling for string arrays
        const arrayValue = Array.isArray(currentValue)
          ? currentValue.join(", ")
          : "";
        return (
          <input
            type="text"
            value={arrayValue}
            onChange={(e) =>
              handleChange(
                key,
                e.target.value.split(",").map((item) => item.trim())
              )
            }
            className="w-full border border-gray-300 rounded-md p-1 text-sm"
            placeholder="Comma-separated values"
          />
        );

      case "object":
        // For objects, use a textarea with JSON
        const objectValue =
          typeof currentValue === "object"
            ? JSON.stringify(currentValue, null, 2)
            : "{}";
        return (
          <textarea
            value={objectValue}
            onChange={(e) => {
              try {
                handleChange(key, JSON.parse(e.target.value));
              } catch (error) {
                // Handle JSON parse error
                console.error("Invalid JSON", error);
              }
            }}
            className="w-full border border-gray-300 rounded-md p-1 text-sm text-black"
            rows={4}
          />
        );

      case "enum":
        return (
          <select
            value={currentValue}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full border border-gray-300 rounded-md p-1 text-sm text-black"
          >
            {paramSchema.options?.map((option) => (
              <option key={option} value={option} className="text-black">
                {option}
              </option>
            ))}
          </select>
        );

      case "string":
      default:
        return (
          <input
            type="text"
            value={currentValue}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full border border-gray-300 rounded-md p-1 text-sm text-black"
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {Object.entries(schema).map(([key, paramSchema]) => (
        <div key={key}>
          <label className="block text-xs text-gray-700 text-black">
            {paramSchema.label || key}
            {paramSchema.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
          {renderParameterField(key, paramSchema)}
          {paramSchema.description && (
            <p className="text-xs text-gray-500 mt-1 text-black">
              {paramSchema.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ParameterEditor;
