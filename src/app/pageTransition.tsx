import { motion } from "framer-motion";
import { Libertinus_Sans } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LibreSans = Libertinus_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
export default function Loading({ children }: { children: any }) {
  const PathName = usePathname();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [PathName]);
  return (
    <>
      {loading ? (
        <div className="flex w-full flex-1 justify-center items-center">
          <div className="w-[600px] flex flex-col items-center">
            <div className="flex justify-center items-end gap-3 mb-8">
              <motion.div
                animate={{ opacity: [1, 0.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-4 rounded-full   bg-[#2D2D2D]"
              />
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
                className="w-3 h-6 rounded-full bg-[#00687A]"
              />
              <motion.div
                animate={{ opacity: [1, 0.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-10 rounded-full bg-[#2D2D2D]"
              />
              <motion.div
                animate={{ opacity: [1, 0.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-14 rounded-full bg-[#00687A]"
              />
            </div>
            <div
              className={`${LibreSans.className} text-[#191C1E]  text-lg sm:text-2xl`}
            >
              Follow me on Github, While you wait! :)
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
