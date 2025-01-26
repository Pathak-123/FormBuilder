const Form = require("../Models/Form");


const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    return res.status(200).json({
      success:true,
      forms
  });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
});
  }
};


const createForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;

    if (!title || inputs.length === 0) {
      return res.status(400).json({ message: "Invalid form data" });
    }

    const newForm = new Form({ title, inputs });
    await newForm.save();

    return res.status(201).json({
      success: true,
      message: "Form Created Successfully !" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
  });
  }
};


const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    return res.status(200).json({
      success:true,
      form
  });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
});
  }
};


const updateForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;
    const updatedForm = await Form.findByIdAndUpdate(
      req.params.formId,
      { title, inputs },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({
      success: true,
      message: "Form Updated successfully"
  });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
      });
  }
};


const deleteForm = async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.formId);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({
      success:true,
      message:"Task deleted successfully"
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
  });
  }
};

module.exports = {
  getForms,
  createForm,
  getFormById,
  updateForm,
  deleteForm,
};
