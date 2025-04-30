import React from "react";
import { Handle } from "reactflow";

const ConditionalNode = ({ data }) => {
  return (
    <div
      className="bg-yellow-500 text-white p-4 rounded-md min-w-[180px]"
      onClick={() => data.onSelect()}
    >
      <Handle type="target" position="left" style={{ background: "#fff" }} />
      <div className="font-bold">{data.name}</div>
      <div className="text-sm">Conditional</div>
      <Handle
        type="source"
        position="right"
        style={{ background: "#fff" }}
        id="true"
      />
      <Handle
        type="source"
        position="bottom"
        style={{ background: "#fff" }}
        id="false"
      />
    </div>
  );
};

export default ConditionalNode;
