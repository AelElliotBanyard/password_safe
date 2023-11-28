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
    setShowNewEntry(true);
    setShowEntry(false);
    setShowEditer(false);
    setShowEmpty(false);
  };

  return (
    <div className="flex flex-col w-screen h-screen font-serif overflow-y-hidden">
      <p className="w-full min-h-[16.7%] text-3xl border-b-2 border-b-[#07111B] flex justify-center items-center ">
        Password Safe
      </p>

      <div className=" h-5/6 flex flex-row">
        <div className="flex flex-col min-h-full max-h-full w-1/3 pt-10 pb-10 pr-10 pl-10">
          <div className=" h-full w-full bg-[#07111B] bg-opacity-30 rounded-lg flex flex-col justify-between shadow-lg shadow-[#0C1F31] p-5">
            <div className=" max-h-[83.3%] flex flex-col overflow-y-scroll scrollbar scrollbar-thumb-[#225280] scrollbar-thumb-rounded-lg gap-2 p-2">
             list
            </div>
            <button
              className="h-1/6 w-full flex justify-center items-end"
              type="submit"
              onClick={handleNewEntry}
            >
              <div className=" h-1/2 w-full border border-white rounded text-white p-2 flex items-center justify-center hover:bg-white hover:bg-opacity-20">
                <FaPlus size={16} />
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col min-h-[83.3%] w-2/3 pt-10 pb-10 pr-32 pl-32">
          <CurrentEntry />
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
