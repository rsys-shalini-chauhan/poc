import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import WorkflowDesigner from "./pages/WorkflowDesigner";
import WorkflowsList from "./pages/WorkflowsList";
import WorkflowDetails from "./pages/WorkflowDetails";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="workflows">
          <Route index element={<WorkflowsList />} />
          <Route path="new" element={<WorkflowDesigner />} />
          <Route path="edit/:id" element={<WorkflowDesigner />} />
          <Route path=":id" element={<WorkflowDetails />} />
        </Route>
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
