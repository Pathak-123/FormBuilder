import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getForms } from "../services/formAPI";

function FormList() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    async function fetchForms() {
      const data = await getForms();
      setForms(data);
    }
    fetchForms();
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Form.com</h1>
      <p>This is a simple form builder.</p>
      <Link to="/form/create" className="btn btn-primary">
        Create New Form
      </Link>
      <h2>Forms</h2>
      {forms.length === 0 ? (
        <p>You have no forms created yet.</p>
      ) : (
        <ul>
          {forms.map((form) => (
            <li key={form._id}>
              <Link to={`/form/${form._id}`}>{form.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FormList;
