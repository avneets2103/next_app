"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setBtnDisabled(false);
    }else{
      setBtnDisabled(true);
    }
  }, [user])

  const onSignUp = async() =>{
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
      console.log("SignUp success", response.data);
      router.push("/Login");
    } catch (error) {
      console.log("SignUp failed");
      throw error;
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading? "Saving" : "SignUp"}</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="username"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="username"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onSignUp}>
          {btnDisabled? "Enter details":"SignUp"}
        </button>
        <Link href="/Login">Already a User? Login</Link>
      </div>
    </>
  );
}

export default Signup;
