// import React, { useState, useEffect } from "react";
// import classes from "../Answer/answer.module.css";
// import { IoMdContact } from "react-icons/io";
// import instance from "../../Api/axios";
// import { useParams } from "react-router-dom";
// import Loader from "../../Components/Loader/Loader";

// function Answer() {
//   const { questionId } = useParams();
//   const [answer, setAnswer] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [username, setUsername] = useState("");
//   const [question, setQuestion] = useState({ title: "", description: "" });
//   const [answers, setAnswers] = useState([]);
//   const [isloading, setIsLoading] = useState(false);
//   const token = localStorage.getItem("token");
//   useEffect(() => {
//     const fetchQuestion = async () => {
//       try {

//         const response = await instance.get(`/question/${questionId}`, {
//           headers: {
//             authorization: "Bearer " + token,
//           },
//         }); // Passing the question_id "dynamically"
//         console.log(response.data);
//         setIsLoading(false);
//         setQuestion({
//           title: response.data.question.title,
//           description: response.data.question.description,
//         });
//       } catch (error) {
//         setIsLoading(false);
//         console.error("Error fetching question:", error);
//         setErrorMessage("Failed to load question.");
//       }
//     };

//     const fetchAnswers = async () => {
//       try {
//         const response = await instance.get(`answer/${questionId}`, {
//           headers: {
//             authorization: "Bearer " + token,
//           },
//         }); // Fetching answers based on question ID!
//         console.log(response.data);
//         setAnswers(response?.data?.answer);
//       } catch (error) {
//         console.error("Error fetching answers:", error);
//         setErrorMessage("Failed to load answers.");
//       }
//     };

//     // fetchUser();
//     fetchQuestion();
//     fetchAnswers(); // Fetching the answers
//   }, [questionId, token]);

//   const postAnswer = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (!answer) {
//       setIsLoading(false);
//       setErrorMessage("Please provide an answer.");
//       return;
//     }

//     try {
//       const response = await instance.post(
//         `/answer/${questionId}`,
//         {
//           answer,
//         },
//         {
//           headers: {
//             authorization: "Bearer " + token,
//           },
//         }
//       );
//       console.log(response.data);

//       if (response.status === 201) {
//         setSuccessMessage("Answer posted successfully");
//         setAnswer(""); // Here i'm Clearing the textarea after success
//         //here i am refetching the answers after posting a new one, so this  call right after posting a new answer.. i am tryinh to ensure the data is up-to-date.

//       } else if (response.status === 400) {
//         setErrorMessage("Please provide an answer.");
//       } else {
//         setErrorMessage("An unexpected error occurred.");
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error("Error posting answer:", error);
//       setErrorMessage("Something went wrong. Try again later.");
//     }
//   };

//   return (
//     <>
//       {isloading ? (
//         <Loader />
//       ) : (
//         <main>
//           <section className={classes.question_section}>
//             <h2>Question</h2>
//             {/*Now here i am trying to Render fetched question title and description since it is dynamic */}
//             <h3>{question.title}</h3>
//             <p className={classes.link_work}>{question.description}</p>
//             <br />
//             <hr />
//           </section>

//           <section className={classes.answer_section}>
//             <h2>Answer From The Community</h2>
//             <hr />
//             {answers.length > 0 ? (
//               answers.map((answer, index) => (
//                 <div className={classes.answer} key={index}>
//                   <div>
//                     <IoMdContact size={80} />
//                     <h4 className={classes.username}>{answer.user_name}</h4>
//                   </div>

//                   <div className={classes.margin}>
//                     <p>{answer.answer}</p> {/* 👈👈Displaying each answer */}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No answers yet. Be the first to answer!😇</p>
//             )}
//             {/* Displaying The fetched username... */}

//           </section>

//           <section className={classes.answer_form}>
//             <h2>Answer The Top Question</h2>
//             {/* displaying error❌ or success messages👍 */}
//             {errorMessage && <p className={classes.error} style={{color:"red"}}>{errorMessage}</p>}
//             {successMessage && (
//               <p className={classes.success}>{successMessage}</p>
//             )}
//             <textarea
//               placeholder="Your Answer..."
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               required
//             />
//             <button
//               type="submit"
//               className={classes.submit_btn}
//               onClick={postAnswer}
//             >
//               Post Your Answer
//             </button>
//           </section>
//         </main>
//       )}
//     </>
//   );
// }

