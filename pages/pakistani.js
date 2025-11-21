import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const pakistaniMenu = [
  { id: 1, name: 'Chicken Biryani', desc: 'Aromatic rice layered with spiced chicken.', price: '$13.50' },
  { id: 2, name: 'Beef Karahi', desc: 'Wok-style beef with tomatoes and spices.', price: '$14.00' },
  { id: 3, name: 'Seekh Kebab', desc: 'Skewered spiced ground meat, grilled.', price: '$3.50' },
  { id: 4, name: 'Naan Basket', desc: 'Assorted traditional breads.', price: '$2.50' },
  { id: 5, name: 'Raita', desc: 'Yogurt with cucumber and spices.', price: '$1.50' },
]

export default function Pakistani(){
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Pakistani Catering — Friend's Catering</title>
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <img src="https://images.unsplash.com/photo-1604908177079-3a79b4f0c9d6?w=1200&q=80&auto=format&fit=crop" alt="Pakistani catering" className="w-full h-64 object-cover rounded" />
            <h1 className="text-3xl font-bold mt-6">Karahi & Kebab Pakistani Catering</h1>
            <p className="text-gray-700 mt-3">We offer authentic Pakistani flavors prepared with traditional spices and halal protein options — perfect for weddings, corporate events, and family gatherings.</p>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Menu</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {pakistaniMenu.map(it => (
                  <div key={it.id} className="p-4 border rounded">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{it.name}</h3>
                      <div className="font-bold">{it.price}</div>
                    </div>
                    <p className="text-sm text-gray-600">{it.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="p-4 border rounded">
            <div className="text-lg font-semibold">Details</div>
            <div className="mt-3 text-sm text-gray-700">Rating: ★ 4.9</div>
            <div className="mt-1 text-sm text-gray-700">Minimum order: $150</div>
            <div className="mt-1 text-sm text-gray-700">Delivery fee: $30+</div>
            <a href="/contact" className="block mt-4 bg-green-600 text-white text-center px-4 py-2 rounded">Request Quote</a>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
