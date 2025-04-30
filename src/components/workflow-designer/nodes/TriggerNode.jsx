import React from "react";
import { Handle } from "reactflow";

const TriggerNode = ({ data }) => {
  return (
    <div
      className="bg-blue-500 text-white p-4 rounded-md min-w-[180px]"
      onClick={() => data.onSelect()}
    >
      <div className="font-bold">{data.name}</div>
      <div className="text-sm">Event: {data.event}</div>
      <Handle type="source" position="right" style={{ background: "#fff" }} />
    </div>
  );
};

export default TriggerNode;
