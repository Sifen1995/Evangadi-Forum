
import { useContext, useEffect, useState } from "react";
import Routing from "./Routing";
import { useNavigate } from "react-router-dom";
import { AppState } from "./Context/DataContext";
//globally known
import axios from "./Api/axios";

function App() {
  //any child component inside context share the datacontext
  const { user, setUser } = useContext(AppState);

  const token = localStorage.getItem("token");
  
  const navigate = useNavigate();

  async function checkuser() {
    try {
      // Sending a http GET request to check user status, including an authorization header /end point
      const { data } = await axios.get("/users/check", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      console.log(data);

      setUser(data.username);
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }
  // useEffect hook to call checkuser function when the component mounts
  useEffect(() => {
    checkuser();
  }, []);
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
