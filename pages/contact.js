import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact(){
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-4">Contact / Booking</h1>
        <p className="text-gray-700 mb-6">Fill out the form and we'll get back within 24 hours.</p>

        <form onSubmit={(e)=>{ e.preventDefault(); setSubmitted(true); }} className="max-w-lg">
          <label className="block mb-2">Name
            <input name="name" required className="block w-full border rounded p-2 mt-1" />
          </label>
          <label className="block mb-2">Email
            <input name="email" type="email" required className="block w-full border rounded p-2 mt-1" />
          </label>
          <label className="block mb-2">Event Date
            <input name="date" type="date" className="block w-full border rounded p-2 mt-1" />
          </label>
          <label className="block mb-4">Message
            <textarea name="message" rows={4} className="block w-full border rounded p-2 mt-1" />
          </label>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
        </form>

        {submitted && <p className="mt-4 text-green-700">Thanks — we received your request (demo). Integrate an email/API endpoint to receive real messages.</p>}
      </main>
      <Footer />
    </div>
  )
}