// export default Answer;

// import React, { useState, useEffect } from "react";
// import classes from "../Answer/answer.module.css";
// import { IoMdContact } from "react-icons/io";
// import instance from "../../Api/axios";
// import { useParams } from "react-router-dom";
// import Loader from "../../Components/Loader/Loader";

// function Answer() {
//   const { questionId } = useParams();
//   const [answer, setAnswer] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [question, setQuestion] = useState({ title: "", description: "" });
//   const [answers, setAnswers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchQuestion = async () => {
//       setIsLoading(true);
//       try {
//         const response = await instance.get(`/question/${questionId}`, {
//           headers: { authorization: "Bearer " + token },
//         });
//         setQuestion({
//           title: response.data.question.title,
//           description: response.data.question.description,
//         });
//       } catch (error) {
//         console.error("Error fetching question:", error);
//         setErrorMessage("Failed to load question.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchAnswers = async () => {
//       setIsLoading(true);
//       try {
//         const response = await instance.get(`answer/${questionId}`, {
//           headers: { authorization: "Bearer " + token },
//         });
//         setAnswers(response.data.answer);
//       } catch (error) {
//         console.error("Error fetching answers:", error);
//         setErrorMessage("Failed to load answers.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuestion();
//     fetchAnswers();
//   }, [questionId, token]);

//   const fetchAnswers = async () => {
//     setIsLoading(true);
//     try {
//       const response = await instance.get(`answer/${questionId}`, {
//         headers: { authorization: "Bearer " + token },
//       });
//       setAnswers(response.data.answer);
//     } catch (error) {
//       console.error("Error fetching answers:", error);
//       setErrorMessage("Failed to load answers.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const postAnswer = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (!answer) {
//       setIsLoading(false);
//       setErrorMessage("Please provide an answer.");
//       return;
//     }

//     try {
//       const response = await instance.post(
//         `/answer/${questionId}`,
//         { answer },
//         {
//           headers: { authorization: "Bearer " + token },
//         }
//       );

//       if (response.status === 201) {
//         setSuccessMessage("Answer posted successfully");
//         setAnswer(""); // Clear the textarea after success
//         await fetchAnswers(); // Refetch answers after posting
//       } else if (response.status === 400) {
//         setErrorMessage("Please provide an answer.");
//       } else {
//         setErrorMessage("An unexpected error occurred.");
//       }
//     } catch (error) {
//       console.error("Error posting answer:", error);
//       setErrorMessage("Something went wrong. Try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <main>
//           <section className={classes.question_section}>
//             <h2>Question</h2>
//             <h3>{question.title}</h3>
//             <p className={classes.link_work}>{question.description}</p>
//             <br />
//             <hr />
//           </section>

//           <section className={classes.answer_section}>
//             <h2>Answer From The Community</h2>
//             <hr />
//             {answers.length > 0 ? (
//               answers.map((answer, index) => (
//                 <div className={classes.answer} key={index}>
//                   <div>
//                     <IoMdContact size={80} />
//                     <h4 className={classes.username}>{answer.user_name}</h4>
//                   </div>
//                   <div className={classes.margin}>
//                     <p>{answer.answer}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No answers yet. Be the first to answer!😇</p>
//             )}
//           </section>

//           <section className={classes.answer_form}>
//             <h2>Answer The Top Question</h2>
//             {errorMessage && <p className={classes.error} style={{ color: "red" }}>{errorMessage}</p>}
//             {successMessage && <p className={classes.success}>{successMessage}</p>}
//             <textarea
//               placeholder="Your Answer..."
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               required
//             />
//             <button
//               type="submit"
//               className={classes.submit_btn}
//               onClick={postAnswer}
//             >
//               Post Your Answer
//             </button>
//           </section>
//         </main>
//       )}
//     </>
//   );
// }

// export default Answer;

// import React, { useState, useEffect } from "react";
// import { IoMdContact } from "react-icons/io";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import instance from "../../Api/axios";
// import { useParams } from "react-router-dom";
// import Loader from "../../Components/Loader/Loader";
// import classes from "../Answer/answer.module.css";

