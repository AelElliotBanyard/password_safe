"use client";
import React from "react";
import Input from "./Input";

const NewEntry = () => {
  const [title, setTitle] = React.useState("");
  const [descirption, setDescirption] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [url, setUrl] = React.useState("");

  return (
    <div className="flex flex-col gap-14 min-h-screen items-center justify-center w-full font-serif">
      <p className="text-5xl text-white font-bold font-serif">New Entry</p>
      <div className="gap-32">
        <div className="flex flex-col justify-center items-center ">
          <Input
            type="text"
            placeholder={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder={"Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input type="text" placeholder={"URL"} value={url} onChange={(e) => setUrl(e.target.value)} />
          <Input
            type="text"
            placeholder={"Description"}
            value={descirption}
            onChange={(e) => setDescirption(e.target.value)}
          />
      </div>
      </div>
    </div>
  );
};

export default NewEntry;
