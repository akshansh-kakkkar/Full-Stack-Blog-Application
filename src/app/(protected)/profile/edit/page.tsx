"use client";
import { useSession } from "@/lib/auth-client";
import { github } from "better-auth";
import { Globe, Info, Loader2, MapPin, Save } from "lucide-react";
import { Geist } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const geist = Geist({
  subsets: ["latin"],
});

export default function EditProfile() {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    gitHubUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    websiteUrl: "",
  });

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        toast.error("Profile Update Failed! Please try again after refresh");
        return;
      }
      toast.success(
        <div>
        <span> Profile Updated Successfully. </span> 
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            href="https://github.com/akshansh-kakkkar"
          >
            Hire this smart guy
          </a>
        </div>,
      );
    } catch (error) {
      toast.error("Something Went Wrong.");
    } finally {
      setSaving(false);
    }
  };
  const [initialState, setInitialState] = useState({
    name: "",
    bio: "",
    location: "",
    gitHubUrl: "",
    linkedinUrl: "",
    websiteUrl: "",
    instagramUrl: "",
  });

  const session = useSession();
  const userId = session.data?.user.id;
  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        const profileData = {
          name: data.name || "",
          bio: data.bio || "",
          location: data.location || "",
          gitHubUrl: data.gitHubUrl || "",
          instagramUrl: data.instagramUrl || "",
          websiteUrl: data.websiteUrl || "",
          linkedinUrl: data.linkedinUrl || "",
        };
        setFormData(profileData);
        setInitialState(profileData);
      } catch (error) {
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);
  const handleReset = () => {
    try {
      setLoading(true);
      setFormData(initialState);
      toast.error(
        <div>
         <span> Cancelled. </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            href="https://www.linkedin.com/in/akshansh-kakkar-94b945381/"
          >
             Hire this Smart Guy
          </a>
        </div>,
      );
    } catch (error) {
      toast.error("Data reset unsuccessfull please try again!");
    } finally {
      setLoading(false);
    }
  };
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialState);
  return (
    <>
      {loading || saving ? (
        <div className="flex justify-center items-center h-full">
          <Loader2
            size={48}
            strokeWidth={2}
            className="text-2xl text-[#00687A] animate-spin"
          />
        </div>
      ) : (
        <div className="sm:mx-22">
          <div className="flex flex-col gap-4 border-[#C6C6CD] border-b-2 pb-2">
            <div
              className={`${geist.className}   text-[#2D2D2D] text-4xl font-semibold`}
            >
              Edit Profile
            </div>
            <div className={`${geist.className} text-[#45464D]`}>
              Manage your public presence and developer identity.
            </div>
          </div>
          <div
            className={`${geist.className} text-[#191C1E] border-b border-[#C6C6CD]/50 font-bold uppercase text-lg pt-6 pb-2`}
          >
            PERSONAL INFORMATION
          </div>
          <div className="pt-6 gap-4 flex flex-col">
            <div className=" flex gap-1.5 flex-col">
              <label
                htmlFor=""
                className={`${geist.className} text-md font-semibold`}
              >
                Display Name
              </label>
              <input
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
                className="flex  xl:w-[72%] bg-white border-2 rounded-sm px-3 py-2.25"
                placeholder="John Doe"
                type="text"
              />
              <div
                className={`${geist.className} text-[#76777D] text-sm flex items-center gap-1 text-center`}
              >
                <span>
                  <Info size={16} />
                </span>{" "}
                Your name as it will appear on posts and comments.
              </div>
            </div>
            <div className=" flex gap-1.5 flex-col">
              <label
                htmlFor=""
                className={`${geist.className} text-md font-semibold`}
              >
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => {
                  setFormData({ ...formData, bio: e.target.value });
                }}
                className={`flex  bg-white xl:w-[72%] border-2 rounded-sm max-h-[250px] min-h-[50px] px-3 py-2.25 ${geist.className}`}
                placeholder="John doe is a really great guy even though every form uses his name but he never feels bad about it ...."
              />
              <div
                className={`${geist.className} text-[#76777D] text-sm flex gap-1 items-center `}
              >
                <span>
                  <Info size={16} />
                </span>
                Breif description about your expertise.
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 xl:w-[72%]">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor=""
                  className={`${geist.className} text-md font-semibold`}
                >
                  Location (optional)
                </label>
                <div className="relative w-[100%] ">
                  <MapPin className="absolute left-3  top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    value={formData.location}
                    onChange={(e) => {
                      setFormData({ ...formData, location: e.target.value });
                    }}
                    type="text"
                    className="w-full pl-10   bg-white border-2 rounded-sm px-3 py-2.25"
                    placeholder="Vermont, USA"
                  />
                </div>
              </div>
            </div>
            <div
              className={`${geist.className} text-[#191C1E] border-b border-[#C6C6CD]/50 font-bold uppercase text-lg pt-12 pb-2`}
            >
              Social Links{" "}
            </div>
            <div className="md:grid flex flex-col md:grid-cols-2 gap-6 mt-4 xl:w-[72%]">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor=""
                  className={`${geist.className} text-md font-semibold`}
                >
                  Github (optional)
                </label>
                <div className="relative w-[100%] ">
                  <Image
                    src="/images/github.png"
                    width={30}
                    height={30}
                    alt="Github"
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="text"
                    onChange={(e) => {
                      setFormData({ ...formData, gitHubUrl: e.target.value });
                    }}
                    value={formData.gitHubUrl}
                    className="w-full pl-10  border-2 rounded-sm bg-white px-3 py-2.25"
                    placeholder="https://github.com/xyz/"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor=""
                  className={`${geist.className} text-md font-semibold`}
                >
                  Linkedin (optional)
                </label>
                <div className="relative w-[100%]">
                  <Image
                    src="/images/linkedin.png"
                    width={30}
                    height={30}
                    alt="Linkedin"
                    className="absolute left-2 bg-white top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="text"
                    value={formData.linkedinUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, linkedinUrl: e.target.value });
                    }}
                    className="w-full pl-10 bg-white border-2 rounded-sm px-3 py-2.25"
                    placeholder="https://www.linkedin.com/in/xyz"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor=""
                  className={`${geist.className} text-md font-semibold`}
                >
                  Instagram (optional)
                </label>
                <div className="relative w-[100%]">
                  <Image
                    src="/images/instagram.png"
                    width={30}
                    height={30}
                    alt="Instagram"
                    className="absolute left-2  top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="text"
                    value={formData.instagramUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, instagramUrl: e.target.value })
                    }
                    className="w-full pl-12 border-2 bg-white  rounded-sm px-3 py-2.25"
                    placeholder="https://www.instagram.com/xyz"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor=""
                  className={`${geist.className} text-md font-semibold`}
                >
                  Website URL (optional)
                </label>
                <div className="relative w-[100%]">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={formData.websiteUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, websiteUrl: e.target.value })
                    }
                    className="w-full pl-10 border-2 bg-white rounded-sm px-3 py-2.25"
                    placeholder="https://www.xyz.com"
                  />
                </div>
              </div>
            </div>
            <div
              className={`${geist.className} text-[#191C1E] border-b border-[#C6C6CD]/50 font-bold uppercase text-lg pt-12 pb-2`}
            ></div>

            <div
              className={`${geist.className} text-lg font-semibold flex justify-end gap-6`}
            >
              <button
                disabled={!hasChanges || saving}
                onClick={handleReset}
                className={` border-2  px-4 py-2 rounded-lg ${!hasChanges || saving ? "text-gray-400 border-gray-400 cursor-not-allowed" : "text-[#191C1E] border-[#191C1E] cursor-pointer"}`}
              >
                Cancel
              </button>
              <motion.button
                onClick={handleSave}
                type="button"
                disabled={!hasChanges || saving}
                className={`text-white   px-4 py-2 rounded-lg flex gap-2 items-center justify-center ${!hasChanges || saving ? "bg-gray-400 cursor-not-allowed" : "bg-[#00687A] hover:bg-[#004d5a] cursor-pointer"}`}
              >
                <span>
                  <Save />
                </span>
                Sava Changes
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
