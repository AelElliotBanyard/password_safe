import React from "react";
import InputPassword from "./InputPassword";
import EntryButtons from "./EntryButtons";
import api from "@/utils/api";

const NewEntry = ({
  setShowEmpty,
  setShowEditor,
  setShowEntry,
  setShowNewEntry,
}) => {
  const [title, setTitle] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSave = async () => {
    const response = await api.createEntry({
      title,
      username,
      password,
      url,
      description,
    });
    if (response.status === 200) {
      setShowEmpty(false);
      setShowEditor(false);
      setShowEntry(true);
      setShowNewEntry(false);
    }
  };
  return (
    <div className="h-full bg-[#07111B] bg-opacity-30 rounded-lg flex flex-col justify-between gap-5 shadow-lg shadow-[#0C1F31] p-5 ">
      <p className="text-3xl text-white flex justify-center items-center font-serif ">
        {title}
      </p>
      <div className="flex flex-col text-lg justify-center items-center ">
        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B]">
            <p className="text-white opacity-75">Title</p>
            <input
              type="text"
              className="text-white text-xl outline-none bg-transparent focus:outline-none"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B]">
            <p className="text-white opacity-75">Username</p>
            <input
              type="text"
              className="text-white text-xl outline-none bg-transparent focus:outline-none"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B] ">
            <p className="text-white opacity-75">Password</p>
            <InputPassword
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B] ">
            <p className="text-white opacity-75">URL</p>
            <input
              type="text"
              className="text-white text-xl outline-none bg-transparent focus:outline-none"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B] ">
            <p className="text-white opacity-75">Description</p>
            <input
              type="text"
              className="text-white text-xl outline-none bg-transparent focus:outline-none"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-center">
        <EntryButtons
          setShowEmpty={setShowEmpty}
          setShowEditor={setShowEditor}
          setShowEntry={setShowEntry}
          onSaveClick={() => {
            handleSave();
          }}
        />
      </div>
    </div>
  );
};

export default NewEntry;
