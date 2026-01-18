"use client";
import React, { useState } from "react";
import Action_Button from "./Action_Button";
import Link from "next/link";

const NavbarList = [
  { title: "Home", href: "#herosection" },
  { title: "About", href: "#about" },
  { title: "Services", href: "#services" },
  { title: "Departments", href: "/departments" },
  { title: "Appointment", href: "#appointment" },
  { title: "Doctors", href: "/Doctors" },
  { title: "Contact", href: "#contact" },
];

const TopbarIcons = [
  { icon: `<i class="fa-brands fa-twitter"></i>`, href: "" },
  { icon: `<i class="fa-brands fa-facebook"></i>`, href: "" },
  { icon: `<i class="fa-brands fa-instagram"></i>`, href: "" },
  { icon: `<i class="fa-brands fa-linkedin"></i>`, href: "" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Navbar Section */}
      <div className="flex h-[9vh] items-center justify-between px-2 sm:px-10 lg:px-20 bg-light-50 shadow-md">
        <span className="drop-shadow-md text-gray-500 font-extrabold text-4xl">
          Medi<span className="text-blue-600">.care</span>
        </span>
        <div className="flex items-center justify-end gap-5 py-2">
          {/* Desktop nav */}
          <ul className="list-none hidden lg:flex justify-between items-center gap-3">
            {NavbarList.map((item, index) => (
              <NavItem href={item.href} title={item.title} key={index} />
            ))}
          </ul>
          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Action_Button text="Make an Appointment" href="#appointment" />
          </div>
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="
            Open menu"
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center lg:hidden cursor-pointer text-3xl px-2 text-gray-700"
          >
            {/* Simple hamburger/close icon using text to avoid extra deps */}
            <span>{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu (slide-over) */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={`${mobileOpen ? "translate-x-0" : "translate-x-full"} fixed inset-y-0 right-0 z-50 w-3/4 max-w-xs bg-white shadow-xl border-l border-gray-100 transition-transform duration-300 ease-out lg:hidden`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <span className="text-2xl font-extrabold text-gray-500">
            Medi<span className="text-blue-600">.care</span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="text-2xl p-1"
          >
            ✕
          </button>
        </div>
        <nav className="px-5 py-4">
          <ul className="flex flex-col gap-3">
            {NavbarList.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-lg text-gray-700 hover:text-blue-500"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Action_Button text="Make an Appointment" href="#appointment" />
          </div>
        </nav>
      </div>
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
