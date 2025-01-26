import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormList from "./components/FormList";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";
import ViewForm from "./components/ViewForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/form/create" element={<CreateForm />} />
        <Route path="/form/:id/edit" element={<EditForm />} />
        <Route path="/form/:id" element={<ViewForm />} />
      </Routes>
    </Router>
    <ToastContainer />
    </div>
  );
}

export default App;
