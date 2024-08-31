import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

export default function NewWorkoutPlan() {
  const [splitName, setSplitName] = useState('');
  const [splitLength, setSplitLength] = useState(1); // default to 1 
  const [sections, setSections] = useState([{ name: '', exercises: [] }]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log('user from context: ',user );

  // Handle split length change
  const handleSplitLengthChange = (e) => {
    const length = parseInt(e.target.value, 10);
    setSplitLength(length);
    // Adjust sections array based on split length
    setSections(Array.from({ length }, () => ({ name: '', exercises: [] })));
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
    newSections[index].exercises.push({ name: '' }); // Only add name field for now
    setSections(newSections);
  };

  // Handle exercise field change
  const handleExerciseChange = (sectionIndex, exerciseIndex, field, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].exercises[exerciseIndex][field] = value;
    setSections(newSections);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      console.error('User ID is missing');
      return alert('User is not logged in. Please log in to create a workout plan.');
  }

    const data = {
      userId: user._id, // Use actual user ID from context or state
      name: splitName,
      days: sections,
    };
console.log('Submitting workout plan data:', data);
    try {
      const response = await axios.post('/createNewWorkoutPlan', data);
      console.log('Workout plan created:', response.data);
      navigate('/dashboard'); // Redirect after successful creation
    } catch (error) {
      console.error('Error creating workout plan:', error);
    }
  };

  return (
    <div className='bg-darkGray h-screen flex flex-col justify-center items-center'>
      <h1 className="text-white text-2xl font-bold mb-4">Create a New Workout Plan</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Split Name"
          value={splitName}
          onChange={(e) => setSplitName(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="number"
          placeholder="Number of Sections"
          value={splitLength}
          onChange={handleSplitLengthChange}
          min="1"
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded mb-2">
            <input
              type="text"
              placeholder={`Section ${index + 1} Name`}
              value={section.name}
              onChange={(e) => handleSectionNameChange(index, e.target.value)}
              className="p-2 rounded bg-gray-800 text-white mb-2"
              required
            />
            <button
              type="button"
              onClick={() => handleAddExercise(index)}
              className="bg-blue-500 text-white py-1 px-2 rounded mb-2"
            >
              Add Exercise
            </button>
            {section.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(index, exerciseIndex, 'name', e.target.value)
                  }
                  className="p-2 rounded bg-gray-800 text-white"
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="bg-green-500 text-white py-2 rounded">
          Create Workout Plan
        </button>
      </form>
    </div>
  );
}
