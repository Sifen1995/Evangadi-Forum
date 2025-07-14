// import React, { useContext, useEffect, useState } from "react";
// import classes from "./home.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import { IoIosArrowForward, IoMdContact } from "react-icons/io";
// import { FaSearch } from "react-icons/fa";
// import { AppState } from "../../Context/DataContext";
// import axios from "../../Api/axios";
// import Loader from "../../Components/Loader/Loader";

// function Home() {
//   // Destructure user and setUser from AppState context
//   const { user, setUser } = useContext(AppState);
//   // Retrieve token from local storage
//   const token = localStorage.getItem("token");

//   // Define state variables
//   const [questions, setquestions] = useState([]); // To store fetched questions
//   const [isloading, setIsLoading] = useState(false); // To manage loading state
//   const [searchItem, setSearchItem] = useState(""); // To manage search input
//   const [filteredQuestions, setFilteredQuestions] = useState(questions); // To store filtered questions
//   const navigate = useNavigate(); // Hook for programmatic navigation

//   // Function to load questions from the API
//   async function Loadquestions() {
//     try {
//       // Make GET request to fetch questions
//       const { data } = await axios.get("/question", {
//         headers: {
//           authorization: "Bearer " + token, // Include authorization token in headers
//         },
//       });
//       console.log(data?.questions); // Log fetched questions to console
//       setIsLoading(false); // Set loading state to false
//       setquestions(() => data.questions); // Update questions state with fetched data
//     } catch (error) {
//       setIsLoading(false); // Set loading state to false in case of error
//       console.log(error.response.data.msg); // Log error message
//       navigate("/login"); // Redirect to login page if there's an error
//     }
//   }

//   // Function to check if the user is authenticated
//   async function checkuser() {
//     try {
//       // Make GET request to check user authentication
//       const { data } = await axios.get("/users/check", {
//         headers: {
//           authorization: "Bearer " + token, // Include authorization token in headers
//         },
//       });
//       console.log(data); // Log user data to console
//       setUser(data.username); // Set user state with fetched username
//       navigate("/"); // Navigate to home page
//     } catch (error) {
//       console.log(error); // Log error
//       navigate("/login"); // Redirect to login page if there's an error
//     }
//   }

//   // useEffect to load questions and check user on component mount
//   useEffect(() => {
//     setIsLoading(true); // Set loading state to true
//     checkuser(); // Check if user is authenticated
//     Loadquestions(); // Load questions from API
//   }, []);

//   // useEffect to filter questions based on search input
//   useEffect(() => {
//     // Filter questions based on search term
//     const filtered = questions.filter((question) =>
//       question.title.toLowerCase().includes(searchItem.toLowerCase())
//     );
//     setFilteredQuestions(filtered); // Update filteredQuestions state
//   }, [searchItem, questions]); // Dependencies: searchItem and questions

//   // Render component
//   return (
//     <>
//       {isloading ? ( // Conditional rendering based on loading state
//         <Loader /> // Show Loader component if loading
//       ) : (
//         <section className={classes.home__container}>
//           <div className={classes.home__topcontainer}>
//             <div>
//               <Link to="/question">Ask Question</Link>{" "}
//               {/* Link to Ask Question page */}
//             </div>
//             <div style={{ fontSize: "20px", fontWeight: "300" }}>
//               <p>
//                 WELCOME:<span style={{ color: " #DA7229" }}>{user}</span>{" "}
//                 {/* Display welcome message with username */}
//               </p>
//             </div>
//           </div>
//           <div
//             style={{
//               fontSize: "20px",
//               fontWeight: "300",
//               marginBottom: "20px",
//             }}
//           >
//             Questions
//             <div className={classes.search}>
//               <input
//                 type="text"
//                 value={searchItem}
//                 onChange={(e) => setSearchItem(e.target.value)} // Update searchItem state on input change
//                 placeholder="Search questions..."
//               />
//             </div>
//           </div>
//           <div>
//             {filteredQuestions?.map((question, i) => {
//               return (
//                 <div className={classes.question__outercontainer} key={i}>
//                   <hr />
//                   <div className={classes.home__questioncontainer}>
//                     <div className={classes.home__iconandusernamecontainer}>
//                       <div>
//                         <div>
//                           <IoMdContact size={80} /> {/* User icon */}
//                         </div>
//                         <div className={classes.home__questionusename}>
//                           <p>{question?.user_name}</p>{" "}
//                           {/* Display question's username */}
//                         </div>
//                       </div>
//                       <div className={classes.home__questiontitle}>
//                         <p>{question?.title}</p>{" "}
//                         {/* Display question's title */}
//                       </div>
//                     </div>
//                     <div style={{ marginTop: "30px" }}>
//                       <Link to={`/home/answers/${question.question_id}`}>
//                         <IoIosArrowForward size={30} color="black" />{" "}
//                         {/* Link to question's answers page */}
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//       )}
//     </>
//   );
// }

