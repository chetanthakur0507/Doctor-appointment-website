const Services = ({text}) => {
    return (
        <>
            <h2 id="services" className="text-blue-700 text-center text-3xl sm:text-4xl md:text-5xl font-semibold">
                {text}
            </h2>
            <span className="w-[85px] h-[3px] mt-2 mb-4 mx-auto bg-gray-200 rounded-2xl after:content-[''] after:w-[40%] after:h-full after:bg-blue-500 after:absolute relative after:top-0 after:left-1/2 after:-translate-x-[50%]">
            </span>
        </>
    );
};

export default Services;