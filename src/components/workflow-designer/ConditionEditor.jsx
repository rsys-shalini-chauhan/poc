import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

const ConditionEditor = ({ conditions, onChange }) => {
  const [expanded, setExpanded] = useState(true);

  const handleOperatorChange = (e) => {
    const operator = e.target.value;
    if (operator === "simple") {
      onChange({
        type: "simple",
        field: "",
        operator: "eq",
        value: "",
      });
    } else {
      onChange({
        operator,
        conditions: conditions.conditions || [],
      });
    }
  };

  const handleSimpleConditionChange = (field, value) => {
    onChange({
      ...conditions,
      [field]: value,
    });
  };

  const handleAddSubCondition = () => {
    const newConditions = { ...conditions };
    if (!newConditions.conditions) {
      newConditions.conditions = [];
    }
    newConditions.conditions.push({
      type: "simple",
      field: "",
      operator: "eq",
      value: "",
    });
    onChange(newConditions);
  };

  const handleRemoveSubCondition = (index) => {
    const newConditions = { ...conditions };
    newConditions.conditions.splice(index, 1);
    onChange(newConditions);
  };

  const handleSubConditionChange = (index, updatedCondition) => {
    const newConditions = { ...conditions };
    newConditions.conditions[index] = updatedCondition;
    onChange(newConditions);
  };

  if (!conditions) {
    return (
      <button
        className="bg-gray-200 text-gray-700 p-2 rounded-md w-full"
        onClick={() =>
          onChange({ type: "simple", field: "", operator: "eq", value: "" })
        }
      >
        Add Condition
      </button>
    );
  }

  return (
    <div className="border border-gray-300 rounded-md p-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <select
            className="border border-gray-300 rounded-md p-1 text-black"
            value={conditions.type || conditions.operator || "simple"}
            onChange={handleOperatorChange}
          >
            <option value="simple text-black">Simple</option>
            <option value="AND text-black">AND</option>
            <option value="OR text-black">OR</option>
            <option value="NOT text-black">NOT</option>
          </select>
        </div>
        <button
          className="text-gray-500"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "▼" : "▶"}
        </button>
      </div>

      {expanded && (
        <div className="pl-4 border-l-2 border-gray-300">
          {conditions.type === "simple" ? (
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-700 text-black">
                  Field
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-1 text-sm text-black"
                  value={conditions.field || ""}
                  onChange={(e) =>
                    handleSimpleConditionChange("field", e.target.value)
                  }
                  placeholder="e.g. content.type"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-700 text-black">
                  Operator
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md p-1 text-sm text-black"
                  value={conditions.operator || "eq"}
                  onChange={(e) =>
                    handleSimpleConditionChange("operator", e.target.value)
                  }
                >
                  <option value="eq text-black    ">Equal (==)</option>
                  <option value="neq text-black">Not Equal (!=)</option>
                  <option value="gt text-black">Greater Than (&gt;)</option>
                  <option value="gte text-black">
                    Greater Than or Equal (&gt;=)
                  </option>
                  <option value="lt text-black">Less Than (&lt;)</option>
                  <option value="lte text-black">
                    Less Than or Equal (&lt;=)
                  </option>
                  <option value="contains text-black">Contains</option>
                  <option value="starts_with text-black">Starts With</option>
                  <option value="ends_with text-black">Ends With</option>
                  <option value="matches text-black">Matches Regex</option>
                  <option value="in text-black">In Array</option>
                  <option value="includes text-black">Array Includes</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-700 text-black">
                  Value
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-1 text-sm text-black"
                  value={conditions.value || ""}
                  onChange={(e) =>
                    handleSimpleConditionChange("value", e.target.value)
                  }
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {conditions.conditions &&
                conditions.conditions.map((subCondition, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-1">
                      <ConditionEditor
                        conditions={subCondition}
                        onChange={(updated) =>
                          handleSubConditionChange(index, updated)
                        }
                      />
                    </div>
                    <button
                      className="ml-2 p-1 text-red-500"
                      onClick={() => handleRemoveSubCondition(index)}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              <button
                className="flex items-center text-indigo-600 text-sm text-black"
                onClick={handleAddSubCondition}
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Condition
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConditionEditor;
