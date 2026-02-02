import React, { useState } from 'react'
import { signUp } from '../services/api'

export default function SignUp() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', mobileNumber: '' })
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword || !form.mobileNumber) return 'All fields are required.'
    if (form.password.length < 6) return 'Password must be at least 6 characters.'
    if (form.password !== form.confirmPassword) return 'Passwords do not match.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    const clientError = validate()
    if (clientError) return setMessage({ type: 'error', text: clientError })
    try {
      setLoading(true)
      const { data } = await signUp(form)
      setMessage({ type: 'success', text: data.message })
    } catch (err) {
      const text = err?.response?.data?.message || 'Signup failed'
      setMessage({ type: 'error', text })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Create account</h2>
        <p className="text-sm text-slate-500 mt-1">Enter your details to create a new account.</p>
        {message && (
          <div className={`mt-4 p-3 rounded ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full name</label>
            <input id="fullName" name="fullName" placeholder="Your name" value={form.fullName} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input id="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-slate-700">Mobile number</label>
            <input id="mobileNumber" name="mobileNumber" placeholder="Mobile number" value={form.mobileNumber} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input id="password" name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">Confirm password</label>
            <input id="confirmPassword" name="confirmPassword" placeholder="Confirm password" type="password" value={form.confirmPassword} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold disabled:opacity-60" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign Up'}</button>
            <button type="button" onClick={() => setForm({ fullName: '', email: '', password: '', confirmPassword: '', mobileNumber: '' })} className="px-3 py-2 border rounded-md text-slate-700">Clear</button>
          </div>
        </form>
      </div>
    </div>
  )
}
