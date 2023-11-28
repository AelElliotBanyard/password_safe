"use client";
import Input from "../components/Input";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import api from "@/utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [conPassword, setConPassword] = React.useState("");
  const router = useRouter();
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);

  function PasswordCheck() {
    if (password === conPassword) {
      return true;
    } else {
      return false;
    }
  }

  async function Register() {
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === "" ||
      conPassword === ""
    ) {
      toast.error("Please fill in all fields", {
        theme: "dark",
      });
    } else if (!PasswordCheck()) {
      toast.error("Passwords do not match", {
        theme: "dark",
      });
    } else {
      const register = await api.register({
        firstname,
        lastname,
        email,
        password,
      });
      if (!register) {
        toast.error("Something went wrong", {
          theme: "dark",
        });
        return;
      }
      toast.success("Successfully registered", {
        theme: "dark",
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }

  return (
    <div className="flex flex-col gap-14 min-h-screen items-center justify-center w-screen font-serif">
      <p className="text-5xl text-white font-bold font-serif">Registration</p>
      <div className="flex flex-col justify-center items-center gap-5 w-1/4 ">
        <Input
          type="text"
          value={firstname}
          placeholder={"Firstname"}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <Input
          type="text"
          value={lastname}
          placeholder={"Lastname"}
          onChange={(e) => setLastname(e.target.value)}
        />
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
        <Input
          type="password"
          value={conPassword}
          placeholder={"Confirm Password"}
          onChange={(e) => setConPassword(e.target.value)}
        />
        <div className="flex flex-row gap-2">
          <input
          className="bg-transaprent border-white border-2 w-5 h-5 rounded"
            type="checkbox"
            checked={checkboxChecked}
            onChange={() => setCheckboxChecked(!checkboxChecked)}
          />
          <p>I accept the terms and coonditions</p>
        </div>
        <button
          className={"h-8 border-white border text-white rounded w-full  " + (checkboxChecked ? "opacity-100 hover:bg-white hover:bg-opacity-30" : "opacity-50")}
          type="submit"
          onClick={Register}
          disabled={!checkboxChecked}
        >
          Register
        </button>
        <p>
          {" "}
          Already have an account?{" "}
          <a className="text-blue-500 border-b border-blue-500" href="/">
            Click to Login
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
};

export default page;
