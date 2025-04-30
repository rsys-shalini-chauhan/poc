"use client";

import React from "react";
import WorkflowsList from "../../pages/WorkflowsList";

// This is a simple wrapper to make the WorkflowsList component work with Next.js App Router
export default function WorkflowsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <WorkflowsList />
    </div>
  );
}
