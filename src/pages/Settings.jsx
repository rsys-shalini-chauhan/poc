import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      slack: false,
      desktop: true,
    },
    defaultRenderSettings: {
      quality: "high",
      format: "mp4",
      resolution: "1080p",
    },
    apiKeys: {
      googleCloud: "***************************",
      aws: "***************************",
    },
  });

  const handleNotificationChange = (key) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const handleRenderSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      defaultRenderSettings: {
        ...settings.defaultRenderSettings,
        [name]: value,
      },
    });
  };

  const handleApiKeyChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      apiKeys: {
        ...settings.apiKeys,
        [name]: value,
      },
    });
  };

  const handleSaveSettings = () => {
    // Mock API call to save settings
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button
          onClick={handleSaveSettings}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Save Settings
        </button>
      </div>

      <div className="bg-white shadow rounded-md p-6">
        <h2 className="text-lg font-bold mb-4">Notifications</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailNotification"
              checked={settings.notifications.email}
              onChange={() => handleNotificationChange("email")}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="emailNotification"
              className="ml-2 block text-sm text-gray-900"
            >
              Email Notifications
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="slackNotification"
              checked={settings.notifications.slack}
              onChange={() => handleNotificationChange("slack")}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="slackNotification"
              className="ml-2 block text-sm text-gray-900"
            >
              Slack Notifications
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="desktopNotification"
              checked={settings.notifications.desktop}
              onChange={() => handleNotificationChange("desktop")}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="desktopNotification"
              className="ml-2 block text-sm text-gray-900"
            >
              Desktop Notifications
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-md p-6">
        <h2 className="text-lg font-bold mb-4">Default Render Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="quality"
              className="block text-sm font-medium text-gray-700"
            >
              Quality
            </label>
            <select
              id="quality"
              name="quality"
              value={settings.defaultRenderSettings.quality}
              onChange={handleRenderSettingsChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="ultra">Ultra</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="format"
              className="block text-sm font-medium text-gray-700"
            >
              Format
            </label>
            <select
              id="format"
              name="format"
              value={settings.defaultRenderSettings.format}
              onChange={handleRenderSettingsChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="mp4">MP4</option>
              <option value="mov">MOV</option>
              <option value="avi">AVI</option>
              <option value="webm">WebM</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="resolution"
              className="block text-sm font-medium text-gray-700"
            >
              Resolution
            </label>
            <select
              id="resolution"
              name="resolution"
              value={settings.defaultRenderSettings.resolution}
              onChange={handleRenderSettingsChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="1440p">1440p</option>
              <option value="4k">4K</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-md p-6">
        <h2 className="text-lg font-bold mb-4">API Keys</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="googleCloud"
              className="block text-sm font-medium text-gray-700"
            >
              Google Cloud API Key
            </label>
            <input
              type="password"
              id="googleCloud"
              name="googleCloud"
              value={settings.apiKeys.googleCloud}
              onChange={handleApiKeyChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="aws"
              className="block text-sm font-medium text-gray-700"
            >
              AWS API Key
            </label>
            <input
              type="password"
              id="aws"
              name="aws"
              value={settings.apiKeys.aws}
              onChange={handleApiKeyChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
