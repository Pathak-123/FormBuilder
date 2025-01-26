import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getForms,deleteForm } from "../services/formAPI";
import Loader from "./Loader";
import { toast } from "react-toastify";
import '../style/formListStyle.css'
function FormList() {
  const [forms, setForms] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try{
        const response = await getForms();
        if (response.success) {
          const forms = response.forms;
      setForms(forms);
        }
        else{
          toast.dismiss();
        toast.error("Failed to fetch Forms");
        }

      }
      catch{
        toast.dismiss();
        toast.error("Failed to fetch Forms");
      }
      finally{
        setLoading(false);
      }
      
    }
    fetchForms();
  }, []);
  const handleDeleteClick = (id) => {
    setSelectedFormId(id); 
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedFormId) {
      await deleteForm(selectedFormId);
      setForms(forms.filter((form) => form._id !== selectedFormId));
      setShowDeletePopup(false);
    }
  };
  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
  };
  return (
    <div className="main-container">
    <div className="container">
      <h1>Welcome to Form.com</h1>
      <p>This is a simple form builder.</p>
      <Link to="/form/create" className="btn btn-primary">
        CREATE NEW FORM
      </Link>
    </div>
    <div className="form-show-container">
      <h2>Forms</h2>
      {loading ? ( 
        <Loader />
        ) :
      forms.length === 0 ? (
        <p>You have no forms created yet.</p>
      ) : (
       <div className="show-forms">
          {forms.map((form) => (
            <div className="form-container">
              <p>{form.title}</p>
              <div className="form-links">
              <a href={`/form/${form._id}`} className='form-view'>VIEW</a>
              <a href={`/form/${form._id}/edit`} className='form-edit'>EDIT</a>
              <p  className='form-delete'  onClick={() => handleDeleteClick(form._id)}>DELETE</p>
              </div>
            </div>
          ))}
       </div>
      )}
    </div>
    {showDeletePopup && (
        <div className="delete-popup">
          <div className="popup-content">
            <h3>{`Are you sure you want to delete the form ?`}</h3>
            <button onClick={handleDeleteConfirm} className="btn btn-danger">
              DELETE
            </button>
            <button onClick={handleDeleteCancel} className="btn btn-secondary">
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormList;