import { UsersIcon } from "@heroicons/react/16/solid";
import {
  AcademicCapIcon,
  BookOpenIcon,
  H1Icon,
  UserGroupIcon,
  UserIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

import axios from 'axios';
import { API } from "../API/Api";
import ListesBranches from "./ListesBranches";
function Dashboard() {
  const [statistiques,setStatistiques]=useState([]);
  // console.log(axios);
  
  useEffect(()=>{
        axios.get(API+'/api/admin/statistiques')
        .then(response=>setStatistiques(response.data))
  },[statistiques]);
  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500 font-normal mt-2">
        Vue d'ensemble du centre Al Fadl
      </p>

      <div className="grid grid-cols-3 gap-6 mt-5 ml-16 ">


        <div className="bg-white rounded-xl shadow-lg w-56 border border-gray-100 overflow-hidden relative">
          <div className="h-2 w-full bg-blue-400"></div>
          <div className="p-4 flex items-center">

            <div className="bg-blue-400 p-2 rounded-xl text-white mr-4 ml-3 mt-1">
              <UsersIcon className="w-6 h-8" />
            </div>

       
            <div>
              <p className="text-clip  font-bold text-gray-500 ml-2">
                Total
                <br />
                Stagiaires
              </p>
              <p className="text-2xl font-bold text-gray-800 ml-2">{statistiques.stagiaires}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg w-56 border border-gray-100 overflow-hidden relative">
          <div className="h-2 w-full bg-orange-400"></div>
          <div className="p-4 flex items-center">
          
            <div className="bg-orange-400 p-2 rounded-xl text-white mr-4 ml-3 mt-1">
              <AcademicCapIcon className="w-6 h-8" />
            </div>

         
            <div>
              <p className="text-clip  font-bold text-gray-500 ml-2">
                Total
                <br />
                Formateurs
              </p>
              <p className="text-2xl font-bold text-gray-800 ml-2">{statistiques.formateurs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg w-56 border border-gray-100 overflow-hidden relative">
          <div className="h-2 w-full bg-green-400"></div>

          <div className="p-4 flex items-center">

            <div className="bg-green-400 p-2 rounded-xl text-white mr-4">
              <BookOpenIcon className="w-6 h-6" />
            </div>

            <div>
              <p className="font-bold text-gray-500 leading-tight">
                Total
                <br />
                Branches
              </p>
              <p className="text-2xl font-bold text-gray-800">{statistiques.formations}</p>
            </div>
          </div>
        </div>
      </div>
      <ListesBranches/>
    </div>
  );
}

export default Dashboard;
