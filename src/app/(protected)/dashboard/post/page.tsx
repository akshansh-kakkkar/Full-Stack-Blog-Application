"use client";
import {
  Clock,
  Eye,
  FilesIcon,
  SquareChartGantt,
  TrendingUp,
} from "lucide-react";
import { Geist, JetBrains_Mono, Libertinus_Sans } from "next/font/google";
import { useState } from "react";
import {motion} from "framer-motion"
const libretinusSans = Libertinus_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const geist = Geist({
  subsets: ["latin"],
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
});
export default function Page() {
  const cards = [
    {
      title: "Total Posts",
      value: 124,
      icon: <TrendingUp />,
      text: "+12% from the last month",
      color: "text-[#00687A]",
    },
    {
      title: "Total Reads",
      value: "12.8 K",
      icon: <Eye />,
      color: "text-[#00687A]",
      text: "Consistent growth",
    },
    {
      title: "Avg. Read Time",
      value: "6.4m",
      icon: <SquareChartGantt />,
      color: "text-[#76777D]",
      text: "Content focus",
    },
    {
      title: "Drafts Pending",
      value: 8,
      icon: <Clock />,
      color: "text-[#93000A]",
      text: "Your review required",
    },
  ];
  const [currentCard, setCurrentCard] = useState(0);
  return (
    <div className="lg:mt-12  mt-4 px-4 lg:px-22 flex-col flex gap-6 ">
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
      <div
        className={`text-2xl font-semibold border-b-4  rounded-xs border-[#00687A] flex w-fit px-1 ${geist.className}`}
      >
        Quick Stats
      </div>
      <div className=" hidden sm:grid  grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        <div className="sm:col-span-1 border flex flex-col gap-2 border-[#C6C6CD] bg-white p-6 rounded-lg">
          <div
            className={`${jetbrains.className} font-medium text-xl text-[#76777D]`}
          >
            Total Posts
          </div>
          <div className={`${geist.className} text-4xl font-semibold`}>124</div>
          <div className="flex gap-2 text-[#00687A]">
            <span>
              <TrendingUp />
            </span>
            <span className={`${geist.className}`}>+12% from last month</span>
          </div>
        </div>
        <div className="sm:col-span-1 border flex flex-col gap-2 border-[#C6C6CD] bg-white p-6 rounded-lg">
          <div
            className={`${jetbrains.className} font-medium text-xl text-[#76777D]`}
          >
            Total Reads
          </div>
          <div className={`${geist.className} text-4xl font-semibold`}>
            12.8 K
          </div>
          <div className="flex gap-2 text-[#00687A]">
            <span>
              <Eye />
            </span>
            <span className={`${geist.className}`}>Consistent growth</span>
          </div>
        </div>
        <div className="sm:col-span-1 border flex flex-col gap-2 border-[#C6C6CD] bg-white p-6 rounded-lg">
          <div
            className={`${jetbrains.className} font-medium text-xl text-[#76777D]`}
          >
            Avg. Read Time
          </div>
          <div className={`${geist.className} text-4xl font-semibold`}>
            6.4m
          </div>
          <div className="flex gap-2 text-[#76777D]">
            <span>
              <SquareChartGantt />
            </span>
            <span className={`${geist.className}`}>Content focus</span>
          </div>
        </div>
        <div className="sm:col-span-1 border flex flex-col gap-2 border-[#C6C6CD] bg-white p-6 rounded-lg">
          <div
            className={`${jetbrains.className} font-medium text-xl text-[#76777D]`}
          >
            Drafts Pending
          </div>
          <div className={`${geist.className} text-4xl font-semibold`}>8</div>
          <div className="flex gap-2 text-[#93000A]">
            <span>
              <Clock />
            </span>
            <span className={`${geist.className}`}>Your review required</span>
          </div>
        </div>
      </div>
      <div className={`sm:hidden `}>
        <motion.div
        drag="x"
        dragConstraints={{left:0, right:0}}
        onDragEnd={(_, info)=>{
          if(info.offset.x < -50){
            setCurrentCard((prev)=> prev === cards.length  -1 ? 0 : prev + 1)
          }
          if(info.offset.x > 50){
            setCurrentCard((prev)=> prev ===0 ? cards.length -1 : prev-1 )
          }
        }}
         className="border bg-white border-[#C6C6CD] flex gap-4 flex-col p-3 rounded-lg">
          <div
            className={`${jetbrains.className} font-medium text-xl text-[#76777D]`}
          >
            {cards[currentCard].title}
          </div>
          <div className={`${geist.className} text-4xl font-semibold`}>
            {cards[currentCard].value}
          </div>
          <div className={`${cards[currentCard].color} flex gap-2`}>
            <span>{cards[currentCard].icon}</span>
            <span className={`${geist.className}`}>
              {cards[currentCard].text}
            </span>
          </div>
        </motion.div>
        <div className={`flex justify-center mt-4 items-center gap-2`}>
          {cards.map((_, index)=>(
            <button onClick={()=>setCurrentCard(index)} className={`transition-all rounded-full ${currentCard === index ? "w-6 h-2 bg-[#00687A] " : "w-6 h-2 bg-gray-300"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
