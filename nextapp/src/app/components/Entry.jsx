"use client";
import React from "react";
import Input from "./Input";

const Entry = (title, descirption, username, password, url, onChange) => {
  return (
    <div className="flex flex-col gap-14 min-h-screen items-center justify-center w-full font-serif">
      <p className="text-5xl text-white font-bold font-serif">New Entry</p>
      <div className="gap-32">
        <div className="flex flex-col justify-center items-center ">
          <Input
            type="text"
            placeholder={"Title"}
            value={title}
            onChange={onChange}
          />
          <Input
            type="text"
            placeholder={"Username"}
            value={username}
            onChange={onChange}
          />
          <Input
            type="password"
            placeholder={"Password"}
            value={password}
            onChange={onChange}
          />
          <Input type="text" placeholder={"URL"} value={url} onChange={onChange} />
          <Input
            type="text"
            placeholder={"Description"}
            value={descirption}
            onChange={onChange}
          />
      </div>
      </div>
    </div>
  );
};

export default Entry;
