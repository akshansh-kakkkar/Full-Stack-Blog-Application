"use client";
import { Session } from "better-auth";
import {
  Fingerprint,
  KeyRound,
  Loader2,
  Mail,
  MonitorSmartphone,
} from "lucide-react";
import { Geist, JetBrains_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const geist = Geist({
  subsets: ["latin"],
});
const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
});
export default function Security() {
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("/api/security/sessions");
        const data = await response.json();
        setSessions(data.sessions);
      } catch (error) {
        toast.error(`Something Went Wrong. This is clearly not my fault`);
      } finally {
        setLoadingSessions(false);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex  sm:justify-start justify-center flex-col gap-4 border-[#C6C6CD] border-b-2 pb-2 ">
        <div
          className={`${geist.className} text-[#2D2D2D] text-4xl font-semibold`}
        >
          Security Settings
        </div>
        <div className={`${geist.className} text-[#45464D]`}>
          Manage your account, security, passwords and active sessions.
        </div>
      </div>
      <div className="lg:grid flex flex-col lg:grid-cols-3 gap-7 ">
        <div className="col-span-2 flex flex-col gap-8">
          <div className="bg-white border px-8 flex flex-col gap-4 py-12 w-full  rounded-lg  border-[#C6C6CD]">
            <div className="flex gap- flex-col">
              <div className="flex gap-2 items-center">
                <span>
                  <Mail strokeWidth={2} size={32} className="text-[#191C1E]" />
                </span>
                <span
                  className={`text-2xl ${geist.className} text-[#191C1E] font-semibold`}
                >
                  Change Email
                </span>
              </div>{" "}
              <div className={`${geist.className} text-[#45464D] text-md`}>
                update the primary email address associated with the account.
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className={`${jetBrains.className} font-[600] text-[#191C1E]`}
              >
                Current Email Address
              </label>
              <input
                className="rounded-sm bg-[#F2F4F6] border   border-[#C6C6CD] p-2 text-[#76777D]"
                type="text"
                placeholder="current@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className={`${jetBrains.className} font-[600] text-[#191C1E]`}
              >
                New Email Address
              </label>
              <input
                className="rounded-sm bg-[#F2F4F6] border border-[#C6C6CD] p-2 text-[#76777D]"
                type="text"
                placeholder="new@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className={`${jetBrains.className} font-[600] text-[#191C1E]`}
              >
                One Time Password (OTP)
              </label>
              <div className="flex gap-4">
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((_, index) => (
                    <input
                      maxLength={1}
                      key={index}
                      inputMode="numeric"
                      className="rounded-sm md:w-14 md:h-14 h-7 w-7 border flex justify-center items-center text-center  tracking-widest bg-[#F2F4F6]  border-[#C6C6CD] p-2 text-[#76777D]"
                      type="text"
                    />
                  ))}
                </div>
                <button
                  className={`border-[#00687A] border-2 md:px-8 py-1 px-2 font-bold md:py-2 text-[#00687A] text-sm md:text-xl rounded-sm text-md w-fit ${jetBrains.className}`}
                >
                  SEND
                </button>
              </div>
            </div>
            <button
              className={`bg-[#00687A] px-5 py-3 text-white rounded-sm text-xl w-fit ${jetBrains.className}`}
            >
              Update Email
            </button>
          </div>
          <div className="bg-white border px-8 flex flex-col gap-4 py-12 w-full  rounded-lg  border-[#C6C6CD]">
            <div className="flex gap- flex-col">
              <div className="flex gap-2 items-center">
                <span>
                  <KeyRound
                    strokeWidth={2}
                    size={32}
                    className="text-[#191C1E]"
                  />
                </span>
                <span
                  className={`text-2xl ${geist.className} text-[#191C1E] font-semibold`}
                >
                  Change Email
                </span>
              </div>{" "}
              <div className={`${geist.className} text-[#45464D] text-md`}>
                Ensure your account is using a long , random password to stay
                secure.
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className={`${jetBrains.className} font-[600] text-[#191C1E]`}
              ></label>
              <input
                placeholder="••••••••••••••••"
                className={` text-[#76777D] text-[#] border  text-[#191C1E] rounded-sm bg-[#F2F4F6]  text-lg  p-2 `}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className={`${jetBrains.className} font-[600] text-[#191C1E]`}
              >
                New Password Passowrd
              </label>
              <input
                placeholder="••••••••••••••••"
                className={` text-[#76777D] text-[#] border text-[#191C1E] rounded-sm bg-[#F2F4F6]  text-lg  p-2`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className={`${jetBrains.className} font-[600] text-[#191C1E]`}
              >
                Confirm New Passowrd
              </label>
              <input
                placeholder="••••••••••••••••"
                className={` text-[#76777D] text-[#]  border text-[#191C1E] rounded-sm bg-[#F2F4F6]  text-lg  p-2 `}
              />
            </div>
            <button
              className={`bg-[#00687A] px-5 py-3 text-white rounded-sm text-xl w-fit ${jetBrains.className}`}
            >
              Update Password
            </button>
          </div>
          <div className="bg-white border px-8 flex flex-col gap-4 py-12 w-full  rounded-lg  border-[#C6C6CD]">
            <div className="flex flex-col md:flex-row justify-center text-center md:justify-start md:text-start gap-2 items-center">
              <span>
                <Fingerprint
                  strokeWidth={2}
                  size={32}
                  className="text-[#191C1E]"
                />
              </span>
              <span
                className={`text-2xl ${geist.className} flex flex-col md:flex-row gap-4 text-[#191C1E] font-semibold`}
              >
                <span>Two Factor Authentication</span>
                <span className="text-[#76777D] font-medium">(Optional)</span>
              </span>
            </div>{" "}
            <div className="bg-[#E0E3E5] w-fit px-2 py-1 text-sm text-[#45464D] rounded-xs">
              NOT ENABLED
            </div>
            <div className={`text-xl text-[#45464D]`}>
              Add an additional layer of security to your account by requiring
              more than just a passoword to sign in. 2FA is strongly
              recommended.
            </div>
            <button
              className={`bg-[#191C1E] px-5 py-3 text-white rounded-sm text-xl w-fit ${jetBrains.className}`}
            >
              Enable{" "}
            </button>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-8">
          <div className="bg-white border px-8 flex flex-col gap-4 py-6 w-full  rounded-lg  border-[#C6C6CD]">
            <div className={`${jetBrains.className} uppercase `}>
              Security Health
            </div>
            <div className="flex justify-center  items-center">
              <div className="h-40 w-40 flex justify-center items-center bg-[#00687A] rounded-full">
                <div className="h-25 w-25 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white h-[800px] border px-8 flex flex-col gap-4 py-6 w-full  rounded-lg  border-[#C6C6CD]">
            <div
              className={`${jetBrains.className} uppercase flex flex-col flex-1 gap-4 `}
            >
              <div className="flex justify-between border-b-2 pb-4">
                <div>Active Sessions</div>
                <div>
                  <MonitorSmartphone />
                </div>
              </div>

              {loadingSessions ? (
                <div className=" flex-1 flex  justify-center items-center text-center">
                  <Loader2
                    className="text-xl animate-spin text-[#00687A]"
                    strokeWidth={2}
                  />
                </div>
              ) : sessions.length === 0 ? (
                <div>No active sessions</div>
              ) : (
                sessions.map((session) => {
                  const browser = session.userAgent?.includes("Chrome")
                    ? "Google Chrome"
                    : session.userAgent?.includes("FireFox")
                      ? "Firefox"
                      : session.userAgent?.includes("Safari")
                        ? "Safari"
                        : "Unknown Browser";
                  const device = session.userAgent?.includes("Linux")
                    ? "Linux PC"
                    : session.userAgent?.includes("Windows")
                      ? "Windows PC"
                      : session.userAgent?.includes("Macintosh")
                        ? "Mac"
                        : session.userAgent?.includes("Android")
                          ? "Android"
                          : session.userAgent?.includes("iPhone")
                            ? "IPhone"
                            : "Unknown Device";
                  return (
                    <div key={session.id}>
                      <div className="flex border p-4 flex-col gap-2 rounded-lg justify-between py-4">
                        <div>{browser}</div>
                        <div>{device}</div>
                        <div>{"Session"}</div>
                        <div>
                          {new Date(session.createdAt).toLocaleString()}
                        </div>
                        <div>
                          Expire: {new Date(session.expiresAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
                              <div className="flex justify-center py-2 rounded items-center text-center bg-[#BA1A1A]  text-white">
          <span className={`${jetBrains.className} text-xl`}>
            Revoke All Sessions
          </span>
        </div>
          </div>

        </div>

      </div>
    </div>
  );
}
