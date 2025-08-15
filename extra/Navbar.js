'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isTop, setIsTop] = useState(true);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
     setIsTop(
  (document.documentElement.scrollTop || document.body.scrollTop) < window.innerHeight - 80
);

    };
    window.addEventListener('scroll', handleScroll);
  
    handleScroll(); // run on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 
  return (
 <header
  className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-500 ${
    isTop ? 'bg-transparent' : 'navbar-gradient'
    // 'bg-gradient-to-r #5D26C1 20%, #a17fe0 40%, #59C173 80%)'
  }`}
>

  <nav className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
    <div className="text-xl font-bold text-white">Opal Jhane</div>

    <ul className="hidden md:flex space-x-6 font-medium text-white">
      <li><a href="#hero" className="hover:text-gray-100">Home</a></li>
      <li><a href="#features" className="hover:text-gray-100">Features</a></li>
      <li><a href="#services" className="hover:text-gray-100">Services</a></li>
      <li><a href="#about" className="hover:text-gray-100">About</a></li>
      <li><a href="#testimonials" className="hover:text-gray-100">Testimonials</a></li>
      <li><a href="#contact" className="hover:text-gray-100">Contact</a></li>
    </ul>
  {/* Hamburger icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24">
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
  </nav>
 {/* Mobile menu dropdown */}
       
         {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 text-white px-4 py-4 space-y-3">
          {['Home', 'Features', 'Services', 'About', 'Testimonials', 'Contact'].map(
            (text) => (
              <a
                key={text}
                href={`#${text.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 border-b border-gray-700 hover:text-gray-300"
              >
                {text}
              </a>
            )
          )}
        </div>
      )}
    </header>  
  
  );
 }