// export default Home; // Export Home component as default


// import React, { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { IoIosArrowForward, IoMdContact } from "react-icons/io";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { AppState } from "../../Context/DataContext";
// import axios from "../../Api/axios";
// import Loader from "../../Components/Loader/Loader";
// import classes from "./home.module.css";

// function Home() {
//   const { user, setUser } = useContext(AppState);
//   const token = localStorage.getItem("token");
//   const [questions, setQuestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchItem, setSearchItem] = useState("");
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const navigate = useNavigate();

//   // Load questions from the API
//   async function loadQuestions() {
//     try {
//       const { data } = await axios.get("/question", {
//         headers: {
//           authorization: "Bearer " + token,
//         },
//       });
//       setQuestions(data.questions);
//       setFilteredQuestions(data.questions); // Set filtered questions to loaded questions
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       console.error(
//         "Error loading questions:",
//         error.response?.data?.msg || error.message
//       );
//       navigate("/login");
//     }
//   }

//   // Check user authentication
//   async function checkUser() {
//     try {
//       const { data } = await axios.get("/users/check", {
//         headers: {
//           authorization: "Bearer " + token,
//         },
//       });
//       setUser(data.username);
//       navigate("/");
//     } catch (error) {
//       console.error("Error checking user:", error);
//       navigate("/login");
//     }
//   }

//   useEffect(() => {
//     setIsLoading(true);
//     checkUser();
//     loadQuestions();
//   }, []);

//   useEffect(() => {
//     const filtered = questions.filter((question) =>
//       question.title.toLowerCase().includes(searchItem.toLowerCase())
//     );
//     setFilteredQuestions(filtered);
//   }, [searchItem, questions]);

//   // Handle question deletion
//   async function handleDelete(questionId) {
//     if (window.confirm("Are you sure you want to delete this question?")) {
//       try {
//         await axios.delete(`/question/${questionId}`, {
//           headers: {
//             authorization: "Bearer " + token,
//           },
//         });
//         loadQuestions(); // Reload questions after deletion
//       } catch (error) {
//         console.error(
//           "Error deleting question:",
//           error.response?.data?.msg || error.message
//         );
//       }
//     }
//   }

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <section className={classes.home__container}>
//           <div className={classes.home__topcontainer}>
//             <div>
//               <Link to="/question">Ask Question</Link>
//             </div>
//             <div style={{ fontSize: "20px", fontWeight: "300" }}>
//               <p>
//                 WELCOME: <span style={{ color: "#DA7229" }}>{user}</span>
//               </p>
//             </div>
//           </div>
//           <div
//             style={{
//               fontSize: "20px",
//               fontWeight: "300",
//               marginBottom: "20px",
//             }}
//           >
//             Questions
//             <div className={classes.search}>
//               <input
//                 type="text"
//                 value={searchItem}
//                 onChange={(e) => setSearchItem(e.target.value)}
//                 placeholder="Search questions..."
//               />
//             </div>
//           </div>
//           <div>
//             {filteredQuestions.map((question) => (
//               <div
//                 className={classes.question__outercontainer}
//                 key={question.question_id}
//               >
//                 <hr />
//                 <div className={classes.home__questioncontainer}>
//                   <div className={classes.home__iconandusernamecontainer}>
//                     <div>
//                       <IoMdContact size={80} />
//                       <div className={classes.home__questionusename}>
//                         <p>{question.user_name}</p>
//                       </div>
//                     </div>
//                     <div className={classes.home__questiontitle}>
//                       <p>{question.title}</p>
//                     </div>
//                   </div>
//                   <div className="icon-container">
//                     <Link to={`/home/answers/${question.question_id}`}>
//                       <IoIosArrowForward size={30} color="black" />
//                     </Link>
//                     <Link to={`/edit/${question.question_id}`}>
//                       <FaEdit size={20} color="black" />
//                     </Link>
//                     <button onClick={() => handleDelete(question.question_id)}>
//                       <FaTrash size={20} color="black" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//     </>
//   );
// }

// export default Home;
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoMdContact } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AppState } from "../../Context/DataContext";
import axios from "../../Api/axios";
// import jwtDecode from "jwt-decode";
import Loader from "../../Components/Loader/Loader";
import classes from "./home.module.css";
import { jwtDecode } from "jwt-decode";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.userid;
  } catch {
    return null;
  }
};

