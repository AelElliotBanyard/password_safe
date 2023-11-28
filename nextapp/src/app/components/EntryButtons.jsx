import React from "react";
import { IoIosSave } from "react-icons/io";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const EntryButtons = ({
  onEditClick,
  onSaveClick,
  onDeleteClick,
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
            className="border border-white rounded text-white p-2 hover:bg-white hover:bg-opacity-20"
            onClick={handleSave}
          >
            <IoIosSave size={16} />
          </div>
        </button>
        <button type="submit" onClick={handleEdit}>
          <div
            className="border border-white rounded text-white p-2 hover:bg-white hover:bg-opacity-20"
            onClick={handleEdit}
          >
            <FaEdit size={16} />
          </div>
        </button>
        <button type="submit" onClick={handleDelete}>
          <div
            className="border border-white rounded text-white p-2 hover:bg-white hover:bg-opacity-20"
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
