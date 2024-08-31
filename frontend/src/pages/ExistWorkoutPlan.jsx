
import React ,{useState, useContext, useEffect} from 'react';
import { UserContext} from '../../context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ExistWorkoutPlan() {
  const {user} = useContext(UserContext);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.get('/workoutPlans' , {params: {userId: user._id}});
        setWorkoutPlan(response.data);
      } catch (error) {
        console.log('Error fetching workout plans', error);
      }
    };

    fetchWorkoutPlan();
  }, [user._id]);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const updateExercise = (dayIndex, exerciseIndex, field, value) => {
    const updatedPlan = { ...selectedPlan };
    updatedPlan.days[dayIndex].exercises[exerciseIndex][field] = value;
    setSelectedPlan(updatedPlan);

    axios.put(`/workoutPlans/${updatedPlan._id}`, {days: updatedPlan.days})
    .then(response => {
      console.log('Workout plan updated sucessfully', response.data);
    })
    .catch(error => {
      console.error('Error updating workout plan', error);
    })
  };

  const handleProgressClick =(planId) =>{
    navigate(`/progress/${planId}`);
  }
  
  return (
    <div className="bg-darkGray h-screen p-8">
      <h1 className="text-white text-2xl font-bold mb-4">Existing Workout Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workoutPlan.map((plan) => (
          <div
            key={plan._id}
            className="bg-gray-800 p-4 rounded hover:bg-gray-700 cursor-pointer"
            onClick={() => handleSelectPlan(plan)}
          >
            <h2 className="text-white text-lg font-semibold">{plan.name}</h2>
          </div>
        ))}
      </div>
      {selectedPlan && (
        <div className="mt-8 p-4 bg-gray-900 rounded">
          <h2 className="text-white text-xl font-bold">{selectedPlan.name}</h2>
         
          <button className='text-white border p-2 mt-1 rounded hover:bg-gray-800 border-gray-700'
            onClick={() => handleProgressClick(selectedPlan._id) }
            >
              View Progress
            </button>
        
          <ul>
            {selectedPlan.days.map((day, index) => (
              <li key={index} className="text-white mt-2">
                <h3 className="text-lg">{day.name}</h3>
                <ul className="ml-4">
                  {day.exercises.map((exercise, exIndex) => (
                    <li key={exIndex} className="text-sm">
                      {exercise.name} - {exercise.reps} reps @ {exercise.weight} lbs
                      <input
                        type="number"
                        placeholder="Reps"
                        value={exercise.reps || ''}
                        onChange={(e) =>
                          updateExercise(index, exIndex, 'reps', e.target.value)
                        }
                        className="p-1 ml-2 rounded bg-gray-700 text-white w-16"
                      />
                      <input
                        type="number"
                        placeholder="Weight"
                        value={exercise.weight || ''}
                        onChange={(e) =>
                          updateExercise(index, exIndex, 'weight', e.target.value)
                        }
                        className="p-1 ml-2 rounded bg-gray-700 text-white w-16"
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
