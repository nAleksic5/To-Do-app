const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    _id: new mongoose.Types.ObjectId(),
    name: { type: String, required: true },
    description: { type: String, required: false, default: " " },
    status: { type: String, required: false, default:  'pending' },
    priority: {type : String, required: false, default: "low" },
    active: { type: Boolean, required: false, default: true }
});

module.exports = mongoose.model('Task', taskSchema);