"use client";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 min-h-screen w-screen items-center justify-center bg-black font-serif">
      <div className="w-max">
        <p className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold font-serif ">
          PASSWORD SAFE
        </p>
      </div>
      <div className="flex flex-col items-center gap-5 w-1/4">
        <input className="h-8 outline-none border-b border-white bg-black text-white w-full" type="email" placeholder="Enter your email" />
        <input className="h-8 outline-none border-b border-white bg-black text-white w-full" type="password" placeholder="Enter your password" />
        <button className="h-8 border-white border text-white rounded w-full" type="submit">Login</button>
        <p> Still don't have an account? <a className="text-blue-500 border-b border-blue-500" href="/Registration">Click to register</a></p>
      </div>
    </div>
  );
}
