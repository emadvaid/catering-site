import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">About Kabab Hut Catering</h1>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Kabab Hut Catering is a premier full-service catering company specializing in international cuisine. 
            We bring together master chefs from around the world to deliver authentic flavors from Middle Eastern, 
            Turkish, Mediterranean, American, Asian, and European culinary traditions.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 text-gray-800">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To provide exceptional catering experiences that celebrate global diversity through food. We believe 
            every event deserves world-class cuisine, professional service, and attention to detail—whether it's 
            an intimate gathering of 20 or a grand celebration of 1000+ guests.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 text-gray-800">What We Offer</h2>
          <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
            <li><strong>Diverse International Menus:</strong> Middle Eastern, Turkish, Mediterranean, American BBQ, Asian fusion, and more</li>
            <li><strong>Dietary Accommodations:</strong> Halal, kosher, vegan, vegetarian, gluten-free, and allergy-conscious options</li>
            <li><strong>Premium Ingredients:</strong> Fresh, high-quality ingredients from certified suppliers</li>
            <li><strong>Professional Service:</strong> Experienced staff for setup, service, and cleanup</li>
            <li><strong>Custom Packages:</strong> Tailored menus for weddings, corporate events, conferences, and private parties</li>
          </ul>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-8 text-gray-800">Our Promise</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Punctual delivery, exceptional taste, and elegant presentation. We work closely with you to understand 
            your vision and dietary requirements, ensuring every guest enjoys a memorable culinary experience. 
            Your satisfaction is our top priority.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
