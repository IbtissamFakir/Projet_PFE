import React, { useEffect, useState } from 'react';
import { Check, FileText, Printer } from 'lucide-react';
import axios from 'axios';
import SelectBrancheNotes from './SelectBrancheNotes';

function TableauNotes() {
    const [selectBranche, setSelectBranche] = useState('');
    const [branche, setBranche] = useState([]);
    const [listeStagiaires, setListeStagiaires] = useState([]);
    const [disciplines, setDisciplines] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const handleValider = async (e) => {
        e.preventDefault();

        // On envoie TOUTES les notes pour être sûr que le back a tout
        const data = listeStagiaires.map(stg => ({
            stagiaire_id: stg.stagiaire_id,
            noteDiscipline: disciplines[stg.stagiaire_id] !== undefined
                ? Number(disciplines[stg.stagiaire_id])
                : Number(stg.noteDiscipline || 0)
        }));

        try {
            await axios.post("http://127.0.0.1:8000/api/notes-discipline", { notes: data });

            // IMPORTANT : On recharge les données du back pour avoir le calcul EXACT
            const res = await axios.get(`http://127.0.0.1:8000/api/formation/${selectBranche}/stagiaires`);
            setListeStagiaires(res.data);
            setDisciplines({}); // On vide les modifs locales car le back est à jour
            setIsSaved(true); // Pour ton bouton imprimer
        } catch (error) {
            console.error(error);
        }
    };
    // Charger les formations pour le select
    const [loaded, setLoaded] = useState(false);

useEffect(() => {
    if (loaded) {
        return  
        ;
    };

    axios.get('http://127.0.0.1:8000/api/formation')
        .then((res) => {
            setBranche(res.data);
            setLoaded(true);
        })
        .catch((err) => {
            console.error('Erreur chargement formations :', err);
        });
}, [loaded]);
    // Charger les stagiaires + notes selon la branche sélectionnée
    useEffect(() => {
        if (selectBranche) {
            setDisciplines({});
            axios.get(`http://127.0.0.1:8000/api/formation/${selectBranche}/stagiaires`)
                .then((res) => {
                    setListeStagiaires(res.data);
                })
                .catch((err) => {
                    console.error('Erreur API stagiaires :', err);
                });
        }
    }, [selectBranche]);

    // Fonction pour récupérer la moyenne d’un module
    const getModuleNote = (modules, nomModule) => {
        return (
            modules.find((m) => m.module_nom === nomModule)?.moyenneModule || '-'
        );
    };
 const imprimerBulletinStagiaire = (stagiaire_Id) => {
    // On utilise window.open pour que le PDF s'affiche dans un nouvel onglet
    window.open(`http://localhost:8000/api/releve/pdf/stagiaire/${stagiaire_Id}`, '_blank');
}
 
 const imprimerTousLesBulletins = (formation_Id) => {
    // Utilise selectBranche comme ID de formation
    window.open(`http://localhost:8000/api/releve/pdf/formation/${formation_Id}`, '_blank');
};

    return (
        <div className="m-10">
            <SelectBrancheNotes
                selectBranche={selectBranche}
                setSelectBranche={setSelectBranche}
                branche={branche}
            />

            {selectBranche === '' ? (
                <div className="w-full flex flex-col items-center mt-40">
                    <FileText className="w-12 h-12 text-gray-300" />
                    <p className="text-gray-400 mt-3 text-lg">
                        Veuillez sélectionner une branche
                    </p>
                </div>
            ) : (
                <div className="p-6">
                    <div className="max-w-7xl mx-auto  ">
                        <div className="overflow-x-auto rounded-xl  border overflow-hidden shadow-xl">
                            <table className="text-left w-full border-collapse rounded-lg overflow-hidden shadow-xl">
                                <thead>
                                <tr className="text-sm font-medium  text-gray-500 " style={{ backgroundColor: 'rgb(235, 235, 238)' }} hover:bg-gray-100>
                                    <th className="p-4 border-b text-center">Stagiaire</th>
                                    <th className="p-4 border-b text-center">Moy. Branche</th>
                                    <th className="p-4 border-b text-center">Français</th>
                                    <th className="p-4 border-b text-center">Arabe</th>
                                    <th className="p-4 border-b text-center">Activités</th>
                                    <th className="p-4 border-b text-center">Islamique</th>
                                    <th className="p-4 border-b text-center">Stage (25%)</th>
                                    <th className="p-4 border-b text-center">Discipline</th>
                                    <th className="p-4 border-b text-center">Moy. Générale</th>
                                    <th className="p-4 border-b text-center">Action</th>
                                </tr>
                                </thead>

                                <tbody className="text-slate-700">
                                    {listeStagiaires.length > 0 ? (
                                        listeStagiaires.map((stg) => (
                                           
                                            <tr
                                                key={stg.stagiaire_id}
                                                className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                                            >
                                                <td className="p-4 font-medium">
                                                    {stg.stagiaire}
                                                </td>

                                                <td className="p-4 text-center">
                                                    {stg.moyenneBranche ?? 0}
                                                </td>

                                                <td className="p-4 text-center">
                                                    {getModuleNote(
                                                        stg.moyennesParModule,
                                                        'Français'
                                                    )}
                                                </td>

                                                <td className="p-4 text-center">
                                                    {getModuleNote(
                                                        stg.moyennesParModule,
                                                        'Arabe'
                                                    )}
                                                </td>

                                                {/* IMPORTANT : nom exact venant de Laravel */}
                                                <td className="p-4 text-center">
                                                    {getModuleNote(
                                                        stg.moyennesParModule,
                                                        'Activités paralléles'
                                                    )}
                                                </td>

                                                {/* IMPORTANT : nom exact venant de Laravel */}
                                                <td className="p-4 text-center">
                                                    {getModuleNote(
                                                        stg.moyennesParModule,
                                                        'Education islamique'
                                                    )}
                                                </td>

                                                <td className="p-4 text-center">
                                                    {stg.noteStage ?? '-'}
                                                </td>

                                                <td className="p-4 text-center">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="20"
                                                        // On vérifie si une modification locale existe, sinon on affiche la note initiale
                                                        value={disciplines[stg.stagiaire_id] ?? stg.noteDiscipline ?? ""}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            setDisciplines((prev) => ({
                                                                ...prev,
                                                                [stg.stagiaire_id]: value, // Seul cet ID sera mis à jour
                                                            }));
                                                        }}
                                                        className="w-16 p-1 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-cyan-600 outline-none"
                                                    />
                                                </td>

                                                <td className="p-4 text-center font-bold text-blue-600">
                                                    {stg.moyenneGenerale || "0.00"}
                                                </td>

                                                <td className="p-4 text-center">
                                                    <button>
                                                        <Printer
                                                            size={19}
                                                            className={`${isSaved ? "text-blue-500" : "text-indigo-200"}`}
                                                            onClick={() => imprimerBulletinStagiaire(stg.stagiaire_id)}
                                                            disabled={!isSaved}
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="10"
                                                className="text-center p-8 text-gray-400"
                                            >
                                                Aucun stagiaire trouvé
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 flex justify-end gap-3 mt-3">
                            <button onClick={handleValider}
                                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-all">
                                <Check size={18} />
                                Valider
                            </button>

                            <button 
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all text-white ${isSaved ? "bg-indigo-600" : "bg-indigo-200"}`}
                                disabled={!isSaved}
                                onClick={() => imprimerTousLesBulletins(selectBranche)}
                                >
                                <Printer size={18}
                                />
                                Imprimer tout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TableauNotes;