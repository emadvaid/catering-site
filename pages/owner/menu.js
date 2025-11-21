import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function fetchWithRole(url, opts={}){
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : ''
  opts.headers = Object.assign({}, opts.headers, { 'content-type': 'application/json', 'x-role': role })
  return fetch(url, opts)
}

export default function OwnerMenu(){
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name:'', desc:'', price:'' })
  const [stats, setStats] = useState(null)

  useEffect(()=>{ load() },[])

  useEffect(()=>{ // load stats to show per-item sales
    const role = typeof window !== 'undefined' ? localStorage.getItem('role') : ''
    fetch('/api/stats', { headers: { 'x-role': role } }).then(r=>r.json()).then(d=>setStats(d)).catch(()=>setStats(null))
  },[])

  async function load(){
    const res = await fetch('/api/menu')
    const data = await res.json()
    setItems(data||[])
  }

  function startEdit(it){ setEditing(it.id); setForm({ name: it.name, desc: it.desc, price: it.price }) }
  function resetForm(){ setEditing(null); setForm({ name:'', desc:'', price:'' }) }

  async function save(e){
    e.preventDefault()
    if(editing){
      const body = { id: editing, ...form }
      await fetchWithRole('/api/menu', { method: 'PUT', body: JSON.stringify(body) })
    }else{
      await fetchWithRole('/api/menu', { method: 'POST', body: JSON.stringify(form) })
    }
    resetForm()
    load()
  }

  async function remove(id){
    if(!confirm('Delete this item?')) return
    await fetchWithRole(`/api/menu?id=${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Manage Menu</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold mb-2">Items</h2>
            <div className="space-y-3">
              {items.map(it=> (
                  <div key={it.id} className="p-3 border rounded bg-white flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{it.name} <span className="text-sm text-gray-600">${it.price}</span></div>
                      <div className="text-sm text-gray-600">{it.desc}</div>
                      {stats && stats.topItems && (
                        <div className="text-xs text-gray-500 mt-1">Sold: { (stats.topItems.find(x=>x.name === it.name)?.qty) ?? 0 }</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={()=>startEdit(it)} className="px-2 py-1 border rounded text-sm">Edit</button>
                      <button onClick={()=>remove(it.id)} className="px-2 py-1 border rounded text-sm">Delete</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">{editing ? 'Edit Item' : 'Add Item'}</h2>
            <form onSubmit={save} className="space-y-3">
              <label className="block">Name
                <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="block w-full border rounded p-2 mt-1" />
              </label>
              <label className="block">Description
                <input value={form.desc} onChange={e=>setForm({...form, desc: e.target.value})} className="block w-full border rounded p-2 mt-1" />
              </label>
              <label className="block">Price
                <input value={form.price} onChange={e=>setForm({...form, price: e.target.value})} className="block w-full border rounded p-2 mt-1" />
              </label>
              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                <button type="button" onClick={resetForm} className="px-3 py-2 border rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
