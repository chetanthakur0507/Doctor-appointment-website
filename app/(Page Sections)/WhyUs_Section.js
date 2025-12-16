import { FaNotesMedical } from "react-icons/fa6";
import { FaNotesMedical as Icon } from "react-icons/fa";
import { PiShapesDuotone } from "react-icons/pi";

const WhyUs_Section = () => {
  const whiteCards = [
    {
      icon: <FaNotesMedical />,
      heading: "Convenience",
      text: " This platform provides experienced and highly qualified healthcare professionals.",
    },
    {
      icon: <Icon />,
      heading: "Comprehensive Healthcare Services",
      text: "Medi.care provides a wide healthcare services, users have access to care options.",
    },
    {
      icon: <PiShapesDuotone />,
      heading: "User-Friendly Platform",
      text: "Medi.care is designed with user convenience making it accessible for individuals seeking healthcare services.",
    },
  ];

  return (
    <>
      <div className="relative p-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div className="flex flex-col gap-6 rounded-lg col-span-2 p-8 bg-blue-600 text-white">
          <p className="text-3xl font-semibold">Why Choose <span className="underline underline-offset-4">Medi.care</span>?</p>
          <p className="text-md text-justify">
          We understand the challenges you face when it comes to navigating the complex healthcare system, and we&apos;re here to simplify the process for you. <br />
          At <span className="underline underline-offset-4">Medi.care</span>, we understand the importance of finding the right healthcare provider for your needs.
          </p>
          <div>
            <button className="flex gap-3 hover:gap-4 transition-all duration-300 items-center justify-start bg-zinc-50/20 hover:bg-zinc-50/30 px-5 py-2 rounded-full">
              Learn More <span>&gt;</span>
            </button>
          </div>
        </div>
          {whiteCards.map((item, index) => (
            <WhiteCard
              key={index}
              text={item.text}
              heading={item.heading}
              logo={item.icon}
            />
          ))}
      </div>
    </>
  );
};

export default WhyUs_Section;

const WhiteCard = (props) => {
  return (
    <>
      <div className="flex gap-4 flex-col text-center px-4 shadow-lg justify-center items-center">
        <span
          className="text-5xl font-semibold text-blue-500"
        >{props.logo}</span>
        <p className="font-semibold text-lg">{props.heading}</p>
        <p className="text-sm text-zinc-600/85">{props.text}</p>
      </div>
    </>
  );
};
