"use client";

import { useEffect, useRef, useState } from "react";
import { LuMoon } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import {
  FaSun,
  FaCloud,
  FaMapMarkedAlt,
  FaClock,
  FaCalendarCheck,
} from "react-icons/fa";
import ProfileImg from "@/assets/ProfileImg.png";
import Image from "next/image";
import { IoSunnyOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineDarkMode, MdOutlineEventAvailable } from "react-icons/md";
import { RiCalendarScheduleLine, RiCommunityLine } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { SiAnydesk } from "react-icons/si";
import { PiAddressBookLight } from "react-icons/pi";
import { TiWeatherCloudy } from "react-icons/ti";
import { useTheme } from "next-themes";



const Sidebar = ({ isSidebarOpen, setIsSidebarOpen}) => {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const leftSidebarRef = useRef()
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  useEffect(() => {
      function handleClickOutside(event) {
        if (window.innerWidth < 1024) {
        if (leftSidebarRef.current && !leftSidebarRef.current.contains(event.target)) {
          setIsSidebarOpen(false);
        }
      }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [leftSidebarRef]);

    if (!mounted) return null;


  return (
    <div
    ref={leftSidebarRef}
      className={`h-screen lg:relative absolute z-50 ${isSidebarOpen ? " opacity-100 flex sidebarOpen" : " opacity-0 hidden sidebarClose"} transition-all duration-500 ease-in-out  px-4 pb-4   flex-col bg-gray-50 border-r border-gray-200 text-black font-medium `}
    >
      {/* Logo & Title */}
      <div className="flex items-center space-x-2 justify-between h-[90px] ">
        <h3 className="text-xl font-bold text-black font-mono ">SVSA</h3>
        <div onClick={()=> setIsSidebarOpen(false)} className=" cursor-pointer text-[#1a1a1a] text-[1.2rem] ">
          <BsLayoutSidebarInsetReverse />
        </div>
      </div>

      <div className="relative flex items-center my-7 w-full">
        <div className=" absolute flex items-center text-[#1a1a1a] h-full px-3 ">
          <FiSearch />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none "
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        <SidebarItem
          currentPath={pathname}
          path="/dashboard"
          icon={<SiAnydesk />}
          label="Ask Me Anything"
          active
        />
        <SidebarItem
          currentPath={pathname}
          path="/dashboard/get-weather"
          icon={<TiWeatherCloudy />}
          label="Get Weather"
        />
        <SidebarItem
          currentPath={pathname}
          path="/dashboard/get-dealership-address"
          icon={<PiAddressBookLight />}
          label="Get Dealership Address"
        />
        <SidebarItem
          currentPath={pathname}
          path="/dashboard/appointment-availability"
          icon={<RiCalendarScheduleLine />}
          label="Appointment Availability"
        />
        <SidebarItem
          currentPath={pathname}
          path="/dashboard/schedule-appointment"
          icon={<MdOutlineEventAvailable />}
          label="Schedule Appointment"
        />
        <SidebarItem
          currentPath={pathname}
          path="/dashboard/schedule-appointment"
          icon={<RiCommunityLine />}
          label="Community"
        />
        <SidebarItem
          currentPath={pathname}
          path="/dashboard/schedule-appointment"
          icon={<AiOutlineSetting />}
          label="Setting & Help"
        />
      </nav>

      {/* Theme Toggle & Profile */}
      <div className="mt-auto">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 w-full p-2 rounded-md bg-gray-200 "
        >
          <div onClick={()=> setTheme("light")} className={` ${theme === "light" && "bg-[#fff]"} flex-1 flex items-center justify-center cursor-pointer gap-1 hover:bg-[#fff] p-2 rounded-md `}>
            <IoSunnyOutline />
            <span>Light</span>
          </div>
          <div onClick={()=> setTheme("dark")} className={` ${theme === "dark" && "bg-[#fff]"} flex-1 flex items-center justify-center cursor-pointer gap-1 hover:bg-[#fff] p-2 rounded-md `}>
            <MdOutlineDarkMode />
            <span>Dark</span>
          </div>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3 mt-4 p-2 bg-[#00879E] rounded-lg">
          <div className="w-10 h-10 bg-white rounded-full">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"
              alt="Profile Img"
              width={500}
                height={500}
              className=" w-full h-full object-cover rounded-full "
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#fff] ">Emilia Caitlin</p>
            <p className="text-xs text-[#fff]">hey@unspace.agency</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, path, currentPath }) => (
  <Link
    href={path}
    className={`flex items-center text-[1.6rem] px-3 py-2 rounded-md cursor-pointer transition-all group
      ${
        currentPath === path
          ? "bg-white text-black "
          : " hover:bg-white hover:text-black text-[#383535] "
      }`}
  >
    <div
      className={` ${
        currentPath === path
          ? "bg-white text-[#00879E] "
          : " hover:bg-[#fff] text-[#383535]  "
      } group-hover:text-[#00879E] `}
    >
      {icon}
    </div>
    <span className="ml-3 text-sm">{label}</span>
  </Link>
);

export default Sidebar;
