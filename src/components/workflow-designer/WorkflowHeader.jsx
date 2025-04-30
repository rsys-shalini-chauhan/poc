import React from "react";
import {
  DocumentCheckIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";

const WorkflowHeader = ({
  workflow,
  onChange,
  onSave,
  isSaving,
  hasUnsavedChanges,
  isTemplate = false,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...workflow, [field]: value });
  };

  return (
    <div className="bg-white border-b border-gray-300 p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <div className="flex items-center">
            <input
              type="text"
              className="w-full text-xl font-bold border-0 focus:ring-0 focus:outline-none text-black"
              value={workflow.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder={
                isTemplate ? "Untitled Template" : "Untitled Workflow"
              }
            />
            {isTemplate && (
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-md flex items-center">
                <DocumentDuplicateIcon className="h-3 w-3 mr-1" />
                Template
              </span>
            )}
          </div>
          <textarea
            className="w-full text-sm text-gray-500 border-0 focus:ring-0 focus:outline-none resize-none"
            value={workflow.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder={
              isTemplate ? "Template description..." : "Workflow description..."
            }
            rows={2}
          />
        </div>

        <button
          className={`flex items-center px-4 py-2 rounded-md ${
            hasUnsavedChanges
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-400"
          }`}
          disabled={!hasUnsavedChanges || isSaving}
          onClick={onSave}
        >
          <DocumentCheckIcon className="h-5 w-5 mr-2" />
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default WorkflowHeader;
