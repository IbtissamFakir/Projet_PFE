import { PencilSquareIcon, TrashIcon, UsersIcon, InboxIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { API } from '../API/Api';
import ModifierStagiaire from './ModifierStagiaire';

function GestionTableauStagiaires({ selectedFormation }) {
    const [stagiaires, setStagiaires] = useState([]);
    const [filtre, setFiltre] = useState('valide');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stagiaireEdit, setStagiaireEdit] = useState(null);
    const [alert, setAlert] = useState(null);
    const timeoutAlerteRef = useRef(null);

    const showAlert = (data) => {
        if (timeoutAlerteRef.current) {
            clearTimeout(timeoutAlerteRef.current);
        }

        setAlert(data);

        timeoutAlerteRef.current = setTimeout(() => {
            setAlert(null);
            timeoutAlerteRef.current = null;
        }, 4000);
    };

    const chargerStagiaires = useCallback(() => {
        if (selectedFormation) {
            axios.get(`${API}/api/admin/stagiaires/${selectedFormation}`)
                .then((res) => setStagiaires(res.data))
                .catch((err) => console.error(err));
        }
    }, [selectedFormation]);

    useEffect(() => {
        chargerStagiaires();
    }, [chargerStagiaires]);

    const stagiairesFiltres = stagiaires.filter((stagiaire) => {
        if (filtre === 'valide') return stagiaire.statut === 'validé';
        if (filtre === 'attente') return stagiaire.statut === 'en attente';
        return true;
    });

    function supprimerStagiaire(id) {
        if (window.confirm('Êtes-vous sûr ? Si vous supprimez un stagiaire validé, le premier en attente prendra sa place (limite 20).')) {
            axios.delete(`${API}/api/admin/stagiaires/${id}`)
                .then((res) => {
                    chargerStagiaires();

                    showAlert({
                        type: "success",
                        message: res.data.message || "Stagiaire supprimé avec succès"
                    });
                })
                .catch((err) => {
                    showAlert({
                        type: "error",
                        message: "Erreur lors de la suppression"
                    });
                })
        }
    }
    function ouvrirModal(stagiaire) {
        setStagiaireEdit(stagiaire);
        setIsModalOpen(true);
    }

    
    return (
        <div className="w-full mt-6">
            {alert && (
                <div className="fixed left-1/2 top-6 z-[60] -translate-x-1/2 w-[90%] max-w-sm">
                    <div className={`flex items-center gap-3 rounded-xl border px-5 py-3 shadow-md backdrop-blur-md ${alert.type === "success"
                            ? "bg-slate-900/95 border-emerald-500/20 text-emerald-400"
                            : "bg-red-100 border-rose-500/20 text-red-700"
                        }`}>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${alert.type === "success"
                                ? "bg-emerald-500/10"
                                : "bg-rose-500/10"
                            }`}>
                            {alert.type === "success" ? "✓" : "!"}
                        </div>
                        <p className="text-sm font-semibold">{alert.message}</p>
                    </div>
                </div>
            )}

            {!selectedFormation ? (
                <div className="flex flex-col items-center justify-center py-20 md:py-32 bg-white rounded-3xl border border-gray-100 shadow-sm px-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-full mb-4">
                        <UsersIcon className='w-10 h-10 md:w-12 md:h-12 text-blue-400' />
                    </div>
                    <p className='text-gray-600 font-semibold text-lg'>Sélectionnez une branche</p>
                    <p className='text-gray-400 text-sm'>Choisissez une formation pour gérer ses stagiaires.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="flex overflow-x-auto border-b bg-gray-50 no-scrollbar">
                        <button
                            onClick={() => setFiltre('valide')}
                            className={`px-4 md:px-6 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${filtre === 'valide'
                                ? 'border-green-500 text-green-600 bg-white'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Stagiaires acceptés
                            <span className="ml-2 text-xs font-bold text-gray-600">
                                ({stagiaires.filter(s => s.statut === 'validé').length})
                            </span>
                        </button>

                        <button
                            onClick={() => setFiltre('attente')}
                            className={`px-4 md:px-6 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${filtre === 'attente'
                                ? 'border-orange-500 text-orange-600 bg-white'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Liste d'attente
                            <span className="ml-2 text-xs font-bold text-gray-600">
                                ({stagiaires.filter(s => s.statut === 'en attente').length})
                            </span>
                        </button>
                    </div>

                    {stagiairesFiltres.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-[0.1em]">
                                    <tr>
                                        <th className="px-4 md:px-6 py-4 text-left">Stagiaire</th>
                                        <th className="px-4 md:px-6 py-4 text-left">Naissance</th>
                                        <th className="px-4 md:px-6 py-4 text-left">Lieu</th>
                                        <th className="px-4 md:px-6 py-4 text-left">Téléphone</th>
                                        <th className="px-4 md:px-6 py-4 text-left text-emerald-600">Inscription</th>
                                        <th className="px-4 md:px-6 py-4 text-left text-red-500">Interruption</th>
                                        <th className="px-4 md:px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {stagiairesFiltres.map((stagiaire) => (
                                        <tr key={stagiaire.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 md:px-6 py-4 font-bold text-gray-800 whitespace-nowrap text-sm">{stagiaire.nom} {stagiaire.prenom}</td>
                                            <td className="px-4 md:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{stagiaire.dateDeNaissance}</td>
                                            <td className="px-4 md:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{stagiaire.lieuDeNaissance}</td>
                                            <td className="px-4 md:px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{stagiaire.numTel}</td>
                                            <td className="px-4 md:px-6 py-4 text-sm font-semibold text-emerald-600 whitespace-nowrap">{stagiaire.dateInscription}</td>
                                            <td className="px-4 md:px-6 py-4 text-sm text-red-500 font-semibold whitespace-nowrap">{stagiaire.dateInterruption || '-'}</td>
                                            <td className="px-4 md:px-6 py-4 text-center">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-lg transition"
                                                        onClick={() => ouvrirModal(stagiaire)}
                                                    >
                                                        <PencilSquareIcon className='w-4 h-4' />
                                                    </button>
                                                    <button
                                                        className="p-2 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg transition"
                                                        onClick={() => supprimerStagiaire(stagiaire.id)}
                                                    >
                                                        <TrashIcon className='w-4 h-4' />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                            <InboxIcon className="w-16 h-16 mb-4 opacity-10" />
                            <p className="font-semibold text-gray-500 text-lg">Liste vide</p>
                        </div>
                    )}
                </div>
            )}

            <ModifierStagiaire
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                stagiaire={stagiaireEdit}
                stagiaires={stagiaires}
                setStagiaires={setStagiaires}
            />
        </div>
    );
}

export default GestionTableauStagiaires;