import Link from "next/link";

export default function Home() {
  return (
    <div className=" w-full flex items-center justify-center h-screen ">
      <Link href={"/dashboard"} className=" px-10 py-2 font-medium bg-[#00879E] text-[#fff] rounded-full border-2 border-[#00879E] hover:bg-transparent hover:text-[#000] active:scale-95 transition-all duration-300 ease-in-out ">Dashboard</Link>
    </div>
  );
}
