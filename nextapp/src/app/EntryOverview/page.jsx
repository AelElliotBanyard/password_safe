"use client";
import React from "react";
import NewEntry from "../components/NewEntry";
import { FaPlus } from "react-icons/fa";
import CurrentEntry from "../components/CurrentEntry";
import EmptySpace from "../components/EmptySpace";

const page = () => {
  const [showEditer, setShowEditer] = React.useState(false);
  const [showEntry, setShowEntry] = React.useState(false);
  const [showNewEntry, setShowNewEntry] = React.useState(false);
  const [showEmpty, setShowEmpty] = React.useState(false);

  const handleNewEntry = () => { 
    setShowNewEntry(true)
    setShowEntry(false)
    setShowEditer(false)
    setShowEmpty(false)
  }

  return (
    <div className="flex flex-col w-screen h-screen font-serif">
      <p className="w-full h-1/6 text-3xl border-b-2 border-b-[#07111B] flex justify-center items-center ">
        Password Safe
      </p>
      <div className="flex flex-row w-full h-5/6 justify-center items-center text-start ">
        <div className="flex flex-col h-full w-1/3 p-5 border-r-2 border-r-[#07111B]">
          <div className="flex flex-col gap-2 w-full overflow-y-scroll h-full scrollbar scrollbar-track-transparent scrollbar-thumb-white ">
            list
          </div>
          <button type="submit" className="w-full flex justify-end items-end " onClick={handleNewEntry}>
            <div className="border border-white rounded text-white p-2 hover:bg-white hover:bg-opacity-20">
              <FaPlus size={16} />
            </div>
          </button>
        </div>

        <div className="flex flex-col h-full w-2/3 pt-10 pb-10 pr-32 pl-32">
          <CurrentEntry/>
          {showEntry && (
            <CurrentEntry
              setShowEntry={setShowEntry}
              setShowEditer={setShowEditer}
            />
          )}

          {showEditer && (
            <CurrentEntry
              setShowEntry={setShowEntry}
              setShowEditer={setShowEditer}
            />
          )}

          {showNewEntry && (
            <NewEntry
              setShowEntry={setShowEntry}
              setShowEditer={setShowEditer}
              setShowNewEntry={setShowNewEntry}
            />
          )}

          {showEmpty && (
            <EmptySpace
              setShowEmpty={setShowEmpty}
              setShowEditer={setShowEditer}
              setShowNewEntry={setShowNewEntry}
              setShowEntry={setShowEntry}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
