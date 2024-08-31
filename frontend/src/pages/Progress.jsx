import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Progress() {
  const { planId } = useParams(); // Get the planId from the URL
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get(`/progress/${planId}`);
        setProgressData(response.data);
      } catch (error) {
        console.error('Error fetching progress data', error);
      }
    };

    fetchProgressData();
  }, [planId]);

  return (
    <div className="bg-darkGray h-screen p-8">
      <h1 className="text-white text-2xl font-bold mb-4">Progress</h1>
      {/* Render progress data here */}
      {progressData ? (
        <div>
          {/* Display progress details */}
        </div>
      ) : (
        <p className="text-white">Loading...</p>
      )}
    </div>
  );
}
