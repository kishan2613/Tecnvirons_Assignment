import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // for hamburger icons
import Profileimg from "../../assets/Kishan.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-gray-200 shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <h1 className="text-xl font-bold text-indigo-400">Gyaanlytics</h1>

        {/* Desktop Search */}
        <div className="hidden md:block w-72">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Right: Profile + Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Profile (hidden on very small screens) */}
          <div className="hidden sm:flex items-center space-x-2">
            <img
              src={Profileimg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
            />
            <div className="hidden md:block">
              <p className="text-sm font-semibold">Kishan Kumar</p>
              <p className="text-xs text-gray-400">kishankr2613@gmail.com</p>
            </div>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className="sm:hidden p-2 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden px-6 pb-4 space-y-4 bg-gray-800 border-t border-gray-700">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex items-center space-x-2">
            <img
              src={Profileimg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
            />
            <div>
              <p className="text-sm font-semibold">Kishan Kumar</p>
              <p className="text-xs text-gray-400">kishankr2613@gmail.com</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
