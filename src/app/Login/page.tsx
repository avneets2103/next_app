"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = () =>{

  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {/* <h1>Login</h1> */}
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
            Login
        </button>
        <Link href="/signup">New User? SignUp</Link>
      </div>
    </>
  );
}

export default Login;
