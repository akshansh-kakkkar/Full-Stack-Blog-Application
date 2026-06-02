import { BrushCleaning } from "lucide-react"
import { Geist } from "next/font/google"
import Link from "next/link"

const geist = Geist({
    subsets : ['latin']
})
export default function(){
    return (
        <div className="flex justify-center  h-[90vh] items-center ">
            <div className="bg-white flex gap-3 flex-col justify-center items-center p-12 border-2 rounded-xl">
                <div className="text-2xl"><BrushCleaning size={64} /></div>
                <div className={`text-2xl text-[#00697A] font-bold ${geist.className}`}>This is a dummy Page. Click <Link href={'https://github.com/akshansh-kakkkar/'} target="_blank" rel="noopener norefferer" className="underline">here</Link></div>
            </div>
        </div>
    )
}