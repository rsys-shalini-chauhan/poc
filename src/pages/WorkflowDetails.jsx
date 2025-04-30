import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  PencilIcon,
  PlayIcon,
  ArrowUturnLeftIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { fetchWorkflow, executeWorkflow } from "../api/workflow";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-hot-toast";

const WorkflowDetails = () => {
  const { id } = useParams();
  const { data: workflow, isLoading } = useQuery({
    queryKey: ["workflow", id],
    queryFn: () => fetchWorkflow(id)
  });

  const executeMutation = useMutation({
    mutationFn: (context) => executeWorkflow(id, context),
    onSuccess: () => {
      toast.success("Workflow execution started");
    },
    onError: (error) => {
      toast.error(`Error starting workflow: ${error.message}`);
    },
  });

  const handleExecute = () => {
    executeMutation.mutate({});
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          {workflow.name}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={handleExecute}
            disabled={executeMutation.isPending}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlayIcon className="h-5 w-5 mr-2" />
            {executeMutation.isPending ? "Starting..." : "Run Workflow"}
          </button>
          <Link
            to={`/workflows/edit/${id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            Edit
          </Link>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center">
            <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
            Duplicate
          </button>
          <button className="bg-red-100 text-red-700 px-4 py-2 rounded-md flex items-center">
            <TrashIcon className="h-5 w-5 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Description</h2>
          <p className="text-gray-700">
            {workflow.description || "No description provided."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Last Run</p>
              <p className="font-medium">{formatDate(workflow.lastRun)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Created By</p>
              <p className="font-medium">{workflow.createdBy || "Unknown"}</p>
            </div>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Creation Date</p>
              <p className="font-medium">April 15, 2023</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-bold mb-4">Workflow Structure</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-gray-500 text-sm mb-2">
              This workflow consists of:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                <span className="font-medium">{workflow.triggers.length}</span>{" "}
                trigger(s)
              </li>
              <li>
                <span className="font-medium">{workflow.actions.length}</span>{" "}
                action(s)
              </li>
              <li>
                <span className="font-medium">
                  {
                    workflow.actions.filter((a) => a.type === "conditional")
                      .length
                  }
                </span>{" "}
                condition(s)
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              View the workflow designer for a visual representation of this
              workflow.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Recent Executions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Execution ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Started At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    exe-12345678
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Apr 28, 2023, 4:45 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2m 34s
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View Logs
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    exe-12345677
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Failed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Apr 27, 2023, 2:30 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1m 12s
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View Logs
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetails;
