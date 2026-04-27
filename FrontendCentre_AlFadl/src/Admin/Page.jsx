import React from 'react'
import { Link } from 'react-router-dom'

function Page() {
  return (
    <div className='w-1 m-auto mt-72'>
       
        <Link to={`/dashboard`}>
            Dashborad
        </Link>
    </div>
  )
}

export default Page