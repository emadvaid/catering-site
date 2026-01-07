export default function Footer(){
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-950 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-bold mb-3">Kabab Hut Catering</h3>
            <p className="text-gray-300 text-sm">World-class international cuisine for every occasion</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-gray-300 text-sm">Phone: (555) 555-5555</p>
            <p className="text-gray-300 text-sm">Email: info@kababhutcatering.com</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <p className="text-gray-300 text-sm">Weddings • Corporate Events</p>
            <p className="text-gray-300 text-sm">Private Parties • Conferences</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Kabab Hut Catering. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
