import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
        const result = axios.post(
          "http://localhost:5000/login",
          { email, password },
          { withCredentials: true },
        );
    } catch (error) {
        console.log(error.message)
    }
  };
  return (
    <div className="h-[calc(100vh-68px)] flex items-center justify-center bg-base-300">
      <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box w-80 p-6 shadow-lg -translate-y-16">
        <legend className="fieldset-legend text-lg font-semibold">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label className="label mt-2">Password</label>
        <input
          type="password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button className="btn btn-neutral w-full mt-10" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
