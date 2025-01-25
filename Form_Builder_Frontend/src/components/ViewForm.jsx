import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getForm } from "../services/formAPI";

function ViewForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function fetchForm() {
      const data = await getForm(id);
      setForm(data);

      // Initialize form data
      const initialData = {};
      data.inputs.forEach((input) => {
        initialData[input.title] = "";
      });
      setFormData(initialData);
    }
    fetchForm();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully!");
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{form.title}</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {form.inputs.map((input, index) => (
          <div key={index}>
            <label>{input.title}</label>
            <input
              type={input.type}
              name={input.title}
              placeholder={input.placeholder}
              value={formData[input.title]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ViewForm;
