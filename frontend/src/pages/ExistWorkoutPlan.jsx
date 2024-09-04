import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function ExistWorkoutPlan() {
  const { user } = useContext(UserContext);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [updatedPlan, setUpdatedPlan] = useState(null);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.get("/workoutPlans", {
          params: { userId: user._id },
        });
        setWorkoutPlan(response.data);
      } catch (error) {
        console.log("Error fetching workout plans", error);
      }
    };

    fetchWorkoutPlan();
  }, [user._id]);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setUpdatedPlan({...plan})
  };

  const handleEditClick = (planId) => {
    navigate(`/editWorkout/${planId}`);
  };

  const handleInputChange = (dayIndex, exerciseIndex, field, value) => {
    const updatedPlanCopy = { ...updatedPlan };
    updatedPlanCopy.days[dayIndex].exercises[exerciseIndex][field] = value;
    setUpdatedPlan(updatedPlanCopy);
  };

  const handleSubmitChanges = async () => {
    if (!updatedPlan) {
      console.error("No changes to submit.");
      return;
    }
    try {
      await axios.put(`/workoutPlans/${updatedPlan._id}`, {
        days: updatedPlan.days,
      });
      enqueueSnackbar("Workout progress updated successfully", {variant : 'success'});
    } catch (error) {
      enqueueSnackbar("Error updating workout plan",{variant: 'error'});
    }
  };

  const handleProgressClick = (plan) => {
    navigate(`/progress/${plan}`);
  };

  const handleDelete = async (planId) => {
    try {
      await axios.delete(`/workoutPlans/${planId}`);
      enqueueSnackbar('Workout plan deleted' , {variant : 'success'});

     
      navigate('/workoutPlans');
    } catch (error) {
      enqueueSnackbar("Error deleting workout plan", {variant : 'error'});
    }
  }
 
  return (
    <div className="bg-darkGray h-screen p-8">
      <h1 className="text-white text-2xl font-bold mb-4">
        Existing Workout Plans
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {workoutPlan.map((plan) => (
          <div
            key={plan._id}
            className=" relative bg-gray-800 p-2 rounded hover:bg-gray-700 cursor-pointer"
            onClick={() => handleSelectPlan(plan)}
          >
            
            <button 
            className="absolute top-2 right-2 text-white  border border-red-700 w-20 rounded hover:bg-red-700 "
            onClick = {(e) => {
              e.stopPropagation();
              handleDelete(plan._id)}
            }

            >
              delete
            </button>
            
            <h2 className="text-white text-lg font-semibold">{plan.name}</h2>
          </div>
        ))}
      </div>
      {selectedPlan && (
        <div className="mt-8 p-4 bg-gray-900 rounded">
          <h2 className="text-white text-xl font-bold mb-2">
            {selectedPlan.name}
          </h2>
          <button
            className="text-white border p-2 mt-1 w-40 mr-5 rounded hover:bg-gray-800 border-gray-700"
            onClick={() => handleEditClick(selectedPlan._id)}
          >
            Edit
          </button>
          <button
            className="text-white border p-2 mt-1 w-40 rounded hover:bg-gray-800 border-gray-700"
            onClick={() => handleProgressClick(selectedPlan._id)}
          >
            View Progress
          </button>

          <ul>
            {selectedPlan.days.map((day, index) => (
              <li key={index} className="text-white mt-2">
                <h3 className="text-lg">{day.name}</h3>
                <ul className="ml-4">
                  {day.exercises.map((exercise, exIndex) => (
                    <li key={exIndex} className="text-sm m-2">
                      {exercise.name} - {exercise.reps} reps @ {exercise.weight}{" "}
                      lbs
                      <input
                        type="number"
                        placeholder="Reps"
                        value={exercise.reps || ""}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            exIndex,
                            "reps",
                            e.target.value
                          )
                        }
                        className="p-1 ml-2 rounded bg-gray-700 text-white w-16"
                      />
                      <input
                        type="number"
                        placeholder="Weight"
                        value={exercise.weight || ""}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            exIndex,
                            "weight",
                            e.target.value
                          )
                        }
                        className="p-1 ml-2 rounded bg-gray-700 text-white w-16"
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmitChanges}
            className="text-white border p-2 mt-4 w-40 rounded hover:bg-gray-800 border-gray-700"
          >
            Submit Changes
          </button>
        </div>
      )}
    </div>
  );
}
