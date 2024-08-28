const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, signOut, createNewWorkoutPlan} = require('../controllers/authController')

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
router.get('/createNewWorkoutPlan',createNewWorkoutPlan)



module.exports = router