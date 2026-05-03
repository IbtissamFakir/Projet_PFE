import React, { useEffect, useState } from 'react'
import SortieCard from './SortieCard'
import axios from 'axios'
import SelectBranche from './SelectBranche'
import { MapPin } from 'lucide-react'

function ListeSorties() {
  const [listeSorties, setListeSorties] = useState([])
  const [selectBranche, setSelectBranche] = useState('')
  const [branche, setBranche] = useState([])


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/formation')
      .then(res => setBranche(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (selectBranche) {
      setListeSorties([])
      axios.get(`http://127.0.0.1:8000/api/formation/sorties/${selectBranche}`)
        .then(res => setListeSorties(res.data))
        .catch(err => console.log(err))
    }
  }, [selectBranche])

  return (
    <div className='m-10 '>
      <SelectBranche selectBranche={selectBranche}
        setSelectBranche={setSelectBranche}
        branche={branche}
      />
      {
        selectBranche == '' ?
          <div className='w-96 m-auto mt-40 '>
            <MapPin className="w-12 h-12 text-gray-300 ml-36" />
            <p className='text-gray-400 ml-14 mt-3 text-lg'>Veuillez sélectionner une branche </p>

          </div> :
          listeSorties.length === 0 ? (
            <p className='text-gray-500 flex items-center justify-center text-lg mt-32'>Aucune sortie pédagogique pour cette branche</p>
          ) :

            <div className='flex flex-row gap-4'>
              {
                listeSorties.map(s =>
                  <SortieCard key={s.id} sortie={s} />
                )
              }
            </div>

      }
    </div>
  )
}

export default ListeSorties
