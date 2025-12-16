import Link from "next/link";

const Action_Button = (props) => {
  return (
    <>
      <Link
        href={props.href ? props.href : "#herosection"}
        className="flex justify-center items-center border uppercase h-[2.5rem] border-sky-400 bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-3xl text-sm"
      >
        {props.text ? props.text : "text"}
      </Link>
    </>
  );
};

export default Action_Button;
