import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  XCircleIcon,
  PlayIcon,
  ClockIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";

const WorkflowCard = ({ workflow }) => {
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
    }).format(date);
  };

  return (
    <Link
      to={`/workflows/${workflow.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {workflow.name}
          </h3>
          <div className="flex items-center">
            {getStatusIcon()}
            <span className="ml-1 text-sm text-gray-500 capitalize">
              {workflow.status}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {workflow.description}
        </p>
        <div className="flex justify-between text-xs text-gray-500">
          <div>Created by {workflow.createdBy}</div>
          <div>Last Run: {formatDate(workflow.lastRun)}</div>
        </div>
      </div>
    </Link>
  );
};

export default WorkflowCard;
