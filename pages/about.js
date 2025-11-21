import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 mb-4">We are a small, family-owned catering company focused on fresh ingredients and friendly service. We cater events of all sizes — corporate lunches, weddings, and private parties.</p>
        <h2 className="text-2xl font-semibold mt-6">Our Promise</h2>
        <p className="text-gray-700">Punctual delivery, great taste, and thoughtful presentation. Tell us your needs and we'll take care of the rest.</p>
      </main>
      <Footer />
    </div>
  )
}
