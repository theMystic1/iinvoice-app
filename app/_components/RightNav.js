"use client";

import logo from "@/public/assets/Group-9.png";
import profileImg from "@/public/assets/image-avatar.jpg";

import darklogo from "@/public/assets/icon-moon.svg";
import lightlogo from "@/public/assets/icon-sun.svg";

import Image from "next/image";
import { useDarkMode } from "../_contexts/DarkModeContext";

function RightNav({ session }) {
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  return (
    <div className="fixed left-0 xl:w-20 h-20 top-0 xl:bottom-0 flex xl:h-full xl:flex-col justify-between bg-accentPink-500 right-0  xl:rounded-r-[2em] xl:rounded-b-none z-50">
      <div className="relative xl:w-full h-full xl:h-20 w-20 ">
        <Image src={logo} alt="logo" fill className="object-cover object-top" />
      </div>

      <div className="flex xl:flex-col items-center justify-center gap-10 xl:mb-8 mr-8 xl:mr-0">
        <button
          className="relative xl:w-8 h-8 xl:h-8 w-8 p-4"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <Image
              src={lightlogo}
              alt="logo"
              fill
              className="object-cover object-top"
            />
          ) : (
            <Image
              src={darklogo}
              alt="logo"
              fill
              className="object-cover object-top"
            />
          )}
        </button>
        <div className="relative xl:w-10 h-10 xl:h-10 w-10 p-4 ">
          <Image
            src={session?.user.image ? session?.user.image : profileImg}
            alt="logo"
            fill
            className="object-cover object-top rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default RightNav;
