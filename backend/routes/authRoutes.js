const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, signOut,} = require('../controllers/authController')
const {createNewWorkoutPlan, updateWorkoutPlan } = require('../controllers/workoutPlanContoller')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.get('/signout', signOut)
router.post('/createNewWorkoutPlan',createNewWorkoutPlan)

router.put('/update/:workoutPlanId', updateWorkoutPlan )



module.exports = router