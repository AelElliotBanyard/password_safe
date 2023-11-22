"use client";
import React from "react";
import Input from "./components/InputRegistration";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function CheckEmpty() {
    if(email === "" || password === "") {
      alert("Please fill in all fields");
      return false;
    } else {
      return true;
    }
  }

  function Login() {
    CheckEmpty();
  }

  return (
    <div className="flex flex-col gap-20 min-h-screen w-screen items-center justify-center bg-black font-serif">
      <div className="w-max">
        <p className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold font-serif ">
          PASSWORD SAFE
        </p>
      </div>
      <div className="flex flex-col items-center gap-5 w-1/4 justify-center">
        <Input type="email" value={email} placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
        <Input type="password" value={password} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}/>
        <button className="h-8 border-white border text-white rounded w-full hover:bg-white hover:text-black" type="submit" onClick={Login}>Login</button>
        <p> Still don't have an account? <a className="text-blue-500 border-b border-blue-500" href="/Registration">Click to register</a></p>
      </div>
    </div>
  );
}
