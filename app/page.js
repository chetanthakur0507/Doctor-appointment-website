import Hero from "@/components/Hero";
import Specialties from "@/components/Specialties";
import HowItWorks from "@/components/HowItWorks";
import FeaturedDoctors from "@/components/FeaturedDoctors";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Specialties />
      <HowItWorks />
      <FeaturedDoctors />
      <Stats />
      <Testimonials />
      <Newsletter />
    </>
  );
}
