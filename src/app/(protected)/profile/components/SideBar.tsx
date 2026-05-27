"use client";
import { signOut } from "@/lib/auth-client";
import {
  CircleUser,
  Cog,
  ContactRound,
  LogOut,
  OctagonAlert,
  Palette,
  Settings,
  ShieldUser,
  UserRoundCog,
  UserRoundPen,
} from "lucide-react";
import {
  Geist,
  JetBrains_Mono,
  Libertinus_Sans,
  Poppins,
} from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "800"],
});
const geist = Geist({
  subsets: ["latin"],
});
const Libertinus = Libertinus_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const JetBrains = JetBrains_Mono({
  subsets: ["latin"],
});
const SideBar = () => {

  const pathName = usePathname();
  const router = useRouter();
  return (
    <div className="w-[280px] md:block hidden fixed left-0 top-[82px] bg-white h-[90vh] border-r">
      <div className="flex gap-2 flex-col">
        <div
          className={`mt-12 ml-7 text-lg text-[#76777D] items-center capitalize uppercase flex gap-3 ${Libertinus.className} `}
        >
          <span>
            <Settings />
          </span>
          Settings
        </div>
      </div>
      <div className="ml-12 mt-6">
        <Link
          className={`${pathName === "/profile" ? "  w-[185px] bg-[#00687A]  text-white p-2  rounded-lg" : " hover:bg-accent "} p-2 rounded-lg flex justify-start transition-all duration-300 gap-2 items-center text-[#45464D]  text-center text-md ${poppins.className} font-medium`}
          href={"/profile"}
        >
          <span>
            <CircleUser />
          </span>
          <span>Profile Overview</span>
        </Link>
      </div>
      <div className="flex gap-2">
        <div
          className={` flex  text-xl mt-6 gap-3 ml-7 text-[#76777D] items-center capitalize uppercase ${Libertinus.className}`}
        >
          <span>
            <UserRoundCog />
          </span>
          <span>User Settings</span>
        </div>
      </div>
      <div className="ml-12 flex flex-col gap-2 mt-6">
        <Link
          className={`${pathName === "/profile/edit" ? "bg-[#00687A] w-[185px] text-white p-2 rounded-lg" : "hover:bg-accent"} w-[185px] p-2 rounded-lg flex 2 justify-start transition-all gap-2  duration-300 font-medium items-center text-[#45464D] text-center text-md ${poppins.className} `}
          href={"profile/edit"}
        >
          <span>
            <UserRoundPen />
          </span>
          <span>Edit Profile</span>
        </Link>
        <Link
          href={"/profile/picture"}
          className={`${pathName === "/profile/picture" ? "bg-[#00687A] text-white p-2  rounded-lg " : "hover:bg-accent"} justify-start p-2 w-[185px] rounded-lg flex gap-2 transition-all duration-300 font-medium items-center text-[#45464d] text-center text-md  ${poppins.className}`}
        >
          <span>
            <ContactRound />
          </span>
          <span>Avatar</span>{" "}
        </Link>
        <Link
          className={` ${pathName === "/profile/security" ? "bg-[#00687A] text-white p-2 rounded-lg  " : "hover:bg-accent"} flex gap-2 font-medium items-center justify-start p-2 w-[185px] rounded-lg text-[#45464D] text-center transition-all duration-300 text-md ${poppins.className}`}
          href={"/profile/security"}
        >
          <span>
            <ShieldUser />
          </span>
          <span>Security</span>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <div
          className={`flex  mt-6 gap-3  text-lg ml-7 text-[#76777D] items-center capitalize uppercase ${Libertinus.className}`}
        >
          <span>
            <Cog />
          </span>
          <span>Others</span>
        </div>
        <div className="flex flex-col gap-2 ml-12 mt-2 ">
          <Link
            href={"/profile/appearance"}
            className={`${pathName === "/profile/appearance" ? "bg-[#00687A] text-white p-2 rounded-lg" : "hover:bg-accent"} p-2 w-[185px]  flex gap-2 font-medium transition-all duration-300 items-center text-[#45464D] text-center text-md rounded-lg ${poppins.className}`}
          >
            <span>
              <Palette />
            </span>
            <span>Appearence</span>
          </Link>
          <Link
            href={"/profile/accountdeletion"}
            className={`${pathName === "/profile/accountdeletion" ? "bg-[00687A]  p-2 text-white rounded-lg" : "hover:bg-accent"} transition-all duration-300 p-2 w-[185px]  rounded-lg text-md flex gap-2 font-medium items-center text-[#45464D] text-center  ${poppins.className}`}
          >
            <span>
              <OctagonAlert />
            </span>
            <span>Danger zone</span>
          </Link>
        </div>
      </div>
      <div className="border-1 w-full mt-18"></div>
      <div className="mt-4 ml-7 flex items-center gap-6 hover:bg-accent cursor-pointer p-2 w-[185px] rounded-lg">
        <span>
          {" "}
          <LogOut
            onClick={() => {
              signOut();
              router.push("/");
            }}
            size={36}
            className="text-red-500 p-2 rounded-full cursor-pointer "
          />
        </span>
        <span className={`${poppins.className} font-medium text-red-500`}>Logout</span>
      </div>
    </div>
  );
};

export default SideBar;
