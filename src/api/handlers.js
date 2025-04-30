import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const fetchActionHandlers = async () => {
  // Mock data for action handlers
  return [
    {
      name: "video.transcode",
      description: "Transcodes video to a different format or quality",
      parameters: {
        format: {
          type: "string",
          label: "Output Format",
          description: "The format to convert the video to",
          required: true,
          default: "mp4",
          options: ["mp4", "mov", "avi", "webm"],
        },
        quality: {
          type: "string",
          label: "Quality",
          description: "The quality of the output video",
          required: true,
          default: "high",
          options: ["low", "medium", "high", "ultra"],
        },
        resize: {
          type: "boolean",
          label: "Resize",
          description: "Whether to resize the video",
          default: false,
        },
        width: {
          type: "number",
          label: "Width",
          description: "Width in pixels (if resize is true)",
          default: 1920,
        },
        height: {
          type: "number",
          label: "Height",
          description: "Height in pixels (if resize is true)",
          default: 1080,
        },
      },
    },
    {
      name: "video.watermark",
      description: "Adds a watermark to a video",
      parameters: {
        position: {
          type: "string",
          label: "Position",
          description: "Position of the watermark",
          required: true,
          default: "bottom-right",
          options: [
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
            "center",
          ],
        },
        opacity: {
          type: "number",
          label: "Opacity",
          description: "Opacity of the watermark (0-1)",
          required: true,
          default: 0.7,
        },
        image: {
          type: "string",
          label: "Image URL",
          description: "URL of the watermark image",
          required: true,
        },
      },
    },
    {
      name: "video.split",
      description: "Splits a video into segments",
      parameters: {
        segmentLength: {
          type: "number",
          label: "Segment Length",
          description: "Length of each segment in seconds",
          required: true,
          default: 60,
        },
        overlap: {
          type: "number",
          label: "Overlap",
          description: "Overlap between segments in seconds",
          default: 0,
        },
      },
    },
    {
      name: "audio.mix",
      description: "Mixes audio tracks",
      parameters: {
        tracks: {
          type: "array",
          label: "Tracks",
          description: "List of audio tracks to mix",
          required: true,
        },
        normalize: {
          type: "boolean",
          label: "Normalize",
          description: "Whether to normalize the output",
          default: true,
        },
      },
    },
    {
      name: "condition.evaluate",
      description: "Evaluates a condition and chooses a path",
      parameters: {
        conditions: {
          type: "object",
          label: "Conditions",
          description: "The condition object to evaluate",
          required: true,
        },
      },
    },
    {
      name: "workflow.parallel",
      description: "Executes multiple tasks in parallel",
      parameters: {
        tasks: {
          type: "array",
          label: "Tasks",
          description: "List of tasks to run in parallel",
          required: true,
        },
        failFast: {
          type: "boolean",
          label: "Fail Fast",
          description: "Whether to stop all tasks if one fails",
          default: true,
        },
      },
    },
    {
      name: "media.publish",
      description: "Publishes media to various platforms",
      parameters: {
        platforms: {
          type: "array",
          label: "Platforms",
          description: "Platforms to publish to",
          required: true,
          default: ["youtube"],
        },
        schedule: {
          type: "string",
          label: "Schedule",
          description: "When to publish (now or ISO date)",
          default: "now",
        },
        metadata: {
          type: "object",
          label: "Metadata",
          description: "Metadata for the published content",
          default: {},
        },
      },
    },
  ];
};
