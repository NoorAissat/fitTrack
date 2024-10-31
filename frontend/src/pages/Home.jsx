import React from "react";
import { Link } from "react-router-dom";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    
    <div className="bg-darkGray flex flex-col justify-start text-white items-center h-screen">
      <h1 className="font-bold text-3xl items-center mt-20 ">
        Welcome to FitTracker!
      </h1>
      <div className=" flex flex-col items-center mt-10 bg-blue-500 border max-w-lg rounded shawdow p-5">
        <p>
          FitTracker is your personal fitness companion, designed to help you
          create and manage custom workout plans. Whether you're building your
          own routines or tracking your progress, FitTracker allows you to:
          <br/>
          <br/>
          - Create personalized workout plans with exercises tailored to your
          goals. 
          <br/>
          <br/>
          - Update your reps and weights as you improve.
          <br/>
          <br/>
          - Track your progress over time with visual insights and graphs.
          <br/>
          <br/>
          - Access and review your existing workouts anytime.
          <br/>
          <br/>
          Take control of your fitness journey
          with FitTracker and stay motivated with every step!
        </p>
      </div>
        <Link to="/login" className="hover:text-gray-400 mt-6 font-bold  ">Login 
        <FontAwesomeIcon className="ml-2" icon={faSignIn} ></FontAwesomeIcon>
        </Link>
        <Link to="/register" className="hover:text-gray-400 m-3 font-bold ">Register
        <FontAwesomeIcon className="ml-2" icon={faSignIn} ></FontAwesomeIcon>
        </Link>
     
    </div>
  );
}
