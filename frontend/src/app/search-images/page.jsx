"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { FetchLoading } from "../../components/Loading.jsx";
import { FiColumns, FiGrid } from "react-icons/fi";
import { LuLayoutPanelLeft } from "react-icons/lu";



const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [columns, setColumns] = useState(3);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const fetchImages = async () => {
    if (!query) {
      setError("Type anything to search");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/automation/search-images?query=${query}`
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const result = await res.json();
      setImages(result.data || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchImages();
    }
  };


  return (
    <div className=" bg-gradient-to-b from-[#fff] via-[#bdf2ff] to-[#fff] min-h-[100vh] pb-[2rem]  ">
      <div className=" relative my-[3rem] flex justify-center max-w-[30rem] mx-auto ">
        <div className=" absolute top-0 left-0 h-full px-3 w-fit flex items-center text-[1.2rem] text-[#00b4fc] ">
          <IoSearchOutline />
        </div>
        <div className=" absolute top-0 right-0 h-full px-3 w-fit flex items-center text-[1.3rem] text-[#00b4fc] ">
          <MdKeyboardVoice />
        </div>
        <input
          type="text"
          placeholder="Search here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="  w-full py-2 pl-10 font-medium border-2 border-[#00b4fc] outline-none rounded-full "
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className=" mt-[4rem] ">
        {loading && <FetchLoading />}
        {error && <p className="text-center text-red-500">{error}</p>}
        {images.length > 0 && (
          <div className="max-w-[1400px] mx-auto px-4">
            <div className=" flex items-center justify-between mb-6 ">
              <h3 className="text-xl font-semibold  text-[#00b4fc] ">
                Image Collection ({images.length})
              </h3>
              <div className="flex gap-4 text-2xl">
                <FiColumns
                  title="2 Images"
                  onClick={() => setColumns(2)}
                  className={` cursor-pointer ${
                    columns === 2 ? "text-[#00b4fc]" : "text-gray-950"
                  } transition-colors duration-300 ease-in-out hover:text-[#00b4fc] `}
                />

                <LuLayoutPanelLeft
                  title="3 Images"
                  onClick={() => setColumns(3)}
                  className={` cursor-pointer ${
                    columns === 3 ? "text-[#00b4fc]" : "text-gray-950"
                  } transition-colors duration-300 ease-in-out hover:text-[#00b4fc] `}
                />

                <FiGrid
                  title="4 Images"
                  onClick={() => setColumns(4)}
                  className={` cursor-pointer ${
                    columns === 4 ? "text-[#00b4fc]" : "text-gray-950"
                  } transition-colors duration-300 ease-in-out hover:text-[#00b4fc] `}
                />
              </div>
            </div>
            <div
              className={` grid ${
                columns === 2
                  ? "grid-cols-2"
                  : columns === 3
                  ? "grid-cols-3"
                  : "grid-cols-4"
              } gap-4 `}
            >
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className={` ${
                    columns === 2
                      ? "h-[25rem]"
                      : columns === 3
                      ? "h-[23rem]"
                      : "h-[20rem]"
                  } w-full relative group `}
                >
                  <div className=" absolute top-2 left-2 z-50 line-clamp-1 h-fit font-medium group-hover:block hidden text-[#00b4fc] ">
                    {image.alt}
                  </div>
                  <div className="absolute bottom-2 right-2 z-50 line-clamp-1 font-medium group-hover:block hidden">
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch(image.src, {
                            mode: "cors",
                          });
                          const blob = await response.blob();
                          const url = window.URL.createObjectURL(blob);

                          const a = document.createElement("a");
                          a.href = url;
                          a.download = image.alt || "downloaded-image";
                          document.body.appendChild(a);
                          a.click();
                          a.remove();

                          window.URL.revokeObjectURL(url);
                        } catch (err) {
                          console.error("Download failed", err);
                        }
                      }}
                      className="bg-[#000] hover:bg-[#00b4fc] hover:text-[#fff] transition-colors duration-300 ease-in-out text-[#fff] px-2 py-2 text-[1.4rem] rounded-full cursor-pointer"
                    >
                      <IoMdDownload />
                    </button>
                  </div>

                  <div
                    onClick={() => setFullScreenImage(image.src)}
                    className="w-full h-full cursor-pointer"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {fullScreenImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setFullScreenImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent modal click
                setFullScreenImage(null);
              }}
              className="absolute top-4 right-4 text-white text-3xl z-50 cursor-pointer"
            >
              <IoClose />
            </button>

            {/* Fullscreen Image */}
            <div className=" relative w-full h-full ">
              <Image
                src={fullScreenImage}
                alt="Full screen"
                fill
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
