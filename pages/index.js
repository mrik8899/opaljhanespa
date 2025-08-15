// pages/index.js
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';

// --- Improvement: Lazy Load Components for Better Performance ---
// Use next/dynamic to load components only when they are needed.
// 'ssr: false' prevents them from being rendered on the server,
// which is often suitable for components that are interactive or appear later on the page.
import dynamic from 'next/dynamic';

const MomentsOfJoy = dynamic(() => import('../components/MomentsOfJoy'), { ssr: false });
const EnhancedBentoGrid = dynamic(() => import('../components/EnhancedBentoGrid'), { ssr: false });
const Services = dynamic(() => import('../components/Services'), { ssr: false });
const About = dynamic(() => import('../components/About'), { ssr: false });
const Testimonials = dynamic(() => import('../components/Testimonials'), { ssr: false });
const Contact = dynamic(() => import('../components/Contact'), { ssr: false });

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <section id="hero" className="pt-0"><Hero /></section>
          <MomentsOfJoy />
          <section id="experience" className="pt-0"><EnhancedBentoGrid /></section>
          <section id="services" className="pt-0"><Services /></section>
          <section id="about" className="pt-0"><About /></section>
          <section id="testimonials" className="pt-0"><Testimonials /></section>
          <section id="contact" className="pt-0"><Contact /></section>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </>
  );
}