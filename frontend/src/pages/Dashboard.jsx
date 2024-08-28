import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <div className="bg-darkGray flex flex-col justify-center items-center h-screen  ">
      {!!user && (
        <h2 className="text-white font-bold text-3xl mb-4">Hi {user.name}!</h2>
      )}
      <h1 className="text-white ">Pick which option you would like below!</h1>
      <div>
        <Link to="/createNewWorkoutPlan">
          <button className="border border-blue-500 w-full  mb-4  mt-4 p-2 text-white font-bold hover:bg-blue-500 transition duration-30">
            Create New Workout Plan
          </button>
        </Link>
        <button className="border border-blue-500 w-full p-2 text-white font-bold hover:bg-blue-500 transition duration-30">
          View Existing Workout Plan
        </button>
      </div>
    </div>
  );
}
