"use client";
import { AnimatePresence, spring } from "framer-motion";
import {
  CircleUser,
  Cog,
  ContactRound,
  LayoutDashboard,
  LogOut,
  OctagonAlert,
  Palette,
  Settings,
  ShieldUser,
  UserRoundCog,
  UserRoundPen,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Libertinus_Sans, Poppins } from "next/font/google";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
const libretinusSans = Libertinus_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
export default function AppDrawer() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="fixed bottom-5 left-5 z-30 bg-white border p-2 block  rounded-full shadow-lg md:hidden"
      >
        <LayoutDashboard size={36} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              transition={{ damping: 25, stiffness: 220, type: spring }}
              animate={{ y: 0 }}
              exit={{ y: "100%%" }}
              initial={{ y: "100%" }}
              className="right-0 left-0 bg-white overflow-y-auto  h-[65vh] bottom-0 fixed z-50 p-6 rounded-t-3xl"
            >
              <div className="flex border-b pb-5 justify-between text-center items-center text-2xl">
                <span className={`${libretinusSans.className}`}>Profile</span>
                <span
                  onClick={() => setOpen(false)}
                  className="bg-white border-1 p-2 rounded-full shadow-lg"
                >
                  <X strokeWidth={2} />
                </span>
              </div>
              <div className="mt-8 mx-5">
                <div className="flex flex-col gap-5">
                  <div className="flex item-center gap-2">
                    <span>
                      <UserRoundCog />
                    </span>
                    <span className={`text-2xl ${libretinusSans.className}`}>
                      User Setting
                    </span>
                  </div>
                  <div className="flex justify-start gap-12  items-center">
                    <div className="flex flex-col transition-all duration-300 text-center justify-center items-center gap-2 text-sm">
                      <Link
                        className={`border flex ${pathname === "/profile/edit" ? "" : "p-2 hover:bg-accent"}  border-[#00687A] justify-center items-center text-center rounded-full bg-white shadow-lg ${pathname === "/profile" ? "bg-[#00687A]" : "hover:bg-accent"}  `}
                        href={"/profile/edit"}
                      >
                        <span>
                          <UserRoundPen
                            className={`${pathname === "/profile/edit" ? "bg-[#00687A] p-2 rounded-full text-white" : "text-[#00687A] hover:bg-accent"}`}
                            size={pathname === "/profile/edit" ? 48 : 32}
                            strokeWidth={2}
                          />
                        </span>
                      </Link>
                      <span className={`${poppins.className} text-sm`}>
                        Edit Profile
                      </span>
                    </div>
                    <div className="flex justify-center items-center flex-col text-center  gap-2">
                      <Link
                        href="/profile/picture"
                        className={`border border-[#00687A] transial   duration-300 rounded-full flex  items-center text-center justify-center  bg-white shadow-lg ${pathname === "/profile/picture" ? "" : "hover-:bg-accent p-2"}`}
                      >
                        <span>
                          <ContactRound
                            className={`${pathname === "/profile/picture" ? " bg-[#00687A] text-white p-2 rounded-full " : "text-[#00687A] hover:bg-accent"}`}
                            size={pathname === "/profile/picture" ? 54 : 32}
                            strokeWidth={2}
                          />
                        </span>
                      </Link>
                      <span className={`${poppins.className} text-sm`}>
                        Avatar
                      </span>
                    </div>
                    <div className="flex justify-center items-center flex-col text-center gap-2">
                      <Link
                        href={"/profile/security"}
                        className={`border rounded-full flex items-center text-center bg-white shadow-lg transition-all duration-300 border-[#00687A] ${pathname === "/profile/security" ? "" : "hover:bg-accent p-2"}`}
                      >
                        <span>
                          <ShieldUser
                            className={`${pathname === "/profile/security" ? "bg-[#00687A] text-white p-2 rounded-full " : "text-[#00687A] hover:bg-accent"}`}
                            size={pathname === "/profile" ? 32 : 32}
                            strokeWidth={2}
                          />
                        </span>
                      </Link>
                      <span className={`${poppins.className} text-sm`}>
                        Security
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 mx-4">
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <span>
                      <Cog />
                    </span>
                    <span className={`text-2xl ${libretinusSans.className}`}>
                      Others{" "}
                    </span>
                  </div>
                  <div className="flex justify-start items-center  text-center gap-5">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Link
                        href={"/profile/appearance"}
                        className={`border flex-col rounded-full flex items-center text-center bg-white shadow-lg border-[#00687A] ${pathname==='/profile/appearance' ? "" : "p-2 bg-accent"}`}
                      >
                        <span>
                          <Palette strokeWidth={2} className={`${pathname === '/profile/appearance' ? "bg-[#00687A] text-white p-2 rounded-full " : "text-[#00687A] hover:bg-accent"}`} size={pathname === '/profile/appearance' ? 48 :32} />
                        </span>
                      </Link>
                      <span className={`text-sm ${poppins.className}`}>
                        Appearance
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 justify-center">
                      <Link
                        href={"/profile/accountdeletion"}
                        className={`border  border-[#00687A] transition-all duration-300 flex-col rounded-full flex items-center  text-center bg-white shadow-lg ${pathname==='/profile/accountdeletion' ? "" : "hover:bg-accent p-2"} `}
                      >
                        <span>
                          <OctagonAlert size={pathname === '/profile/accountdeletion' ? 48 : 32} strokeWidth={2} className={`${pathname === '/profile/accountdeletion' ? "bg-[#00687A] text-white p-2 rounded-full" : "text-[#00687A] hover:bg-accent" } `} />
                        </span>
                      </Link>
                      <span className={`${poppins.className} text-sm`}>
                        Danger zone
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex mt-6  flex-col gap-6">
                  <div className="flex gap-2 items-center">
                    <span>
                      <Settings />
                    </span>
                    <span className={`text-2xl ${libretinusSans.className}`}>
                      Settings{" "}
                    </span>
                  </div>
                  <div className="flex justify-start items-center mx-4  text-center gap-12">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          signOut();
                          router.push("/");
                        }}
                        className="border flex-col hover:bg-accent rounded-full flex items-center text-center p-2 bg-white shadow-lg"
                      >
                        <span>
                          <LogOut
                            className="text-red-500 rotate-180"
                            size={32}
                            strokeWidth={2}
                          />
                        </span>
                      </button>
                      <span className={`text-sm ${poppins.className}`}>
                        SignOut
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 justify-center">
                      <Link
                        href={"/profile"}
                        className={`${pathname === "/profile" ? "" : "p-2 bg-accent text-[#00687A]"} border-[#00687A] transition-all duration-300 border flex-col rounded-full flex items-center  text-center bg-white shadow-lg`}
                      >
                        <span>
                          <CircleUser size={pathname === "/profile" ? 48 : 32} className={`${pathname === '/profile' ? "bg-[#00687A] p-2 rounded-full text-white" : "hover:bg-accent" }`} />
                        </span>
                      </Link>
                      <span className={`${poppins.className} text-sm`}>
                        Account
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
