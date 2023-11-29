import React from "react";

const ListEntry = ({ entry, onClick }) => {
  return (
    <div className=" w-full h-full border-b-2 border-b-[#07111B]" onClick={onClick}>
      <p>{entry.title}</p>
    </div>
  );
};

export default ListEntry;
