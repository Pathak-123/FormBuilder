import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { createForm } from "../services/formAPI";

function CreateForm() {
  const [form, setForm] = useState({
    title: "Untitled Form",
    inputs: [],
  });

  const [newInput, setNewInput] = useState({
    type: "",
    title: "",
    placeholder: "",
  });

  const navigate = useNavigate();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedInputs = Array.from(form.inputs);
    const [removed] = reorderedInputs.splice(result.source.index, 1);
    reorderedInputs.splice(result.destination.index, 0, removed);

    setForm({ ...form, inputs: reorderedInputs });
  };

  const handleAddInput = () => {
    if (!newInput.type) {
      alert("Please select an input type!");
      return;
    }
    if (form.inputs.length >= 20) {
      alert("Maximum of 20 inputs allowed!");
      return;
    }

    setForm({
      ...form,
      inputs: [...form.inputs, { ...newInput }],
    });

    setNewInput({
      type: "",
      title: "",
      placeholder: "",
    });
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      alert("Form title cannot be empty!");
      return;
    }

    if (form.inputs.length === 0) {
      alert("You must add at least one input to the form.");
      return;
    }

    try {
      await createForm(form);
      alert("Form created successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to create form. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Create New Form</h2>

      {/* Title Section */}
      <div>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter Form Title"
          style={{
            fontSize: "1.5rem",
            marginBottom: "20px",
            padding: "10px",
            width: "100%",
          }}
        />
      </div>

      {/* Drag & Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="inputs">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {form.inputs.map((input, index) => (
                <Draggable key={index} draggableId={`${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        margin: "10px 0",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <label>{input.title}</label>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        readOnly
                        style={{
                          display: "block",
                          marginTop: "5px",
                          padding: "8px",
                          width: "100%",
                        }}
                      />
                      <button
                        onClick={() => {
                          const newInputs = form.inputs.filter(
                            (_, i) => i !== index
                          );
                          setForm({ ...form, inputs: newInputs });
                        }}
                        style={{
                          marginTop: "10px",
                          padding: "5px 10px",
                          color: "#fff",
                          backgroundColor: "#ff4d4d",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Input Addition Section */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <h4>Add Input</h4>
        <select
          value={newInput.type}
          onChange={(e) => setNewInput({ ...newInput, type: e.target.value })}
          style={{
            padding: "10px",
            marginRight: "10px",
            width: "30%",
          }}
        >
          <option value="">Select Input Type</option>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="date">Date</option>
        </select>

        <input
          type="text"
          placeholder="Input Title"
          value={newInput.title}
          onChange={(e) => setNewInput({ ...newInput, title: e.target.value })}
          style={{
            padding: "10px",
            marginRight: "10px",
            width: "30%",
          }}
        />

        <input
          type="text"
          placeholder="Placeholder"
          value={newInput.placeholder}
          onChange={(e) =>
            setNewInput({ ...newInput, placeholder: e.target.value })
          }
          style={{
            padding: "10px",
            marginRight: "10px",
            width: "30%",
          }}
        />

        <button
          onClick={handleAddInput}
          style={{
            padding: "10px 20px",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Add Input
        </button>
      </div>

      {/* Submit Button */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "#28a745",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Create Form
        </button>
      </div>
    </div>
  );
}

export default CreateForm;
