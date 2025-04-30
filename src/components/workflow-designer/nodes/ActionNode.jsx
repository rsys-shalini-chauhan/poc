import React from "react";
import { Handle } from "reactflow";

const ActionNode = ({ data }) => {
  return (
    <div
      className="bg-green-500 text-white p-4 rounded-md min-w-[180px]"
      onClick={() => data.onSelect()}
    >
      <Handle type="target" position="left" style={{ background: "#fff" }} />
      <div className="font-bold">{data.name}</div>
      <div className="text-sm">Handler: {data.handler}</div>
      <Handle type="source" position="right" style={{ background: "#fff" }} />
    </div>
  );
};

export default ActionNode;
