"use client"
import { Geist } from "next/font/google"
import {motion} from "framer-motion"
import { MoveLeft, Route } from "lucide-react"
import Link from "next/link"
const GeistFont = Geist({
  subsets : ["latin"]
})
export default function Page() {
  return (
  <div className="flex flex-col  gap-5 justify-center items-center h-screen">
    <div className={`${GeistFont.className} text-[#191C1E] font-bold text-9xl animate-pulse`}>404</div>
    <div className={`${GeistFont.className} text-[#45464D] flex text-center flex-col text-2xl`}><div>Invalid URL</div>
     <div> It looks like something is broken :(</div>
    </div>
    <div className={`${GeistFont.className} sm:flex-row flex-col font-semibold  text-2xl flex gap-5 justify-center items-center text-center`}>
      <Link href="/"><motion.div whileHover={{scale:0.95}} whileTap={{scale:1.1}} className="bg-[#00687A] gap-5 text-white px-4 py-3 rounded-sm flex text-center items-center">
        <span><MoveLeft /></span><span>Return To Home</span>
      </motion.div></Link>
      
      <Link href={'/posts'}><motion.div whileHover={{scale : 0.95}} whileTap={{scale:1.1}} className="flex gap-5 border-[#C6C6CD] text-[#191C1E] border-2 px-8 py-3 text-center items-center rounded-sm">
        <span>Explore Feed</span><span><Route /></span>
      </motion.div>
      </Link>
    </div>
  </div>
  )
}
