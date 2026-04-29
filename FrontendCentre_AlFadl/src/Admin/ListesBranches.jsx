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



function ListesBranches() {
    const [listesBranches, setListesBranches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(API + '/api/admin/formations')
            .then((res) => setListesBranches(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

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
        <>
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Branches</h1>

            {loading ? (
                <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950/30 ml-52">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {listesBranches.map((branche, index) => {
                        const icon = icons[branche.formation];
                        const couleurBorder = couleursBorders[branche.formation]
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-gray-100 w-72 overflow-hidden hover:shadow-md transition"
                            >
                                <div className={couleurBorder}></div>

                                <div className="p-4">

                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={icon}
                                            alt={branche.formation}
                                            className="w-10"
                                        />

                                        <h3 className="text-sm font-bold text-gray-800">
                                            {branche.formation}
                                        </h3>
                                    </div>

                                    <p className="text-xs text-gray-400 mb-2 font-bold ">
                                        Formateur :
                                        <span className="text-gray-700 ml-16 font-bold ">
                                            {branche.formateur}
                                        </span>
                                    </p>

                                    <p className="text-xs text-gray-400 flex justify-between font-bold">
                                        Stagiaires
                                        <span className="font-bold text-sm text-blue-500">
                                            {branche.nombreStagaires} / 20
                                        </span>
                                    </p>

                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default ListesBranches