import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getForm, updateForm } from "../services/formAPI";
import CreateForm from "./CreateForm";

function EditForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchForm() {
      const data = await getForm(id);
      setForm(data);
    }
    fetchForm();
  }, [id]);

  const handleSubmit = async () => {
    await updateForm(id, form);
    navigate("/");
  };

  if (!form) return <div>Loading...</div>;

  return (
    <CreateForm form={form} setForm={setForm} onSubmit={handleSubmit} />
  );
}

export default EditForm;
