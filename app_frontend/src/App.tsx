// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Route, Routes } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import { useAuthStore } from "./store/User/useAuthStore"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"

function App() {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log(authUser)
  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading bg-primary loading-spinner loading-xl"></span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Navbar/>
      <Routes>
        <Route path="/sign-up" element={<SignupPage />}/>
        <Route path="/sign-in" element={<SigninPage />}/>
      </Routes>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
      <Footer/>
    </div>
  )
}

export default App
