"use client";
import React, { useState, useEffect } from "react";
import NewEntry from "../components/NewEntry";
import { FaPlus } from "react-icons/fa";
import CurrentEntry from "../components/CurrentEntry";
import EmptySpace from "../components/EmptySpace";
import api from "@/utils/api";
import ListEntry from "../components/ListEntry";
import { useTokenContext } from "@/context/TokenContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { token } = useTokenContext();
  const router = useRouter();
  const [entries, setEntries] = React.useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showEntry, setShowEntry] = useState(false);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [showEmpty, setShowEmpty] = useState(true);
  const [currentEntry, setCurrentEntry] = useState({
    title: "New Entry",
    username: "Username",
    password: "Password",
    url: "URL",
    description: "Description",
  });

  const handleNewEntry = () => {
    setShowNewEntry(true);
    setShowEntry(false);
    setShowEditor(false);
    setShowEmpty(false);
  };

  useEffect(() => {
    console.log(token);
    if (token === "" || token === null) {
      router.replace("/");
    }
  }, [token]);

  const getData = async () => {
    const response = await api.getEntries();
    if (response) {
      setEntries(response);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen font-serif overflow-y-hidden">
      <p className="w-full min-h-[16.7%] text-3xl border-b-2 border-b-[#07111B] flex justify-center items-center ">
        Password Safe
      </p>

      <div className=" h-5/6 flex flex-row">
        <div className="flex flex-col min-h-full max-h-full w-1/3 pt-10 pb-10 pr-10 pl-10">
          <div className=" h-full w-full bg-[#0D2237] bg-opacity-30 rounded-lg flex flex-col justify-between shadow-lg shadow-[#0C1F31] p-5">
            <div className=" max-h-[83.3%] flex flex-col overflow-y-scroll scrollbar scrollbar-thumb-[#225280] scrollbar-thumb-rounded-lg gap-5 p-2">

              {entries.map((entry, index) => (
                <div className={" " + (entry === currentEntry ? "border-none bg-[#07111B] " : "")}>
                  <ListEntry
                    key={index}
                    entry={entry}
                    onClick={() => {
                      setShowEntry(true);
                      setShowEditor(false);
                      setShowNewEntry(false);
                      setShowEmpty(false);
                      setCurrentEntry(entry);
                    }}
                  />
                </div>
              ))}
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
          {showEntry && (
            <CurrentEntry
              setShowEntry={setShowEntry}
              setShowEditor={setShowEditor}
              setShowEmpty={setShowEmpty}
              setShowNewEntry={setShowNewEntry}
              showEditor={showEditor}
              currentEntry={currentEntry}
            />
          )}
          {showEditor && (
            <CurrentEntry
              setShowEntry={setShowEntry}
              setShowEditor={setShowEditor}
              setShowEmpty={setShowEmpty}
              setShowNewEntry={setShowNewEntry}
              showEditor={showEditor}
              currentEntry={currentEntry}
            />
          )}
          {showNewEntry && (
            <NewEntry
              setShowEntry={setShowEntry}
              setShowEditor={setShowEditor}
              setShowNewEntry={setShowNewEntry}
            />
          )}
          {showEmpty && <EmptySpace />}
        </div>
      </div>
    </div>
  );
};

export default page;
