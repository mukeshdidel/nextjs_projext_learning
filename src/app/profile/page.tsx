"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Profile = () => {
  const router = useRouter()
  const [data, setData] = useState('');
  async function logout(){
    try{
      await axios.get('/api/users/logout')
      toast.success("logout success")
      router.push('/login')

    }catch(error: any){
      console.log(error.message)
      toast.error(error.message);   }
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me')
      setData(res.data.data.id);
    } catch (error: any) {
      console.log({error: error.message})
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p>profile page</p>
        <h2><Link href={`/profile/${data && data }`}>{data}</Link></h2>
        <hr />
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
        onClick={logout}
        >
          logout
        </button>
        <button className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4'
        onClick={getUserDetails}
        >
          get user details
        </button>
    </div>
  )
}

export default Profile
