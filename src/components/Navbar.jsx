import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          🎓 Magnete
        </Link>
      </div>
      <div className="flex-none">
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
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