// function Answer() {
//   const { questionId } = useParams();
//   const [answer, setAnswer] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [question, setQuestion] = useState({ title: "", description: "" });
//   const [answers, setAnswers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   const fetchAnswers = async () => {
//     setIsLoading(true);
//     try {
//       const response = await instance.get(`answer/${questionId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAnswers(response.data.answer);
//     } catch (error) {
//       console.error("Error fetching answers:", error);
//       setErrorMessage("Failed to load answers.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchQuestion = async () => {
//       setIsLoading(true);
//       try {
//         const response = await instance.get(`/question/${questionId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setQuestion({
//           title: response.data.question.title,
//           description: response.data.question.description,
//         });
//         await fetchAnswers(); // Fetch answers after loading the question
//       } catch (error) {
//         console.error("Error fetching question:", error);
//         setErrorMessage("Failed to load question.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchQuestion();
//   }, [questionId, token]);

//   const postAnswer = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (!answer) {
//       setErrorMessage("Please provide an answer.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await instance.post(
//         `/answer/${questionId}`,
//         { answer },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 201) {
//         setSuccessMessage("Answer posted successfully");
//         setAnswer("");
//         await fetchAnswers(); // Refetch answers after posting
//       } else {
//         setErrorMessage("An unexpected error occurred.");
//       }
//     } catch (error) {
//       console.error("Error posting answer:", error);
//       setErrorMessage("Something went wrong. Try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (answerId) => {
//     if (window.confirm("Are you sure you want to delete this answer?")) {
//       try {
//         await instance.delete(`/answer/${answerId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSuccessMessage("Answer deleted successfully");
//         await fetchAnswers(); // Reload answers after deletion
//       } catch (error) {
//         console.error("Error deleting answer:", error);
//         setErrorMessage("Failed to delete answer.");
//       }
//     }
//   };

//   const handleEdit = (answerId) => {
//     // Implement the edit functionality here
//     console.log("Edit answer with ID:", answerId);
//     // You may want to open a modal or navigate to an edit page
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <main>
//           <section className={classes.question_section}>
//             <h2>Question</h2>
//             <h3>{question.title}</h3>
//             <p className={classes.link_work}>{question.description}</p>
//             <br />
//             <hr />
//           </section>

//           <section className={classes.answer_section}>
//             <h2>Answers From The Community</h2>
//             <hr />
//             {answers.length > 0 ? (
//               answers.map((ans) => (
//                 <div className={classes.answer} key={ans.answerid}>
//                   <div>
//                     <IoMdContact size={80} />
//                     <h4 className={classes.username}>{ans.user_name}</h4>
//                   </div>
//                   <div className={classes.margin}>
//                     <p>{ans.answer}</p>
//                     <button onClick={() => handleEdit(ans.answerid)}>
//                       <FaEdit /> Edit
//                     </button>
//                     <button onClick={() => handleDelete(ans.answerid)}>
//                       <FaTrash size={20} color="black" />
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No answers yet. Be the first to answer!😇</p>
//             )}
//           </section>

//           <section className={classes.answer_form}>
//             <h2>Answer The Top Question</h2>
//             {errorMessage && (
//               <p className={classes.error} style={{ color: "red" }}>
//                 {errorMessage}
//               </p>
//             )}
//             {successMessage && (
//               <p className={classes.success}>{successMessage}</p>
//             )}
//             <textarea
//               placeholder="Your Answer..."
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               required
//             />
//             <button
//               type="submit"
//               className={classes.submit_btn}
//               onClick={postAnswer}
//             >
//               Post Your Answer
//             </button>
//           </section>
//         </main>
//       )}
//     </>
//   );
// }

// export default Answer;

import React, { useState, useEffect } from "react";
import classes from "../Answer/answer.module.css";
import { IoMdContact } from "react-icons/io";
import instance from "../../Api/axios";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { FaEdit, FaTrash } from "react-icons/fa";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.userid;
  } catch (error) {
    return null;
  }
};

