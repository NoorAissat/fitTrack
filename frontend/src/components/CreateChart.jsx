import React, { useLocation } from 'react';

export default function CreateChart() {
  const location = useLocation();
  const { splitOption } = location.state || {};

  return (
    <div className='bg-darkGray h-screen flex flex-col justify-center items-center'>
      <h1 className="text-white text-2xl font-bold mb-4">Workout Plan for {splitOption}</h1>
      {/* Render the chart based on splitOption */}
      {/* Example: */}
      {/* if (splitOption === 'push-pull-legs') { renderPushPullLegsChart() } */}
    </div>
  );
}
