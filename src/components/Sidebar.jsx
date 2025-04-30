import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  Cog6ToothIcon,
  PlayIcon,
  DocumentTextIcon,
  FilmIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", to: "/", icon: HomeIcon },
    { name: "Workflows", to: "/workflows", icon: PlayIcon },
    { name: "Templates", to: "/templates", icon: DocumentTextIcon },
    { name: "Media Library", to: "/media", icon: FilmIcon },
    { name: "Settings", to: "/settings", icon: Cog6ToothIcon },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-bold">VFX Workflow Studio</h1>
      </div>
      <nav className="mt-5">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mt-2">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
