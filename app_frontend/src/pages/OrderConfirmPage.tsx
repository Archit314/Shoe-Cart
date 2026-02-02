import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { axiosInstance } from '../lib/axios'
import { CheckCircle } from 'lucide-react'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function OrderConfirmPage() {
  const query = useQuery()
  const orderCode = query.get('order_code')
  const [order, setOrder] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPg, setShowPg] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderCode) return setLoading(false)
      try {
        const res = await axiosInstance.get(`/user/order/${orderCode}`)
        if (res.data && res.data.status === 200) setOrder(res.data.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [orderCode])

  if (loading) return <div className="p-8 text-white">Loading...</div>

  if (!order) return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">Order not found</h2>
      <Link to="/">Go back home</Link>
    </div>
  )

  const isPaid = order.payment_status && order.payment_status.toLowerCase() === 'paid'

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(order.code)
      // lightweight feedback consistent with site's simple alerts
      alert('Order code copied')
    } catch (e) {
      console.error(e)
    }
  }

  const downloadReceipt = () => {
    const blob = new Blob([JSON.stringify(order, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${order.code}-receipt.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen px-6 md:px-20 py-12 text-white relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl -top-40 -left-20 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl -bottom-40 right-0 animate-pulse delay-2000"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-white/5">
                <CheckCircle className="text-green-300" size={36} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold">{isPaid ? 'Payment Successful' : 'Order Placed'}</h1>
                <p className="text-white/80 mt-1">Order <span className="font-mono">{order.code}</span></p>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Details</h3>
                <div className="text-sm text-white/80 space-y-1">
                  <div>Placed: {new Date(order.createdAt).toLocaleString()}</div>
                  <div>Payment Method: {order.pg_name || 'Cashfree'}</div>
                  <div>Shipping: {order.shipping_address || '—'}</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Payment</h3>
                <div className="text-sm text-white/80 space-y-1">
                  <div className="text-2xl font-bold">₹{order.total_amount}</div>
                  <div className="inline-flex items-center gap-2 mt-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${isPaid ? 'bg-green-300 text-black' : 'bg-yellow-400 text-black'}`}>
                      {isPaid ? 'PAID' : (order.payment_status || 'PENDING')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowPg(s => !s)} className="px-4 py-2 rounded-lg bg-white/5">{showPg ? 'Hide' : 'Show'} gateway response</button>
                <button onClick={copyCode} className="px-4 py-2 rounded-lg bg-white/5">Copy order code</button>
                <button onClick={downloadReceipt} className="px-4 py-2 rounded-lg bg-white/5">Download receipt</button>
              </div>

              {showPg && (
                <pre className="bg-black/50 p-4 rounded text-sm mt-4 overflow-auto max-h-72">{JSON.stringify(order.pg_response || {}, null, 2)}</pre>
              )}
            </div>
          </div>

          <aside className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{order.total_amount}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
              <hr className="my-3 border-white/10" />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{order.total_amount}</span></div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link to="/" className="w-full text-center px-4 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full font-bold shadow-lg">Continue shopping</Link>
              <button onClick={() => window.print()} className="w-full px-4 py-3 border rounded-md">Print receipt</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmPage
