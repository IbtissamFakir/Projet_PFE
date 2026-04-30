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
import Loading from './Loading';

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
    
    const couleursActiveRing = {
        'Confection et couture': 'ring-purple-800 border-purple-800',
        'Rasage masculin': 'ring-blue-900 border-blue-900',
        'Rasage féminin': 'ring-pink-500 border-pink-500',
        'Électricité du bâtiment': 'ring-yellow-400 border-yellow-400',
        'Construction de balles': 'ring-blue-700 border-blue-700',
        'Informatique': 'ring-green-700 border-green-700',
        'Cuisine et pâtisserie': 'ring-orange-600 border-orange-600',
    }

    const couleursTextes = {
        'Confection et couture': 'text-purple-800',
        'Rasage masculin': 'text-blue-900',
        'Rasage féminin': 'text-pink-500',
        'Électricité du bâtiment': 'text-yellow-600',
        'Construction de balles': 'text-blue-700',
        'Informatique': 'text-green-700',
        'Cuisine et pâtisserie': 'text-orange-600',
    }

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
        <div className="ml-64 p-6 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Gestion des stagiaires</h1>

            {loading ? (
                <Loading />
            ) : (
                <div className="p-6">
                    <div className="relative w-full flex items-center">
                        <button
                            onClick={() => handleScroll('left')}
                            className="absolute left-0 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow hover:bg-gray-50"
                        >
                            <ChevronLeftIcon className="w-6 h-6" />
                        </button>

                        <div className="flex gap-8 mx-auto">
                            {listesBranches
                                .slice(startIndex, startIndex + itemsPerPage)
                                .map((branche, index) => {
                                    const icon = icons[branche.formation];
                                    const couleurBorderTop = couleursBorders[branche.formation];
                                    const activeClasses = couleursActiveRing[branche.formation];
                                    const texteColor = couleursTextes[branche.formation];

                                    const isActive = selectedFormation === branche.formation_id;

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedFormation(branche.formation_id)}
                                            className={`relative w-56 bg-white rounded-xl shadow-lg border transition-all 
                                                duration-300 cursor-pointer overflow-hidden
                                                ${isActive
                                                    ? `ring-4 ring-opacity-40 scale-105 ${activeClasses}`
                                                    : 'border-gray-100 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className={couleurBorderTop}></div>

                                            <div className="p-4">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <img src={icon} alt="" className="w-10" />
                                                    <h3 className={`text-sm font-bold ${isActive ? texteColor : 'text-gray-800'}`}>
                                                        {branche.formation}
                                                    </h3>
                                                </div>

                                                <p className="text-xs text-gray-400 flex justify-between font-bold">
                                                    <span className={`text-sm ${isActive ? texteColor : 'text-blue-500'}`}>
                                                        {branche.nombreStagaires} inscrits
                                                    </span>
                                                </p>
                                            </div>

                                            {isActive && (
                                                <div className="absolute top-4 right-2">
                                                    <span className="flex h-3 w-3">
                                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${couleurBorderTop.split(' ').pop()}`}></span>
                                                        <span className={`relative inline-flex rounded-full h-3 w-3 ${couleurBorderTop.split(' ').pop()}`}></span>
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                        </div>

                        <button
                            onClick={() => handleScroll('right')}
                            className="absolute right-0 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow hover:bg-gray-50"
                        >
                            <ChevronRightIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}

            <GestionTableauStagiaires selectedFormation={selectedFormation} />
        </div>
    )
}

export default GestionListesBranches;