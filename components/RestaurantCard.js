import Link from 'next/link'

export default function RestaurantCard({r}){
  return (
    <div className="border rounded overflow-hidden bg-white shadow-sm">
      <Link href={r.href ?? ('/pakistani')}> 
        <img src={r.image} alt={r.name} className="w-full h-36 object-cover" />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{r.name}</h3>
          <div className="text-sm text-gray-600">{r.distance ?? '—'}</div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="text-yellow-500">★ {r.rating ?? '4.8'}</div>
          <div className="text-gray-700 font-semibold">{r.priceRange ?? r.deliveryFee ?? ''}</div>
        </div>
      </div>
    </div>
  )
}
