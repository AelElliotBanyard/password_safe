import React from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

const InputPassword = ({ value, onChange }) => {
  const [show, setShow] = React.useState(false);
  return (
    <div className="flex flex-row gap-0 w-full">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="text-white text-xl outline-none bg-transparent focus:outline-none flex-grow"
      />
      {show ? (
        <RiEyeCloseLine
          className="text-white text-xl hover:opacity-50 cursor-pointer"
          onClick={() => setShow(!show)}
        />
      ) : (
        <RiEyeLine
          className="text-white text-xl hover:opacity-50 cursor-pointer"
          onClick={() => setShow(!show)}
        />
      )}
    </div>
  );
};

export default InputPassword;
