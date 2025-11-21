export default function Footer(){
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Friend's Catering — Phone: (555) 555-5555 — Email: info@example.com
      </div>
    </footer>
  )
}
