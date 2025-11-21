import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'

function fetchWithRole(url, opts={}){
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : ''
  opts.headers = Object.assign({}, opts.headers, { 'x-role': role })
  return fetch(url, opts)
}

export default function OwnerIndex(){
  const router = useRouter()
  const [stats, setStats] = useState(null)

  useEffect(()=>{
    const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null
    if(!['owner','root'].includes(role)){
      router.replace('/login')
      return
    }

    fetchWithRole('/api/stats')
      .then(r=> r.json())
      .then(d=> setStats(d))
      .catch(()=> setStats(null))
  },[])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Owner Backoffice</h1>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Link href="/owner/menu" className="p-4 border rounded bg-white">Manage Menu</Link>
          <Link href="/owner/invoices" className="p-4 border rounded bg-white">Invoices</Link>
          <Link href="/restaurants" className="p-4 border rounded bg-white">Public Listings</Link>
        </div>

        {stats ? (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded bg-white">
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className="text-2xl font-bold mt-2">${stats.totalRevenue.toFixed(2)}</div>
              <div className="text-sm text-gray-600 mt-1">from {stats.totalOrders} orders</div>
            </div>

            <div className="p-4 border rounded bg-white">
              <div className="text-sm text-gray-500">Customers</div>
              <div className="text-2xl font-bold mt-2">{stats.customers}</div>
              <div className="text-sm text-gray-600 mt-1">unique customers</div>
            </div>

            <div className="p-4 border rounded bg-white">
              <div className="text-sm text-gray-500">Top Item (by quantity)</div>
              <div className="text-2xl font-bold mt-2">{stats.topItems && stats.topItems[0] ? stats.topItems[0].name : '—'}</div>
              <div className="text-sm text-gray-600 mt-1">{stats.topItems && stats.topItems[0] ? stats.topItems[0].qty + ' sold' : ''}</div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-600">Loading stats…</div>
        )}

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Top Selling Items</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {stats && stats.topItems && stats.topItems.length ? stats.topItems.slice(0,9).map(it=> (
              <div key={it.name} className="p-3 border rounded bg-white">
                <div className="font-semibold">{it.name}</div>
                <div className="text-sm text-gray-600">Quantity sold: {it.qty}</div>
                <div className="text-sm text-gray-600">Revenue: ${it.revenue.toFixed(2)}</div>
              </div>
            )) : <div className="text-sm text-gray-600">No item sales yet.</div>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
