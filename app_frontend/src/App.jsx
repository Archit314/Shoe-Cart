import { Routes, Route, Link } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

export default function App() {
  return (
    <div>
      <header className="container mx-auto px-4 py-5 flex items-center justify-between">
        <div className="brand">Shoe Cart</div>
        <nav className="nav-links">
          <Link to="/sign-up" className="mr-4">Sign Up</Link>
          <Link to="/sign-in">Sign In</Link>
        </nav>
      </header>
      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </main>
    </div>
  )
}
