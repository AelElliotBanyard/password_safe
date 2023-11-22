import React from "react";

const InputRegistration = ({ type, placeholder, onChange }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="h-8 outline-none border-b border-white bg-black text-white w-full"
      />
    </div>
  );
};

export default InputRegistration;
