import { FaPlay } from "react-icons/fa";
import { BiFingerprint } from "react-icons/bi";
import { GoGift } from "react-icons/go";
import { PiAtomLight } from "react-icons/pi";
import { FaMapLocationDot } from "react-icons/fa6";
import Card_with_Num from '@/components/Card_with_Num'
import { FaRegHospital } from "react-icons/fa6";
import { ImLab } from "react-icons/im";
import { SlBadge } from "react-icons/sl";


const About = () => {
  return (
    <>
      <section id="about" className="flex flex-col lg:flex-row w-full py-6">
        <div className="relative flex justify-center items-center w-full bg-cover after:content-[''] after:bg-black after:absolute after:top-0 after:left-0 after:opacity-20 after:w-full after:h-full bg-[url('/img/about_img.jpg')] sm:w-[80%] sm:mx-auto lg:mx-0 lg:w-[40%] h-[min(95vh)] bg-gray-200">
          <span className="bg-blue-500 text-white p-6 rounded-[50%]">
            <FaPlay />
          </span>
        </div>
        <div className="flex flex-col gap-8 py-16 px-4 sm:px-8 md:px-16 w-full lg:w-[60%]">
          <div className="flex flex-col gap-5">
            <q className="text-2xl font-regular">
            Empowering Health Choices, One Appointment at a Time
            </q>
            <p className="text-justify text-gray-500">
            At Medi Care, we&apos;re dedicated to revolutionizing the way you access healthcare. Our mission is simple yet profound – to empower individuals like you to take control of your health by connecting you with the best doctors and medical services available.
            </p>
          </div>
          <div className="flex flex-col justify-between items-start">
            <Icon_Text_Portion
              icon={<BiFingerprint />}
              title="Convenience"
              text="With our user-friendly platform, Say goodbye to long wait times and annoying phone calls – book your appointments online from the comfort of your home."
            />
            <Icon_Text_Portion
              icon={<GoGift />}
              title="Comprehensive Selection of Doctors"
              text="Whether you're seeking a general practitioner, a specialist, or a healthcare professional for a specific condition, we've got you covered."
            />
            <Icon_Text_Portion
              icon={<PiAtomLight />}
              title="Personalized Experience"
              text="Your health journey is unique, our platform allows you to easily browse through doctor profiles, read reviews from other patients, and make informed decisions about your healthcare."
            />
          </div>
        </div>
      </section>
      <div className="w-full grid gap-y-16 grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 px-5 py-14 bg-sky-50">
        <Card_with_Num icon={<FaMapLocationDot />} num="85" text="Doctors" />
        <Card_with_Num icon={<FaRegHospital />} num="18" text="Departments" />
        <Card_with_Num icon={<ImLab />} num="12" text="Research Labs" />
        <Card_with_Num icon={<SlBadge />} num="150" text="Awards" />
      </div>
    </>
  );
};

const Icon_Text_Portion = ({ icon, title, text }) => {
  return !icon ? (
    <></>
  ) : (
    <div className="group flex gap-5 items-center justify-start py-6">
      <span className="group-hover:bg-blue-500 group-hover:duration-[400ms] group-hover:border-blue-500 group-hover:text-white border-2 border-blue-500/50 p-4 text-3xl text-blue-600 rounded-[50%]">
        {icon}
      </span>
      <div>
        <p className="text-xl font-[600] text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </div>
  );
};


export default About;
