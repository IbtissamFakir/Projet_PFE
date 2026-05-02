import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, FileText, MapPin } from 'lucide-react';
import logo from '../../assets/logo.png'; // Chemin corrigé

const Topbar = ({ role, userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="w-full bg-[#1e1e2d] text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-lg font-bold uppercase">Centre <span className="text-[#f97316]">Al Fadl</span></h1>
          <p className="text-xs text-gray-400 font-medium">
            {userName || "Chargement..."}
          </p>
        </div>
      </div>

      {role === 'branche' && (
        <nav className="flex gap-4">
          <NavLink to="/notes" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isActive ? 'bg-[#f97316] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}>
            <FileText size={18} /> <span className="font-bold">Notes</span>
          </NavLink>
          <NavLink to="/sorties" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isActive ? 'bg-[#f97316] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}>
            <MapPin size={18} /> <span className="font-bold">Sorties</span>
          </NavLink>
        </nav>
      )}

      <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mr-4">
        <LogOut size={20} />
        <span className="text-sm font-bold">Déconnexion</span>
      </button>
    </div>
  );
};

export default Topbar;