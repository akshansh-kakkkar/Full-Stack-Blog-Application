"use client"
import { Globe, Info, MapPin, Save, } from "lucide-react";
import { Geist } from "next/font/google";
import Image from "next/image";

const geist = Geist({
  subsets: ["latin"],
});
export default function EditProfile() {
  return (
    <div className="mx-22">
      <div className="flex flex-col gap-4 border-[#C6C6CD] border-b-2 pb-2">
        <div
          className={`${geist.className}   text-[#2D2D2D] text-4xl font-semibold`}
        >
          Edit Profile
        </div>
        <div className={`${geist.className} text-[#45464D]`}>
          Manage your public presence and developer identity.
        </div>
      </div>
      <div
        className={`${geist.className} text-[#191C1E] border-b border-[#C6C6CD]/50 font-bold uppercase text-lg pt-6 pb-2`}
      >
        PERSONAL INFORMATION
      </div>
      <div className="pt-6 gap-4 flex flex-col">
        <div className=" flex gap-1.5 flex-col">
          <label
            htmlFor=""
            className={`${geist.className} text-md font-semibold`}
          >
            Display Name
          </label>
          <input
            className="flex  w-[72%] border-2 rounded-sm px-3 py-2.25"
            placeholder="John Doe"
            type="text"
          />
          <div
            className={`${geist.className} text-[#76777D] text-sm flex items-center gap-1 text-center`}
          >
            <span>
              <Info size={16} />
            </span>{" "}
            Your name as it will appear on posts and comments.
          </div>
        </div>
        <div className=" flex gap-1.5 flex-col">
          <label
            htmlFor=""
            className={`${geist.className} text-md font-semibold`}
          >
            Bio
          </label>
          <textarea
            className={`flex  w-[72%] border-2 rounded-sm max-h-[250px] min-h-[50px] px-3 py-2.25 ${geist.className}`}
            placeholder="John doe is a really great guy even though every form uses his name but he never feels bad about it ...."
          />
          <div
            className={`${geist.className} text-[#76777D] text-sm flex gap-1 items-center `}
          >
            <span>
              <Info size={16} />
            </span>
            Breif description about your expertise.
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 w-[72%]">
            <div className="flex flex-col gap-1.5">
          <label
            htmlFor=""
            className={`${geist.className} text-md font-semibold`}
          >
            Location (optional)
          </label>
          <div className="relative w-[100%] ">
           <MapPin  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
          <input type="text" className="w-full pl-10  border-2 rounded-sm px-3 py-2.25" placeholder="Vermont, USA" />
          </div>
          </div>
        </div>
      <div
        className={`${geist.className} text-[#191C1E] border-b border-[#C6C6CD]/50 font-bold uppercase text-lg pt-12 pb-2`}
      >
        Social Links      </div>
                <div className="grid grid-cols-2 gap-6 mt-4 w-[72%]">
            <div className="flex flex-col gap-1.5">
          <label
            htmlFor=""
            className={`${geist.className} text-md font-semibold`}
          >
            Github (optional)
          </label>
          <div className="relative w-[100%] ">
           <Image src="/images/github.png" width={30} height={30} alt="Github"  className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500"/>
          <input type="text" className="w-full pl-10  border-2 rounded-sm px-3 py-2.25" placeholder="Vermont, USA" />
          </div>
          </div>
            <div className="flex flex-col gap-1.5">
                    <label
            htmlFor=""
            className={`${geist.className} text-md font-semibold`}
          >
            Linkedin (optional)
          </label>
          <div className="relative w-[100%]">
           <Image src="/images/linkedin.png" width={30} height={30} alt="Linkedin"  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"/>
            <input type="text" className="w-full pl-10 border-2 rounded-sm px-3 py-2.25" placeholder="https://www.xyz.com" />
          </div>
          
        </div>
                    <div className="flex flex-col gap-1.5">
                    <label
            htmlFor=""
            className={`${geist.className} text-md font-semibold`}
          >
            Instagram (optional)
          </label>
          <div className="relative w-[100%]">
           <Image src="/images/instagram.png" width={30} height={30} alt="Instagram"  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"/>
            <input type="text" className="w-full pl-12 border-2 rounded-sm px-3 py-2.25" placeholder="https://www.xyz.com" />
          </div>
          
        </div>
                    <div className="flex flex-col gap-1.5">
                    <label
            htmlFor=""
            className={`${geist.className} text-md font-semibold`}
          >
            Website URL (optional)
          </label>
          <div className="relative w-[100%]">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" className="w-full pl-10 border-2 rounded-sm px-3 py-2.25" placeholder="https://www.xyz.com" />
          </div>
          
        </div>
        </div>
              <div
        className={`${geist.className} text-[#191C1E] border-b border-[#C6C6CD]/50 font-bold uppercase text-lg pt-12 pb-2`}
      >
             </div>

             <div className={`${geist.className} text-lg font-semibold flex justify-end gap-6`}>
                <button className="border-[#191C1E] border-2 text-[#191C1E] px-4 py-2 rounded-lg">Reset</button>
                <button className="text-white bg-[#00687A] px-4 py-2 rounded-lg flex gap-2 items-center justify-center"><span><Save /></span>Sava Changes</button>
             </div>
      </div>
    </div>
  );
}
