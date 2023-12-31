import React from "react";
import EntryButtons from "./EntryButtons";
import InputPassword from "./InputPassword";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import api from "@/utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CurrentEntry = ({
  setShowEmpty,
  setShowEditor,
  setShowEntry,
  setCurrentEntry,
  getData,
  showEditor,
  currentEntry,
  showEntry,
}) => {
  const [title, setTitle] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [show, setShow] = React.useState(false);

  const handleDelete = async () => {
    const response = await api.deleteEntry({ id: currentEntry.id });
    if (response) {
      setCurrentEntry({});
      getData();
      setShowEmpty(true);
      setShowEditor(false);
      setShowEntry(false);
      toast.success("Entry deleted!", {
        theme: "dark",
      });
    } else {
      toast.error("Could not delete entry", {
        theme: "dark",
      });
    }
  };

  const handleSave = async () => {
    const response = await api.updateEntry({
      id: currentEntry.id,
      title: title,
      username: username,
      password: password,
      url: url,
      description: description,
    });
    if (response) {
      setCurrentEntry({
        id: currentEntry.id,
        title: title,
        username: username,
        password: password,
        url: url,
        description: description,
      });
      getData();
      setShowEmpty(false);
      setShowEditor(false);
      setShowEntry(true);
      toast.success("Entry updated!", {
        theme: "dark",
      });
    } else {
      toast.error("Could not update entry", {
        theme: "dark",
      });
    }
  };

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
      {showEditor && (
        <div className="h-full bg-[#07111B] bg-opacity-30 rounded-lg flex flex-col justify-between gap-5 shadow-lg shadow-[#0C1F31] p-5 ">
          <div className=" w-full flex items-center justify-center border-none text-3xl text-white">
            <input
              type="text"
              className="text-3xl w-full text-white flex justify-center items-center border-none font-serif bg-transparent outline-none focus:outline-none"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col text-lg justify-center items-center ">
            <div className="flex flex-col w-full gap-8">
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
              onDeleteClick={() => {
                handleDelete();
              }}
              onEditClick={() => {
                setShowEmpty(false);
                setShowEntry(false);
              }}
              disableEdit={true}
              onSaveClick={() => {
                handleSave();
              }}
              disableSave={false}
              disableDelete={false}
            />
          </div>
        </div>
      )}

      {showEntry && (
        <div className="h-full bg-[#07111B] bg-opacity-30 rounded-lg flex flex-col justify-between gap-5 shadow-lg shadow-[#0C1F31] p-5 ">
          <p className="text-3xl text-white flex justify-center items-center font-serif ">
            {title}
          </p>
          <div className="flex flex-col text-lg justify-center items-center ">
            <div className="flex flex-col w-full gap-8">
              <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B]">
                <p className="text-white opacity-75">Username</p>
                <p className="text-white text-xl ">{username}</p>
              </div>
              <div className="flex flex-col gap-2 w-full border-b-2 border-b-[#07111B]">
                <p>Password</p>
                <div className="flex flex-row gap-0 w-full">
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    className="text-white text-xl outline-none bg-transparent focus:outline-none flex-grow"
                  />
                  {show ? (
                    <RiEyeCloseLine
                      className="text-white text-xl cursor-pointer"
                      onClick={() => setShow(!show)}
                    />
                  ) : (
                    <RiEyeLine
                      className="text-white text-xl cursor-pointer"
                      onClick={() => setShow(!show)}
                    />
                  )}
                </div>
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
          <div className=" flex justify-center items-center">
            <EntryButtons
              onDeleteClick={() => {
                handleDelete();
              }}
              onEditClick={() => {
                setShowEmpty(false);
                setShowEditor(true);
                setShowEntry(false);
              }}
              disableEdit={false}
              disableDelete={false}
              onSaveClick={() => {
                setShowEmpty(false);
                setShowEditor(false);
              }}
              disableSave={true}
            />
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default CurrentEntry;
