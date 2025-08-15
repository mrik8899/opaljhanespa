// components/Footer.js
import { Facebook, Instagram, Twitter, Heart, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { href: '#services', label: 'Our Services' },
    { href: '#about', label: 'About Us' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#contact', label: 'Book Now' },
  ];

  const services = [
    'Swedish Massage',
    'Deep Tissue Therapy',
    'Luxury Facials',
    'Body Treatments',
    'Couples Packages',
    'Gift Certificates'
  ];

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      {/* Background: Using brand-dark-purple */}
     <div
  className="absolute inset-0 z-0"
  style={{
    background: `linear-gradient(to bottom,
      rgba(26, 22, 46, 0.28) 0%,
      rgba(0, 0, 0, 0.32) 100%)`
  }}
/>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            {/* Opal Spa Title: Using brand gradient colors */}
            <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-green via-brand-lime to-brand-blue bg-clip-text text-transparent mb-4">Opal Jhane</h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              Your sanctuary of tranquility in the heart of Davao City. 
              Experience luxury wellness like never before.
            </p>
            <div className="flex gap-4">
              {/* Social Links: Added target="_blank", rel, and aria-label */}
              <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Visit us on Facebook">
                <Facebook size={20} className="text-white" />
              </a>
              <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Visit us on Instagram">
                <Instagram size={20} className="text-white" />
              </a>
              <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Visit us on Twitter">
                <Twitter size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {/* Link Hover Color: Using brand-lime */}
                  <Link href={link.href} className="text-white/70 hover:text-brand-lime transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Visit Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                {/* Icon Color: Using brand-lime */}
                <MapPin size={18} className="text-brand-lime mt-1" />
                <p className="text-white/70 text-sm leading-relaxed">
                  Door 16 & 17, Gahol Building<br />
                  J.P. Laurel Ave, Bajada<br />
                  Davao City, Philippines
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Icon Color & Link Hover Color: Using brand-lime */}
                <Phone size={18} className="text-brand-lime" />
                <a href="tel:+63822873568" className="text-white/70 hover:text-brand-lime transition-colors">
                  +63 82 287 3568
                </a>
              </div>
              <div className="flex items-center gap-3">
                {/* Icon Color & Link Hover Color: Using brand-lime */}
                <Mail size={18} className="text-brand-lime" />
                <a href="mailto:info@opalspa.ph" className="text-white/70 hover:text-brand-lime transition-colors">
                  info@opalspa.ph
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} Opal Jhane. All rights reserved.
            </p>
            <p className="text-white/60 text-sm flex items-center gap-1">
              Made with <Heart size={16} className="text-red-400 fill-red-400" /> in Davao City
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}