"use client";
import { useSession } from "@/lib/auth-client";
import {
  CloudUpload,
  Info,
  Loader2,
  ScanFace,
  Trash,
  Upload,
} from "lucide-react";
import { Geist, JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const geist = Geist({
  subsets: ["latin"],
});
const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
});
export default function Avatar() {
  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
    });
  };
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [actionFile, setActionFile] = useState<"upload" | "remove" | null>(
    null,
  );
  const { data: sessionData, refetch } = useSession();
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    if (sessionData?.user?.image) {
      setPreview(sessionData.user.image);
    }
  }, [sessionData]);
  React.useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectFile = e.target.files?.[0];
    if (!selectFile) return;
    const imageUrl = URL.createObjectURL(selectFile);
    if (!selectFile) return;
    const maxsize = 2 * 1024 * 1024;
    if (selectFile.size > maxsize) {
      toast.error("Image must be less than 2 MB");
      return;
    }
    setPreview(imageUrl);
    fileUpload(selectFile);
  };
  const removeAvatar = async () => {
    try {
      setLoading(true);
      setActionFile("remove");
      const response = await fetch("/api/users/avatar", {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Failed to remove avatar. Try Refreshing this is not my fault");
        return;
      }
      setPreview("");
      await refetch();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success(
        <div>
          Avatar removed successfully
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            href="https://www.linkedin.com/in/akshansh-kakkar-94b945381/"
          >
            Hire this smart guy
          </a>
        </div>,
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. This is clearly not my fault");
    } finally {
      setLoading(false);
      setActionFile(null);
    }
  };
  const fileUpload = async (selectedFile: File) => {
    try {
      setLoading(true);
      setActionFile("upload");
      const base64 = await convertToBase64(selectedFile);
      const response = await fetch("/api/users/avatar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64,
        }),
      });
      if (!response.ok) {
        toast.error("Upload Failed. Try refreshing this is not my fault.");
        return;
      }
      toast.success(
        <div>
          <span>Avatar Uploaded Successfully{" "}</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            href="https://www.linkedin.com/in/akshansh-kakkar-94b945381/"
          >
            Hire this smart guy
          </a>
        </div>,
      );
      await refetch();
    } catch (error) {
      return toast.error("Something Went Wrong. This is clearly not my fault");
    } finally {
      setLoading(false);
      setActionFile(null);
    }
  };
  return (
    <div>
      {loading ? (
        <div className=" flex justify-center items-center  h-[80vh]">
          <Loader2
            strokeWidth={2}
            size={48}
            className="text-2xl animate-spin text-[#00687A]"
          />
        </div>
      ) : (
        <div className="md:mx-22  ">
          <div className="flex  sm:justify-start justify-center flex-col gap-4 border-[#C6C6CD] border-b-2 pb-2 ">
            <div
              className={`${geist.className} text-[#2D2D2D] text-4xl font-semibold`}
            >
              Avatar Management
            </div>
            <div className={`${geist.className} text-[#45464D]`}>
              Manage your profile picture and personal branding.
            </div>
          </div>
          <div className="flex gap-8 w-full md:w-[60vw] flex-col my-8 justify-center">
            <div className="bg-[#FFFFFF] border-2 border-[#E0E3E5] md:flex-row flex-col  p-12 gap-8 items-center rounded-lg flex w-full md:h-[40vh] shadow-lg   ">
              <div className="w-[220px] h-[220px] relative">
                {preview ? (
                  <Image
                    className="rounded-xl border-7 object-cover border-[#E0E3E5] "
                    src={preview}
                    alt="React"
                    fill
                  />
                ) : (
                  <div
                    className={`flex justify-center h-full bg-[#00687A] rounded-lg text-white items-center text-center text-9xl ${geist.className}`}
                  >
                    {sessionData?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="gap-4 flex flex-col">
                <div
                  className={`text-4xl ${geist.className} font-semibold text-[#191C1E]  `}
                >
                  Your Profile Photo
                </div>
                <div
                  className={`text-[#C6C6CD] ${jetBrains.className} text-md`}
                >
                  PNG, JPG, JPEG, WebP. Max Size 2 MB
                </div>
                <div className="flex md:flex-row flex-col gap-4 items-center ">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className={`flex  rounded-sm  items-center  text-white px-6 py-3 gap-2 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#00687A] hover:opacity-90 cursor-pointer"}`}
                  >
                    <span>
                      <Upload />
                    </span>
                    <span>
                      {loading ? (
                        actionFile === "upload" ? (
                          <div>Uploading...</div>
                        ) : (
                          <div>Removing...</div>
                        )
                      ) : (
                        <div>Choose New Picture</div>
                      )}
                    </span>
                  </button>
                  <button
                    onClick={removeAvatar}
                    disabled={loading || !preview}
                    className={`flex w-full  md:w-fit gap-2 border-2 px-6 py-2.5 text-[#191C1E] rounded-sm border-[#191C1E]  items-center ${loading || !preview ? "border-gray-500 text-gray-400 cursor-not-allowed" : "border-[#191C1E] text-[#191C1E] hover:bg-gray-100 cursor-pointer"}`}
                  >
                    <span>
                      <Trash />
                    </span>
                    <span>Remove Avatar</span>
                  </button>
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                if (!loading) {
                  fileInputRef.current?.click();
                }
              }}
              className={`${loading ? "cursor-not-allowed opacity-60 border-gray-300" : "cursor-pointer hover:border-[#00687A] border-[#C6C6CD]"} flex flex-col  justify-center w-full   border-dashed md:h-[40vh] p-12 gap-4 items-center rounded-xl  transition-all duration-300  border-4 `}
            >
              <div className="p-4 bg-[#E6E8EA] rounded-full">
                <CloudUpload size={64} className="text-[#76777D]  " />
              </div>
              <div className={`flex justify-center items-center flex-col `}>
                <div
                  className={`${geist.className} text-lg font-bold text-[#191C1E]`}
                >
                  Drag and drop your avatar here
                </div>
                <div
                  className={`${jetBrains.className} text-sm font-medium text-[#45464D]`}
                >
                  or click to browse your files
                </div>
              </div>
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              hidden
              accept="image/png, image/jpg, image/jpeg, image/webp"
            />

            <div className="flex md:flex-row w-full flex-col gap-6 items-center">
              <div className="flex flex-col w-full gap-4 rounded-sm md:h-[25vh] md:w-1/2 bg-white border p-6">
                <div className="flex gap-3 items-center">
                  <span>
                    <ScanFace size={24} strokeWidth={3} />
                  </span>
                  <span className={`${geist.className} font-bold text-xl`}>
                    Branding Tips
                  </span>
                </div>
                <div
                  className={`${jetBrains.className} font-bold text-[#45464D]`}
                >
                  Consistent Branding will help you stand out in the developer
                  community. A high-contrast head-shot with a clean background
                  is recommended.
                </div>
              </div>
              <div className="flex w-full md:h-[25vh] flex-col gap-4  rounded-sm md:w-1/2 bg-white border p-6">
                <div className="flex gap-3 items-center">
                  <span>
                    <Info size={24} strokeWidth={3} />
                  </span>
                  <span className={`${geist.className} font-bold text-xl`}>
                    Technical Info
                  </span>
                </div>
                <div>
                  <ul
                    className={`list-disc px-6 text-[#C6C6CD] ${jetBrains.className}`}
                  >
                    <li>Min Resolution : 400x400px</li>
                    <li>Recommended Aspect Ratio : 1:1</li>
                    <li>Formats : PNG, JPG, JPEG, WebP</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
