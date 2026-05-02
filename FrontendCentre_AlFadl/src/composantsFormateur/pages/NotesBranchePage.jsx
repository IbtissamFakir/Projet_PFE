import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import axios from 'axios';

const NotesBranchePage = () => {
  const [stagiaires, setStagiaires] = useState([]);
  const [saisies, setSaisies] = useState({});
  const [nomBranche, setNomBranche] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/tableau-notes')
      .then(res => {
        setStagiaires(res.data.stagiaires);
        setNomBranche(res.data.nomBranche);
        const initialSaisies = {};
        res.data.stagiaires.forEach(stg => {
          if (stg.notesExistantes) {
            Object.keys(stg.notesExistantes).forEach(code => {
              initialSaisies[`${stg.id}-${code.toUpperCase()}`] = stg.notesExistantes[code];
            });
          }
        });
        setSaisies(initialSaisies);
      })
      .catch(err => console.error("Erreur chargement:", err));
  }, []);

  const handleInputChange = (stgId, code, val) => {
    const key = `${stgId}-${code.toUpperCase()}`;
    if (val === "") {
      setSaisies(prev => ({ ...prev, [key]: "" }));
      return;
    }
    const numVal = parseFloat(val);
    if (numVal >= 0 && numVal <= 40) {
      setSaisies(prev => ({ ...prev, [key]: val }));
    }
  };

  const handleValider = async () => {
    setIsSaving(true);
    const dataToSend = Object.keys(saisies)
      .filter(key => saisies[key] !== "" && saisies[key] !== null)
      .map(key => {
        const [stgId, typeCode] = key.split('-');
        return { 
          stagiaire_id: stgId, 
          type_code: typeCode.toUpperCase(), 
          note: saisies[key] 
        };
      });

    try {
      await axios.post('http://localhost:8000/api/notes/bulk-store', { notes: dataToSend });
      alert("Félicitations ! Toutes les notes sont enregistrées.");
    } catch (err) {
      alert("Erreur lors de l'enregistrement.");
    } finally {
      setIsSaving(false);
    }
  };

  const colonnes = ['TH1', 'PR1', 'TH2', 'PR2', 'TH3', 'PR3', 'TH4', 'PR4'];

  return (
    <div className="p-10 font-sans">
      <div className="mb-6">
        <h1 className="text-4xl font-black text-gray-800">Notes</h1>
        <p className="text-gray-500 mt-2 font-medium">
          Branche : <span className="font-bold text-gray-900">{nomBranche}</span>
        </p>
      </div>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-gray-600 font-bold">
              <th className="p-6" rowSpan="2">Stagiaire</th>
              <th className="p-4 text-center border-x border-gray-100 bg-blue-50/20" colSpan="4">Semestre 1</th>
              <th className="p-4 text-center border-x border-gray-100 bg-orange-50/20" colSpan="4">Semestre 2</th>
              <th className="p-6 text-center" rowSpan="2">Stage</th>
            </tr>
            <tr className="text-[11px] font-black uppercase text-center bg-white border-b border-gray-100">
              {colonnes.map(code => (
                <th key={code} className={`p-2 ${code.includes('TH') ? 'text-blue-600' : 'text-orange-500'}`}>{code}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {stagiaires.map((stg) => (
              <tr key={stg.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-6 font-bold text-gray-700 uppercase text-sm">{stg.nomComplet}</td>
                {colonnes.map((code) => (
                  <td key={code} className="p-2 text-center">
                    <input
                      type="number" step="0.25"
                      value={saisies[`${stg.id}-${code.toUpperCase()}`] || ''}
                      className="w-14 h-10 border border-gray-200 rounded-xl text-center font-bold focus:border-[#f97316] outline-none shadow-sm"
                      onChange={(e) => handleInputChange(stg.id, code, e.target.value)}
                    />
                  </td>
                ))}
                <td className="p-6 text-center">
                  <input
                    type="number" step="0.25"
                    value={saisies[`${stg.id}-STAGE`] || ''}
                    className="w-16 h-10 border-2 border-orange-100 rounded-xl text-center font-bold focus:border-[#f97316] outline-none bg-orange-50/10"
                    onChange={(e) => handleInputChange(stg.id, 'STAGE', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleValider}
          disabled={isSaving}
          className={`${isSaving ? 'bg-gray-400' : 'bg-[#47c18e]'} text-white px-12 py-3.5 rounded-2xl font-black shadow-lg flex items-center gap-2 hover:scale-105 transition-all`}
        >
          {isSaving ? "Enregistrement..." : <><Check size={24} /> Valider l'enregistrement</>}
        </button>
      </div>
    </div>
  );
};

export default NotesBranchePage;