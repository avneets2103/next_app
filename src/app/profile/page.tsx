"use client";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function UserProfile(){
    const router  = useRouter();
    const [data, setData] = useState('');
    const logout = async() => {
        try {
            await axios.get('/api/users/Logout');
            console.log("Logout success");
            router.push('/Login');
        } catch (error: any) {
            console.log(error.message);
            throw error(error.message);
        }
    }
    const getUserDetails = async () =>{
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data.username);
    }
    return (
        <>
          <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>Profile</h1>
            <h2>{data}</h2>
            <hr />
            <p>Profile Page</p>
            <hr />
            <button className='bg-red-400 mt-4 hover:bg-red-600 text-white font-bold py-2 px-4 rounded' onClick={logout}>Logout</button>
            <button className='bg-blue-400 mt-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={getUserDetails}>Get user Data</button>
          </div>
        </>
    )
}
 
export default UserProfile
