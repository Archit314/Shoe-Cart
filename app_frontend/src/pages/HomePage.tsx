// import React from "react";
// import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

import { useEffect, useState } from "react";
import toast from "react-hot-toast"
import { Link } from "react-router-dom";

import { useCategoryStore } from "../store/Category/useCategoryStore";
import { useBrandStore } from "../store/Brand/useBrandStore";
import { useProductStore } from "../store/Product/useProductStore";

// const featuredProducts = [
//   { id: 1, name: "Air Max 270", price: "$120", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//   { id: 2, name: "Jordan Retro", price: "$150", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//   { id: 3, name: "Yeezy Boost", price: "$200", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//   { id: 4, name: "Classic Converse", price: "$90", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
// ];

function HomePage() {

  const {getCategories} = useCategoryStore()
  const {getBrands} = useBrandStore()
  const {getProducts} = useProductStore()
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([] as any[])
  
  useEffect(() => {
console.log('url');
console.log(import.meta.env.VITE_API_BASE_URL);


    const fetchCategories = async () => {
      const gotResponse = await getCategories()
      console.log(gotResponse);
      
      if(gotResponse.status !== 200){
        toast.error(gotResponse.message)
      }
      else{
        toast.success(gotResponse.message)
        setCategories(gotResponse.data)
      }
    }

    const fetchBrands = async () => {
      const gotResponse = await getBrands()

      if(gotResponse.status !== 200){
        toast.error(gotResponse.message)
      }
      else{
        toast.success(gotResponse.message)
        setBrands(gotResponse.data)
      }
    }

    const fetchFeaturedProducts = async () => {
      const gotResponse = await getProducts()

      if(gotResponse.status !== 200){
        toast.error(gotResponse.message)
      }
      else{
        toast.success(gotResponse.message)
        setFeaturedProducts(gotResponse.data)
      }
    }

    fetchCategories()
    fetchBrands()
    fetchFeaturedProducts()

  }, [])

  return (
    <div className="min-h-screen text-white flex flex-col justify-between relative overflow-hidden">
      
      {/* Main Content */}
      <main className="px-6 md:px-20 py-12 flex flex-col gap-24 relative z-10">

        {/* Floating Background Circles */}
        <div className="absolute w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl -top-40 -left-20 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl -bottom-40 right-0 animate-pulse delay-2000"></div>
        
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-16 w-full">
          <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug md:leading-tight drop-shadow-lg">
              Step Into{" "}
              <span className="bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">
                Your Style
              </span>
            </h1>
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-lg mx-auto md:mx-0">
              Discover the latest sneakers and exclusive designs. Upgrade your shoe game today!
            </p>
            <button className="px-6 sm:px-8 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 hover:scale-105 rounded-full font-bold shadow-lg transition-transform duration-300">
              Shop Now
            </button>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <div className="w-64 sm:w-72 md:w-[350px] lg:w-[400px] h-64 sm:h-72 md:h-[350px] lg:h-[400px] bg-white/10 rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-3 hover:scale-105 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Sneaker"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Categories</h2>
            <button className="flex items-center gap-2 text-white/80 hover:text-white bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full transition">
              View More
              <Link to={'/categories'} className="text-lg">→</Link>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {categories.map((cat: {id: string, media: {url: string}[], name: string}) => (
              <div
                key={cat.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col items-center hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-transform duration-300 cursor-pointer"
              >
                <div className="w-20 h-20 mb-2 rounded-lg overflow-hidden bg-white/20 flex items-center justify-center">
                  <img src={cat.media[0].url} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-semibold">{cat.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProducts.map((product: {id: string, productVariants: {price: string, media: {url: string}[]}[], name: string}) => (
              <div
                key={product.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-transform duration-300"
              >
                <div className="w-36 h-36 mb-4 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={product.productVariants[0].media[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-pink-300 font-bold mb-4">{product.productVariants[0].price}</p>
                <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 hover:scale-105 rounded-full font-bold shadow-lg transition-transform duration-300">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Brands Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Brands</h2>
            <button className="flex items-center gap-2 text-white/80 hover:text-white bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full transition">
              View More
              <Link to={'/brands'} className="text-lg">→</Link>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {brands.map((brand: {id: string, media: {url: string}[], name:string}) => (
              <div
                key={brand.id}
                className="w-28 h-28 flex items-center justify-center bg-white/10 backdrop-blur-lg rounded-full p-4 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-transform duration-300 cursor-pointer"
              >
                <img
                  src={brand.media[0].url}
                  alt={brand.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}

export default HomePage;
