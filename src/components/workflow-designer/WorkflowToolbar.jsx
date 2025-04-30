import React from "react";
import {
  BoltIcon,
  PlayIcon,
  ArrowsRightLeftIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

const WorkflowToolbar = ({ actionHandlers, onAddNode }) => {
  const handleDragStart = (event, nodeType) => {
    // Store node type in the drag event
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const createNode = (type) => {
    const id = uuidv4();

    switch (type) {
      case "trigger":
        return {
          id,
          type: "trigger",
          name: "New Trigger",
          event: "content.created",
          actions: [],
        };

      case "sequential":
        return {
          id,
          type: "sequential",
          name: "New Action",
          handler: "",
          parameters: {},
          nextActions: [],
        };

      case "conditional":
        return {
          id,
          type: "conditional",
          name: "New Condition",
          handler: "condition.evaluate",
          conditions: {
            type: "simple",
            field: "",
            operator: "eq",
            value: "",
          },
          nextActions: [],
        };

      case "parallel":
        return {
          id,
          type: "parallel",
          name: "Parallel Tasks",
          handler: "workflow.parallel",
          parameters: {
            tasks: [],
          },
          nextActions: [],
        };

      default:
        return null;
    }
  };

  const handleAddNodeClick = (type) => {
    const newNode = createNode(type);
    if (newNode) {
      onAddNode(newNode);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-300 p-4 flex flex-col">
      <h3 className="font-bold mb-4 text-black">Workflow Nodes</h3>

      <div className="space-y-2">
        <div
          className="bg-blue-100 border border-blue-300 rounded-md p-3 cursor-pointer flex items-center"
          draggable
          onDragStart={(e) => handleDragStart(e, "trigger")}
          onClick={() => handleAddNodeClick("trigger")}
        >
          <BoltIcon className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-black">Trigger</span>
        </div>

        <div
          className="bg-green-100 border border-green-300 rounded-md p-3 cursor-pointer flex items-center"
          draggable
          onDragStart={(e) => handleDragStart(e, "sequential")}
          onClick={() => handleAddNodeClick("sequential")}
        >
          <PlayIcon className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-black">Action</span>
        </div>

        <div
          className="bg-yellow-100 border border-yellow-300 rounded-md p-3 cursor-pointer flex items-center"
          draggable
          onDragStart={(e) => handleDragStart(e, "conditional")}
          onClick={() => handleAddNodeClick("conditional")}
        >
          <ArrowsRightLeftIcon className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-black">Condition</span>
        </div>

        <div
          className="bg-purple-100 border border-purple-300 rounded-md p-3 cursor-pointer flex items-center"
          draggable
          onDragStart={(e) => handleDragStart(e, "parallel")}
          onClick={() => handleAddNodeClick("parallel")}
        >
          <ViewColumnsIcon className="h-5 w-5 text-purple-500 mr-2" />
          <span className="text-black">Parallel Tasks</span>
        </div>
      </div>

      <h3 className="font-bold mt-6 mb-2 text-black">Available Handlers</h3>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1">
          {actionHandlers &&
            actionHandlers?.map((handler) => (
              <div
                key={handler.name}
                className="text-sm p-2 hover:bg-gray-100 rounded text-black"
              >
                {handler.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowToolbar;
