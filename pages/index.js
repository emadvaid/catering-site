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
        <title>Kabab Hut Catering - International Cuisine for Every Event</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes, viewport-fit=cover" />
      </Head>

      <Header />

      <main>
        {/* Hero Section with Search */}
        <section className="relative bg-gradient-to-br from-gray-900 via-red-800 to-black py-24 md:py-32">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                World-Class Catering for Every Occasion
              </h1>
              <p className="text-xl md:text-2xl mb-10 opacity-95">
                International Cuisine from Around the Globe - Middle Eastern, Turkish, American & More
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
                    <span>Search Catering</span>
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
            <p className="text-center text-gray-600 mb-12 text-lg">Simple steps to exceptional catering</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">1</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Browse Menus</h3>
                <p className="text-gray-600">Explore diverse cuisines from around the world</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">2</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Customize Order</h3>
                <p className="text-gray-600">Select dishes and adjust portions for your event</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">3</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Confirm Details</h3>
                <p className="text-gray-600">Review delivery details and complete checkout</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">4</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Enjoy!</h3>
                <p className="text-gray-600">Professional service and delicious food at your event</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cuisine Categories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Scrollable categories */}
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {[
                  { name: 'Asian', icon: '🥢', link: '/menu?category=Asian' },
                  { name: 'BBQ', icon: '🍗', link: '/menu?category=BBQ' },
                  { name: 'Breakfast', icon: '🥞', link: '/menu?category=Breakfast' },
                  { name: 'Healthy', icon: '🥗', link: '/menu?category=Healthy' },
                  { name: 'Italian', icon: '🍝', link: '/menu?category=Italian' },
                  { name: 'Mediterranean', icon: '🥙', link: '/menu?category=Mediterranean' },
                  { name: 'Mexican', icon: '🌮', link: '/menu?category=Mexican' },
                  { name: 'Pizza', icon: '🍕', link: '/menu?category=Pizza' },
                  { name: 'Sandwiches', icon: '🥪', link: '/menu?category=Sandwiches' },
                  { name: 'Desserts', icon: '🍰', link: '/menu?category=Desserts' },
                  { name: 'More', icon: '•••', link: '/menu' },
                ].map((category, idx) => (
                  <Link 
                    key={idx} 
                    href={category.link}
                    className="flex flex-col items-center justify-center min-w-[80px] group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-200 transition">
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <span className="text-sm text-gray-700 font-medium text-center">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Dishes Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Our Specialties</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Authentic Pakistani and International Cuisine</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {[
                { name: 'Chicken Biryani', image: '/images/menu/Chicken Biryani.jpg' },
                { name: 'Tandoori Chicken', image: '/images/menu/Tandoori Chicken.jpg' },
                { name: 'Beef Nihari', image: '/images/menu/Beef Nihari.jpg' },
                { name: 'Chicken Tikka', image: '/images/menu/Chicken Tikka.jpg' },
                { name: 'Mutton Karhai', image: '/images/menu/Mutton Karhai.jpg' },
                { name: 'Samosa', image: '/images/menu/Samosa.jpg' },
                { name: 'Gulab Jamun', image: '/images/menu/Gulab Jamun.jpg' },
                { name: 'Chicken Seekh Kabab', image: '/images/menu/Chicken Seekh Kabab.jpg' },
              ].map((item, idx) => (
                <Link key={idx} href="/menu" className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base text-gray-800">{item.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/menu" className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition shadow-lg">
                View Full Menu
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Kabab Hut Catering?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-green-600 text-3xl" />
                </div>
                <h3 className="font-bold text-xl mb-3">Global Cuisine Expertise</h3>
                <p className="text-gray-600">Master chefs specializing in Middle Eastern, Turkish, Mediterranean, American, Asian and European cuisines</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-blue-600 text-3xl" />
                </div>
                <h3 className="font-bold text-xl mb-3">Premium Quality</h3>
                <p className="text-gray-600">Fresh ingredients, certified suppliers, and dietary accommodations including halal, kosher, vegan & gluten-free options</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-purple-600 text-3xl" />
                </div>
                <h3 className="font-bold text-xl mb-3">Professional Service</h3>
                <p className="text-gray-600">Experience catering events from 20 to 1000+ guests - weddings, corporate events, conferences & private parties</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-rose-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">What Our Clients Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: 'Sarah M.', role: 'Corporate Event', text: 'Outstanding service for our company conference! The Mediterranean spread was exceptional and accommodated all dietary restrictions perfectly.', rating: 5 },
                { name: 'Michael T.', role: 'Wedding Reception', text: 'Kabab Hut Catering made our wedding unforgettable! The fusion menu featuring Turkish and Italian dishes impressed all 250 guests. Highly professional!', rating: 5 },
                { name: 'Jennifer L.', role: 'Private Party', text: 'Hired them for our anniversary celebration. The quality and presentation of the international buffet exceeded expectations. Will definitely use again!', rating: 5 },
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
        <section className="py-16 bg-gradient-to-r from-gray-900 to-red-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Event?</h2>
            <p className="text-xl mb-8 opacity-95">Experience world-class catering for weddings, corporate events, and special celebrations</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/menu" className="bg-amber-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-300 transition shadow-lg">
                Browse Menu
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-700 transition">
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
