import { FaMicrophone } from "react-icons/fa";

export const TypingLoading = () => {
  return (
    <div className="w-10 h-10 flex gap-1 items-center justify-center">
      <div className="w-2 h-2 animate-[bounce_.6s_linear_.2s_infinite] bg-[#00879E] rounded-full"></div>
      <div className="w-2 h-2 animate-[bounce_.6s_linear_.3s_infinite] bg-[#00879E] rounded-full"></div>
      <div className="w-2 h-2 animate-[bounce_.6s_linear_.4s_infinite] bg-[#00879E] rounded-full"></div>
    </div>
  );
};

export const ImgLoading = () => {
  return (
    <div className=" h-3 flex gap-1 items-center">
      <div className="w-1.5 h-1.5 animate-[bounce_.6s_linear_.2s_infinite] bg-[#00879E] rounded-full"></div>
      <div className="w-1.5 h-1.5 animate-[bounce_.6s_linear_.3s_infinite] bg-[#00879E] rounded-full"></div>
      <div className="w-1.5 h-1.5 animate-[bounce_.6s_linear_.4s_infinite] bg-[#00879E] rounded-full"></div>
    </div>
  );
};

export const MicrophoneButton = () => {
  return (
    <div className="flex items-center justify-center">
      <button
        id="speech"
        className="relative w-[15px] h-[15px] rounded-full text-[#00879E]  text-lg flex items-center justify-center focus:outline-none"
      >
        <FaMicrophone />
        <div className="pulse-ring absolute bg-[#00879E]/30 w-[27px] h-[27px] border-[2px] border-[#00879E] rounded-full" />
      </button>
    </div>
  );
}


export const FetchLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-[10rem]">
      <div className="bars-loader">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );
};
