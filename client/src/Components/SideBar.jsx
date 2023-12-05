import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div class="flex h-screen">
      <aside class="bg-gray-800 border rounded-lg m-3 p-3 text-white w-64 hidden sm:block">
        <div class="p-4 h-full">
          <h1 class="text-xl font-bold mb-4">Sidebar</h1>
          <ul>
            <Link to={"/"}>
              <li class="py-2 hover:bg-gray-700">Home</li>
            </Link>
            <Link>
              <li class="py-2 hover:bg-gray-700">SignIn</li>
            </Link>

            <li class="py-2 hover:bg-gray-700">Menu Item 3</li>
            <li class="py-2 hover:bg-gray-700">Menu Item 4</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
