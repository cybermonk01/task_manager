import React, { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight, BiEdit, BiTrash } from "react-icons/bi";
import { arrowClick, deleteItem, editTask } from "../../redux/taskSlice";
import { useDispatch } from "react-redux";

const ListCard = ({ item }) => {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(item.task);
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedTask(item.task);
  }, [item]);

  const ArrowClick = (string) => {
    dispatch(arrowClick(item, string));
  };

  const handleDelete = () => {
    dispatch(deleteItem(item._id));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const saveEdit = () => {
    dispatch(editTask(item._id, editedTask));
    setEditing(false);
  };

  const handleChange = (e) => {
    setEditedTask(e.target.value);
  };

  return (
    <div>
      <ul className="border border-gray-300 rounded-lg shadow-md">
        <li className="flex items-center justify-between border-t border-gray-300 p-4">
          <span>{item._id}</span>
          {editing ? (
            <input
              className="flex-grow ml-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={editedTask}
              onChange={handleChange}
            />
          ) : (
            <span className="ml-4">{editedTask}</span>
          )}
          <span>{item.status}</span>
          <div className="flex space-x-2">
            <button
              disabled={item.status === "backlog"}
              onClick={() => ArrowClick("left")}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                item.status === "backlog" && "opacity-50 cursor-not-allowed"
              }`}
            >
              <BiChevronLeft />
            </button>
            <button
              disabled={item.status === "done"}
              onClick={() => ArrowClick("right")}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                item.status === "done" && "opacity-50 cursor-not-allowed"
              }`}
            >
              <BiChevronRight />
            </button>
            {editing ? (
              <button
                onClick={saveEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <BiEdit />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <BiTrash />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ListCard;
