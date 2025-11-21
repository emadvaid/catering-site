import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function fetchWithRole(url, opts={}){
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : ''
  opts.headers = Object.assign({}, opts.headers, { 'content-type': 'application/json', 'x-role': role })
  return fetch(url, opts)
}

export default function OwnerInvoices(){
  const [invoices, setInvoices] = useState([])
  const [form, setForm] = useState({ customer: '', itemsText: '' })

  useEffect(()=>{ load() },[])

  async function load(){
    const res = await fetchWithRole('/api/invoices')
    const data = await res.json()
    setInvoices(data||[])
  }

  async function send(e){
    e.preventDefault()
    // itemsText expected format: name:qty:unitPrice, one per line
    const lines = (form.itemsText || '').split('\n').map(l=>l.trim()).filter(Boolean)
    const items = lines.map(l=>{
      const [name,qty,unitPrice] = l.split(':')
      return { name: name.trim(), qty: parseFloat(qty)||1, unitPrice: parseFloat(unitPrice)||0 }
    })
    const total = items.reduce((s,it)=> s + (it.qty * it.unitPrice), 0)
    const payload = { customer: form.customer, items, total }
    await fetchWithRole('/api/invoices', { method: 'POST', body: JSON.stringify(payload) })
    setForm({ customer: '', itemsText: '' })
    load()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Invoices</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold mb-2">Existing</h2>
            <div className="space-y-3">
              {invoices.map(inv=> (
                <div key={inv.id} className="p-3 border rounded bg-white">
                  <div className="flex justify-between"><div className="font-semibold">{inv.customer}</div><div className="text-sm text-gray-600">${inv.total}</div></div>
                  <div className="text-sm text-gray-600">Status: {inv.status}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Create Invoice</h2>
            <form onSubmit={send} className="space-y-3">
              <label className="block">Customer
                <input value={form.customer} onChange={e=>setForm({...form, customer: e.target.value})} className="block w-full border rounded p-2 mt-1" />
              </label>
              <label className="block">Items (one per line: name:qty:unitPrice)
                <textarea value={form.itemsText} onChange={e=>setForm({...form, itemsText: e.target.value})} rows={6} className="block w-full border rounded p-2 mt-1" />
              </label>
              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded">Send Invoice</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
