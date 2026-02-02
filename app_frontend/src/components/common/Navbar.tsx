import { useState } from "react";
import { ShoppingBag, Menu, X, LogInIcon, LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/User/useAuthStore";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate()
  const {authUser, logout} = useAuthStore()
  const [isOpen, setIsOpen] = useState(false);

  const handleLoginClick = () => {
    navigate('/sign-up')
  }

  const handleLogout = async () => {

    const requestForLogout = await logout()
    if(requestForLogout.status === 200){
      console.log('Logged Out Successfully');
      toast.success(requestForLogout.message)
      navigate('/')
    }
    else{
      console.log('Logout Failed');
      toast.error(requestForLogout.message)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-md shadow-lg px-6 py-4 flex justify-between items-center rounded-b-2xl border-b border-white/20">
      {/* Logo */}
      <div className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
        Kick<span className="text-pink-400">Z</span>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-8 text-white font-medium">
        <Link className="hover:text-pink-300 transition-colors duration-300 cursor-pointer" to={"/"}>Home</Link>
        <Link className="hover:text-pink-300 transition-colors duration-300 cursor-pointer" to={"/shop"}>Shop</Link>
        <Link className="hover:text-pink-300 transition-colors duration-300 cursor-pointer" to={"/about"}>About</Link>
        <Link className="hover:text-pink-300 transition-colors duration-300 cursor-pointer" to={"/"}>Contact</Link>
        {authUser &&
          (
            <Link className="hover:text-pink-300 transition-colors duration-300 cursor-pointer" to={"/cart"}><ShoppingBag/></Link>
          )
        }
      </ul>

      {/* Auth Button - Desktop */}
      {!authUser? <div className="hidden md:block">
        <button
          onClick={handleLoginClick}
          className="flex items-center gap-2 bg-white text-pink-600 hover:bg-pink-600 hover:text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
        >
          <LogInIcon />
        </button>
      </div>: <div className="hidden md:block">
        <button onClick={handleLogout} className="flex items-center gap-2 bg-white text-pink-600 hover:bg-pink-600 hover:text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold">
          <LogOutIcon/>
        </button>
      </div>}

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        {!authUser? <button  onClick={handleLoginClick} className="bg-white text-pink-600 hover:bg-pink-600 hover:text-white p-2 rounded-full shadow-lg transition-all duration-300">
          <LogInIcon size={20} />
        </button>:
        <button onClick={handleLogout} className="bg-white text-pink-600 hover:bg-pink-600 hover:text-white p-2 rounded-full shadow-lg transition-all duration-300">
          <LogOutIcon/>
        </button>}
        <button
          className="text-white hover:text-pink-300 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-lg md:hidden flex flex-col items-center space-y-6 py-6 text-white font-medium animate-fadeIn">
          <Link className="list-none hover:text-pink-300 cursor-pointer" to={"/"}>Home</Link>
          <Link className="list-none hover:text-pink-300 cursor-pointer" to={"/shop"}>Shop</Link>
          <Link className="list-none hover:text-pink-300 cursor-pointer" to={"/about"}>About</Link>
          <Link className="list-none hover:text-pink-300 cursor-pointer" to={"/"}>Contact</Link>
          {authUser &&
            (
              <Link className="list-none hover:text-pink-300 cursor-pointer" to={"/cart"}><ShoppingBag/></Link>
            )
          }
        </div>
      )}
    </nav>
  );
}

export default Navbar;
