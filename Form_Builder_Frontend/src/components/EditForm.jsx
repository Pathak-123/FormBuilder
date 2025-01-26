import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getForm, updateForm } from "../services/formAPI";
import CreateForm from "./CreateForm";
import { toast } from "react-toastify";
import Loader from "./Loader";

function EditForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchForm = async () => {
         try{
           const response = await getForm(id);
           if (response.success) {
             const form = response.form;
             setForm(form);
           }
           else{
             toast.dismiss();
           toast.error("Failed to fetch Form");
           }
   
         }
         catch{
           toast.dismiss();
           toast.error("Failed to fetch Form");
         }
         finally{
           setLoading(false);
         }
         
       }
    fetchForm();
  }, [id]);

  const handleSubmit = async () => {
    await updateForm(id, form);
    navigate("/");
  };

  if (loading) return <Loader />;

  return (
    <>
    {loading ? ( 
      <Loader />
      ) : (
    <CreateForm initialForm={form}
    onSubmit={handleSubmit}
    isEditMode={true} />
      )}
      </>
  );
}

export default EditForm;