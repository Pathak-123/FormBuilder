const mongoose = require('mongoose');

const InputSchema = new mongoose.Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    placeholder: { type: String, required: false },
});

const FormSchema = new mongoose.Schema({
    title: { type: String, required: true },
    inputs: [InputSchema],
},{
    timestamps: true,
});

module.exports = mongoose.model('Form', FormSchema);
