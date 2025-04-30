import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  fetchWorkflow,
  createWorkflow,
  updateWorkflow,
  createWorkflowTemplate,
} from "../api/workflow";
import { fetchActionHandlers } from "../api/handlers";
import WorkflowToolbar from "../components/workflow-designer/WorkflowToolbar";
import WorkflowHeader from "../components/workflow-designer/WorkflowHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import WorkflowCanvas from "../components/workflow-designer/WorkflowCanvas";
import NodeProperties from "../components/workflow-designer/NodeProperties";

const WorkflowDesigner = ({ isTemplate = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const [workflow, setWorkflow] = useState({
    name: "",
    description: "",
    triggers: [],
    actions: [],
    slaDefinitions: [],
    isTemplate: isTemplate,
  });
  const [selectedNode, setSelectedNode] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const { data: existingWorkflow, isLoading: workflowLoading } = useQuery({
    queryKey: ["workflow", id],
    queryFn: () => fetchWorkflow(id),
    enabled: isEditing,
    onSuccess: (data) => {
      setWorkflow(data);
    },
  });

  const { data: actionHandlers, isLoading: handlersLoading } = useQuery({
    queryKey: ["actionHandlers"],
    queryFn: fetchActionHandlers,
  });

  const createMutation = useMutation({
    mutationFn: isTemplate ? createWorkflowTemplate : createWorkflow,
    onSuccess: () => {
      toast.success(
        isTemplate
          ? "Template created successfully"
          : "Workflow created successfully"
      );
      navigate(isTemplate ? "/templates" : "/workflows");
    },
    onError: (error) => {
      toast.error(
        `Error creating ${isTemplate ? "template" : "workflow"}: ${
          error.message
        }`
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: () => {
      toast.success(
        isTemplate
          ? "Template updated successfully"
          : "Workflow updated successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["workflow", id] });
      setUnsavedChanges(false);
    },
    onError: (error) => {
      toast.error(
        `Error updating ${isTemplate ? "template" : "workflow"}: ${
          error.message
        }`
      );
    },
  });

  const handleSave = () => {
    if (isEditing) {
      updateMutation.mutate({ id, ...workflow });
    } else {
      createMutation.mutate(workflow);
    }
  };

  useEffect(() => {
    // Update workflow template state when isTemplate prop changes
    setWorkflow((prev) => ({
      ...prev,
      isTemplate,
    }));
  }, [isTemplate]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const handleWorkflowChange = (updatedWorkflow) => {
    setWorkflow(updatedWorkflow);
    setUnsavedChanges(true);
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const handleNodeUpdate = (updatedNode) => {
    const updatedWorkflow = { ...workflow };

    if (updatedNode.type === "trigger") {
      const triggerIndex = updatedWorkflow.triggers.findIndex(
        (t) => t.id === updatedNode.id
      );
      if (triggerIndex >= 0) {
        updatedWorkflow.triggers[triggerIndex] = updatedNode;
      }
    } else {
      const actionIndex = updatedWorkflow.actions.findIndex(
        (a) => a.id === updatedNode.id
      );
      if (actionIndex >= 0) {
        updatedWorkflow.actions[actionIndex] = updatedNode;
      }
    }

    setWorkflow(updatedWorkflow);
    setUnsavedChanges(true);
  };

  if (workflowLoading || handlersLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-full flex flex-col">
      <WorkflowHeader
        workflow={workflow}
        onChange={handleWorkflowChange}
        onSave={handleSave}
        isSaving={createMutation.isPending || updateMutation.isPending}
        hasUnsavedChanges={unsavedChanges}
        isTemplate={isTemplate}
      />

      <div className="flex-1 flex">
        <WorkflowToolbar
          actionHandlers={actionHandlers}
          onAddNode={(nodeData) => {
            // Logic to add node to workflow
            const updatedWorkflow = { ...workflow };
            if (nodeData.type === "trigger") {
              updatedWorkflow.triggers.push(nodeData);
            } else {
              updatedWorkflow.actions.push(nodeData);
            }
            handleWorkflowChange(updatedWorkflow);
          }}
        />

        <div className="flex-1 flex">
          <div className="flex-1 bg-gray-100 border border-gray-300">
            <WorkflowCanvas
              workflow={workflow}
              onNodeSelect={handleNodeSelect}
              onChange={handleWorkflowChange}
            />
          </div>

          {selectedNode && (
            <div className="w-80 border-l border-gray-300 bg-white p-4 overflow-y-auto">
              <NodeProperties
                node={selectedNode}
                actionHandlers={actionHandlers}
                onUpdate={handleNodeUpdate}
                onClose={() => setSelectedNode(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowDesigner;
