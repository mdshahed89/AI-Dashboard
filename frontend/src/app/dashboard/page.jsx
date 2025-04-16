"use client";

import {
  ImgLoading,
  MicrophoneButton,
  TypingLoading,
} from "@/components/Loading";
import React, { useEffect, useRef, useState } from "react";
import {
  FaMicrophone,
  FaPaperclip,
  FaPaperPlane,
  FaRegLightbulb,
} from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { uploadFile } from "@/utils/uploadImg";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { IoIosSquare } from "react-icons/io";
import { AnimatePresence, motion } from 'framer-motion';



const Page = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fadeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className=" p-4 flex flex-col justify-between h-full w-full ">
      <AnimatePresence mode="wait">
      {messages.length > 1 ? (
        <motion.div
        key="chats"
        variants={fadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className=" w-full"
      >
        <Chats messages={messages} loading={loading} />
        </motion.div>
      ) : (
        <motion.div
            key="default"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className=" w-full flex items-center justify-center h-full"
          >
        <DefaultSection />
        </motion.div>
      )}
      </AnimatePresence>
      <CustomInput
        messages={messages}
        setMessages={setMessages}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Page;

const Chats = ({ messages, loading }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto max-w-[50rem] mx-auto w-full rounded-lg p-4 space-y-3 scrollbar-hide"
      style={{ scrollbarWidth: "none" }}
    >
      {messages.map((msg, index) => (
        <div key={index}>
          <div
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`py-2 px-6 rounded-xl whitespace-pre-wrap w-fit ${
                msg.sender === "user"
                  ? "bg-[#00879E] text-white rounded-br-none"
                  : "bg-slate-200 text-black rounded-bl-none"
              }`}
            >
              {formatMessage(msg.text)}
            </p>
          </div>
          {msg?.sender === "ai" && (
            <div className=" flex items-center gap-2 mt-2 pl-1 text-[1.2rem] ">
              <IoCopyOutline className=" hover:text-[#00879E] cursor-pointer transition-colors duration-300 ease-in-out " />
              <AiOutlineLike className=" hover:text-[#00879E] cursor-pointer transition-colors duration-300 ease-in-out " />
              <AiOutlineDislike className=" hover:text-[#00879E] cursor-pointer transition-colors duration-300 ease-in-out " />
              <HiOutlineRefresh className=" hover:text-[#00879E] cursor-pointer transition-colors duration-300 ease-in-out " />
              <AiOutlineShareAlt className=" hover:text-[#00879E] cursor-pointer transition-colors duration-300 ease-in-out " />
              <BsThreeDotsVertical className=" hover:text-[#00879E] cursor-pointer transition-colors duration-300 ease-in-out " />
            </div>
          )}
        </div>
      ))}
      {loading && <TypingLoading />}
    </div>
  );
};

