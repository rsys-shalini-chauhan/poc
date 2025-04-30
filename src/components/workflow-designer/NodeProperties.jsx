import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ConditionEditor from "./ConditionEditor";
import ParameterEditor from "./ParameterEditor";

const NodeProperties = ({ node, actionHandlers, onUpdate, onClose }) => {
  const [localNode, setLocalNode] = useState({ ...node });

  useEffect(() => {
    setLocalNode({ ...node });
  }, [node]);

  const handleChange = (field, value) => {
    setLocalNode((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(localNode);
  };

  const getHandlerParameters = () => {
    if (!localNode.handler) return null;

    const handler = actionHandlers?.find((h) => h.name === localNode.handler);
    return handler ? handler.parameters : null;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center pb-2 border-b border-gray-300 mb-4">
        <h3 className="font-bold text-lg text-black">Node Properties</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-black">
              ID
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              value={localNode.id}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-black">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              value={localNode.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-black">
              Type
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              value={localNode.type || ""}
              disabled
            />
          </div>

          {localNode.type === "trigger" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 text-black">
                Event
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={localNode.event || ""}
                onChange={(e) => handleChange("event", e.target.value)}
              />
            </div>
          )}

          {localNode.type !== "trigger" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 text-black">
                Handler
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={localNode.handler || ""}
                onChange={(e) => handleChange("handler", e.target.value)}
              >
                <option value="">Select Handler</option>
                {actionHandlers?.map((handler) => (
                  <option key={handler.name} value={handler.name}>
                    {handler.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {localNode.type === "conditional" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 text-black">
                Conditions
              </label>
              <ConditionEditor
                conditions={localNode.conditions || {}}
                onChange={(conditions) =>
                  handleChange("conditions", conditions)
                }
              />
            </div>
          )}

          {localNode.handler && (
            <div>
              <label className="block text-sm font-medium text-gray-700 text-black">
                Parameters
              </label>
              <ParameterEditor
                parameters={localNode.parameters || {}}
                schema={getHandlerParameters()}
                onChange={(parameters) =>
                  handleChange("parameters", parameters)
                }
              />
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-300 mt-4">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default NodeProperties;
