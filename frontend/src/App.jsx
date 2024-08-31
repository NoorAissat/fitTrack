import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Home from "../src/pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import NewWorkoutPlan from "./pages/NewWorkoutPlan";
import ExistWorkoutPlan from "./pages/ExistWorkoutPlan";
import Progress from "./pages/Progress";

//import CreateChart from './components/CreateChart';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createNewWorkoutPlan" element={<NewWorkoutPlan />} />
        <Route path="/workoutPlans" element={<ExistWorkoutPlan />} />
        <Route path="/progress/:planId" element={<Progress/>}/>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
