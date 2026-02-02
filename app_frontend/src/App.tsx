// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import Navbar from "./components/common/Navbar"
import CategoryListPage from "./pages/Category/CategoryListPage"
import AboutPage from "./pages/AboutPage"
import Footer from "./components/common/Footer"
import BrandListPage from "./pages/Brand/BrandListPage"
import CartPage from "./pages/CartPage"
import ShopPage from "./pages/ShopPage"
import ProductDetailPage from "./pages/ProductDetailPage"
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
        <Route path="/" element={<HomePage />}/>
        <Route path="/sign-up" element={<SignupPage />}/>
        <Route path="/sign-in" element={<SigninPage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/categories" element={<CategoryListPage />}/>
        <Route path="/brands" element={<BrandListPage />}/>
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/shop" element={<ShopPage />}/>
        <Route path="/shop/category/:categoryId" element={<ShopPage />}/>
        <Route path="/shop/brand/:brandId" element={<ShopPage />}/>
        <Route path="/product/:id" element={<ProductDetailPage />}/>
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
