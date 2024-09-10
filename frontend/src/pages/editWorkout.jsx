import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
export default function EditWorkout() {
  const { planId } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  
  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.get(`/workoutPlans/${planId}`);
        setWorkoutPlan(response.data);
        setName(response.data.name);
      } catch (error) {
        console.log('Error fetching workout plan', error);
      }
  
    };

    fetchWorkoutPlan();
  }, [planId]);

  const handleDayNameChange = (index, value) => {
    const updatedPlan = { ...workoutPlan };
    updatedPlan.days[index].name = value;
    setWorkoutPlan(updatedPlan);
  };

  const handleExerciseChange = (dayIndex, exIndex, field, value) => {
    const updatedPlan = { ...workoutPlan };
    updatedPlan.days[dayIndex].exercises[exIndex][field] = value;
    setWorkoutPlan(updatedPlan);
  };

  const handleAddExercise = (dayIndex) => {
    const updatedPlan = { ...workoutPlan };
    updatedPlan.days[dayIndex].exercises.push({ name: '', reps: 0, weight: 0 });
    setWorkoutPlan(updatedPlan);
  };

  const handleRemoveExercise = (dayIndex, exIndex) => {
    const updatedPlan = { ...workoutPlan };
    updatedPlan.days[dayIndex].exercises.splice(exIndex, 1);
    setWorkoutPlan(updatedPlan);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`/editWorkout/${planId}`, workoutPlan);
      enqueueSnackbar("Workout plan edited successfully", {variant: 'success'});
      navigate('/workoutPlans');
    } catch (error) {
      enqueueSnackbar('Error saving workout plan', {variant: 'error'});
    }
  };

  if (!workoutPlan) return <div>Loading...</div>;

  return (
    <div className="bg-darkGray h-screen p-8">
      <h1 className="text-white text-2xl font-bold mb-4">Edit Workout Plan</h1>
      <div className='text-white font-bold text-xl mb-2 ml-1'>{workoutPlan.name}</div>
      {workoutPlan.days.map((day, dayIndex) => (
        <div key={dayIndex} className="bg-gray-800 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded mb-4 w-fit">
          <div>
          <input
            type="text"
            value={day.name}
            onChange={(e) => handleDayNameChange(dayIndex, e.target.value)}
            className="bg-gray-700 text-white p-2 rounded mb-2 w-40"
            style={{flexGrow:0, flexShrink: 0}}
          />
          <button
              onClick={() => handleAddExercise(dayIndex)}
              className="text-white p-2 rounded hover:text-gray-400 transition duration-300"
              title='Add Exercise'
            >
             <FontAwesomeIcon icon={faPlusCircle}/>
            </button>
          </div>
          
          <ul className="ml-4 col-span-3">
            {day.exercises.map((exercise, exIndex) => (
              <li key={exIndex} className="text-white mt-2 flex items-center">
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(dayIndex, exIndex, 'name', e.target.value)}
                  className="p-1 mr-2 rounded bg-gray-700 text-white w-32"
                />
                <button onClick={() => handleRemoveExercise(dayIndex, exIndex)}
                  className="text-red-500 hover:text-red-800 ml-2"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button
        onClick={handleSaveChanges}
        className="text-white border p-2 mt-1 rounded hover:bg-gray-800 border-gray-700"
      >
        Save Changes
      </button>
    </div>
  );
}
