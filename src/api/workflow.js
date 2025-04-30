import axios from "axios";

// Define the base URL without /api prefix since the endpoints don't have it
const BASE_URL =
  "https://14ce-2409-4050-ebd-3d3a-3ddc-4b18-5b1f-72c1.ngrok-free.app";

// Axios instance with CORS headers
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Mock data
const mockDashboardStats = {
  totalWorkflows: 12,
  runningWorkflows: 3,
  videosProcessed: 256,
  socialPosts: 124,
};

const mockRecentWorkflows = [
  {
    id: "1",
    name: "Video Transcoding Pipeline",
    description: "Process 4K raw footage for editing",
    status: "active",
    lastRun: "2023-04-28T16:45:22Z",
    createdBy: "John Doe",
  },
  {
    id: "2",
    name: "Social Media Distribution",
    description: "Distribute content to various platforms",
    status: "completed",
    lastRun: "2023-04-25T12:30:15Z",
    createdBy: "Jane Smith",
  },
  {
    id: "3",
    name: "Motion Graphics Rendering",
    description: "Render complex motion graphics",
    status: "failed",
    lastRun: "2023-04-27T09:15:45Z",
    createdBy: "Mike Johnson",
  },
];

const mockAllWorkflows = [
  {
    id: "1",
    name: "Video Transcoding Pipeline",
    description: "Process 4K raw footage for editing",
    status: "active",
    lastRun: "2023-04-28T16:45:22Z",
    createdBy: "John Doe",
  },
  {
    id: "2",
    name: "Social Media Distribution",
    description: "Distribute content to various platforms",
    status: "completed",
    lastRun: "2023-04-25T12:30:15Z",
    createdBy: "Jane Smith",
  },
  {
    id: "3",
    name: "Motion Graphics Rendering",
    description: "Render complex motion graphics",
    status: "failed",
    lastRun: "2023-04-27T09:15:45Z",
    createdBy: "Mike Johnson",
  },
  {
    id: "4",
    name: "Audio Mixing Workflow",
    description: "Automated audio mixing process",
    status: "active",
    lastRun: "2023-04-26T14:20:10Z",
    createdBy: "Sarah Williams",
  },
  {
    id: "5",
    name: "Color Grading Template",
    description: "Standard color grading process",
    status: "template",
    lastRun: null,
    createdBy: "David Brown",
  },
];

const mockWorkflowDetails = (id) => ({
  id,
  name: id === "1" ? "Video Transcoding Pipeline" : "New Workflow",
  description: "Process 4K raw footage for editing",
  triggers: [
    {
      id: "trigger-1",
      type: "trigger",
      name: "New Content Available",
      event: "content.created",
      actions: ["action-1"],
      position: { x: 100, y: 150 },
    },
  ],
  actions: [
    {
      id: "action-1",
      type: "sequential",
      name: "Transcode Video",
      handler: "video.transcode",
      parameters: {
        quality: "high",
        format: "mp4",
      },
      nextActions: ["action-2"],
      position: { x: 350, y: 150 },
    },
    {
      id: "action-2",
      type: "conditional",
      name: "Check Duration",
      handler: "condition.evaluate",
      conditions: {
        type: "simple",
        field: "metadata.duration",
        operator: "gt",
        value: "300",
      },
      nextActions: ["action-3", "action-4"],
      position: { x: 600, y: 150 },
    },
    {
      id: "action-3",
      type: "sequential",
      name: "Split into Segments",
      handler: "video.split",
      parameters: {
        segmentLength: 300,
      },
      nextActions: [],
      position: { x: 850, y: 80 },
    },
    {
      id: "action-4",
      type: "sequential",
      name: "Apply Watermark",
      handler: "video.watermark",
      parameters: {
        position: "bottom-right",
        opacity: 0.8,
      },
      nextActions: [],
      position: { x: 850, y: 220 },
    },
  ],
  slaDefinitions: [],
});

export const fetchDashboardStats = async () => {
  try {
    // const response = await axios.get(`${API_URL}/dashboard/stats`);
    // return response.data;
    return mockDashboardStats;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return mockDashboardStats;
  }
};

export const fetchRecentWorkflows = async () => {
  try {
    // const response = await axios.get(`${API_URL}/workflows/recent`);
    // return response.data;
    return mockRecentWorkflows;
  } catch (error) {
    console.error("Error fetching recent workflows:", error);
    return mockRecentWorkflows;
  }
};

export const fetchWorkflows = async (filter = "all") => {
  console.log(`Fetching workflows with filter: ${filter}`);

  try {
    console.log("Attempting to call API:", `${BASE_URL}/workflows`);
    const response = await api.get(`/workflows`, {
      params: { filter },
    });

    console.log("API response:", response);

    // Make sure the response has a consistent structure and expected fields
    if (response.data && Array.isArray(response.data)) {
      console.log("Using API data");
      return response.data.map((workflow) => ({
        id: workflow.id || "",
        name: workflow.name || "",
        description: workflow.description || "",
        status: workflow.status || "unknown",
        lastRun: workflow.lastRun || null,
        createdBy: workflow.createdBy || "",
        version: workflow.version || "",
        isTemplate: workflow.isTemplate || false,
      }));
    }

    // If response format is unexpected, fall back to mock data
    console.warn("Invalid API response format, using mock data");
    return getFilteredMockWorkflows(filter);
  } catch (error) {
    console.error("Error fetching workflows:", error);
    console.log("Returning mock data due to error");
    return getFilteredMockWorkflows(filter);
  }
};