const formatMessage = (text) => {
  if (typeof text !== "string") return "";
  const parts = text.split(/(\*[^*]+\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(1, -1)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

function CustomInput({ messages, setMessages, loading, setLoading }) {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [imgLoading, setImgLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    const maxSize = 5 * 1024 * 1024;
    let validFiles = [];

    selectedFiles.forEach((file) => {
      if (file.size <= maxSize) {
        validFiles.push(file);
      } else {
        setError("File size must be less than 5 MB.");
      }
    });

    if (validFiles.length > 0) {
      setError("");
      setImgLoading(true);

      // console.log(validFiles);

      try {
        const uploadedUrls = await Promise.all(
          validFiles.map(async (file) => {
            const url = await uploadFile(file);
            return {
              name: file.name,
              url,
            };
          })
        );

        setFiles((prevImg) => {
          if (!Array.isArray(prevImg)) return prevImg;
          return [...prevImg, ...uploadedUrls];
        });
      } catch (error) {
        console.error("Upload error:", error);
        setError("An error occurred while uploading the files.");
      } finally {
        setImgLoading(false);
      }
    }
  };

  // console.log("ff",files);

  // const handleClearFile = (index) => {
  //   setfiles((prev) => ({
  //     ...prev,
  //     gellaryImgs: prev.gellaryImgs.filter((_, i) => i !== index),
  //   }));
  // };

  const handleClearFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    setInput("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/send-message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await res.json();
      console.log(data);

      const aiMessage = { sender: "ai", text: data?.aiMessage };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceResult = (text) => {
    console.log("Recognized speech:", text);
    setMessages((prev) => prev + " " + text);
  };

  return (
    <div>
      <div className="w-full max-w-[50rem] rounded-2xl mx-auto p-[3px] bg-gradient-to-r from-[#00879E] to-[#0400f8] ">
        <form onSubmit={handleSendMessage} className=" bg-[#fff] rounded-xl ">
          <div className="relative  p-3 shadow">
            <input
              type="text"
              placeholder="Ask Anything"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 pr-10 outline-none text-gray-800 text-lg"
            />
            <button
              className={` absolute right-3 top-1/2 transform -translate-y-1/2 ${
                input.length > 0 ? "text-[#00879E]" : "text-[#000] opacity-60"
              } `}
            >
              {loading ? (
                <div className=" p-2 bg-[#00879E]/10 rounded-full text-[1.3rem] ">
                  <IoIosSquare className=" text-[#00879E] " />
                </div>
              ) : (
                <div className=" pr-1 ">
                  <FaPaperPlane size={20} />
                </div>
              )}
            </button>
          </div>

          {(imgLoading || files.length > 0) && (
            <div className=" p-2 ">
              {imgLoading && <ImgLoading />}
              {files && files.length > 0 && (
                <div className=" flex items-center gap-2 flex-wrap ">
                  {files.map((file, idx) => (
                    <div key={idx} className=" flex items-center gap-1 ">
                      {(() => {
                        const name = file?.name || "";
                        const dotIndex = name.lastIndexOf(".");
                        if (dotIndex === -1) return name;

                        const base = name.slice(0, dotIndex);
                        const ext = name.slice(dotIndex);

                        return base.length > 10
                          ? `${base.slice(0, 10)}...${ext}`
                          : name;
                      })()}
                      <div
                        onClick={() => handleClearFile(idx)}
                        className=" p-0.5 text-sm bg-slate-100 text-red-400 cursor-pointer  "
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="flex items-center justify-between px-2 py-3 text-gray-600 bg-[#F5F5F5] rounded-b-xl text-sm">
            <div className="flex gap-4">
              <div
                onClick={() => document.getElementById("img-click").click()}
                className="flex items-center gap-1 hover:text-[#00879E] bg-[#fff] px-3 py-2 rounded-md cursor-pointer "
              >
                <FaPaperclip size={16} />{" "}
                <span className=" md:block hidden ">Attach</span>
                <input
                  id="img-click"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              {/* <div className="flex items-center gap-1 hover:text-[#00879E] bg-[#fff] px-3 py-2 rounded-md cursor-pointer">
                <FaMicrophone size={16} />{" "}
                <span className=" md:block hidden ">Voice Message</span>
              </div> */}
              <VoiceToText onResult={handleVoiceResult} />
              <div className="flex items-center gap-1 hover:text-[#00879E] bg-[#fff] px-3 py-2 rounded-md cursor-pointer ">
                <FaRegLightbulb size={16} />{" "}
                <span className=" md:block hidden ">Browse Prompts</span>
              </div>
            </div>
            <span>{input.length} / 3000</span>
          </div>
        </form>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        Script may generate inaccurate information about people, places, or
        facts.
      </p>
    </div>
  );
}

const VoiceToText = ({ onResult }) => {
  const [listening, setListening] = useState(false);

  const SpeechRecognition =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  const startListening = () => {
    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
      if (event.error === "network") {
        toast.error(
          "Network error: Please check your internet connection and try again."
        );
      } else if (event.error === "not-allowed") {
        toast.error(
          "Microphone access was denied. Please allow access to use voice features."
        );
      } else {
        toast.error(`Speech recognition error: ${event.error}`);
      }
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    };

    recognition.start();
  };

  return (
    <div
      onClick={startListening}
      className=" hover:text-[#00879E] bg-[#fff] md:w-[11rem] px-3 py-2 rounded-md cursor-pointer"
    >
      {listening ? (
        <div className=" flex items-center justify-center pt-0.5 ">
          <MicrophoneButton />
        </div>
      ) : (
        <div className=" flex items-center justify-center gap-1 ">
          <FaMicrophone size={16} />
          <span className="md:block hidden">Voice Message</span>
        </div>
      )}
    </div>
  );
};

const DefaultSection = () => {
  return (
    <div className=" flex items-center justify-center h-full ">
      <div className=" text-center max-w-[40rem] mx-auto ">
        <h2 className=" text-[2rem] md:text-[2.5rem] font-medium ">
          Welcome to AI chat bot
        </h2>
        <p className=" text-base md:text-xl text-gray-700 ">
          Experience seamless and intelligent conversations with AI-powered
          chat. Get instant responses, insights, and assistance anytime.
        </p>
      </div>
    </div>
  );
};
