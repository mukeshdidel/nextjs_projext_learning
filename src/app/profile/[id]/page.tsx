import React from 'react'

const UserProfile = ({params}: any) => {



  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p className='text-4xl'>profile page <span className='p-2 rounded text-yellow-300' >{params.id}</span></p>
    </div>
  )
}

export default UserProfile
