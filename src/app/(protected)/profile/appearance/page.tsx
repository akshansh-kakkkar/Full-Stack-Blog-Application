import { Geist } from "next/font/google"

const geist = Geist({
    subsets : ['latin']
})
export default function Appearance(){
    return(
        <div className="mx-22">          <div className="flex flex-col gap-4 border-[#C6C6CD] border-b-2 pb-2">
            <div
              className={`${geist.className}   text-[#2D2D2D] text-4xl font-semibold`}
            >
              Edit Profile
            </div>
            <div className={`${geist.className} text-[#45464D]`}>
              Manage your public presence and developer identity.
            </div>
          </div></div>
    )
} 