"use client";

import { useEffect, useRef, useState } from "react";
import { LuMoon } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { BsLayoutSidebarInsetReverse, BsThreeDots } from "react-icons/bs";
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
import { MdChat } from "react-icons/md";
import { HiBars2 } from "react-icons/hi2";

const ChatHistory = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    setIsHistoryOpen(window.innerWidth > 1024);

    const handleResize = () => {
      setIsHistoryOpen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (window.innerWidth < 1024) {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsHistoryOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div
      ref={sidebarRef}
      className={`h-[calc(100vh-82px)] overflow-y-auto lg:relative absolute right-0 custom-scrollbar ${
        isHistoryOpen ? " flex w-[22rem]" : " w-[4rem] md:w-[5rem] "
      } flex-col bg-gray-50 text-black transition-all font-medium `}
    >
      <div
        onClick={() => setIsHistoryOpen(!isHistoryOpen)}
        className=" text-[1.4rem] lg:hidden flex mt-4 ml-2 md:ml-4 bg-black/50 p-2 rounded-full cursor-pointer text-[#fff]  w-fit "
      >
        <HiBars2 />
      </div>
      {/* Logo & Title */}
      <div className={` ${isHistoryOpen ? "block" : "hidden"} `}>
        <div className="flex items-center space-x-2 justify-between py-4 px-3 border-b border-gray-200 ">
          <h3 className="text-xl font-bold text-black font-mono ">
            Sessions(10)
          </h3>
          <div className="  text-[#1a1a1a] text-[1.2rem] cursor-pointer ">
            <BsThreeDots />
          </div>
        </div>

        <div className=" px-3 ">
          <div className="flex items-center space-x-2 justify-between py-2 px-3 rounded-lg cursor-pointer bg-[#00879E] text-white mt-[2rem]  ">
            <h3 className="text-lg ">New Chat</h3>
            <div className=" text-[1.2rem] ">
              <MdChat />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-3 px-3 mt-7  ">
          <SidebarItem
            title="Why Next.js is important for frontend"
            description="Next.js improves performance, SEO, and developer experience."
            active
          />
          <SidebarItem
            title="React Basics"
            description="Understanding components, hooks, and state management."
          />
          <SidebarItem
            title="Styling in Tailwind"
            description="Utility-first CSS for fast and responsive UI."
          />
          <SidebarItem
            title="Server Components"
            description="Render parts of your app on the server for better performance."
          />
          <SidebarItem
            title="Routing in Next.js"
            description="File-based routing with dynamic and nested routes."
          />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ title, description, icon, label, active }) => (
  <div
    className={`flex flex-col px-2 py-2 cursor-pointer transition-all duration-300 ease-in-out group border border-gray-200 hover:border-[#00879E] rounded-lg
        ${
          active
            ? "bg-white text-black "
            : " hover:bg-white hover:text-black text-[#383535] "
        }`}
  >
    <p
      className={` text-base line-clamp-1  group-hover:text-[#00879E] ${
        active ? " text-[#00879E] " : "text-[#383535] "
      }`}
    >
      {title}
    </p>
    <p
      className={`  line-clamp-1 text-sm font-[400] group-hover:text-[#000] ${
        active ? "text-[#000]" : "text-gray-700"
      } `}
    >
      {description}
    </p>
  </div>
);

export default ChatHistory;
