const WorkoutPlan = require('../models/workoutPlan');

//create bnew workout plan 
const createNewWorkoutPlan = async (req,res) => {
    try {
        const {userId, name, type, days} = req.body;

        if(! userId || !name || !type|| !days){
            return res.status(400).json({message: 'All fields are required'})
        }
        //create new workout plan
        const newWorkoutPlan = new WorkoutPlan({
            user: userId,
            name,
            type,
            days,

        });

        await newWorkoutPlan.save();
        res.status(201).json(newWorkoutPlan);
    } catch (error) {
        res.status(500).json({message : 'Error creating workout plan', error});
        
    }
};

//update workout plan 
const updateWorkoutPlan = async (req,res) => {
    try {
        const {WorkoutPlanId} = req.params;
        const {days} = req.body;

        //find workout plan by id 
        const workoutPlan = await WorkoutPlan.findById(WorkoutPlanId);

        if(!workoutPlan){
            return res.status(404).json({message: 'Workout plan not found'});
        }
        //update workout plan days
        workoutPlan.days = days;
        await workoutPlan.save();
        res.status(200).json(workoutPlan);

    } catch (error) {
        res.status(500).json({message : "Error updating workout plan", error});
    }
;}

module.exports ={
    createNewWorkoutPlan,
    updateWorkoutPlan,
};