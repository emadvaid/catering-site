import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function Header() {
  const { data: session } = useSession();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold">Kabab Hut Catering</div>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link href="/menu" className="hover:text-yellow-300 transition">Menu</Link>
          <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
          <Link href="/contact" className="hover:text-yellow-300 transition">Contact</Link>
          
          {/* Cart Icon */}
          <Link href="/cart" className="relative hover:text-yellow-300 transition">
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">{session.user.name || session.user.email}</span>
              {(session.user.role === 'owner' || session.user.role === 'root') && (
                <Link href="/dashboard/owner" className="hover:text-yellow-300">Dashboard</Link>
              )}
              <button onClick={() => signOut()} className="px-3 py-1 bg-white text-red-600 rounded hover:bg-yellow-100 transition">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-yellow-400 text-red-600 rounded font-semibold hover:bg-yellow-300 transition">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
