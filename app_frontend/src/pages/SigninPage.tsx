// src/pages/SigninPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/User/useAuthStore";
import toast from "react-hot-toast";

function SigninPage() {
  const {signIn} = useAuthStore()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign In Data:", formData);
    // Add your sign-in logic here

    const requestForSignIn = await signIn(formData)
    if(requestForSignIn.status === 200){
      console.log('Signed In Successfully');
      toast.success(requestForSignIn.message)
      navigate('/')
    }
    else{
      console.log('Sign In Failed');
      toast.error(requestForSignIn.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6">
      <div className="w-full max-w-md">
        <h2 className="text-5xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="px-5 py-3 rounded-xl bg-white/20 border border-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 backdrop-blur-sm"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="px-5 py-3 rounded-xl bg-white/20 border border-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 backdrop-blur-sm"
            required
          />

          <button
            type="submit"
            className="mt-3 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 hover:scale-105 rounded-full font-bold shadow-lg transition-transform duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-white/90">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-yellow-400 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SigninPage;
