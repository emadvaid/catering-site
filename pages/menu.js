import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    async function fetchMenu() {
      const response = await fetch('/api/menu');
      const data = await response.json();
      setMenuItems(data);
      setLoading(false);
    }
    fetchMenu();
  }, []);

  const isInCart = (itemId) => {
    return cart.some((item) => item.id === itemId);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Menu</h1>
        
        {loading ? (
          <p className="text-center text-gray-600">Loading menu...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
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
                    onClick={() => handleAddToCart(item)}
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
                  <p className="text-3xl font-bold text-red-600 mb-4">${item.price.toFixed(2)}</p>
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
    </div>
  );
}
