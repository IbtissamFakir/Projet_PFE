import { UserPlusIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../API/Api";

function AjouterStagiaires() {
  const [champs, setChamps] = useState({});
  const [ajouterStagiaires, setAjouterStagiaires] = useState([]);
  const [formations, setFormations] = useState([]);




  useEffect(() => {
    axios.get(API + "/api/admin/formationsSelect")
      .then((res) => setFormations(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChamps({ ...champs, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(API + "/api/admin/formations/stagiaires", champs)
      .then((res) => {
        setAjouterStagiaires([...ajouterStagiaires, res.data]);
        setChamps({});
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="ml-64 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mt-16 ml-24">
        <div className="flex items-center gap-2 mb-6 mt-6 ml-16">
          <UserPlusIcon className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Nouveau Stagiaire</h3>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-x-6 gap-y-4 ml-3"
        >
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={champs?.nom || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-gray-400 px-3 py-2 text-sm shadow-sm"
            />
          </div>

          {/* Prénom */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={champs?.prenom || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-gray-400 px-3 py-2 text-sm shadow-sm"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
            <input
              type="tel"
              name="numTel"
              placeholder="Numéro de téléphone"
              value={champs?.numTel || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-gray-400 px-3 py-2 text-sm shadow-sm"
            />
          </div>

          {/* Date de naissance */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
            <input
              type="date"
              name="dateDeNaissance"
              value={champs?.dateDeNaissance || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-gray-400 px-3 py-2 text-sm shadow-sm"
            />
          </div>

       
          <div>
            <label className="block text-sm font-medium text-gray-700">Lieu de naissance</label>
           <input type="text" name="lieuDeNaissance" 
           value={champs?.lieuDeNaissance || ''}
           onChange={handleChange}
           placeholder="Entrer le lieu de naissance"
           className="mt-1 block w-full rounded-xl border border-gray-400 px-3 py-2 text-sm shadow-sm"
           />
          </div>


         
          <div>
            <label className="block text-sm font-medium text-gray-700">Date d'interruption</label>
            <input
              type="date"
              name="dateInterruption"
              value={champs?.dateInterruption || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-gray-400 px-3 py-2 text-sm shadow-sm"
            />
          </div>

          {/* Branche */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Branche</label>
            <select
              name="formation_id"
              value={champs?.formation_id || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm shadow-sm 
                focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="">Sélectionner une branche</option>
              {formations.map((formation) => (
                <option key={formation.id} value={formation.id}>
                  {formation.intitule}
                </option>
              ))}
            </select>
          </div>

          {/* Bouton */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Inscrire le stagiaire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AjouterStagiaires;
