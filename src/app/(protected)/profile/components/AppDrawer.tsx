"use client"
import { AnimatePresence, spring } from "framer-motion"
import { LayoutDashboard, UserRoundCog, UserRoundPen, X } from "lucide-react"
import { useState } from "react"
import {motion} from 'framer-motion'
import { Libertinus_Sans, Poppins } from "next/font/google"
import Link from "next/link"
const libretinusSans = Libertinus_Sans({
    subsets:['latin'],
    weight : ["700"]
})
const poppins = Poppins({
    subsets:["latin"],
    weight:["400"]
})
export default function AppDrawer(){
    const [open, setOpen] = useState(false)
    return(
        <>
        <button onClick={()=>{setOpen(true)}} className="fixed bottom-5 left-5 z-30 bg-white border p-2 block  rounded-full shadow-lg md:hidden" >
            <LayoutDashboard size={36} />
            </button>
            <AnimatePresence>
                {
                    open && (
                        <motion.div className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40" onClick={()=> setOpen(false)} initial={{opacity : 0}} animate={{opacity:1}} exit={{opacity:0}}>
                            <motion.div transition={{damping:25, stiffness:220, type:spring}} animate={{y:0}} exit={{y:"100%%"}} initial={{y:"100%"}}  className="right-0 left-0 bg-white overflow-y-auto  h-[65vh] bottom-0 fixed z-50 p-6 rounded-t-3xl">
                                <div className="flex border-b pb-5 justify-between text-center items-center text-2xl">
                                    <span className={`${libretinusSans.className}`}>Profile</span> 
                                    <span onClick={()=> setOpen(false)} className="bg-white border-1 p-2 rounded-full shadow-lg">
                                        <X strokeWidth={2} />
                                    </span>
                                </div>
                                <div className="mt-8 mx-5">
                                    <div className="flex flex-col gap-5">
                                        <div className="flex gap-2">
                                        <span><UserRoundCog /></span>
                                        <span className={`text-xl ${libretinusSans.className}`}>User Setting</span>
                                    </div>
                                    <div className="flex justify-start items-start">
                                        <div className="flex flex-col text-center justify-center items-center gap-1 text-sm">
                                            <Link className="border-1 rounded-full p-2 bg-white shadow-lg" href={'/profile/edit'}><span >
                                                <UserRoundPen />
                                            </span></Link>
                                            <span className={`${poppins.className} text-sm`}>Edit user</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center flex-col text-center text-sm gap-1">
                                        <Link href="/profile/picture"></Link>
                                        <span className={`${poppins.className} text-xs`}>Avatar</span>
                                    </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        
        </>
    )
}