import {useState, useMemo} from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RestaurantCard from '../components/RestaurantCard'
import caterers from '../data/caterers'

export default function Restaurants(){
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const perPage = 6

  const categories = useMemo(()=>{
    const set = new Set(['All'])
    caterers.forEach(c=> c.categories?.forEach(cat=>set.add(cat)))
    return Array.from(set)
  },[])

  const filtered = caterers.filter(c=>{
    if(category !== 'All' && !(c.categories||[]).includes(category)) return false
    if(q && !c.name.toLowerCase().includes(q.toLowerCase()) && !c.desc.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  const total = filtered.length
  const pages = Math.max(1, Math.ceil(total / perPage))
  const paged = filtered.slice((page-1)*perPage, page*perPage)

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Find Caterers — Friend's Catering</title>
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Browse Caterers</h1>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <input value={q} onChange={e=>{ setQ(e.target.value); setPage(1) }} placeholder="Search restaurants, cuisines, dishes" className="border rounded p-2 w-72" />
            <select value={category} onChange={e=>{ setCategory(e.target.value); setPage(1) }} className="border rounded p-2">
              {categories.map(cat=> <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="text-sm text-gray-600">Showing {total} result{total===1? '':'s'}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paged.map(r=> <RestaurantCard key={r.id} r={r} />)}
        </div>

        <div className="mt-8 flex justify-center items-center gap-2">
          <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
          <div className="px-3 py-1">Page {page} / {pages}</div>
          <button disabled={page>=pages} onClick={()=>setPage(p=>Math.min(pages,p+1))} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
