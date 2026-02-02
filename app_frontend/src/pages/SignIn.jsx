import React, { useState } from 'react'
import { signIn } from '../services/api'

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    if (!form.email || !form.password) return 'Email and password are required.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    const clientError = validate()
    if (clientError) return setMessage({ type: 'error', text: clientError })
    try {
      setLoading(true)
      const { data } = await signIn(form)
      setMessage({ type: 'success', text: data.message })
    } catch (err) {
      const text = err?.response?.data?.message || 'Sign-in failed'
      setMessage({ type: 'error', text })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Sign In</h2>
        <p className="text-sm text-slate-500 mt-1">Welcome back — please enter your credentials.</p>
        {message && (
          <div className={`mt-4 p-3 rounded ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input id="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input id="password" name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold disabled:opacity-60" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
            <button type="button" onClick={() => setForm({ email: '', password: '' })} className="px-3 py-2 border rounded-md text-slate-700">Clear</button>
          </div>
        </form>
      </div>
    </div>
  )
}
