import Navbar from "@/components/Navbar";
import HeroSection from "./(Page Sections)/Hero_Section";
import Footer from "@/components/Footer";
import WhyUs_Section from "./(Page Sections)/WhyUs_Section";
import About from "./(Page Sections)/About";
import Services from "./(Page Sections)/Services";
import Appointment from "./(Page Sections)/Appointment";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhyUs_Section />
      <About />
      <Services />
      <Appointment />
      <Footer />
    </>
  );
}
