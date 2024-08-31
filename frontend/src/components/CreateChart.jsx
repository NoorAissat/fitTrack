import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateChart() {
  const location = useLocation();
  const { splitOption } = location.state || {};
  const [exercises, setExercises] = useState([]);
  const [splitName, setSplitName] = useState("");
  const [numDays, setNumDays] = useState(0);
  const navigate = useNavigate();

  const handleAddExercise = (dayIndex) => {
    const newExercise = { name: "", reps: 0, weight: 0, lastUsedWeight: 0 };
    const updatedExercises = [...exercises];
    updatedExercises[dayIndex].push(newExercise);
    setExercises(updatedExercises);
  };

  const handleExerciseChange = (dayIndex, exerciseIndex, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[dayIndex][exerciseIndex][field] = value;
    setExercises(updatedExercises);
  };

  const handleSave = async () => {
    const workoutPlan = {
      name: splitName || splitOption,
      type: splitOption === "custom" ? "custom" : "predefined",
      days: exercises,
    };

    try {
      await axios.post("/api/createNewWorkoutPlan", workoutPlan, {
        withCredentials: true,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving workout plan:", error);
    }
  };

  const renderChart = () => {
    if (splitOption === "custom") {
      return (
        <div>
          <input
            type="text"
            placeholder="Name Your Split"
            value={splitName}
            onChange={(e) => setSplitName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of Days"
            value={numDays}
            onChange={(e) => {
              setNumDays(e.target.value);
              setExercises(Array.from({ length: e.target.value }, () => []));
            }}
          />
          {Array.from({ length: numDays }, (_, i) => (
            <div key={i}>
              <h2>Day {i + 1}</h2>
              {exercises[i].map((exercise, j) => (
                <div key={j}>
                  <input
                    type="text"
                    placeholder="Exercise Name"
                    value={exercise.name}
                    onChange={(e) =>
                      handleExerciseChange(i, j, "name", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={exercise.reps}
                    onChange={(e) =>
                      handleExerciseChange(i, j, "reps", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Weight"
                    value={exercise.weight}
                    onChange={(e) =>
                      handleExerciseChange(i, j, "weight", e.target.value)
                    }
                  />
                </div>
              ))}
              <button onClick={() => handleAddExercise(i)}>Add Exercise</button>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h2>{splitOption}</h2>
          {/* Predefined exercises and days can be added here */}
        </div>
      );
    }
  };

  return (
    <div className="bg-darkGray h-screen flex flex-col justify-center items-center">
      <h1 className="text-white text-2xl font-bold mb-4">
        Workout Plan for {splitOption}
      </h1>
      {renderChart()}
      <button
        className="border border-blue-700 w-40 rounded p-2 text-white font-bold hover:bg-blue-700 transition duration-300"
        onClick={handleSave}
      >
        Save Workout Plan
      </button>
    </div>
  );
}
