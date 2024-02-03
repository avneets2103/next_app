"use client";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setBtnDisabled(false);
    }else{
      setBtnDisabled(true);
    }
  }, [user])

  const onLogin = async () =>{
    try {
      setLoading(true);
      const response = await axios.post("api/users/Login", user);
      console.log("Login success", response.data);
      router.push(`/profile/${response.data.username}`);
    } catch (error:any) {
      console.log("Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading? "Logging In" : "Login"}</h1>
        <hr />
        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin}>
          {btnDisabled? "Enter details":"Login"}
        </button>
        <Link href="/signup">New User? SignUp</Link>
      </div>
    </>
  );
}

export default Login;
