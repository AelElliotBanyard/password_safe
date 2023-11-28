import React from "react";
import EntryButtons from "./EntryButtons";

const CurrentEntry = ({
  setShowEmpty,
  setShowEditer,
  setShowNewEntry,
  setShowEntry,
  showEditer,
  currentEntry,
}) => {
  const [title, setTitle] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (currentEntry) {
      setTitle(currentEntry.title);
      setUsername(currentEntry.username);
      setPassword(currentEntry.password);
      setUrl(currentEntry.url);
      setDescription(currentEntry.description);
    }
  }, [currentEntry]);

  return (
    <div className="h-full w-full">
      <div className="h-full bg-[#07111B] bg-opacity-30 rounded-lg flex flex-col justify-between gap-5 shadow-lg shadow-[#0C1F31] p-5">
        <p className="text-3xl text-white flex justify-center items-center font-serif ">
          {title}
        </p>
        <div className="flex flex-col text-lg justify-center items-center ">
          <div className="flex flex-col w-full gap-8">
            <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B]">
              <p className="text-white opacity-75">Username</p>
              <p className="text-white text-xl">{username}</p>
            </div>
            <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B] ">
              <p className="text-white opacity-75">Password</p>
              <p className="text-white text-xl ">{password}</p>
            </div>
            <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B] ">
              <p className="text-white opacity-75">URL</p>
              <p className="text-white text-xl">{url}</p>
            </div>
            <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B] ">
              <p className="text-white opacity-75">Description</p>
              <p className="text-white text-xl">{description}</p>
            </div>
          </div>
        </div>

        {showEditer && (
          <div className="h-full bg-[#07111B] bg-opacity-30 rounded-lg flex flex-col justify-between gap-5 shadow-lg shadow-[#0C1F31] p-5 ">
            <p className="text-3xl text-white flex justify-center items-center font-serif ">
              {title}
            </p>
            <div className="flex flex-col text-lg justify-center items-center ">
              <div className="flex flex-col w-full gap-8">
                <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B]">
                  <p className="text-white opacity-75">Username</p>
                  <p className="text-white text-xl  ">{username}</p>
                </div>
                <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B] ">
                  <p className="text-white opacity-75">Password</p>
                  <p className="text-white text-xl ">{password}</p>
                </div>
                <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B] ">
                  <p className="text-white opacity-75">URL</p>
                  <p className="text-white text-xl">{url}</p>
                </div>
                <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B] ">
                  <p className="text-white opacity-75">Description</p>
                  <p className="text-white text-xl">{description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className=" flex justify-center items-center">
          <EntryButtons
            setShowEmpty={setShowEmpty}
            setShowEditer={setShowEditer}
            setShowNewEntry={setShowNewEntry}
            setShowEntry={setShowEntry}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentEntry;
