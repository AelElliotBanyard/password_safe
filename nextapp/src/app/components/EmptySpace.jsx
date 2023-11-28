import React from "react";
import { RiSafe2Line } from "react-icons/ri";

const EmptySpace = ({
  setShowEmpty,
  setShowEditer,
  setShowNewEntry,
  setShowEntry,
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-5/6 opacity-50">
      <RiSafe2Line size={48} />
      <p className="text-3xl text-center">
        The Entry, on that you click, will show up here
      </p>
    </div>
  );
};

export default EmptySpace;