"use client";

import React from "react";
import WorkflowDesigner from "../../../pages/WorkflowDesigner";

export default function NewTemplatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Workflow Template</h1>
      <WorkflowDesigner isTemplate={true} />
    </div>
  );
}
