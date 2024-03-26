import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;

  return (
    <div className="home bg-gray-100">
      <div className="home__container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Organize it all</h2>
        <p className="text-lg mb-8">With TaskManager</p>

        {currentUser && currentUser.token ? (
          <Link
            to="/dashboard"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Get Started
          </Link>
        ) : (
          <Link
            to="/signin"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
