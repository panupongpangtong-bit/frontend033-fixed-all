"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import DarkModeToggle from "./DarkModeToggle";
import { clearToken, getToken } from "../lib/auth";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const syncToken = () => setToken(getToken());
    syncToken();
    window.addEventListener("storage", syncToken);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", syncToken);
    };
  }, []);

  const menuItems = [
    { name: "หน้าแรก", href: "/" },
    { name: "เกี่ยวกับเรา", href: "/about" },
    { name: "บริการของเรา", href: "/service" },
    { name: "ติดต่อเรา", href: "/contact" },
  ];

  const textColor = isScrolled
    ? "text-gray-900 dark:text-white"
    : "text-white";

  const hoverBgColor = isScrolled
    ? "hover:bg-gray-100 dark:hover:bg-white/10"
    : "hover:bg-white/20";

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav
        className={`
          fixed top-0 left-0 z-50 w-full
          transition-all duration-500

          ${
            isScrolled
              ? `
                bg-white/95
                dark:bg-[#0b1b33]/95
                backdrop-blur-xl

                border-b
                border-gray-200
                dark:border-[#1e3b5c]

                shadow-md
                dark:shadow-black/40
              `
              : `
                bg-transparent
                dark:bg-[#071426]/80
                backdrop-blur-sm
              `
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex h-20 items-center justify-between">

            {/* ================= LOGO ================= */}

            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-2xl
                  bg-gradient-to-tr
                  from-blue-600
                  to-indigo-500
                  text-sm font-bold
                  text-white
                  shadow-lg
                  shadow-indigo-500/30
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              >
                KATE
              </div>

              <div className="flex flex-col">

                <h1
                  className={`
                    text-xl
                    font-extrabold
                    tracking-tight
                    transition-colors
                    duration-300
                    ${textColor}
                  `}
                >
                  PP SHOP
                </h1>

                <p
                  className={`
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-wider
                    transition-colors
                    duration-300

                    ${
                      isScrolled
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-gray-300 dark:text-gray-300"
                    }
                  `}
                >
                  E-Commerce
                </p>

              </div>
            </Link>


            {/* ================= RIGHT ================= */}

            <div className="flex items-center gap-2 md:gap-3">

              {/* ================= DESKTOP MENU ================= */}

              <div className="mr-2 hidden items-center gap-1 md:flex">

                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      rounded-full
                      px-4 py-2
                      text-sm font-medium
                      transition-all duration-300

                      ${textColor}
                      ${hoverBgColor}
                    `}
                  >
                    {item.name}
                  </Link>
                ))}

              </div>


              {/* ================= DARK MODE ================= */}

              <div className="hidden sm:block">
                <DarkModeToggle />
              </div>


              {/* ================= CART ================= */}

              <Link
                href="/cart"
                className={`
                  relative
                  rounded-full
                  p-2.5
                  transition-all duration-300

                  ${textColor}
                  ${hoverBgColor}
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>

                <span
                  className="
                    absolute right-1.5 top-1.5
                    flex h-4 w-4
                    items-center justify-center
                    rounded-full
                    bg-indigo-600
                    text-[10px]
                    font-bold
                    text-white
                    ring-2
                    ring-white
                    dark:ring-[#0b1b33]
                  "
                >
                  3
                </span>
              </Link>


              {/* ================= AUTH ================= */}

              <div className="hidden md:block">
                {token ? (
                  <button
                    type="button"
                    onClick={() => {
                      clearToken();
                      setToken(null);
                      window.location.href = "/";
                    }}
                    className={`
                      inline-flex items-center justify-center rounded-full px-5 py-2.5
                      text-sm font-medium transition-all duration-300
                      ${isScrolled
                        ? "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 dark:border-[#2a4868] dark:bg-[#102542] dark:text-white dark:hover:bg-[#163456]"
                        : "border border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-gray-900"}
                    `}
                  >
                    เข้าสู่ระบบ
                  </button>
                ) : (
                  <Link
                    href="/pagelogin"
                    className={`
                      inline-flex items-center justify-center rounded-full px-5 py-2.5
                      text-sm font-medium transition-all duration-300
                      ${isScrolled
                        ? "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 dark:border-[#2a4868] dark:bg-[#102542] dark:text-white dark:hover:bg-[#163456]"
                        : "border border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-gray-900"}
                    `}
                  >
                    เข้าสู่ระบบ
                  </Link>
                )}
              </div>

              {/* ================= REGISTER ================= */}

              <div className="hidden md:block">

                <Link
                  href="/register"
                  className={`
                    inline-flex
                    items-center
                    justify-center
                    rounded-full
                    px-6 py-2.5
                    text-sm font-medium
                    transition-all duration-300

                    ${
                      isScrolled
                        ? `
                          bg-gray-900
                          text-white
                          shadow-md
                          hover:bg-gray-800

                          dark:bg-blue-600
                          dark:hover:bg-blue-700
                        `
                        : `
                          bg-white
                          text-gray-900
                          shadow-sm
                          hover:bg-gray-100
                        `
                    }
                  `}
                >
                  สมัครสมาชิก
                </Link>

              </div>


              {/* ================= MOBILE BUTTON ================= */}

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                  rounded-full
                  p-2.5
                  transition-all duration-300
                  md:hidden

                  ${textColor}
                  ${hoverBgColor}
                `}
              >
                <div className="space-y-1.5">

                  <span
                    className={`
                      block h-0.5 w-5
                      bg-current
                      transition-all duration-300

                      ${
                        isOpen
                          ? "translate-y-2 rotate-45"
                          : ""
                      }
                    `}
                  />

                  <span
                    className={`
                      block h-0.5 w-5
                      bg-current
                      transition-all duration-300

                      ${isOpen ? "opacity-0" : ""}
                    `}
                  />

                  <span
                    className={`
                      block h-0.5 w-5
                      bg-current
                      transition-all duration-300

                      ${
                        isOpen
                          ? "-translate-y-2 -rotate-45"
                          : ""
                      }
                    `}
                  />

                </div>
              </button>

            </div>
          </div>


          {/* ================= MOBILE MENU ================= */}

          <div
            className={`
              origin-top
              transition-all duration-300
              md:hidden

              ${
                isOpen
                  ? "mb-4 scale-y-100 opacity-100"
                  : "h-0 scale-y-0 opacity-0"
              }
            `}
          >

            <div
              className="
                flex flex-col gap-1
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                shadow-xl
                shadow-gray-200/50

                dark:border-[#1e3b5c]
                dark:bg-[#102542]
                dark:shadow-black/30
              "
            >

              {/* Dark Mode */}

              <div
                className="
                  flex items-center
                  justify-between
                  px-4 py-3
                "
              >

                <span
                  className="
                    text-sm font-medium
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  โหมดมืด
                </span>

                <DarkModeToggle />

              </div>


              <div
                className="
                  my-2 h-px
                  bg-gray-100
                  dark:bg-[#1e3b5c]
                "
              />


              {/* Menu */}

              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="
                    rounded-xl
                    px-4 py-3
                    text-sm font-medium
                    text-gray-600
                    transition-all duration-200
                    hover:bg-gray-50
                    hover:text-indigo-600

                    dark:text-gray-200
                    dark:hover:bg-white/10
                    dark:hover:text-blue-400
                  "
                >
                  {item.name}
                </Link>
              ))}


              <div
                className="
                  my-2 h-px
                  bg-gray-100
                  dark:bg-[#1e3b5c]
                "
              />


              {/* Mobile Login */}

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4 py-3
                  text-center
                  text-sm font-medium
                  text-gray-700
                  transition-all

                  hover:bg-gray-50

                  dark:border-[#2a4868]
                  dark:text-white
                  dark:hover:bg-white/10
                "
              >
                เข้าสู่ระบบ
              </button>


              {/* Mobile Register */}

              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="
                  mt-1
                  w-full
                  rounded-xl
                  bg-gray-900
                  px-4 py-3
                  text-center
                  text-sm font-medium
                  text-white
                  shadow-md
                  transition-all
                  hover:bg-gray-800

                  dark:bg-blue-600
                  dark:hover:bg-blue-700
                "
              >
                สมัครสมาชิก
              </Link>

            </div>

          </div>

        </div>
      </nav>


      {/* ================= LOGIN MODAL ================= */}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}