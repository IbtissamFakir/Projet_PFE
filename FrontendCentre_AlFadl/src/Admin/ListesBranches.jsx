import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../API/Api';
import Loading from './Loading';

// Import des images...
import ConfectionCouture from '../assets/iconsConfectionCouture.png';
import ConstructionBalles from '../assets/iconsConstructionBalles.png';
import CuisinePâtisserie from '../assets/iconsCuisinePâtisserie.png';
import RasageMasculin from '../assets/iconsRasagemasculin.png';
import RasageFeminin from '../assets/iconsRasage feminin.png';
import Informatique from '../assets/iconsInformatique.png';
import ÉlectricitéBâtiment from '../assets/iconsÉlectricitéBâtiment.png';

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
    };

    const couleursBorders = {
        'Confection et couture': 'bg-purple-800',
        'Rasage masculin': 'bg-blue-900',
        'Rasage féminin': 'bg-pink-500',
        'Électricité du bâtiment': 'bg-yellow-400',
        'Construction de balles': 'bg-blue-700',
        'Informatique': 'bg-green-700',
        'Cuisine et pâtisserie': 'bg-orange-600',
    };

    return (
        <div className="mt-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Branches</h1>

            {loading ? (
                <Loading />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listesBranches.map((branche, index) => {
                        const icon = icons[branche.formation];
                        const couleurBg = couleursBorders[branche.formation] || 'bg-gray-400';
                        
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-gray-100 w-full overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className={`h-2 w-full ${couleurBg}`}></div>
                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <img src={icon} alt="" className="w-10 h-10 object-contain" />
                                        <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                                            {branche.formation}
                                        </h3>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-400 font-bold uppercase">Formateur</span>
                                            <span className="text-gray-700 font-bold">{branche.formateur}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-400 font-bold uppercase">Stagiaires</span>
                                            <span className="font-bold text-sm text-blue-500">
                                                {branche.nombreStagaires} <span className="text-gray-300">/ 20</span>
                                            </span>
                                        </div>
                                        
                                      
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ListesBranches;