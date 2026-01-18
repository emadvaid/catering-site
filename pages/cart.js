import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    if (!session) {
      // Not logged in, redirect to login
      signIn();
    } else {
      const total = getCartTotal();
      // Proceed to checkout (placeholder for now)
      alert('Checkout functionality coming soon! Your order total is $' + (total ? total.toFixed(2) : '0.00'));
      clearCart();
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
            <button
              onClick={() => router.push('/menu')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center border-b py-4 last:border-b-0">
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-orange-400 to-red-400 rounded flex items-center justify-center text-white text-3xl">
                        🍽️
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-grow ml-6">
                    <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
                    {item.price ? (
                      <p className="text-red-600 font-semibold text-lg">${parseFloat(item.price).toFixed(2)}</p>
                    ) : (
                      <p className="text-gray-500 text-sm italic">Contact for pricing</p>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 mx-6">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="w-24 text-right">
                    {item.price ? (
                      <p className="font-bold text-lg text-gray-800">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm italic">TBD</p>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Total and Checkout */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-gray-800">Total:</span>
                <span className="text-3xl font-bold text-red-600">${(getCartTotal() || 0).toFixed(2)}</span>
              </div>

              {!session && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800 text-center">
                    Please login or signup to proceed with checkout
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-red-700 transition"
              >
                {session ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-4 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
