"use client";

import React from "react";
import WorkflowDesigner from "../../../../pages/WorkflowDesigner";

export default function EditWorkflowPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <WorkflowDesigner />
    </div>
  );
}
