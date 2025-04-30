import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { fetchDashboardStats, fetchRecentWorkflows } from "../api/workflow";
import StatCard from "../components/StatCard";
import WorkflowCard from "../components/WorkflowCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });

  const { data: workflows, isLoading: workflowsLoading } = useQuery({
    queryKey: ["recentWorkflows"],
    queryFn: fetchRecentWorkflows,
  });

  if (statsLoading || workflowsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          to="/workflows/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Workflow
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Workflows"
          value={stats.totalWorkflows}
          icon="document"
        />
        <StatCard
          title="Running Workflows"
          value={stats.runningWorkflows}
          icon="play"
        />
        <StatCard
          title="Videos Processed"
          value={stats.videosProcessed}
          icon="video"
        />
        <StatCard title="Social Posts" value={stats.socialPosts} icon="share" />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Recent Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
