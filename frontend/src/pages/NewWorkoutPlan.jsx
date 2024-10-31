import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function NewWorkoutPlan() {
  const [splitName, setSplitName] = useState("");
  const [splitLength, setSplitLength] = useState(1); // default to 1
  const [sections, setSections] = useState([{ name: "", exercises: [] }]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  // Handle split length change
  const handleSplitLengthChange = (e) => {
    const length = parseInt(e.target.value, 10);

    if (length > 7) {
      setSplitLength(7);
      enqueueSnackbar("Enter a number less than or equal to 7 Please", {
        variant: "error",
      });
      return;
    }

    if (length > sections.length) {
      const newSections = sections.concat(
        Array.from({ length: length - sections.length }, () => ({
          name: "",
          exercises: [],
        }))
      );
      setSections(newSections);
    } else if (length < sections.length) {
      setSections(sections.slice(0, length));
    }
    setSplitLength(length);
  };

  // Handle section name change
  const handleSectionNameChange = (index, name) => {
    const newSections = [...sections];
    newSections[index].name = name;
    setSections(newSections);
  };

  // Handle exercise addition
  const handleAddExercise = (index) => {
    const newSections = [...sections];
    newSections[index].exercises.push({ name: "" }); // Only add name field for now
    setSections(newSections);
  };

  // Handle exercise field change
  const handleExerciseChange = (sectionIndex, exerciseIndex, field, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].exercises[exerciseIndex][field] = value;
    setSections(newSections);
  };
  //handle exercise delete
  const handleDelete = (sectionIndex, exerciseIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].exercises.splice(exerciseIndex, 1);
    setSections(newSections);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      console.error("User ID is missing");
      return alert(
        "User is not logged in. Please log in to create a workout plan."
      );
    }

    const data = {
      userId: user._id, // Use actual user ID from context or state
      name: splitName,
      days: sections,
    };

    console.log("Submitting workout plan data:", data);

    try {
      const response = await axios.post("/createNewWorkoutPlan", data);
      console.log("Workout plan created:", response.data);
      enqueueSnackbar("Workout plan created", { variant: "success" });
      navigate("/dashboard"); // Redirect after successful creation
    } catch (error) {
      enqueueSnackbar("Error creating workout plan", { variant: "error" });
    }
  };

  return (
    <div className="bg-darkGray min-h-screen flex flex-col  items-center">
      <div className="flex flex-col justify-center items-center w-full mb-8">
        <h1 className="text-white text-2xl font-bold mb-4 mt-4">
          Create a New Workout Plan
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Split Name"
            value={splitName}
            onChange={(e) => setSplitName(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type = "number"
            placeholder="Number of Days"
            value={splitLength}
            onChange={handleSplitLengthChange}
            min="1"
            max="7"
            className="p-2 rounded bg-gray-800 text-white"
            required
          />
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded mb-2 ">
            <input
              type="text"
              placeholder={`Split Day ${index + 1} `}
              value={section.name}
              onChange={(e) => handleSectionNameChange(index, e.target.value)}
              className="p-2 rounded bg-gray-800 w-full text-white mb-2"
              required
            />
            <button
              type="button"
              onClick={() => handleAddExercise(index)}
              className="hover:text-gray-400 text-white py-1  px-2 rounded mb-2"
              title="Add exercise"
             
            >
              <FontAwesomeIcon icon={faPlusCircle} />
             
            </button>
            {section.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="flex items-center mb-2  ">
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(
                      index,
                      exerciseIndex,
                      "name",
                      e.target.value
                    )
                  }
                  className="p-2 rounded bg-gray-800 w-full  text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleDelete(index, exerciseIndex)}
                  className="text-red-500 hover:text-red-700 ml-2 p-2 "
                  title="Delete exercise"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="hover:bg-blue-500 border p-2 font-bold border-blue-500 text-white py-2 rounded mt-5 transition duration-300"
      >
        Create Workout Plan
      </button>
    </div>
  );
}
