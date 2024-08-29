const mongoose = require('mongoose');
const {Schema} = mongoose;

const exerciseSchema = new Schema({
    name: {type: String, required:true},
    reps : Number,
    weight : {type: Number, required:true},
    lastUsedWeight : Number,
});

const daySchema = new Schema({
    name : {type: String, required: true},
    exercises: [exerciseSchema],
});

const workoutPlanSchema = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'User', required:true},
    name :{type:String, required: true},
    type: { type:String, enum:['predefined', 'custom'], required:true},
    days: [daySchema],
    createdAt: {type: Date, default: Date.now},
});

const workoutPlan = mongoose.model('workoutPlan', workoutPlanSchema);
module.exports = workoutPlan;

