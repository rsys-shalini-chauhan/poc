"use client";

import React from "react";
import WorkflowDetails from "../../../pages/WorkflowDetails";

export default function WorkflowDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <WorkflowDetails />
    </div>
  );
}
