"use client";
import React from "react";
import Input from "./components/Input";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { useTokenContext } from "@/context/TokenContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "@/context/UserContext";

export default function Home() {
  const { setToken } = useTokenContext();
  const { setUser } = useUserContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  async function Login() {
    if (email === "" || password === "") {
      toast.error("Please fill in all fields", {
        theme: "dark",
      });
    } else {
      const login = await api.login({ email, password, setToken, setUser });
      if (!login) {
        toast.error("Wrong credentials", {
          theme: "dark",
        });
        return;
      }
      router.push("/entryOverview");
    }
  }

  return (
    <div className="flex flex-col gap-20 min-h-screen w-screen items-center justify-center  font-serif">
      <div className="w-max flex flex-col gap-5 justify-center items-center">
        <img src="./logo.png" className=" h-32" />
        <p className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold font-serif ">
          PASSWORD SAFE
        </p>
      </div>
      <div className="flex flex-col items-center gap-5 w-1/4 justify-center">
        <Input
          type="email"
          value={email}
          placeholder={"Email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder={"Password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="h-8 border-white border text-white rounded w-full hover:bg-white hover:bg-opacity-30 "
          type="submit"
          onClick={Login}
        >
          Login
        </button>
        <p>
          Still don't have an account?{" "}
          <a
            className="text-blue-500 border-b border-blue-500"
            href="/registration"
          >
            Click to register
          </a>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
