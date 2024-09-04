import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Progress() {
  const { planId } = useParams(); // Get the planId from the URL
  const [progressData, setProgressData] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedGraph, setSelectedGraph] = useState("weight");

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get(`/progress/${planId}`);
        setProgressData(response.data);
      } catch (error) {
        console.error("Error fetching progress data", error);
      }
    };

    fetchProgressData();
  }, [planId]);

  // Extract data for graphing
  const extractGraphData = () => {
    if (!progressData) return [];

    // Flatten the data structure to collect all weight history entries
    const history = progressData.days.flatMap((day) =>
      day.exercises.flatMap((exercise) =>
        exercise.history.map((entry) => ({
          date: new Date(entry.date).toISOString().split("T")[0], // Format the date
          reps: entry.reps,
          weight: entry.weight,
          exercise: exercise.name,
          day: day.name,
        }))
      )
    );

    return history;
  };

  const calculateProgress = (data) => {
    if (data.length === 0) return null;

    const sortedData = data.sort((a, b) => new Date(a.data) - new Date(b.data));
    const intialWeight = sortedData[0].weight;
    const lastestWeight = sortedData[sortedData.length - 1].weight;

    if (intialWeight === 0) return null;

    const percentageChange =
      ((lastestWeight - intialWeight) / intialWeight) * 100;
    return percentageChange.toFixed(2);
  };

  useEffect(() => {
    // Filter the data based on selected exercise and split day
    const allData = extractGraphData();
    let filtered = allData;

    if (selectedExercise) {
      filtered = filtered.filter(
        (entry) => entry.exercise === selectedExercise
      );
    }

    if (selectedDay) {
      filtered = filtered.filter((entry) => entry.day === selectedDay);
    }

    if (startDate && endDate) {
      filtered = filtered.filter(
        (entry) => entry.date >= startDate && entry.date <= endDate
      );
    }

    setFilteredData(filtered);
    setProgressPercentage(calculateProgress(filtered));
  }, [selectedExercise, selectedDay, progressData, startDate, endDate]);

  // Get unique exercises and split days for dropdown options
  const getUniqueOptions = (key) => {
    const allData = extractGraphData();
    return [...new Set(allData.map((entry) => entry[key]))];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { weight, exercise, day , reps} = payload[0].payload;
      return (
        <div className="bg-gray-800 text-white p-2 rounded shadow-md">
          <p>Date: {payload[0].payload.date}</p>
          <p>Weight: {weight} lbs</p>
          <p>reps: {reps}</p>
          <p>Exercise: {exercise}</p>
          <p>Day: {day}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-darkGray h-screen p-8">
      <h1 className="text-white text-2xl font-bold mb-4">Progress</h1>

      {/* Dropdown filters */}
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          <option value="">All Exercises</option>
          {getUniqueOptions("exercise").map((exercise, index) => (
            <option key={index} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>

        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="">All Days</option>
          {getUniqueOptions("day").map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
        

        <select
        className="p-2 rounded bg-gray-700 text-white"
        value={selectedGraph}
        onChange={(e) => setSelectedGraph(e.target.value)}
        
        >
          <option value="weight">Weight Graph</option>
          <option value="reps">Reps Graph</option>
          
        </select>
      </div>

      <div>
        <input
          type="date"
          className="p-2 rounded bg-gray-700 text-white"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="p-2 rounded bg-gray-700 text-white m-3"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {progressPercentage !== null && (
        <div className="text-white mb-4">
          Progress: {progressPercentage}% from {startDate} to {endDate}
        </div>
      )}

      {/* Display progress graph */}
      {filteredData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedGraph}
              stroke= {selectedGraph == "weight" ? "#8884d8" : "#82ca9d"}
              activeDot={{ r: 8 }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-white">No data available for selected filters.</p>
      )}
      
    </div>
  );
}
