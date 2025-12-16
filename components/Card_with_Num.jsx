const Card_with_Num = ({ icon, num, text }) => {
  return (
    <div className="relative p-4 w-[90%] md:w-[85%] lg:w-[70%] mx-auto hover:shadow-md shadow-lg rounded-md bg-white flex flex-col justify-center items-center">
      <span className="absolute -top-8 left-[50%] p-4 text-2xl -translate-x-[50%] rounded-full bg-blue-500 text-white">
        {icon}
      </span>
      <span className="text-[3.8rem] font-sans">{num}</span>
      <span className="text-gray-600">{text}</span>
    </div>
  );
};
export default Card_with_Num;
