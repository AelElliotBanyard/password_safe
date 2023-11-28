import React from "react";
import { IoIosSave } from "react-icons/io";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const EntryButtons = ({
  onEditClick,
  onSaveClick,
  onDeleteClick,
  disableEdit,
  disableSave,
  disableDelete
}) => {
  const handleEdit = () => {
    onEditClick();
  };

  const handleSave = () => {
    onSaveClick();
  };

  const handleDelete = () => {
    onDeleteClick();
  };

  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-2">
        <button type="submit" onClick={handleSave}>
          <div
            className={"border border-white rounded text-white p-2 " + (disableSave ? " opacity-50 cursor-not-allowed bg-opacity-30 " : "hover:bg-white hover:bg-opacity-30")}
            onClick={handleSave}
          >
            <IoIosSave size={16} />
          </div>
        </button>
        <button type="submit" onClick={handleEdit}>
          <div
            className={"border border-white rounded text-white p-2 " + (disableEdit ? " opacity-50 cursor-not-allowed bg-opacity-30" : " hover:bg-white hover:bg-opacity-30")}
            onClick={handleEdit}
          >
            <FaEdit size={16} />
          </div>
        </button>
        <button type="submit" onClick={handleDelete}>
          <div
            className={"border border-white rounded text-white p-2 " + (disableDelete ? " opacity-50 cursor-not-allowed bg-opacity-30" : "hover:bg-white hover:bg-opacity-30")}
            onClick={handleDelete}
          >
            <FaTrashAlt size={16} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default EntryButtons;
