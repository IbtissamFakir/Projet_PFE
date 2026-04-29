import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API } from '../API/Api';

import ConfectionCouture from '../assets/iconsConfectionCouture.png';
import ConstructionBalles from '../assets/iconsConstructionBalles.png'
import CuisinePâtisserie from '../assets/iconsCuisinePâtisserie.png'
import RasageMasculin from '../assets/iconsRasagemasculin.png'
import RasageFeminin from '../assets/iconsRasage feminin.png'
import Informatique from '../assets/iconsInformatique.png'
import ÉlectricitéBâtiment from '../assets/iconsÉlectricitéBâtiment.png'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import GestionTableauStagiaires from './GestionTableauStagiaires';

function GestionListesBranches() {

    const [listesBranches, setListesBranches] = useState([]);
    const [loading, setLoading] = useState(true);

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 4;
    const [selectedFormation, setSelectedFormation] = useState(null)

    useEffect(() => {
        axios.get(API + '/api/admin/formations')
            .then((res) => setListesBranches(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);


    const handleScroll = (direction) => {
        if (direction === 'right') {
            if (startIndex + itemsPerPage < listesBranches.length) {
                setStartIndex(startIndex + itemsPerPage);
            }
        } else {
            if (startIndex - itemsPerPage >= 0) {
                setStartIndex(startIndex - itemsPerPage);
            }
        }
    };

    const icons = {
        'Confection et couture': ConfectionCouture,
        'Rasage masculin': RasageMasculin,
        'Rasage féminin': RasageFeminin,
        'Électricité du bâtiment': ÉlectricitéBâtiment,
        'Construction de balles': ConstructionBalles,
        'Informatique': Informatique,
        'Cuisine et pâtisserie': CuisinePâtisserie,
    }

    const couleursBorders = {
        'Confection et couture': 'h-2 w-full bg-purple-800',
        'Rasage masculin': 'h-2 w-full bg-blue-900',
        'Rasage féminin': 'h-2 w-full bg-pink-500',
        'Électricité du bâtiment': 'h-2 w-full bg-yellow-400',
        'Construction de balles': 'h-2 w-full bg-blue-700',
        'Informatique': 'h-2 w-full bg-green-700',
        'Cuisine et pâtisserie': 'h-2 w-full bg-orange-600',
    }

    return (
        <div className="ml-64 p-6">

            <h1 className="text-2xl font-bold text-gray-800 mt-4">Gestion des stagiaires</h1>
            <p>Gérer les stagiaires par branche</p>

            {loading ? (
                <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950/30 ml-52">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="p-6">
                    <div className="relative w-full flex items-center">

                
                       
                        <button
                            onClick={() => handleScroll('left')}
                            className="absolute left-0 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow"
                        >
                           <ChevronLeftIcon/>
                        </button>

                        <div className="flex gap-8 mx-auto">

                            {listesBranches
                                .slice(startIndex, startIndex + itemsPerPage)
                                .map((branche, index) => {

                                    const icon = icons[branche.formation];
                                    const couleurBorder = couleursBorders[branche.formation];

                                    return (
                                        <div
                                            key={index}
                                            onClick={()=>{
                                                console.log(branche);
                                                setSelectedFormation(branche.formation_id);
                                            }}
                                            className="w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                                        >
                                            <div className={couleurBorder}></div>

                                            <div className="p-4">

                                                <div className="flex items-center gap-3 mb-3">
                                                    <img src={icon} alt="" className="w-10" />

                                                    <h3 className="text-sm font-bold text-gray-800">
                                                        {branche.formation}
                                                    </h3>
                                                </div>

                                                <p className="text-xs text-gray-400 flex justify-between font-bold">
                                                    <span className="text-sm text-blue-500">
                                                        {branche.nombreStagaires} inscrits
                                                    </span>
                                                </p>

                                            </div>
                                        </div>
                                    )
                                })}
                        </div>

                       
                        <button
                            onClick={() => handleScroll('right')}
                            className="absolute right-0 z-10 inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-white shadow"
                        >
                            <ChevronRightIcon/>
                            
                        </button>

                    </div>
                </div>
            )}

           <GestionTableauStagiaires selectedFormation={selectedFormation}/>
        </div>
    )
}

export default GestionListesBranches;