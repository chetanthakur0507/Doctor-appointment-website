import React from "react";
import Action_Button from "./Action_Button";
import Link from "next/link";

const NavbarList = [
  { title: "Home", href: "#herosection" },
  { title: "About", href: "#about" },
  { title: "Services", href: "#services" },
  { title: "Departments", href: "#departments" },
  { title: "Appointment", href: "#appointment" },
  { title: "Doctors", href: "#doctors" },
  { title: "Contact", href: "#contact" },
];

const TopbarIcons = [
  { icon: `<i class="fa-brands fa-twitter"></i>`, href: "" },
  { icon: `<i class="fa-brands fa-facebook"></i>`, href: "" },
  { icon: `<i class="fa-brands fa-instagram"></i>`, href: "" },
  { icon: `<i class="fa-brands fa-linkedin"></i>`, href: "" },
];

const Navbar = () => {
  return (
    <>
      {/* TopBar Section 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇 */}

      <div className="flex flex-col sm:flex-row justify-between items-center w-full py-1 px-2 sm:px-10 lg:px-20 bg-light-50 dark:bg-black text-gray-800 dark:text-white">
        <div className="flex gap-4 items-center">
          <InfoContainer
            logo='<i class="fa-regular fa-envelope"></i>'
            info="admin@gmail.com"
          />
          <InfoContainer
            logo='<i class="fa-solid fa-mobile-screen-button"></i>'
            info="+92 545 2356133"
          />
        </div>
        <div className="flex justify-center items-center gap-3">
          {TopbarIcons.map((item, index) => (
            <TopbarLogo logo={item.icon} href={item.href} key={index} />
          ))}
          {/* <TopbarLogo logo="@" href="/" /> */}
        </div>
      </div>

      {/* Navbar Section 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇 */}

      <div className="flex h-[9vh] items-center justify-between px-2 sm:px-10 lg:px-20 bg-light-50 shadow-md">
        <span className="drop-shadow-md text-gray-500 font-extrabold text-4xl">
          Medi<span className="text-blue-600">.care</span>
        </span>
        <div className="flex items-center justify-end gap-5 py-2">
          <ul className="list-none hidden lg:flex justify-between items-center gap-3">
            {NavbarList.map((item, index) => (
              <NavItem href={item.href} title={item.title} key={index} />
            ))}

            {/* <NavItem text="Home" path="/" /> */}
          </ul>
          <Action_Button text="Make an Appointment" href="#appointment" />
          <button
            popovertarget="res_Navbar"
            popovertargetaction="open"
            className="inline-block sm:hidden cursor-pointer text-2xl px-2"
          >
            #
          </button>
        </div>
      </div>

      {/* Navbar Responsiveness */}

      {/* <div
        popover
        className="flex justify-start px-20 items-center shadow-lg absolute top-0 right-0 bg-white w-1/2 h-screen z-10"
        id="res_Navbar"
      >
        <button className="bg-rose-600 text-white text-xl shadow-md absolute top-3 right-5 px-2 py-1 ">
          X
        </button>
        <ul className="flex flex-col">
          {NavbarList.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="py-2 px-1 text-2xl hover:text-blue-400 hover:text-3xl "
            >
              {item.title}
            </Link>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default Navbar;

// * Some Above used Components -------| ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️

const NavItem = (props) => (
  <>
    <Link
      href={props.href}
      className="py-2 px-1 hover:text-blue-400 hover:border-b-[2px] border-b-blue-400"
    >
      {props.title}
    </Link>
  </>
);

const TopbarLogo = (props) => (
  <>
    <Link
      href="#herosection"
      className="cursor-pointer flex items-center justify-center text-slate-500 hover:text-blue-400"
      dangerouslySetInnerHTML={{ __html: props.logo }}
    >
    </Link>
  </>
);

const InfoContainer = (props) => (
  <>
    <div className="flex gap-2 text-slate-50 justify-center items-center">
      <span
        className="text-blue-400 mt-1 text-md"
        dangerouslySetInnerHTML={{ __html: props.logo }}
      ></span>
      {props.info}
    </div>
  </>
);
