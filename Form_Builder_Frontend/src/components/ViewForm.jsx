import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getForm } from "../services/formAPI";
import "../style/formListStyle.css";
import "../style/viewFormStyle.css";
import { toast } from "react-toastify";
import Loader from "./Loader";

function ViewForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForm() {
      try {
        const response = await getForm(id);
        if (response.success) {
          const form = response.form;
          setForm(form);
          const initialData = {};
          form.inputs.forEach((input) => {
            initialData[input.title] = "";
          });
          setFormData(initialData);
        } else {
          toast.dismiss();
          toast.error("Failed to fetch Form");
        }
      } catch {
        toast.dismiss();
        toast.error("Failed to fetch Form");
      } finally {
        setLoading(false);
      }
    }
    fetchForm();
  }, [id]);

  const handleSubmit = () => {
    const emailField = form.inputs.find(input => input.type === "email");
    if (emailField) {
      const emailValue = formData[emailField.title];
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(emailValue)) {
        toast.error("Please enter a valid email address.");
        return; 
      }
    }
    toast.success("Form Submitted Successfully");
    navigate("/");
  };

  if (loading) return <Loader />

  return (
    <div className="view-container">
      <h1 className="view-form-title">{form.title}</h1>
      <form className="show-view-from">
        {form.inputs.map((input, index) => (
          <input placeholder={input.title} type={input.type} key={index} className="view-form-field" />
           
        ))}
      </form>

      <button type="submit" onClick={handleSubmit} className="btn">
        Submit
      </button>
    </div>
  );
}

export default ViewForm;
