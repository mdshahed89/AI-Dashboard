"use client";

import React, { useState } from "react";
import {
  FaMicrophone,
  FaPaperclip,
  FaPaperPlane,
  FaRegLightbulb,
} from "react-icons/fa";

const Page = () => {

  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "ai" },
  ]);

  return (
    <div className=" p-4 flex flex-col justify-between h-full ">
      {
        messages.length>1 ? <Chats messages={messages} /> : <DefaultSection />
      }
      <CustomInput messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default Page;


const Chats = ({messages}) => {
  return(
    <div className="flex-1 overflow-y-auto max-w-[50rem] mx-auto w-full  rounded-lg p-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <p
              className={`py-2 px-6 rounded-xl  max-w-xs ${
                msg.sender === "user" ? "bg-[#00879E] text-white rounded-br-none" : "bg-gray-300 text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>
  )
}


function CustomInput({messages, setMessages}) {
  const [input, setInput] = useState("");


  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return; 

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]); 
    setInput(""); 

    setTimeout(() => {
      const aiResponse = { text: "I'm AI! How can I help you?", sender: "ai" };
      setMessages((prev) => [...prev, aiResponse]); 
    }, 1000);
  };

  return (
    <div>
      <div className="w-full max-w-[50rem] rounded-2xl mx-auto p-[3px] bg-gradient-to-r from-[#00879E] to-[#0400f8] ">
        <form onSubmit={handleSendMessage} className=" bg-[#fff] rounded-xl ">
          <div className="relative  p-3 shadow">
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 pr-10 outline-none text-gray-800 text-lg"
            />
            <button
              className={` absolute right-3 top-1/2 transform -translate-y-1/2 ${
                input.length > 0 ? "text-[#00879E]" : "text-[#000] opacity-60"
              } `}
            >
              <FaPaperPlane size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between px-2 py-3 text-gray-600 bg-[#F5F5F5] rounded-b-xl text-sm">
            <div className="flex gap-4">
                          <button className="flex items-center gap-1 hover:text-[#00879E] bg-[#fff] px-3 py-2 rounded-md cursor-pointer ">
                            <FaPaperclip size={16} /> <span className=" md:block hidden ">Attach</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-[#00879E] bg-[#fff] px-3 py-2 rounded-md cursor-pointer">
                            <FaMicrophone size={16} /> <span className=" md:block hidden ">Voice Message</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-[#00879E] bg-[#fff] px-3 py-2 rounded-md cursor-pointer ">
                            <FaRegLightbulb size={16} /> <span className=" md:block hidden ">Browse Prompts</span>
                          </button>
                        </div>
            <span>{input.length} / 3000</span>
          </div>
        </form>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        Script may generate inaccurate information about people, places, or
        facts. Model: Script AI v1.3
      </p>
    </div>
  );
}

const DefaultSection = () => {
  return (
    <div className=" flex items-center justify-center h-full ">
      <div className=" text-center max-w-[40rem] mx-auto ">
      <h2 className=" text-[2rem] md:text-[2.5rem] font-semibold ">Find a Dealership Near You</h2>
      <p className=" text-base md:text-xl ">
      Locate the nearest dealership with ease. Get accurate addresses, contact details, and directions in just a few clicks.
      </p>
      </div>
    </div>
  );
};
