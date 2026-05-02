import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, CalendarDays, Trash2, MapPin } from 'lucide-react';

const SortiesPage = () => {
  const [sorties, setSorties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ lieuSortie: '', dateSortie: '' });

  const API_URL = 'http://localhost:8000/api/sorties';

  const fetchSorties = async () => {
    try {
      const response = await axios.get(API_URL);
      setSorties(response.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchSorties(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/store`, formData);
      setIsModalOpen(false);
      setFormData({ lieuSortie: '', dateSortie: '' });
      fetchSorties();
    } catch (error) { alert("Erreur"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ?")) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        setSorties(sorties.filter(s => s.id !== id));
      } catch (error) { alert("Erreur"); }
    }
  };

  return (
    <div className="p-10 font-sans">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-gray-800">Gestion des Sorties</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#47c18e] text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:bg-[#3da87b]">
          <Plus size={22} /> Nouvelle Sortie
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sorties.map((s) => (
          <div key={s.id} className="bg-white p-7 rounded-[2.5rem] shadow-sm border-t-[6px] border-[#47c18e] flex flex-col gap-6 relative group">
            <button onClick={() => handleDelete(s.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 p-2 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={20} />
            </button>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-400 uppercase text-xs font-bold tracking-widest">
                <MapPin size={14} /> Lieu de rendez-vous
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{s.lieuSortie}</h2>
            </div>
            <div className="flex items-center gap-3 text-gray-500 bg-gray-50 p-4 rounded-2xl">
              <CalendarDays size={22} className="text-[#47c18e]" />
              <span className="font-bold text-gray-700">{s.dateSortie}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Ajouter une sortie</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <input type="text" placeholder="Lieu" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" onChange={(e) => setFormData({...formData, lieuSortie: e.target.value})} required />
              <input type="date" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" onChange={(e) => setFormData({...formData, dateSortie: e.target.value})} required />
              <div className="flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold">Annuler</button>
                <button type="submit" className="flex-1 py-4 bg-[#47c18e] text-white rounded-2xl font-bold shadow-md">Confirmer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortiesPage;