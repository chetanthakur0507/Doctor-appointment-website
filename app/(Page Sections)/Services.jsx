import Section_Head from "@/components/Section_Head";
import { FaHeartbeat } from "react-icons/fa";
import { FaTablets } from "react-icons/fa";
import { MdOutlineMedicationLiquid } from "react-icons/md";
import { FaDna } from "react-icons/fa6";
import { TbDisabled } from "react-icons/tb";
import { FaSuitcaseMedical } from "react-icons/fa6";

const Services = () => {
  return (
    <div className="py-14 px-4 sm:p-14">
      <div className="flex text-center flex-col justify-center items-center">
        <Section_Head text="Services" />
        <p className="text-gray-600">
        At Medi.care, we&apos;re committed to excellence in everything we do. From our carefully curated selection of doctors to our intuitive platform design, we strive to provide you with the highest quality of service at every step of your healthcare journey. Your health and well-being are our top priorities, and we&apos;re here to support you every step of the way.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 sm:gap-4 px-3 sm:px-6 py-8 sm:py-10">
        <Services_Card
          icon={<FaHeartbeat />}
          title='Primary Care'
          text="Our dedicated team of primary care physicians is here to help you stay healthy and address any health concerns you may have."
        />
        <Services_Card
          icon={<FaTablets />}
          title='Specialty Care'
          text="Our network of specialist doctors is highly skilled and experienced in their respective fields, ensuring that you receive expert care for even the most complex conditions."
        />
        <Services_Card
          icon={<MdOutlineMedicationLiquid />}
          title='Telemedicine'
          text="With our telemedicine services, you can consult with a doctor remotely from the comfort of your home."
        />
        <Services_Card
          icon={<FaDna />}
          title='Diagnostic Testing'
          text="Our diagnostic testing services provide accurate and timely results to help diagnose and manage a variety of medical conditions."
        />
        <Services_Card
          icon={<TbDisabled />}
          title='Wellness Programs'
          text="Take charge of your health and wellness with our wellness programs designed to promote healthy living and prevent disease."
        />
        <Services_Card
          icon={<FaSuitcaseMedical />}
          title='Patient Education'
          text="Knowledge is power when it comes to your health, which is why we offer patient education resources to help you make informed decisions about your healthcare."
        />
      </div>
    </div>
  );
};


const Services_Card = ({ icon, title, text }) => {
  return (
    !icon ? <></> :
      <div className="group duration-300 hover:bg-blue-500 -z-[-2] flex flex-col py-14 sm:py-24 border border-blue-400/50 rounded-sm text-center gap-3 justify-center items-center">
        <span
          className="relative flex justify-center items-center text-3xl text-white w-[min(85px,60%)] group-hover:bg-white group-hover:text-blue-500 bg-blue-500 p-3 py-4 after:content-[''] after:w-full after:h-full after:rounded-md after:-top-2 after:-left-2 after:z-[-1] after:bg-blue-200 after:absolute rounded-md">
          {icon}
        </span>
        <h3 className="text-2xl text-blue-900 group-hover:text-white font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 group-hover:text-white px-6">{text}</p>
      </div>
  )
}


export default Services;
