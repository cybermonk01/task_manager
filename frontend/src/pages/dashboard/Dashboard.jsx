import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllTasks } from "../../redux/taskSlice";

const Dashboard = () => {
  const tasklist = useSelector((state) => state.task);
  const { AllTasks } = tasklist;
  const user = useSelector((state) => state.auth);
  const { currentUser } = user;

  let pendingTask = [];
  let completedTask = [];
  for (let i = 0; i < AllTasks.length; i++) {
    if (AllTasks[i].status === "todo") {
      pendingTask.push(AllTasks[i]);
    } else if (AllTasks[i].status === "done") {
      completedTask.push(AllTasks[i]);
    }
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks(currentUser.token, currentUser.id));
  }, [dispatch, currentUser.token, currentUser.id]);

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <Sidebar />
      </div>
      <div className="dashboard__right">
        <div className="dashboard__rightContent">
          <h2 className="text-2xl font-bold">Task Status Dashboard</h2>
          <div className="taskcount flex justify-between">
            <div className="todo bg-blue-200 p-4 rounded-md">
              Todo - {pendingTask.length}
            </div>
            <div className="done bg-green-200 p-4 rounded-md">
              Complete - {completedTask.length}
            </div>
          </div>
          <div className="createButton mt-4">
            <Link
              to="/taskmanager"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Task
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
