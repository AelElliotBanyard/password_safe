import React from "react";
import { IoIosSave } from "react-icons/io";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const EntryButtons = ({
  onEditClick,
  onSaveClick,
  onDeleteClick,
  disableEdit,
  disableSave,
  disableDelete,
}) => {
  const handleEdit = (e) => {
    e.preventDefault();
    onEditClick();
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("save");
    onSaveClick();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDeleteClick();
  };

  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-2">
        <button onClick={handleSave}>
          <div
            className={
              "border border-white rounded text-white p-2 " +
              (disableSave
                ? " opacity-50 cursor-not-allowed bg-opacity-30 "
                : "hover:bg-white hover:bg-opacity-30")
            }
          >
            <IoIosSave size={16} />
          </div>
        </button>
        <button onClick={handleEdit}>
          <div
            className={
              "border border-white rounded text-white p-2 " +
              (disableEdit
                ? " opacity-50 cursor-not-allowed bg-opacity-30"
                : " hover:bg-white hover:bg-opacity-30")
            }
          >
            <FaEdit size={16} />
          </div>
        </button>
        <button onClick={handleDelete}>
          <div
            className={
              "border border-white rounded text-white p-2 " +
              (disableDelete
                ? " opacity-50 cursor-not-allowed bg-opacity-30"
                : "hover:bg-red-600 hover:bg-opacity-30")
            }
          >
            <FaTrashAlt size={16} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default EntryButtons;
