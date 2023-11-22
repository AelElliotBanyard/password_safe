"use client";
import Input from "../../components/InputRegistration";

const page = () => {
  return (
    <div className="flex flex-col gap-20 min-h-screen w-screen items-center justify-center bg-black font-serif">
      <p className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold font-serif ">
        Registrieren
      </p>
      <Input type="email" />
    </div>
  )
}

export default page