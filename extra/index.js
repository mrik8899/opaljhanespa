import Navbar from '../components/Navbar';
import Hero from '../components/Hero_Original';
import Features from '../components/Features';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

export default function Home() {
  return (
    <>
      <Navbar /> 
      <main className="pt-14 scroll-smooth">
        <section id="hero"><Hero /></section>
        <section id="features"><Features /></section>
        <section id="services"><Services /></section>
        <section id="about"><About /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="contact"><Contact /></section>
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}
