"use client";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, User, X } from "lucide-react";
import Link from "next/link";
import { Lato, Poppins } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import { motion } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialLoading2, setSocialLoading2] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [socialSignInLoading, setSocialSignInLoading] = useState(false);
  const [socialSignInLoading2, setSocialSignInLoading2] = useState(false);
  const [confirmtoggleEye, setConfirmToggleEye] = useState(false);
  const [toggleEye, setToggleEye] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const authType = searchParams.get("mode") === "login";
  const [switchLoading, setSwitchLoading] = useState(false);
  const switchMode = async (mode: "login" | "signup") => {
    if ((mode === "login" && authType) || (mode === "signup" && !authType)) {
      return;
    }
    setSwitchLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    router.push(`/auth?mode=${mode}`);
    setSwitchLoading(false);
  };

  const togglePassword = () => {
    setToggleEye((prev) => !prev);
  };
  const confirmTogglePassword = () => {
    setConfirmToggleEye((prev) => !prev);
  };

  const handleAuth = async () => {
    try {
      setLoading(true);
      if (authType) {
        const response = await signIn.email({
          email,
          password,
        });
        if (response.error) {
          toast.error(response.error.message);
          return;
        }
        router.push("/?toast=login-success");
      } else {
        const nameError = validator("name", name);
        const emailError = validator("email", email);
        const passwordError = validator("password", password);
        const confirmError = validator("confirmPassword", confirmPassword);

        if (nameError || emailError || passwordError || confirmError) {
          setLoading(false);
          return;
        }
        const response = await signUp.email({
          email,
          password,
          name,
        });
        if (response.error) {
          toast.error(response.error.message);
          return;
        }
        router.push("/?toast=signup-success");
      }
    } catch (err: any) {
      toast.error(
        err.message || "something went wrong this is clearly not my fault ",
      );
    } finally {
      setLoading(false);
    }
  };

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const validator = (field: string, value: string) => {
    let error = "";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    switch (field) {
      case "name":
        if (!value.trim()) {
          error = "name is required";
        } else if (value.length < 3) {
          error = "min 3 characters are required";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "email is required";
        } else if (!emailRegex.test(value)) {
          error = "invalid email entered";
        }
        break;
      case "password":
        if (!value.trim()) {
          error = "password is required";
        } else if (value.length < 8) {
          error = "must contain atleast 8 characters";
        } else if (!/[A-Z]/.test(value)) {
          error = "must contain an uppercase letter";
        } else if (!/[0-9]/.test(value)) {
          error = "must contain a number";
        } else if (!/[a-z]/.test(value)) {
          error = "must contain a lowercase letter";
        } else if (!/[!@#$%^&*(),.?"{}|<>]/.test(value)) {
          error = "must contain a special character";
        }
        break;

      case "confirmPassword":
        if (!value.trim()) {
          error = "confirm password is required";
        } else if (value !== password) {
          error = "passwords do not match";
        }
        break;
    }
    setError((prev) => ({
      ...prev,
      [field]: error,
    }));
    return error;
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isSignInFormValid =
    name.trim().length >= 3 &&
    emailRegex.test(email) &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[!@#$%^&*(),.?"{}|<>]/.test(password) &&
    password === confirmPassword;

  const isLoginFormValid = password.length >= 1 && emailRegex.test(email);

  return (
    <>
      {switchLoading ? (
        <div className="flex items-center  justify-center min-h-screen ">
          <div className=" w-full lg:w-[67vw]  h-[650px] rounded-md bg-[#F7F9FB] drop-shadow-lg flex items-center justify-center ">
            <Loader2 className="animate-spin text-[#00687A] " size={64} />
          </div>
        </div>
      ) : (
        <div className=" flex h-full mt-8 mb-8 items-center min-h-[91.4427vh] justify-center">
          <div className="flex flex-col md:flex-row w-full  lg:w-[67vw] mx-5 sm:mx-0 h-full overflow-hidden  justify-center rounded-md bg-[#F7F9FB] drop-shadow-lg">
            <div className="relative hidden md:block rounded-l-lg z-10 w-[33vw] overflow-hidden">
              <div className="opacity-50 absolute inset-0 bg-[url('/images/auth.jpeg')] bg-cover bg-center "></div>
              <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle,_#00687A,_#191C1E)]"></div>
              <div className="flex flex-col h-full justify-between">
                <div className="mx-8 mt-7 flex gap-5 items-center">
                  <div className="z-200">
                    <Image
                      src="/images/logo.svg"
                      className="rounded-lg select-none z-140"
                      alt="logo"
                      width={70}
                      height={70}
                    />
                  </div>
                  <div
                    className={`${lato.className} z-40 text-4xl text-white font-bold uppercase tracking-widest`}
                  >
                    DevLog
                  </div>
                </div>

                <div
                  className={`${lato.className} text-2xl z-40 font-light text-white m-12`}
                >
                  A place for developer to grow together.
                </div>
              </div>
            </div>
            <div className=" py-5 w-full md:w-[34vw] md:min-w-[500px]">
              <div className="flex  mt-6 mx-5 items-start justify-between ">
                <div className="flex flex-col gap-1 text-left">
                  <div
                    className={`${poppins.className} text-[#191C1E]  text-3xl font-semibold`}
                  >
                    {!authType ? (
                      <div className="transition-all duration-300">Welcome</div>
                    ) : (
                      <div className="transition-all duration-300">
                        Welcome Back
                      </div>
                    )}
                  </div>
                  <div
                    className={`${poppins.className} text-md font-medium text-[#45464D]`}
                  >
                    {!authType ? (
                      <div>SignUp to your DevLog Account</div>
                    ) : (
                      <div>LogIn to your DevLog Account</div>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <Link href="/">
                    <X
                      className="hover:scale-[115%]  transition-all cursor-pointer rounded-full text-black"
                      size={24}
                    />
                  </Link>
                </div>
              </div>
              <div className="mt-7 w-full flex  justify-center">
                <div
                  className={`flex text-xl sm:text-2xl bg-[#191C1E]  rounded-4xl ${lato.className}`}
                >
                  <button
                    type="button"
                    onClick={() => switchMode("signup")}
                    className={`transition-all duration-300 cursor-pointer ${!authType ? "bg-[#00687A] text-white" : "text-white"}  px-8  sm:px-16 py-2 sm:py-3 rounded-4xl`}
                  >
                    SIGNUP
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className={`${authType ? "bg-[#00687A]  text-white" : "text-white"} px-8 cursor-pointer sm:px-16 rounded-4xl transition-all duration-300  py-2 sm:py-3`}
                  >
                    LOGIN
                  </button>
                </div>
              </div>
              {authType ? (
                <div className="mt-4 select-none  flex flex-col gap-6 w-full  sm:max-w-[520px]  sm:mx-auto px-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className={`${poppins.className}`}>
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-3 -translate-x-2 top-1/2 -translate-y-1/2 " />
                      <input
                        type="text"
                        value={email}
                        placeholder="johndoe@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border-1 pr-3 w-full ${lato.className} text-[#191C1E]  rounded-sm placeholder:text-[#6B7280] text-lg border-[#6B7280] p-2`}
                        onBlur={() => {
                          (setTouched((prev) => ({
                            ...prev,
                            email: true,
                          })),
                            validator("email", email));
                        }}
                      />
                    </div>
                    <div>
                      {touched.email && error.email && (
                        <div
                          className={`absolute text-sm text-red-500 ${lato.className}`}
                        >
                          *{error.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor=""
                      className={`${poppins.className} text-md`}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div
                        onClick={togglePassword}
                        className="absolute cursor-pointer right-3 -translate-x-2 top-1/2 -translate-y-1/2"
                      >
                        {toggleEye ? (
                          <Eye className="cursor-pointer" />
                        ) : (
                          <EyeOff className="cursor-pointer" />
                        )}
                      </div>
                      <input
                        type={toggleEye ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••••••"
                        className={`border-1 ${lato.className} pr-8 w-full text-[#191C1E] rounded-sm placeholder:text-[#6B7280] text-lg border-1 p-2 border-[#6B7280]`}
                      />
                    </div>
                  </div>
                  <motion.button
                    disabled={!isLoginFormValid}
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleAuth}
                    type="button"
                    className={`flex mt-4 justify-center rounded-lg text-2xl p-2 cursor-pointer bg-[#191C1E] text-white disabled:cursor-not-allowed disabled:bg-[#191c1e4d]`}
                  >
                    <div
                      className={`${poppins.className} font-semibold tracking-widest`}
                    >
                      {loading ? <Loader2 className="animate-spin" /> : "LOGIN"}
                    </div>
                  </motion.button>

                  <div className="flex sm:flex-row flex-col justify-center sm:gap-4 gap-6 mt-2">
                    <motion.button
                      whileHover={{ scale: 0.98 }}
                      whileTap={{ scale: 0.99 }}
                      type="button"
                      onClick={async () => {
                        try {
                          setSocialLoading2(true);
                          await signIn.social({
                            provider: "google",
                            callbackURL: "/?toast=google-login-success",
                          });
                        } finally {
                          setSocialLoading2(false);
                        }
                      }}
                      className={`${socialLoading ? "pointer-events-none cursor-not-allowed scale-[98%]" : ""}  transition-all duration-300 cursor-pointer  flex justify-center items-center w-full rounded-lg md text-center border-1  p-2 gap-4`}
                    >
                      {socialLoading2 ? (
                        <Loader2 className="animate-spin text-[#00687A]" />
                      ) : (
                        <>
                          <span>
                            <Image
                              src={"/images/google.svg"}
                              alt="Google Svg"
                              width={30}
                              height={30}
                            />
                          </span>
                          <span>Login with Google</span>
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 0.98 }}
                      type="button"
                      disabled={socialLoading}
                      whileTap={{ scale: 0.99 }}
                      onClick={async () => {
                        try {
                          setSocialLoading(true);
                          await signIn.social({
                            provider: "github",
                            callbackURL: "/?toast=github-login-success",
                          });
                        } finally {
                          setSocialLoading(false);
                        }
                      }}
                      className="flex justify-center cursor-pointer items-center w-full rounded-lg md text-center border-1  p-2 gap-4"
                    >
                      {socialLoading ? (
                        <Loader2 className="animate-spin text-[#00687A]" />
                      ) : (
                        <>
                          <span>
                            <Image
                              src={"/images/github.svg"}
                              alt="Github Svg"
                              width={30}
                              height={30}
                            />
                          </span>
                          <span>Login with Github</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              ) : (
                <form action="">
                  <div className="mt-4 select-none  flex flex-col gap-6 mx-5">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor=""
                        className={`${poppins.className} text-md`}
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute right-3 -translate-x-2 top-1/2 -translate-y-1/2" />

                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          onBlur={() => {
                            setTouched((prev) => ({
                              ...prev,
                              name: true,
                            }));
                            validator("name", name);
                          }}
                          className={`border-1 pl-3  pr-12 w-full ${lato.className}  text-[#191C1E] rounded-sm placeholder:text-[#6B7280] text-lg border-1 border-[#6B7280] p-2`}
                        />
                        <div className="relative">
                          {touched.name && error.name && (
                            <div
                              className={`${lato.className} text-sm text-red-500 absolute`}
                            >
                              *{error.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-col">
                      <label className={`${poppins.className} text-md `}>
                        Email
                      </label>
                      <div className="relative ">
                        <Mail className="absolute right-3 top-1/2 -translate-x-2  -translate-y-1/2" />
                        <input
                          type="email"
                          placeholder="johndoe@abc.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`border-1 pr-12 ${lato.className} pl-3 w-full text-[#191C1E] rounded-sm placeholder:text-[#6B7280] text-lg border-[#6B7280] p-2 `}
                          onBlur={() => {
                            setTouched((prev) => ({
                              ...prev,
                              email: true,
                            }));
                            validator("email", email);
                          }}
                        />
                        <div className="relative">
                          {touched.email && error.email && (
                            <div
                              className={`absolute ${lato.className} text-sm text-red-500`}
                            >
                              *{error.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 sm:gap-8 items-center  justify-start ">
                      <div className="flex gap-2 flex-col">
                        <label className={`${poppins.className} `}>
                          Password
                        </label>
                        <div className="relative">
                          <div
                            onClick={togglePassword}
                            className="absolute right-0 cursor-pointer overflow-hidden  text-[#191C1E] top-1/2 -translate-x-2 -translate-y-1/2"
                          >
                            {toggleEye ? <Eye /> : <EyeOff />}
                          </div>
                          <input
                            className={` ${lato.className} text-[#191C1E] pr-8 w-full  rounded-sm placeholder:text-[#6B7280] text-lg border-1 p-2  border-[#6B7280]`}
                            type={toggleEye ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={"••••••••••••••••"}
                            onBlur={() => {
                              setTouched((prev) => ({
                                ...prev,
                                password: true,
                              }));
                              validator("password", password);
                            }}
                          />
                          <div className="relative">
                            {touched.password && error.password && (
                              <div
                                className={`${lato.className} text-sm absolute text-red-500 `}
                              >
                                *{error.password}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-col">
                        <label htmlFor="">Confirm Password</label>
                        <div className="relative">
                          <div
                            onClick={confirmTogglePassword}
                            className="absolute cursor-pointer  right-0 overflow-hidden text-[#191C1E] top-1/2 -translate-x-2 -translate-y-1/2"
                          >
                            {confirmtoggleEye ? (
                              <Eye className="transition-all duration-400" />
                            ) : (
                              <EyeOff className="transition-all duration-400" />
                            )}
                          </div>
                          <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`border-1 ${lato.className} pr-8 w-full text-[#191C1E] rounded-sm placeholder:text-[#6B7280] text-lg border-1 p-2 border-[#6B7280]`}
                            type={confirmtoggleEye ? "text" : "password"}
                            placeholder="••••••••••••••••"
                            onBlur={() => {
                              setTouched((prev) => ({
                                ...prev,
                                confirmPassword: true,
                              }));
                              validator("confirmPassword", confirmPassword);
                            }}
                          />
                          <div className="relative">
                            {touched.confirmPassword &&
                              error.confirmPassword && (
                                <div
                                  className={`absolute text-red-500 text-sm ${lato.className} `}
                                >
                                  *{error.confirmPassword}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 0.98 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={!isSignInFormValid}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAuth();
                      }}
                      type="button"
                      className={`bg-[#191C1E] cursor-pointer p-2 text-2xl font-semibold mt-4 text-white flex justify-center rounded-lg disabled:bg-[#191c1e4d] disabled:cursor-not-allowed`}
                    >
                      <div className={`${poppins.className}`}>
                        {loading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "SIGN UP"
                        )}
                      </div>
                    </motion.button>
                    <div className="flex sm:flex-row flex-col justify-center sm:gap-1 gap-6 mt-2">
                      <motion.button
                        type="button"
                        disabled={socialSignInLoading}
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={async () => {
                          try {
                            setSocialSignInLoading(true);
                            await signIn.social({
                              provider: "google",
                              callbackURL: "/?toast=google-signup-success",
                            });
                          } finally {
                            setSocialSignInLoading(false);
                          }
                        }}
                        className={`flex justify-center cursor-pointer items-center w-full rounded-lg border-1  p-2 text-center gap-4 ${socialSignInLoading ? "cursor-not-allowed" : ""}`}
                      >
                        {socialSignInLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            <span>
                              <Image
                                src={"/images/google.svg"}
                                alt="google"
                                width={30}
                                height={30}
                              />
                            </span>
                            <span>SignUp with Google</span>
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 0.99 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={async () => {
                          try {
                            setSocialSignInLoading2(true);
                            await signIn.social({
                              provider: "github",
                              callbackURL: "/?toast=github-login-success",
                            });
                          } finally {
                            setSocialSignInLoading2(false);
                          }
                        }}
                        className={`${socialSignInLoading2 ? "cursor-not-allowed" : ""} flex cursor-pointer justify-center w-full rounded-lg items-center text-center p-2 border-1 gap-4`}
                      >
                        {socialSignInLoading2 ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            <span>
                              <Image
                                src={"/images/github.svg"}
                                alt="github"
                                width={30}
                                height={30}
                              />
                            </span>{" "}
                            <span>SignUp with Github</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
