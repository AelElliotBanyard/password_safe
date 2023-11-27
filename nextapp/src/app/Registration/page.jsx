"use client";
import Input from "../components/Input";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const page = () => {
  const[firstname, setFirstname] = React.useState("");
  const[lastname, setLastname] = React.useState(""); 
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [conPassword, setConPassword] = React.useState("");
  const router = useRouter()

  function PasswordCheck() {
    if(password === conPassword) {
      return true;
    } else {
      alert("Passwords do not match");
      return false;
    }
  }
  

  function Register() {
      if(firstname === "" || lastname === "" || email === "" || password === "" || conPassword === "") {
        alert("Please fill in all fields");
      } else if(!PasswordCheck()) {
        alert("Passwords do not match");
      } 
        else {
        router.push("/");
    }
  }

  return (
    <div className="flex flex-col gap-14 min-h-screen items-center justify-center w-screen font-serif">
      <p className="text-5xl text-white font-bold font-serif">Registration</p>
      <div className="flex flex-col justify-center items-center gap-5 w-1/4 ">
        <Input type="text" value={firstname} placeholder={"Firstname"} onChange={(e) => setFirstname(e.target.value)}/>
        <Input type="text" value={lastname} placeholder={"Lastname"} onChange={(e) => setLastname(e.target.value)}/>
        <Input type="email" value={email} placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
        <Input type="password" value={password} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}/>
        <Input type="password" value={conPassword} placeholder={"Confirm Password"} onChange={(e) => setConPassword(e.target.value)}/>
        <button className="h-8 border-white border text-white rounded w-full hover:bg-white hover:text-black" type="submit" onClick={Register}>Register</button>
        <p> Already have an account? <a className="text-blue-500 border-b border-blue-500" href="/">Click to Login</a></p>
      </div>
    </div>
  )
}

export default page