import React from "react";

const InputRegistration = () => {
  const [type, setType] = React.useState("");
  const [placeholder, setPlaceholder] = React.useState("");
  const [value, setValue] = React.useState("");

  return (
    <div className="w-screen flex items-center justify-center">
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="h-8 outline-none border-b border-white bg-transparent text-white w-1/4"
      />
    </div>
  );
};

export default InputRegistration;
