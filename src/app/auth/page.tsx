"use client"
import {  Geist, Lato, Libertinus_Serif, Noto_Sans_Limbu, Poppins } from "next/font/google";
import Image from "next/image";
const libreSerif = Libertinus_Serif({
    subsets : ["latin"],
    weight : ["400","700"]
})
const geist = Geist({
    subsets : ['latin']
})
const poppins = Poppins({
    subsets : ['latin'],
    weight  : ['400', '600']
})
const lato = Lato({
    subsets : ['latin'],
    weight : ['400', '700']
})

export default  function page() {
  return (
    <div className=" flex h-full mt-8 mb-8 items-center justify-center">
      <div className="flex w-[67vw] h-[80vh]  justify-between rounded-md bg-[#F7F9FB] drop-shadow-lg">
        <div className="relative rounded-l-lg z-10 w-[33vw] overflow-hidden">
        <div className="opacity-50 absolute inset-0 bg-[url('/images/auth.jpeg')] bg-cover bg-center "></div>
        <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle,_#00687A,_#191C1E)]">
            </div>
            <div className="flex flex-col h-full justify-between">
                <div className="mx-8 mt-7 flex gap-5 items-center">
                    <div className="z-200">
                    <Image src="/images/logo.svg" className="rounded-lg select-none z-140" alt="logo" width={70} height={70} />
                    </div>
                    <div className={`${lato.className} z-40 text-4xl text-white font-bold uppercase tracking-widest`}>
                        DevLog
                    </div>
                </div>

                <div className={`${lato.className} text-2xl z-40 font-light text-white m-12`}>
                    A place for developer to grow together.
                </div>
            </div>
        </div>
        <div className="w-1/2">
            <div className="flex flex-col mt-6 mx-5 gap-2  text-left justify-center ">
                <div className={`${poppins.className} text-[#191C1E] text-3xl font-semibold`}>Welcome</div>
                <div className={`${poppins.className} text-lg font-medium text-[#45464D]`}>SignUp to your Devlog Account</div>
            </div>
            <div>
                <div>SIGNUP</div>
                <div>LOGIN</div>
            </div>
            <div className="mt-12 mx-5">
                <div className="flex flex-col">
                    <label>Email</label>
                    <input type="text" placeholder="" />
                </div>
                <div className="flex flex-col"> 
                    <label>Password</label>
                    <input type="text" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Confirm Password</label>
                    <input type="text" />
                </div>
                <div>
                    <button>Submit</button>
                </div>
                <div>
                    continue with google 
                </div>
                <div>
                    continue with github
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
