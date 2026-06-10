import { Clock, Eye, FilesIcon, SquareChartGantt, TrendingUp } from "lucide-react";
import { Geist, JetBrains_Mono, Libertinus_Sans } from "next/font/google";
const libretinusSans = Libertinus_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const geist = Geist({
  subsets: ["latin"],
});
const jetbrains = JetBrains_Mono({
    subsets : ['latin']
})
export default function Page() {
  const cards = [
    {
      title : "Total Posts",
      value : 124,
      
    }
  ]
  return (
    <div className="mt-12 px-12 lg:px-22 flex-col flex gap-6 ">
      <div className="flex  sm:justify-start justify-center flex-col gap-4 border-[#C6C6CD] border-b-2 pb-2 ">
        <div
          className={`${geist.className} text-[#2D2D2D] text-4xl font-semibold`}
        >
          Posts Management
        </div>
        <div className={`${geist.className} text-[#45464D]`}>
          Review and Manage your posts and documentations{" "}
        </div>
      </div>
      <div className=" hidden sm:grid  grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        <div className="sm:col-span-1 border flex flex-col gap-2 border-[#C6C6CD] bg-white p-6 rounded-lg">
            <div className={`${jetbrains.className} font-medium text-xl text-[#76777D]`}>Total Posts</div>
            <div className={`${geist.className} text-4xl font-semibold`} >124</div>
            <div className="flex gap-2 text-[#00687A]">
                <span><TrendingUp /></span>
                <span className={`${geist.className}`}>+12% from last month</span>
            </div>
        </div>
                <div className="sm:col-span-1 border flex-col gap-2 border-[#C6C6CD] bg-white p-6 rounded-lg">
            <div className={`${jetbrains.className} font-medium text-xl text-[#76777D]`}>Total Reads</div>
            <div className={`${geist.className} text-4xl font-semibold`} >12.8 K</div>
            <div className="flex gap-2 text-[#00687A]">
                <span><Eye /></span>
                <span className={`${geist.className}`}>Consistent growth</span>
            </div>
        </div>
                <div className="sm:col-span-1 border flex flex-col gap-2 border-[#C6C6CD] bg-white p-6 rounded-lg">
            <div className={`${jetbrains.className} font-medium text-xl text-[#76777D]`}>Avg. Read Time</div>
            <div className={`${geist.className} text-4xl font-semibold`} >6.4,m</div>
            <div className="flex gap-2 text-[#76777D]">
                <span><SquareChartGantt /></span>
                <span className={`${geist.className}`}>Content focus</span>
            </div>
        </div>
                <div className="sm:col-span-1 border flex-col gap-2 border-[#C6C6CD] bg-white p-6 rounded-lg">
            <div className={`${jetbrains.className} font-medium text-xl text-[#76777D]`}>Drafts Pending</div>
            <div className={`${geist.className} text-4xl font-semibold`} >8</div>
            <div className="flex gap-2 text-[#93000A]">
                <span><Clock /></span>
                <span className={`${geist.className}`}>Your review required</span>
            </div>
        </div>
      </div>
      <div className={`sm:hidden flex `}>

      </div>
    </div>
  );
}
