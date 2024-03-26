import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;

  return (
    <div>
      <ul className="bg-gray-800 p-4">
        <li className="list-item">
          <h5 className="text-white">{currentUser.username}</h5>
        </li>
        <li className="list-item">
          <Link className="text-white hover:text-gray-300" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="list-item">
          <Link className="text-white hover:text-gray-300" to="/settings">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
