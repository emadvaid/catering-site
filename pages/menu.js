import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart, cart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchMenu() {
      const response = await fetch('/api/menu');
      const data = await response.json();
      setMenuItems(data);
      setLoading(false);
    }
    fetchMenu();
  }, []);

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];
  
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const isInCart = (itemId) => {
    return cart.some((item) => item.id === itemId);
  };

  const handleAddToCart = (item) => {
    if (!session) {
      setShowLoginModal(true);
      return;
    }
    addToCart(item);
  };

  const handleHeartClick = (e, item) => {
    e.stopPropagation();
    if (!session) {
      setShowLoginModal(true);
      return;
    }
    addToCart(item);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Menu</h1>
        
        {/* Category Filter */}
        {!loading && (
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {cat.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        )}
        
        {loading ? (
          <p className="text-center text-gray-600">Loading menu...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Image */}
                <div className="relative h-56">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white text-6xl">
                      🍽️
                    </div>
                  )}
                  
                  {/* Heart Icon */}
                  <button
                    onClick={(e) => handleHeartClick(e, item)}
                    className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition transform"
                  >
                    {isInCart(item.id) ? (
                      <FaHeart className="text-red-600" size={24} />
                    ) : (
                      <FaRegHeart className="text-gray-400" size={24} />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                  {item.price ? (
                    <p className="text-3xl font-bold text-red-600 mb-4">${item.price.toFixed(2)}</p>
                  ) : (
                    <p className="text-lg text-gray-500 mb-4 italic">Contact for pricing</p>
                  )}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    {isInCart(item.id) ? 'Added to Cart ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={24} />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Sign In Required</h2>
              <p className="text-gray-600 mb-8">
                Please sign in or create an account to add items to your favorites and cart.
              </p>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => router.push('/login')}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="w-full bg-white border-2 border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg font-semibold hover:bg-indigo-50 transition"
                >
                  Create New Account
                </button>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-full text-gray-600 py-2 hover:text-gray-800 transition"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
