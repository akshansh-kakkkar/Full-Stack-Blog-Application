import { useSession } from "@/lib/auth-client";
import { X } from "lucide-react";
import { Geist } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
const geist = Geist({
  subsets: ["latin"],
});
interface InterfaceBioModelProps {
  open: boolean;
  onClose: () => void;
  bio: string;
  name: string;
}
export default function BioModal({
  open,
  onClose,
  bio,
  name,
}: InterfaceBioModelProps) {
  const { data: session } = useSession();
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="inset-0  fixed bg-black/50 flex items-center justify-center z-50"
    >
      <div
        className="bg-white p-6 rounded-xl max-h-[600px] min-w-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b p-2 text-3xl font-bold">
          <div className="flex justify-between gap-12 items-center">
            <div className="flex gap-2 items-center">
              {session?.user.image ? (
                <Image
                  alt="user image"
                  src={session?.user?.image}
                  width={56}
                  height={56}
                  className="rounded-xl border-2 border-[#00687A]"
                />
              ) : (
                <div
                  className={`rounded-xl text-white flex justify-center items-center font-medium h-12 w-12 bg-[#00687A] ${geist.className}`}
                >
                  {session?.user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col gap-">
              <div className="text-xl font-medium text-left text-[#45464D]">
                {session?.user.name}
              </div>
              <div className="text-sm font-medium text-left text-[#76777D]">
                {session?.user.email}
              </div>
              </div>
            </div>
            <div>
              <X size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
