"use client";
import React, { useState, useEffect } from "react";
import Action_Button from "./Action_Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavbarList = [
  { title: "Home", href: "/#home" },
  { title: "Doctors", href: "/Doctors" },
  { title: "Departments", href: "/departments" },
  { title: "Appointment", href: "/#appointment" },
  { title: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMobileOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* Navbar Section */}
      <div className="flex h-[9vh] items-center justify-between px-2 sm:px-10 lg:px-20 bg-light-50 shadow-md">
        <Link href="/" className="drop-shadow-md text-gray-500 font-extrabold text-4xl">
          Medi<span className="text-blue-600">.care</span>
        </Link>
        
        {/* Desktop nav - Centered */}
        <ul className="list-none hidden lg:flex justify-center items-center gap-8 flex-1">
          {NavbarList.map((item, index) => (
            <NavItem href={item.href} title={item.title} key={index} />
          ))}
        </ul>
        
        <div className="flex items-center justify-end gap-5 py-2">
          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoading && user ? (
              <>
                <span className="text-gray-700 font-semibold text-sm">
                  👤 {user.name || user.email}
                </span>
                <Link 
                  href="/user/dashboard"
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold px-3 py-2 rounded-md hover:bg-blue-50 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold px-3 py-2 rounded-md hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Action_Button text="Sign Up / Login" href="/auth/register" />
            )}
          </div>
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center lg:hidden cursor-pointer text-3xl px-2 text-gray-700 z-50 relative"
          >
            {mobileOpen ? "✕" : "☰"}
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
          <Link href="/" onClick={() => setMobileOpen(false)} className="text-2xl font-extrabold text-gray-500">
            Medi<span className="text-blue-600">.care</span>
          </Link>
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
          <div className="mt-6 space-y-3">
            {!isLoading && user ? (
              <>
                <div className="text-gray-700 font-semibold text-sm bg-blue-50 p-3 rounded-lg text-center">
                  👤 {user.name || user.email}
                </div>
                <Link 
                  href="/user/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center text-blue-600 hover:text-blue-700 text-sm font-semibold px-3 py-2 rounded-md hover:bg-blue-50 transition border border-blue-600"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-red-600 hover:text-red-700 text-sm font-semibold px-3 py-2 rounded-md hover:bg-red-50 transition border border-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Action_Button text="Sign Up / Login" href="/auth/register" />
            )}
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