// Helper function to get filtered mock workflows
const getFilteredMockWorkflows = (filter) => {
  if (filter === "all") {
    return mockAllWorkflows;
  } else {
    return mockAllWorkflows.filter((workflow) => {
      if (filter === "active") return workflow.status === "active";
      if (filter === "completed") return workflow.status === "completed";
      if (filter === "failed") return workflow.status === "failed";
      if (filter === "templates")
        return workflow.status === "template" || workflow.isTemplate === true;
      return true;
    });
  }
};

export const fetchWorkflow = async (id) => {
  try {
    const response = await api.get(`/workflows/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching workflow ${id}:`, error);
    return mockWorkflowDetails(id);
  }
};

export const createWorkflow = async (workflow) => {
  // Mock creating a workflow
  console.log("Creating workflow:", workflow);

  try {
    // Format the workflow payload according to the required structure
    const formattedWorkflow = {
      id: workflow.id || "string",
      name: workflow.name || "string",
      description: workflow.description || "string",
      version: workflow.version || "1.0",
      isTemplate: workflow.isTemplate || false,
      createdBy: workflow.createdBy || "Current User",
      createdAt: workflow.createdAt || new Date().toISOString(),
      updatedAt: workflow.updatedAt || new Date().toISOString(),
      triggers: workflow.triggers || [],
      actions: workflow.actions || [],
      slaDefinitions: workflow.slaDefinitions || [],
    };

    console.log("Formatted workflow payload:", formattedWorkflow);

    const response = await api.post(`/workflows`, formattedWorkflow);

    if (response && response.data) {
      return response.data;
    } else {
      console.log("Server returned empty response, using mock data");
      return createMockWorkflow(workflow);
    }
  } catch (error) {
    console.error("Error creating workflow:", error);
    console.log("Server error occurred, using mock data");
    return createMockWorkflow(workflow);
  }
};

// Helper function to create mock workflow data with consistent format
const createMockWorkflow = (workflow) => {
  return {
    id: workflow.id || Math.random().toString(36).substring(2, 9),
    name: workflow.name || "New Workflow",
    description: workflow.description || "",
    version: workflow.version || "1.0",
    isTemplate: workflow.isTemplate || false,
    createdBy: workflow.createdBy || "Current User",
    createdAt: workflow.createdAt || new Date().toISOString(),
    updatedAt: workflow.updatedAt || new Date().toISOString(),
    status: "active",
    lastRun: null,
    triggers: workflow.triggers || [],
    actions: workflow.actions || [],
    slaDefinitions: workflow.slaDefinitions || [],
  };
};

export const updateWorkflow = async (workflow) => {
  try {
    const { id, ...data } = workflow;
    const response = await api.put(`/workflows/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating workflow ${workflow.id}:`, error);
    return workflow;
  }
};

export const deleteWorkflow = async (id) => {
  try {
    const response = await api.delete(`/workflows/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting workflow ${id}:`, error);
    return { success: true };
  }
};

export const executeWorkflow = async (id, context = {}) => {
  try {
    const response = await api.post(`/workflows/${id}/execute`, {
      context,
    });
    return response.data;
  } catch (error) {
    console.error(`Error executing workflow ${id}:`, error);
    return { executionId: Math.random().toString(36).substring(2, 9) };
  }
};

export const createWorkflowTemplate = async (template) => {
  // Mock creating a workflow template
  console.log("Creating workflow template:", template);

  try {
    // Format the template payload according to the required structure
    const formattedTemplate = {
      id: template.id || "string",
      name: template.name || "New Template",
      description: template.description || "",
      version: template.version || "1.0",
      isTemplate: true,
      createdBy: template.createdBy || "Current User",
      createdAt: template.createdAt || new Date().toISOString(),
      updatedAt: template.updatedAt || new Date().toISOString(),
      status: "template",
      triggers: template.triggers || [],
      actions: template.actions || [],
      slaDefinitions: template.slaDefinitions || [],
    };

    console.log("Formatted template payload:", formattedTemplate);

    const response = await api.post(`/workflows`, formattedTemplate);

    if (response && response.data) {
      return response.data;
    } else {
      console.log("Server returned empty response, using mock data");
      return createMockTemplate(template);
    }
  } catch (error) {
    console.error("Error creating template:", error);
    console.log("Server error occurred, using mock data");
    return createMockTemplate(template);
  }
};

// Helper function to create mock template data with consistent format
const createMockTemplate = (template) => {
  return {
    id: template.id || Math.random().toString(36).substring(2, 9),
    name: template.name || "New Template",
    description: template.description || "",
    version: template.version || "1.0",
    isTemplate: true,
    status: "template",
    createdBy: template.createdBy || "Current User",
    createdAt: template.createdAt || new Date().toISOString(),
    updatedAt: template.updatedAt || new Date().toISOString(),
    lastRun: null,
    triggers: template.triggers || [],
    actions: template.actions || [],
    slaDefinitions: template.slaDefinitions || [],
  };
};

// Export mock data for direct use in components
export {
  mockDashboardStats,
  mockRecentWorkflows,
  mockAllWorkflows,
  mockWorkflowDetails,
};
