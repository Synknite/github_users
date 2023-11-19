import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

interface NavbarProps {
  title?: string;
}
function Navbar(title: NavbarProps) {
  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <FaGithub className="inline pr-2 text-3xl text-purple-700" />
          <Link to="/" className="text-lg font-bold align-middle">
            {title}
          </Link>
        </div>

        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link
              to="/"
              className="btn btn-outline btn-primary btn-sm rounded-btn mx-2"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="btn btn-outline btn-primary btn-sm rounded-btn mx-2"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
