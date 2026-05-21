"use client"
import { MoveRight } from "lucide-react";
import { Libertinus_Serif} from "next/font/google";
import Link from "next/link";

import {motion, scale} from "framer-motion";
import LoginButton from "@/app/components/LoginButtor";
const LibertinusSerif = Libertinus_Serif({
  subsets : ['latin'],
  weight : ["400","700"]
})
export default function Page() {

  return (
    <div className={`flex flex-col gap-8 p-5 via-white via-80% min-h-screen justify-center items-center bg-[#f7fbfc] `}>
    <div className={`${LibertinusSerif.className} font-bold text-6xl text-center `}>
      The Pulse of <span className="text-[#00687A] font-bold">Modern Articles</span>
    </div>
    <div className={`${LibertinusSerif.className} font-[600] text-md sm:text-xl sm:w-180 flex text-center text-[#45464D]`}>
      Discover thoughtful articles, fresh perspectives, and meaningfull ideas in one place.
      Read high quality articles crafted from scratch by our online community to simply the complex stuff.
     </div>
     <div className="flex sm:flex-row flex-col gap-4 sm:gap-12 items-center">
      <motion.div whileHover={{scale:0.95}} whileTap={{scale:1.1}}><Link className={`bg-[#191C1E] text-2xl  md:text-3xl group flex gap-3 text-white px-8 rounded-sm p-4 ${LibertinusSerif.className}`} href={'/about'}><div className="flex justify-center items-center  gap-7"><span>Get Started</span><span className="group-hover:translate-x-2 transition-all duration-300"><MoveRight /></span></div></Link></motion.div>
      <motion.div whileHover={{scale:0.95}} whileTap={{scale:1.1}}><Link className={`border-[#191c1e] flex text-2xl md:text-3xl text-[#191C1E] border-2 px-12 rounded-sm p-4 ${LibertinusSerif.className}`} href={'/about'}><div>Explore Feed</div></Link></motion.div>
      <LoginButton />
      </div>    
    </div>
  );
}
