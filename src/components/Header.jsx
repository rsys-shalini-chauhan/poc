import React from "react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4">
      <button className="block md:hidden">
        <Bars3Icon className="h-6 w-6" />
      </button>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="flex items-center space-x-2">
          <UserCircleIcon className="h-8 w-8 text-gray-500" />
          <span className="font-medium">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
