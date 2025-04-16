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