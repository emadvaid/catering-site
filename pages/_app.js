import { SessionProvider, useSession } from 'next-auth/react';
import { CartProvider } from '../context/CartContext';
import { useEffect } from 'react';
import { initPushNotifications } from '../lib/nativeFeatures';
import '../styles/globals.css';

function AppContent({ Component, pageProps }) {
  const { data: session } = useSession();

  useEffect(() => {
    // Force enable scrolling in Capacitor WebView
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'visible';
      document.body.style.height = 'auto';
      document.body.style.position = 'relative';
      document.documentElement.style.overflow = 'visible';
      document.documentElement.style.height = 'auto';
      
      // Force reflow
      setTimeout(() => {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
      }, 100);

      // Initialize push notifications when user logs in (only in browser)
      if (session?.user) {
        initPushNotifications().catch(err => {
          console.log('Push notifications not available:', err);
        });
      }
    }
  }, [session]);

  return <Component {...pageProps} />;
}

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <CartProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </CartProvider>
    </SessionProvider>
  );
}
