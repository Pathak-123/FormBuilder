const Form = require("../Models/Form");

// Get all forms
const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new form
const createForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;

    if (!title || inputs.length === 0) {
      return res.status(400).json({ message: "Invalid form data" });
    }

    const newForm = new Form({ title, inputs });
    await newForm.save();

    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific form by ID
const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a form by ID
const updateForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;
    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      { title, inputs },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a form by ID
const deleteForm = async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getForms,
  createForm,
  getFormById,
  updateForm,
  deleteForm,
};
