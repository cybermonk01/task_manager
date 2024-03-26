import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../redux/taskSlice";
import ListCard from "./ListCard";

const TaskList = () => {
  const auth = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.task);

  const { currentUser } = auth;
  const { AllTasks } = tasks;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks(currentUser.token, currentUser.id));
  }, [dispatch, currentUser.token, currentUser.id]);

  return (
    <div className="bg-gray-200 p-4">
      <ul className="grid grid-cols-4 gap-4 font-bold text-gray-700">
        <li className="text-center">Id</li>
        <li className="text-center">Task</li>
        <li className="text-center">Status</li>
        <li className="text-center">Action</li>
      </ul>
      {Object.values(AllTasks).map((item) => (
        <ListCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default TaskList;
