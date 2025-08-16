// D:\opal-spa-website\pages\_app.js
import { useState, useEffect, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import '../styles/globals.css';
import UpdateNotification from '../components/UpdateNotification';
import useProtectSite from '@/lib/useProtectSite';

// Service Worker Registration
/*
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.workbox = window.workbox || {};
  
  // Skip waiting for service worker updates
  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
}
*/
// ===============================================================
// Background Context
// ===============================================================
export const BackgroundContext = createContext(null);

export function BackgroundProvider({ children }) {
  const [useModernBg, setUseModernBg] = useState(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('useModernBg') === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Update body class when background changes
    if (useModernBg) {
      document.body.classList.add('modern-bg');
    } else {
      document.body.classList.remove('modern-bg');
    }
    // Save preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('useModernBg', useModernBg);
    }
  }, [useModernBg]);

  return (
    <BackgroundContext.Provider value={{ useModernBg, setUseModernBg }}>
      {children}
    </BackgroundContext.Provider>
  );
}

// ===============================================================
// Theme Context and Provider for Dark Mode
// ===============================================================
export const ThemeContext = createContext(null); // Create the context

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // Default to light

  useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme); // Use previously saved theme if exists
  } else {
    setTheme('light'); // Force light mode on first visit
  }
}, []);


  useEffect(() => {
    // Apply the 'dark' class to the html element based on theme state
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    // Save theme to localStorage whenever it changes
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
// ===============================================================
// END: NEW THEME CONTEXT AND PROVIDER FOR DARK MODE
// ===============================================================


// Service Worker Registration
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.workbox = window.workbox || {};
  window.workbox.precaching = window.workbox.precaching || {};
  
  // Skip waiting for service worker updates
/*  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  }); */
}

function MyApp({ Component, pageProps }) {
  useProtectSite();
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showBgToggle, setShowBgToggle] = useState(false);


  useEffect(() => {
    // Set a minimum loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
      setIsLoading(false);
    }, 2000);
    
    // Register service worker in production
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful');
          })
          .catch(err => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

    // Background toggle functionality removed - keeping original background only

  return (
    <ThemeProvider>
        <Head>
          <title>Opal Jhane - Luxury Spa & Wellness</title>
        <meta name="description" content="Experience ultimate relaxation and rejuvenation at Opal Jhane. Our luxury spa offers a wide range of treatments to refresh your mind, body, and soul." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#3C1F76" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#3C1F76] to-black z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative w-36 h-36 mb-8"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-white/90 to-gray-100/90 flex items-center justify-center border border-white/50 overflow-hidden shadow-lg">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <Image
                    src="/images/logo-white.png"
                    alt="Opal Spa Logo"
                    fill
                    sizes="112px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 border-4 border-[#39AD48]/30 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 border-4 border-[#BEFD73]/30 rounded-full"
                animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl font-bold text-white mb-4"
            >
              Opal Jhane
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-white/70"
            >
              Preparing your wellness journey...
            </motion.p>

            <motion.div
              className="w-48 h-1 bg-white/20 rounded-full mt-6 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#39AD48] to-[#BEFD73]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <>
            <Component {...pageProps} />
            <UpdateNotification />
          </>
        )}
        </AnimatePresence>
      </ThemeProvider>
  );
}

export default MyApp;