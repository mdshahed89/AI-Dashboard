import React from 'react'
import { BsFillLightningChargeFill, BsLayoutSidebarInsetReverse, BsLayoutTextSidebar } from 'react-icons/bs'
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoIosGift } from "react-icons/io";
import MyPhoto from "@/assets/MyPhoto.jpg";
import Image from 'next/image';


const Topbar = ({ isSidebarOpen, setIsSidebarOpen}) => {
  return (
    <div className='  flex-1 flex items-center justify-between w-full bg-gray-50 h-[80px] px-5 '>
      <div className=' flex items-center gap-5 '>
      {
        !isSidebarOpen && <div onClick={()=> setIsSidebarOpen(true)} className=" cursor-pointer text-[#1a1a1a] text-[1.2rem] ">
        <BsLayoutTextSidebar />
      </div>
      }
        <h3 className=' text-[1.5rem] font-semibold '>AI</h3>
      </div>
        <div className=' flex items-center gap-6 '>
            <div className=' flex items-center gap-2 bg-[#000] border-2 border-[#000] hover:bg-transparent hover:text-[#000] cursor-pointer transition-colors duration-300 ease-in-out group px-5 py-2 text-[#fff] rounded-full '>
            <BsFillLightningChargeFill className=' group-hover:text-green-500 text-yellow-400 ' />
                <span className=" md:block hidden ">Upgrade</span>
            </div>
            <div className=' text-[1.3rem] cursor-pointer '>
            <FaRegCircleQuestion />
            </div>
            <div className=' text-[1.3rem] cursor-pointer '>
            <IoIosGift />
            </div>
            <div className="relative cursor-pointer">
            <Image
                width={500}
                height={500}
                className="size-10 rounded-full bg-slate-500 object-cover"
                src={MyPhoto}
                alt="MY Photo"
            />
            {/* <span className="absolute bottom-[2px] right-0 size-3 rounded-full border-[2px] border-white bg-green-500"></span> */}
        </div>
        </div>
    </div>
  )
}

export default Topbar