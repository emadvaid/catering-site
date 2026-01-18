import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function Header() {
  const { data: session } = useSession();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="bg-gradient-to-r from-gray-900 to-red-800 text-white shadow-lg" style={{ paddingTop: 'var(--safe-area-inset-top)' }}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between" style={{ paddingLeft: 'max(1rem, var(--safe-area-inset-left))', paddingRight: 'max(1rem, var(--safe-area-inset-right))' }}>
        <div className="flex items-center">
          <Link href="/" className="block">
            <Image src="/logo.png" alt="Kabab Hut Catering" height={40} width={160} priority />
          </Link>
        </div>
        <nav className="flex items-center gap-2 md:gap-6 flex-wrap justify-end">
          <Link href="/" className="text-sm md:text-base hover:text-amber-300 transition">Home</Link>
          <Link href="/packages" className="text-sm md:text-base hover:text-amber-300 transition">Packages</Link>
          <Link href="/menu" className="text-sm md:text-base hover:text-amber-300 transition">Menu</Link>
          <Link href="/about" className="hidden sm:inline text-sm md:text-base hover:text-amber-300 transition">About</Link>
          <Link href="/contact" className="hidden sm:inline text-sm md:text-base hover:text-amber-300 transition">Contact</Link>
          
          {/* Cart Icon */}
          <Link href="/cart" className="relative hover:text-amber-300 transition">
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          
          {session ? (
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <span className="text-xs md:text-sm hidden sm:inline">{session.user.name || session.user.email}</span>
              {(session.user.role === 'owner' || session.user.role === 'root') && (
                <Link href="/dashboard/owner" className="text-sm md:text-base hover:text-amber-300">Dashboard</Link>
              )}
              <button onClick={() => signOut()} className="px-2 md:px-3 py-1 text-sm md:text-base bg-white text-red-700 rounded hover:bg-amber-100 transition">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="px-3 md:px-4 py-2 text-sm md:text-base bg-amber-400 text-gray-900 rounded font-semibold hover:bg-amber-300 transition whitespace-nowrap">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
