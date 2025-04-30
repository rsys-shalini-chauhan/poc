import React from "react";
import { Handle } from "reactflow";

const ParallelNode = ({ data }) => {
  return (
    <div
      className="bg-purple-500 text-white p-4 rounded-md min-w-[180px]"
      onClick={() => data.onSelect()}
    >
      <Handle type="target" position="left" style={{ background: "#fff" }} />
      <div className="font-bold">{data.name}</div>
      <div className="text-sm">
        Parallel Tasks: {data.parameters?.tasks?.length || 0}
      </div>
      <Handle type="source" position="right" style={{ background: "#fff" }} />
    </div>
  );
};

export default ParallelNode;
