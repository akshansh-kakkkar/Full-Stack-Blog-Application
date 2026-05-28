import { Geist } from "next/font/google"
import Image from "next/image"

const geist = Geist({
    subsets : ['latin']
})
export default function Avatar(){
    return (
        <div className="sm:mx-22 ">
           <div className="flex flex-col gap-4 border-[#C6C6CD] border-b-2 pb-2 ">
            <div className={`${geist.className} text-[#2D2D2D] text-4xl font-semibold`}>
                Avatar Management
            </div>
            <div className={`${geist.className} text-[#45464D]`}>
                Manage your profile picture and personal branding.
            </div>
           </div>
           <div className="flex my-8 justify-center">
           <div className="bg-[#FFFFFF] border-2 border-[#E0E3E5] justify-left p-12 gap-7 items-center rounded-lg flex w-[60vw] h-[40vh] shadow-lg   ">
            <div className="w-[200px] h-[200px] relative">
                <Image className="rounded-lg" src="/images/react.png" alt="React" fill />
            </div>
            <div>
               <div>Your Profile Photo</div>
               <div>PNG, JPG, JPEG, WEBP</div>
            </div>
           </div>
           </div>
        </div>
    )
}