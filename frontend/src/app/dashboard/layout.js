"use client";

import ChatHistory from "@/components/ChatHistory";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useEffect, useState } from "react";

export default function DashboarddLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(window.innerWidth > 1024);

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className=" flex ">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={` w-full h-[100vh]   `}>
        <Topbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className=" relative h-[calc(100vh-100px)] flex border-t  border-[#ece8e8] ">
          <div className=" w-full h-full lg:pr-0 pr-[4rem] md:pr-[5rem] ">
            {children}
          </div>
          <ChatHistory />
        </div>
      </div>
    </div>
  );
}
