"use client";
import { useSession } from "@/lib/auth-client";
import { prisma } from "@/lib/prisma";
import { Geist, Libertinus_Sans, JetBrains_Mono } from 'next/font/google';
import Image from "next/image";
import { User } from "../../Types/index";
import { useEffect, useState } from "react";
import { Mail, MapPin } from "lucide-react";
import BioModal from "./components/BioModel";

const geist = Geist({
  subsets: ["latin"],
});
const libretnusSans = Libertinus_Sans({
  subsets: ["latin"],
  weight: ["400"],
});
const JetBrains = JetBrains_Mono({
  subsets : ["latin"]
})
export default function overView() {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();
  const [showbioModal, setShowbioModal] = useState(false)
  const userId = session?.user?.id;
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  return (
    <div className=" bg-[#F7F9FB] ">
      <div className="flex mx-22 flex-col gap-8">
        <div className="flex  sm:justify-start justify-center flex-col gap-4 border-[#C6C6CD] border-b-2 pb-2 ">
          <div
            className={`${geist.className} text-[#2D2D2D] text-4xl font-semibold`}
          >
            Account Overview
          </div>
          <div className={`${geist.className} text-[#45464D]`}>
            Real-time engagement and profile metrics.
          </div>
        </div>
        <div className="flex   gap-8">
          <div className={`flex gap-8`}>
            <div className="w-[128px] relative   rounded-lg h-[128px]">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  className="rounded-lg  border-5 border-[#00687A] "
                  fill
                  alt={session.user.name}
                />
              ) : (
                <div
                  className={`${geist.className} flex justify-center items-center h-full bg-[#00687A] text-9xl text-white rounded-lg`}
                >
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center  items-start gap-2 text-start ">
            <h1 className={` text-4xl ${libretnusSans.className} `}>
              {" "}
              {session?.user?.name}
            </h1>
            <p
            onClick={()=> setShowbioModal(true)}
              className={`line-clamp-2 text-md cursor-pointer break-words w-180 ${libretnusSans.className} text-[#45464D]`}
            >
              {user?.bio || "Bio Not Available"}
            </p>
            <BioModal open={showbioModal} bio={user?.bio} onClose={()=>setShowbioModal(false)} />
            <div className={`${JetBrains.className} flex gap-8 text-[#76777D]`}>
            <div className="flex gap-2">
              <span>
                <Mail />
              </span>
              <span>{session?.user.email}</span>
            </div>
            <div className="flex gap-2">
              <span>
                <MapPin />
              </span>
              <span>{user?.location || "N/A"} </span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
