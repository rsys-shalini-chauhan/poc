import React from "react";
import {
  DocumentIcon,
  PlayIcon,
  VideoCameraIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const StatCard = ({ title, value, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case "document":
        return <DocumentIcon className="h-8 w-8 text-indigo-500" />;
      case "play":
        return <PlayIcon className="h-8 w-8 text-green-500" />;
      case "video":
        return <VideoCameraIcon className="h-8 w-8 text-blue-500" />;
      case "share":
        return <ShareIcon className="h-8 w-8 text-purple-500" />;
      default:
        return <DocumentIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-full">{getIcon()}</div>
      </div>
    </div>
  );
};

export default StatCard;
