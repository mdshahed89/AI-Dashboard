import React from 'react'
import { BsFillLightningChargeFill, BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoIosGift } from "react-icons/io";


const Topbar = ({ isSidebarOpen, setIsSidebarOpen}) => {
  return (
    <div className='  flex-1 flex items-center justify-between w-full bg-gray-50 h-[80px] px-5 '>
      <div className=' flex items-center gap-5 '>
      {
        !isSidebarOpen && <div onClick={()=> setIsSidebarOpen(true)} className=" cursor-pointer text-[#1a1a1a] text-[1.2rem] ">
        <BsLayoutSidebarInsetReverse />
      </div>
      }
        <h3 className=' text-[1.5rem] font-semibold '>Al Chat</h3>
      </div>
        <div className=' flex items-center gap-6 '>
            <div className=' flex items-center gap-2 bg-[#000] px-5 py-2 text-[#fff] rounded-full '>
            <BsFillLightningChargeFill className=' text-yellow-400 ' />
                <span className=" md:block hidden ">Upgrade</span>
            </div>
            <div className=' text-[1.3rem] '>
            <FaRegCircleQuestion />
            </div>
            <div className=' text-[1.3rem] '>
            <IoIosGift />
            </div>
            <div className="relative cursor-pointer">
            <img
                width={500}
                height={500}
                className="size-10 rounded-full bg-slate-500 object-cover"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"
                alt="avatar navigate ui"
            />
            {/* <span className="absolute bottom-[2px] right-0 size-3 rounded-full border-[2px] border-white bg-green-500"></span> */}
        </div>
        </div>
    </div>
  )
}

export default Topbar