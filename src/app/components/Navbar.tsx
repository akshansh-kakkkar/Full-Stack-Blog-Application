"use client";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { Geist, JetBrains_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const GeistFont = Geist({
  subsets: ["latin"],
});
const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const Pathname = usePathname();
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className="flex justify-between text-center content-center items-center border-b border-[#C6C6CD] p-5">
        <div className="flex gap-18 text-center content-center items-center">
          <div className={`${GeistFont.className} text-3xl font-bold`}>
            <Link href={"/"}>DevLog</Link>
          </div>
          <div className="md:block hidden">
            <ul
              className={`${JetBrainsMono.className} text-[#191C1E] font-medium text-lg flex gap-6`}
            >
              <li>
                <Link
                  className={`transition-all duration-300 px-2 ${Pathname === "/" ? "underline rounded-xs underline-offset-3 " : ""}`}
                  href={"/"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`transition-all px-2 duration-300 ${Pathname === "/posts" ? "rounded-xs  underline underline-offset-3 " : ""}`}
                  href={"/posts"}
                >
                  Feed
                </Link>
              </li>
              <li>
                <Link
                  className={`transition-all px-2 duration-300 ${Pathname === "/about" ? "underline rounded-xs underline-offset-3 " : ""}`}
                  href={"/about"}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className={`transition-all px-2 duration-300 ${Pathname === "/contact" ? "underline rounded-xs underline-offset-2 " : ""}`}
                  href={"/contact"}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative md:block hidden items-center ">
          <Search className=" absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5  text-[#45464D]" />
          <input
            type="text"
            placeholder="search..."
            className="border-[#C6C6CD]  py-2 px-5 outline-[#45464D] text-lg rounded-md border-2 pl-10 pr-2 bg-[#F2F4F6] placeholder:text-[#aeaeb9]"
          />
        </div>
        <motion.div
          exit={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 360 : 0 }}
          initial={{ rotate: 0 }}
          className="block md:hidden"
          onClick={toggleOpen}
        >
          {isOpen ? <X /> : <Menu />}
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ x: -100, opacity: 0 }}
            className="bg-[#f7f9fb]  fixed mt-22 md:hidden border-[#c6c6cd] py-8 p-4 justify-center w-[200px]   text-center items-center mx-4 z-12 my-3 border rounded-md flex "
          >
            <div className="absolute flex top-4 right-4 bg-[#191C1E]  text-white rounded-full p-1 shadow" onClick={toggleOpen} ><X /></div>
            <ul
              className={`flex flex-col gap-4 ${JetBrainsMono.className} top-3 relative text-[#191C1E] text-xl font-medium`}
            >
              <li>
                <Link
                  href={"/"}
                  className={`${Pathname === "/" ? "underline underline-offset-3 rounded-sm px-2" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={"/posts"}
                  className={`${Pathname === "/posts" ? "underline rounded-sm underline-offset-3 px-2 " : ""}`}
                >
                  Feed
                </Link>
              </li>
              <li>
                <Link
                  href={"/about"}
                  className={`${Pathname === "/about" ? "underline underline-offset-3 rounded-sm  px-2" : ""}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className={`${Pathname === "/contact" ? "underline underline-offset-3  rounded-sm px-2" : ""}`}
                  href={"/contact"}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
