const express = require("express");
const router = express.Router();
const {
  getForms,
  createForm,
  getFormById,
  updateForm,
  deleteForm,
} = require("../controller/formController");

router.get('/',getForms);
router.post('/createForm', createForm);
router.put('/update/:formId',updateForm);
router.delete('/delete/:formId', deleteForm);
router.get('/:id',getFormById);

module.exports = router;
