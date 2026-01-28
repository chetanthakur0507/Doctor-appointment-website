import dynamic from "next/dynamic";
import HealthcareInfo from "@/components/HealthcareInfo";
import Hero from "@/components/Hero";
import Specialties from "@/components/Specialties";
import HowItWorks from "@/components/HowItWorks";
import FeaturedDoctors from "@/components/FeaturedDoctors";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import WhyChooseUs from "@/components/WhyChooseUs";
import EmergencyContact from "@/components/EmergencyContact";
import AppointmentCTA from "@/components/AppointmentCTA";
import HealthTips from "@/components/HealthTips";
import OurServices from "@/components/OurServices";

const LiveChatWidget = dynamic(() => import("@/components/LiveChatWidget"), { ssr: false });

export default function Home() {
  return (
    <>
      <Hero />
      <Specialties />
      <WhyChooseUs />
      <OurServices />
      <HowItWorks />
      <FeaturedDoctors />
      <AppointmentCTA />
      <Stats />
      <HealthTips />
      <EmergencyContact />
      <Testimonials />
      <Newsletter />
      <HealthcareInfo />
      <LiveChatWidget />
    </>
  );
}