function Answer() {
  const { questionId } = useParams();
  const token = localStorage.getItem("token");

  const [question, setQuestion] = useState({ title: "", description: "" });
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch question
  const fetchQuestion = async () => {
    try {
      const response = await instance.get(`/question/${questionId}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      setQuestion({
        title: response.data.question.title,
        description: response.data.question.description,
      });
    } catch (error) {
      setErrorMessage("Failed to load question.");
    }
  };

  // Fetch paginated answers
  const fetchAnswers = async (page = 1) => {
    try {
      const response = await instance.get(
        `/answer/${questionId}?page=${page}&limit=${limit}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setAnswers(response.data.answer);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setErrorMessage("Failed to load answers.");
    }
  };

  // Load both question and answers on mount
  useEffect(() => {
    fetchQuestion();
    fetchAnswers(1);
  }, [questionId, token]);

  // Post a new answer
  const postAnswer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!answer) {
      setIsLoading(false);
      setErrorMessage("Please provide an answer.");
      return;
    }

    try {
      const response = await instance.post(
        `/answer/${questionId}`,
        { answer },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Answer posted successfully");
        setAnswer("");
        await fetchAnswers(1); // Reload first page
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = (answer) => {
    setEditingAnswerId(answer.answerid);
    setEditingText(answer.answer);
  };

  const cancelEdit = () => {
    setEditingAnswerId(null);
    setEditingText("");
  };

  const saveEdit = async (answerid) => {
    if (!editingText.trim()) {
      setErrorMessage("Answer cannot be empty.");
      return;
    }

    try {
      await instance.put(
        `/answer/${answerid}`,
        { answer: editingText },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setSuccessMessage("Answer updated successfully.");
      cancelEdit();
      fetchAnswers(currentPage);
    } catch (error) {
      setErrorMessage("Failed to update answer.");
    }
  };

  const handleDelete = async (answerid) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this answer?"
    );
    if (!confirm) return;

    try {
      await instance.delete(`/answer/${answerid}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      setSuccessMessage("Answer deleted.");
      fetchAnswers(currentPage);
    } catch (error) {
      setErrorMessage("Failed to delete answer.");
    }
  };

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <main>
          <section className={classes.question_section}>
            <h2>Question</h2>
            <h3>{question.title}</h3>
            <p className={classes.link_work}>{question.description}</p>
            <br />
            <hr />
          </section>

          <section className={classes.answer_section}>
            <h2>Answers From The Community</h2>
            <hr />

            {/* edit and delete answer */}
            {answers.length > 0 ? (
              answers.map((ans, index) => (
                <div className={classes.answer} key={index}>
                  <div>
                    <IoMdContact size={80} />
                    <h4 className={classes.username}>{ans.user_name}</h4>
                  </div>
                  <div className={classes.margin}>
                    {/* <p>{ans.answer}</p> */}

                    {editingAnswerId === ans.answerid ? (
                      <>
                        <textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <button onClick={() => saveEdit(ans.answerid)}>
                          Save
                        </button>
                        <button onClick={() => cancelEdit()}>Cancel</button>
                      </>
                    ) : (
                      <p>{ans.answer}</p>
                    )}

                    {/* EDIT & DELETE buttons */}
                    {ans.userid === getUserIdFromToken(token) && (
                      <div className={classes.actions}>
                        <button onClick={() => handleEdit(ans)}>
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(ans.answerid)}>
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No answers yet. Be the first to answer!😇</p>
            )}
            {/*  */}
          </section>

          <section className={classes.answer_form}>
            <h2>Answer The Top Question</h2>
            {errorMessage && (
              <p className={classes.error} style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className={classes.success}>{successMessage}</p>
            )}
            <textarea
              placeholder="Your Answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <button
              type="submit"
              className={classes.submit_btn}
              onClick={postAnswer}
            >
              Post Your Answer
            </button>
          </section>
        </main>
      )}

      {/* Pagination */}
      <div className={classes.pagination}>
        {/* previous button */}
        <button
          onClick={() => {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            fetchAnswers(newPage);
          }}
          disabled={currentPage === 1 || isloading}
          className={isloading ? classes.disabled : ""}
        >
          <SkipPreviousIcon />
        </button>

        {/* Page Number Buttons */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`${classes.paginationBtn} ${
                currentPage === page ? classes.activePageBtn : ""
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next button */}
        <button
          onClick={() => {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            fetchAnswers(newPage);
          }}
          disabled={currentPage === totalPages || isloading}
          className={isloading ? classes.disabled : ""}
        >
          <SkipNextIcon />
        </button>
      </div>
    </>
  );
}

export default Answer;
