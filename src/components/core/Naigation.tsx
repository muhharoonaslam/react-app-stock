import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md mb-6 container mx-auto p-6 max-w-4xl bg-gray-50 shadow-lg rounded-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Stock App</h1>

        <ul className="hidden md:flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-700"
                  : "text-blue-500 hover:text-blue-700"
              }
            >
              Stock Viewer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/historical-data"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-700"
                  : "text-blue-500 hover:text-blue-700"
              }
            >
              Historical Data
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/previous-close"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-700"
                  : "text-blue-500 hover:text-blue-700"
              }
            >
              Previous Close
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/open-close"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-700"
                  : "text-blue-500 hover:text-blue-700"
              }
            >
              Open/Close
            </NavLink>
          </li>
        </ul>

        <button
          className="md:hidden text-blue-500 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden bg-white ">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 bg-gray-200 font-semibold"
                  : "block px-4 py-2 text-blue-500 hover:bg-gray-100"
              }
              onClick={toggleMenu}
            >
              Stock Viewer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/historical-data"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 bg-gray-200 font-semibold"
                  : "block px-4 py-2 text-blue-500 hover:bg-gray-100"
              }
              onClick={toggleMenu}
            >
              Historical Data
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/previous-close"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 bg-gray-200 font-semibold"
                  : "block px-4 py-2 text-blue-500 hover:bg-gray-100"
              }
              onClick={toggleMenu}
            >
              Previous Close
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/open-close"
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 bg-gray-200 font-semibold"
                  : "block px-4 py-2 text-blue-500 hover:bg-gray-100"
              }
              onClick={toggleMenu}
            >
              Open/Close
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
