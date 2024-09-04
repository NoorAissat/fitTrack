const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, signOut} = require('../controllers/authController')
const {createNewWorkoutPlan, getWorkoutPlan, updateWorkoutPlan, progress, editWorkoutPlan, getSingleWorkoutPlan, deleteWorkoutPlan} = require('../controllers/workoutPlanContoller')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.get('/signout', signOut)
router.post('/createNewWorkoutPlan',createNewWorkoutPlan)
router.get('/workoutPlans', getWorkoutPlan)
router.put('/workoutPlans/:planId', updateWorkoutPlan)
router.get('/progress/:planId', progress)
router.get('/workoutPlans/:planId', getSingleWorkoutPlan)
router.put('/editWorkout/:planId',editWorkoutPlan)
router.delete('/workoutPlans/:planId', deleteWorkoutPlan)



module.exports = router