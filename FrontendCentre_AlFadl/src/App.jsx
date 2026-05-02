import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Imports mis à jour vers le nouveau dossier
import Topbar from './composantsFormateur/components/Topbar';
import NotesBranchePage from './composantsFormateur/pages/NotesBranchePage';
import NotesModulePage from './composantsFormateur/pages/NotesModulePage';
import SortiesPage from './composantsFormateur/pages/SortiesPage';

function App() {
  const [userRole, setUserRole] = useState('branche');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/tableau-notes')
      .then(res => setUserName(res.data.userName))
      .catch(err => console.error(err));
  }, [userRole]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Topbar role={userRole} userName={userName} />
      
      <button
        onClick={() => setUserRole(userRole === 'branche' ? 'module' : 'branche')}
        className="fixed bottom-8 right-8 bg-black text-white px-6 py-3 rounded-full font-bold shadow-2xl opacity-50 hover:opacity-100 z-50 text-sm"
      >
        TEST MODE : {userRole.toUpperCase()}
      </button>

      <main className="flex-1">
        <Routes>
          {userRole === 'branche' ? (
            <>
              <Route path="/notes" element={<NotesBranchePage />} />
              <Route path="/sorties" element={<SortiesPage />} />
              <Route path="/" element={<Navigate to="/notes" />} />
            </>
          ) : (
            <>
              <Route path="/module-notes" element={<NotesModulePage />} />
              <Route path="/" element={<Navigate to="/module-notes" />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;