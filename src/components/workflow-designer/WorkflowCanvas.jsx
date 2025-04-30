import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import TriggerNode from "./nodes/TriggerNode";
import ActionNode from "./nodes/ActionNode";
import ConditionalNode from "./nodes/ConditionalNode";
import ParallelNode from "./nodes/ParallelNode";

const nodeTypes = {
  trigger: TriggerNode,
  sequential: ActionNode,
  conditional: ConditionalNode,
  parallel: ParallelNode,
};

const WorkflowCanvas = ({ workflow, onNodeSelect, onChange }) => {
  // Transform workflow data to ReactFlow nodes and edges
  const getInitialNodesAndEdges = useCallback(() => {
    const nodes = [];
    const edges = [];

    // Add trigger nodes
    workflow.triggers.forEach((trigger) => {
      nodes.push({
        id: trigger.id,
        type: "trigger",
        position: trigger.position || { x: 100, y: 100 },
        data: { ...trigger, onSelect: () => onNodeSelect(trigger) },
      });

      // Add edges from triggers to their actions
      trigger.actions?.forEach((actionId) => {
        edges.push({
          id: `${trigger.id}-${actionId}`,
          source: trigger.id,
          target: actionId,
          type: "smoothstep",
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        });
      });
    });

    // Add action nodes
    workflow.actions.forEach((action) => {
      nodes.push({
        id: action.id,
        type: action.type, // sequential, conditional, or parallel
        position: action.position || { x: 300, y: 100 },
        data: { ...action, onSelect: () => onNodeSelect(action) },
      });

      // Add edges from this action to next actions
      if (action.nextActions) {
        action.nextActions.forEach((nextActionId) => {
          edges.push({
            id: `${action.id}-${nextActionId}`,
            source: action.id,
            target: nextActionId,
            type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          });
        });
      }
    });

    return { nodes, edges };
  }, [workflow, onNodeSelect]);

  const { nodes: initialNodes, edges: initialEdges } =
    getInitialNodesAndEdges();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when workflow changes
  React.useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = getInitialNodesAndEdges();
    setNodes(newNodes);
    setEdges(newEdges);
  }, [workflow, getInitialNodesAndEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => {
      const newEdges = addEdge(
        {
          ...params,
          type: "smoothstep",
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        edges
      );

      setEdges(newEdges);

      // Update workflow data based on new connection
      const sourceNode =
        workflow.triggers.find((t) => t.id === params.source) ||
        workflow.actions.find((a) => a.id === params.source);

      const updatedWorkflow = { ...workflow };

      if (sourceNode) {
        if (sourceNode.type === "trigger") {
          const triggerIndex = updatedWorkflow.triggers.findIndex(
            (t) => t.id === params.source
          );
          updatedWorkflow.triggers[triggerIndex].actions = [
            ...new Set([
              ...(updatedWorkflow.triggers[triggerIndex].actions || []),
              params.target,
            ]),
          ];
        } else {
          const actionIndex = updatedWorkflow.actions.findIndex(
            (a) => a.id === params.source
          );
          updatedWorkflow.actions[actionIndex].nextActions = [
            ...new Set([
              ...(updatedWorkflow.actions[actionIndex].nextActions || []),
              params.target,
            ]),
          ];
        }

        onChange(updatedWorkflow);
      }
    },
    [edges, setEdges, workflow, onChange]
  );

  const onNodeDragStop = useCallback(
    (event, node) => {
      // Update node position in workflow data
      const updatedWorkflow = { ...workflow };

      if (node.type === "trigger") {
        const triggerIndex = updatedWorkflow.triggers.findIndex(
          (t) => t.id === node.id
        );
        if (triggerIndex >= 0) {
          updatedWorkflow.triggers[triggerIndex].position = node.position;
        }
      } else {
        const actionIndex = updatedWorkflow.actions.findIndex(
          (a) => a.id === node.id
        );
        if (actionIndex >= 0) {
          updatedWorkflow.actions[actionIndex].position = node.position;
        }
      }

      onChange(updatedWorkflow);
    },
    [workflow, onChange]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      nodeTypes={nodeTypes}
      fitView
    >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default WorkflowCanvas;
