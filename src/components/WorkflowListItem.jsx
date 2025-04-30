import React from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  XCircleIcon,
  PlayIcon,
  ClockIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

const WorkflowListItem = ({ workflow }) => {
  const getStatusIcon = () => {
    switch (workflow.status) {
      case "active":
        return <PlayIcon className="h-5 w-5 text-green-500" />;
      case "completed":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case "template":
        return <DocumentDuplicateIcon className="h-5 w-5 text-indigo-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

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
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link href={`/workflows/${workflow.id}`} className="flex items-center">
          <div className="font-medium text-gray-900">{workflow.name}</div>
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {getStatusIcon()}
          <span className="ml-1 capitalize">{workflow.status}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
        {formatDate(workflow.lastRun)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
        {workflow.createdBy}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <Link
            href={`/workflows/${workflow.id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <EyeIcon className="h-5 w-5" />
          </Link>
          <Link
            href={`/workflows/edit/${workflow.id}`}
            className="text-blue-600 hover:text-blue-900"
          >
            <PencilIcon className="h-5 w-5" />
          </Link>
          <button className="text-red-600 hover:text-red-900">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default WorkflowListItem;
