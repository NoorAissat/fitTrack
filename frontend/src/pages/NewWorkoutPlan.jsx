import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewWorkoutPlan() {
  const [splitOption, setSplitOption] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if(!splitOption){
      alert('Please select a workout split or create your own to continue.');
      return;
    }
    if(splitOption == 'custom'){
      navigate('/createCustomSplit');
    }else{
      navigate('/createChart', {state: {splitOption}});
    }
  };






  return (
    <div className='bg-darkGray h-screen flex flex-col justify-center  items-center'>
    <h1 className="text-white text-2xl font-bold mb-4 relative top-[-150px] ">Create a New Workout Plan</h1>
      <select
        className="p-2 mb-4 text-black relative top-[-140px] hover:bg-gray-200  "
        value={splitOption}
        onChange={(e) => setSplitOption(e.target.value)}
      >
        <option value="" disabled>Select Workout Split or Create One</option>
        <option value="push-pull-legs">Push-Pull-Legs</option>
        <option value="upper-lower">Upper-Lower</option>
        <option value="full-body">Full Body</option>
        <option value="custom">Create Your Own Split</option>
      </select>
      <div>
      <button
        className="border border-blue-700 w-40 relative top-[-120px] rounded p-2 text-white font-bold hover:bg-blue-700 transition duration-300"
        onClick={handleSubmit}
      >
        Continue
      </button>
      </div>
    </div>
  )
}
