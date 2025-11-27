"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Function to handle scroll to set sticky class
  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  // Function to handle click outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen]);

  // Effect to handle body overflow
  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navbarOpen]);

  return (
    <header
      className={`fixed h-24 top-0 py-1 z-50 w-full transition-all ${
        sticky
          ? "shadow-lg bg-white"
          : pathUrl === "/"
            ? "bg-white/95 backdrop-blur-sm shadow-md"
            : "bg-white shadow-sm"
      }`}
    >
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) flex justify-between lg:items-center xl:gap-16 lg:gap-8 px-4 py-6">
        <Logo />
        <nav className="hidden lg:flex grow items-center xl:justify-start justify-center space-x-10 text-17 text-midnight_text">
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>
        <Link
          href="/audit"
          className="hidden lg:flex items-center bg-orange-500 border-2 border-orange-500 text-white px-6 py-2.5 gap-2 rounded-lg text-16 font-semibold hover:bg-orange-600 hover:border-orange-600 transition-all"
        >
          Get Free Audit
        </Link>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="block lg:hidden p-2 rounded-lg"
          aria-label="Toggle mobile menu"
        >
          <span className="block w-6 h-0.5 bg-midnight_text"></span>
          <span className="block w-6 h-0.5 bg-midnight_text mt-1.5"></span>
          <span className="block w-6 h-0.5 bg-midnight_text mt-1.5"></span>
        </button>
      </div>
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${
          navbarOpen ? "-translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-midnight_text">
            Menu
          </h2>
          <button
            onClick={() => setNavbarOpen(false)}
            aria-label="Close mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-midnight_text"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-start p-4">
          {headerData.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}
          <Link
            href="/audit"
            className="mt-6 w-full bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 text-center font-semibold"
            onClick={() => setNavbarOpen(false)}
          >
            Get Free Audit
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
