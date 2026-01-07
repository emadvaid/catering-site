import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact(){
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">Get in Touch</h1>
          <p className="text-lg text-gray-700 mb-8">Ready to plan your event? Fill out the form below and our team will contact you within 24 hours to discuss your catering needs.</p>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <form onSubmit={(e)=>{ e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                <input name="name" required className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="John Doe" />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input name="email" type="email" required className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input name="phone" type="tel" className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="(555) 555-5555" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Event Date</label>
                  <input name="date" type="date" className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Number of Guests</label>
                  <input name="guests" type="number" className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="50" />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Event Type</label>
                <select name="eventType" className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-600">
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="private">Private Party</option>
                  <option value="conference">Conference</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Cuisine Preferences</label>
                <input name="cuisine" className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="e.g., Mediterranean, Turkish, American BBQ" />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Additional Details</label>
                <textarea name="message" rows={5} className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="Tell us about your event, dietary restrictions, special requests, etc." />
              </div>
              
              <button className="w-full bg-red-600 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition shadow-lg">
                Submit Inquiry
              </button>
            </form>

            {submitted && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-semibold">✓ Thank you for your inquiry!</p>
                <p className="text-green-600 text-sm mt-1">Our team will review your request and contact you within 24 hours.</p>
              </div>
            )}
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-gray-600">(555) 555-5555</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">✉️</div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-gray-600">info@kababhutcatering.com</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">⏰</div>
              <h3 className="font-semibold mb-1">Hours</h3>
              <p className="text-gray-600">Mon-Sat: 9AM-6PM</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
