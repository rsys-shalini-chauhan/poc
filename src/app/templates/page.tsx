"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { fetchWorkflows } from "../../api/workflow";
import WorkflowListItem from "../../components/WorkflowListItem";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function TemplatesPage() {
  const [search, setSearch] = useState("");

  // Fetch only template workflows
  const {
    data: workflows,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["workflows", "templates"],
    queryFn: () => fetchWorkflows("templates"),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading templates: {(error as Error).message}
      </div>
    );
  }

  if (!workflows) {
    return (
      <div className="p-4 text-red-500">
        Unable to load workflow templates. Please try again later.
      </div>
    );
  }

  const filteredWorkflows = workflows.filter(
    (workflow) =>
      workflow.name.toLowerCase().includes(search.toLowerCase()) ||
      workflow.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Workflow Templates</h1>
        <Link
          href="/workflows/new?template=true"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Template
        </Link>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search templates..."
          className="w-full pl-10 pr-4 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
      </div>

      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Run
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created By
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredWorkflows.map((workflow) => (
              <WorkflowListItem key={workflow.id} workflow={workflow} />
            ))}
            {filteredWorkflows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No templates found. Create your first template to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
