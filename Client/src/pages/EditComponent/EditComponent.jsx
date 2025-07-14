import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../Api/axios";
import classes from "./edit.module.css";

function EditComponent() {
  const { questionId } = useParams(); // Get the question ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load the question details for editing
  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const { data } = await axios.get(`/question/${questionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(data.question.title);
        setDescription(data.question.description);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Error loading question:",
          error.response?.data?.msg || error.message
        );

        if (error.response?.status === 401) {
          // Redirect if unauthorized
          navigate("/login");
        } else {
          navigate("/"); // Redirect to home on other errors
        }
      }
    };
    loadQuestion();
  }, [questionId, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      await axios.put(
        `/question/${questionId}`,
        {
          title,
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/"); // Redirect to home after successful edit
    } catch (error) {
      console.error(
        "Error updating question:",
        error.response?.data?.msg || error.message
      );
    }
  };

  return (
    <div className={classes.editContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className={classes.editForm}>
          <h2>Edit Question</h2>
          <div className={classes.formGroup}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={classes.submitButton}>
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

export default EditComponent;
