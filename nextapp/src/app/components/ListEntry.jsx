import React from "react";

const ListEntry = ({ entry, onClick }) => {
  return (
    <div onClick={onClick}>
      <p>{entry.title}</p>
    </div>
  );
};

export default ListEntry;
