import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { FaSearch, FaMapMarkerAlt, FaCheckCircle, FaStar } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getCurrentLocation } from '../lib/nativeFeatures'

export default function Home() {
  const [location, setLocation] = useState('')
  const [headcount, setHeadcount] = useState('')
  const [gettingLocation, setGettingLocation] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    // Redirect to menu with search params
    window.location.href = `/menu?location=${location}&headcount=${headcount}`
  }

  const handleGetLocation = async () => {
    setGettingLocation(true)
    try {
      const coords = await getCurrentLocation()
      if (coords) {
        // Simple reverse geocode (in production, use Google Maps API)
        setLocation(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`)
      }
    } catch (error) {
      console.error('Location error:', error)
      alert('Could not get location. Please enter manually.')
    }
    setGettingLocation(false)
  }

  return (
    <>
      <Head>
        <title>Kabab Hut Catering - Authentic Pakistani & Indian Cuisine</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" />
      </Head>

      <Header />

      <main>
        {/* Hero Section with Search */}
        <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-red-700 py-24 md:py-32">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Desi Catering for Every Occasion
              </h1>
              <p className="text-xl md:text-2xl mb-10 opacity-95">
                Authentic Pakistani & Indian flavors - Biryani, Karahi, Nihari & More
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-2xl p-4 md:p-6 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter delivery address"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-16 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-800"
                    />
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={gettingLocation}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 text-sm"
                    >
                      {gettingLocation ? '📍' : '📍 GPS'}
                    </button>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      placeholder="Number of people"
                      value={headcount}
                      onChange={(e) => setHeadcount(e.target.value)}
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition shadow-lg flex items-center justify-center gap-2"
                  >
                    <FaSearch />
                    <span>Find Food</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">How It Works</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Simple steps to delicious catering</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">1</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Browse Menus</h3>
                <p className="text-gray-600">Traditional desi dishes - biryani, karahi, nihari & more</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">2</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Add to Cart</h3>
                <p className="text-gray-600">Select your favorites and customize portions</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">3</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Place Order</h3>
                <p className="text-gray-600">Confirm your delivery details and checkout</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">4</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Enjoy!</h3>
                <p className="text-gray-600">Fresh food delivered right to your event</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Dishes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Popular Dishes</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Our customers' favorites</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {[
                { name: 'Chicken Biryani', desc: 'Hyderabadi style with raita', icon: '🍚' },
                { name: 'Seekh Kebabs', desc: 'Chapli & seekh kabab platter', icon: '�串' },
                { name: 'Mutton Karahi', desc: 'Peshawari style karahi', icon: '🍛' },
                { name: 'Beef Nihari', desc: 'Slow-cooked with naan', icon: '🥘' },
                { name: 'Chicken Tikka', desc: 'Tandoori BBQ style', icon: '🍗' },
                { name: 'Haleem', desc: 'Traditional wheat & meat stew', icon: '🍲' },
                { name: 'Samosas & Pakoras', desc: 'Crispy fried appetizers', icon: '🥟' },
                { name: 'Gulab Jamun', desc: 'Sweet dessert with kheer', icon: '🍮' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/menu" className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition shadow-lg">
                View Full Menu
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Kabab Hut */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Kabab Hut?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-green-600 text-3xl" />
                </div>
                <h3 className="font-bold text-xl mb-3">Authentic Desi Taste</h3>
                <p className="text-gray-600">Traditional recipes with spices imported from Pakistan & India. Taste just like home (ghar jaisa swaad)!</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-blue-600 text-3xl" />
                </div>
                <h3 className="font-bold text-xl mb-3">Halal Certified</h3>
                <p className="text-gray-600">100% halal meat from trusted suppliers. Perfect for weddings, Eid, family gatherings & corporate events</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-orange-600 text-3xl" />
                </div>
                <h3 className="font-bold text-xl mb-3">Large Party Specialists</h3>
                <p className="text-gray-600">Experience catering 50-500+ guests for weddings, mehndi, valima & community events with professional setup</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">What Our Customers Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: 'Fatima S.', role: 'Eid Celebration', text: 'MashAllah! The nihari was outstanding and the biryani reminded me of my mother\'s cooking. Everyone asked for the caterer\'s number!', rating: 5 },
                { name: 'Ahmed K.', role: 'Walima Reception', text: 'Perfect for our wedding! Authentic desi taste, halal meat, and they handled 300 guests professionally. Highly recommend for shaadis!', rating: 5 },
                { name: 'Zainab M.', role: 'Family Dawat', text: 'Ordered for my son\'s birthday. The karahi and seekh kebabs were exactly like back home in Lahore. Will order again for sure!', rating: 5 },
              ].map((review, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                  <div>
                    <p className="font-bold text-gray-800">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Order?</h2>
            <p className="text-xl mb-8 opacity-95">Book your next dawat with authentic desi flavors - Shaadi, Eid, or any celebration!</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/menu" className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg">
                Browse Menu
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-600 transition">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
