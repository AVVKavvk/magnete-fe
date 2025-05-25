import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar bg-base-200 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          🎓 Magnete
        </Link>
      </div>

      {/* Mobile menu button (hamburger) */}
      <div className="flex-none lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-square btn-ghost"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/students"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Add Student
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/migrate"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Add Month
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 right-4 w-48 bg-base-100 rounded-box shadow-lg z-50 lg:hidden">
          <ul className="menu menu-vertical p-2">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/students"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Students
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Add Student
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/migrate"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Add Month
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
