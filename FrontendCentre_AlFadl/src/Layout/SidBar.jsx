import React from "react";
import logoFadl from "../assets/logoFadl.png";
import { Link, NavLink } from "react-router-dom";

// Heroicons
import {
  HomeIcon,
  UserPlusIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClipboardDocumentIcon,
  MapPinIcon,
  Square2StackIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightEndOnRectangleIcon, ArrowRightIcon, Square3Stack3DIcon } from "@heroicons/react/16/solid";
import { Squares2X2Icon } from "@heroicons/react/20/solid";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";

function SidBar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
     ${isActive
      ? "bg-orange-500 text-white shadow-lg"
      : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="flex">
    <div className="fixed top-0 left-0 w-64 h-screen bg-[rgb(23,28,38)] text-white flex flex-col font-bold">


        {/* 🔷 Logo */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-slate-700">
          <img src={logoFadl} alt="Logo" className="w-12" />
          <p className="font-bold">
            Centre <span className="text-orange-500">AL Fadl</span>
          </p>
        </div>

        {/* 🔶 Menu */}
        <ul className="mt-6 space-y-2 px-3">

          <li>
            <NavLink to="dashboard" className={linkClass}>
              <Squares2X2Icon className="w-5 h-5" />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="inscription" className={linkClass}>
              <UserPlusIcon className="w-5 h-5" />
              Inscription
            </NavLink>
          </li>

          <li>
            <NavLink to="/gestionStagiaires" className={linkClass}>
              <AcademicCapIcon className="w-5 h-5" />
              Gestion Stagiaires
            </NavLink>
          </li>

          <li>
            <NavLink to="/formateur" className={linkClass}>
              <UserGroupIcon className="w-5 h-5" />
              Formateur
            </NavLink>
          </li>

          <li>
            <NavLink to="/notes" className={linkClass}>
              <ClipboardDocumentIcon className="w-5 h-5" />
              Notes
            </NavLink>
          </li>

          <li>
            <NavLink to="/sorties" className={linkClass}>
              <MapPinIcon className="w-5 h-5" />
              Sorties
            </NavLink>
          </li>

        </ul>

        <hr className="my-4 border-slate-700 mt-32" />

        <NavLink to="/deconnecter" className={linkClass}>
          <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
          Déconnexion
        </NavLink>
      </div>
    </div>
  );
}

export default SidBar;