function Home() {
  const { user, setUser } = useContext(AppState);
  const token = localStorage.getItem("token");
  const currentUserId = getUserIdFromToken(token);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editQuestion, setEditQuestion] = useState({
    id: "",
    title: "",
    description: ""
  });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  async function loadQuestions() {
    try {
      const { data } = await axios.get("/question", {
        headers: { authorization: "Bearer " + token }
      });
      setQuestions(data.questions);
      setFilteredQuestions(data.questions);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.error(
        "Error loading questions:",
        error.response?.data?.msg || error.message
      );
      navigate("/login");
    }
  }

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: { authorization: "Bearer " + token }
      });
      setUser(data.username);
    } catch (error) {
      console.error("User check failed:", error);
      navigate("/login");
    }
  }
  useEffect(() => {
    setisLoading(true);
    checkUser();
    loadQuestions();
  }, []);
  useEffect(() => {
    const filtered = questions.filter((q) =>
      q.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredQuestions(filtered);
  }, [searchItem, questions]);

  const handleEdit = (question) => {
    setEditMode(true);
    setEditQuestion({
      id: question.question_id,
      title: question.title,
      description: question.content
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
       ` /question/${editQuestion.id}`,
        {
          title: editQuestion.title,
          description: editQuestion.description
        },
        { headers: { authorization: "Bearer " + token } }
      );
      setEditMode(false);
      loadQuestions();
      setSuccessMessage("✅ Question updated successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  const handleDelete = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`/question/${questionId}`, {
          headers: { authorization: "Bearer " + token }
        });
        setSuccessMessage("Question deleted successfully ✅");
        loadQuestions();
      } catch (error) {
        console.error(
          "Error deleting:",
          error.response?.data?.msg || error.message
        );
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.home__container}>
          {successMessage && (
            <p className={classes.successMessage}>{successMessage}</p>
          )}
          <div className={classes.home__topcontainer}>
            <Link to="/question">Ask Question</Link>
            <p style={{ fontSize: "20px", fontWeight: "300" }}>
              WELCOME: <span style={{ color: "#DA7229" }}>{user}</span>
            </p>
          </div>

          <div className={classes.search}>
            <input
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search questions..."
            />
          </div>

          {editMode && (
            <form onSubmit={handleUpdate} className={classes.editForm}>
              <input
                type="text"
                value={editQuestion.title}
                onChange={(e) =>
                  setEditQuestion({ ...editQuestion, title: e.target.value })
                }
              />
              <textarea
                rows="3"
                value={editQuestion.description}
                onChange={(e) =>
                  setEditQuestion({
                    ...editQuestion,
                    description: e.target.value
                  })
                }
              />
              <div className={classes.editButtons}>
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {filteredQuestions.map((q) => (
            <div
              className={classes.question__outercontainer}
              key={q.question_id}
            >
              <hr />
              <div className={classes.home__questioncontainer}>
                <div className={classes.home__iconandusernamecontainer}>
                  <IoMdContact size={50} />
                  <div className={classes.home__questionusename}>
                    <p>{q.user_name}</p>
                  </div>
                </div>

                <div className={classes.home__questiontitle}>
                  <p>{q.title}</p>
                </div>

                <Link to={`/home/answers/${q.question_id}`}>
                  <IoIosArrowForward size={25} />
                </Link>

                {q.userid === currentUserId && (
                  <div className={classes.actions}>
                    <button onClick={() => handleEdit(q)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(q.question_id)}>
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
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
          disabled={currentPage === 1 || isLoading}
          className={isLoading ? classes.disabled : ""}
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
          disabled={currentPage === totalPages || isLoading}
          className={isLoading ? classes.disabled : ""}
        >
          <SkipNextIcon />
        </button>
      </div>
    </>
  );
}

export default Home;