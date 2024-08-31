const WorkoutPlan = require("../models/workoutPlan");

//create bnew workout plan
const createNewWorkoutPlan = async (req, res) => {
  try {
    const { userId, name, days } = req.body;

    if (!userId || !name || !days) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //create new workout plan
    const newWorkoutPlan = new WorkoutPlan({
      user: userId,
      name,
      days,
    });

    await newWorkoutPlan.save();
    res.status(201).json(newWorkoutPlan);
  } catch (error) {
    res.status(500).json({ message: "Error creating workout plan", error });
  }
};

const getWorkoutPlan = async (req, res) => {
  try {
    const { userId } = req.query;
    const workoutPlans = await WorkoutPlan.find({ user: userId });

    if (!workoutPlans.length) {
      return res.status(404).json({ message: "No workout plan found" });
    }

    res.status(200).json(workoutPlans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout plans", error });
  }
};

const progress = async (req, res) => {
  try {
    const { planId } = req.params;
    const workoutPlan = await WorkoutPlan.findById(planId);

    if (!workoutPlan) {
      return res.status(404).json({ message: "Workout plan not found" });
    }

    res.json(workoutPlan);
  } catch (error) {
    console.error("Error fetching progress data", error);
    res.status(500).json({ message: "Server error" });
  }
};

//update workout plan
const updateWorkoutPlan = async (req, res) => {
  try {
    const { workoutPlanId } = req.params;
    const { days } = req.body;

    //find workout plan by id
    const workoutPlan = await WorkoutPlan.findById(workoutPlanId);

    if (!workoutPlan) {
      return res.status(404).json({ message: "Workout plan not found" });
    }

    days.forEach((day, dayIndex) => {
      day.exercises.forEach((exercise, exIndex) => {
        const existingExercise = workoutPlan.days[dayIndex].exercises[exIndex];

        existingExercise.history.push({
          reps: exercise.reps,
          weight: exercise.weight,
        });

        existingExercise.reps = exercise.reps;
        existingExercise.weight = exercise.weight;
      });
    });

    await workoutPlan.save();

    res.status(200).json(workoutPlan);
  } catch (error) {
    res.status(500).json({ message: "Error updating workout plan", error });
  }
};

module.exports = {
  createNewWorkoutPlan,
  getWorkoutPlan,
  updateWorkoutPlan,
  progress,
};
