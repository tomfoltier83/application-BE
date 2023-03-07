import './App.css';
import Login from './components/Login/Login';
import Question from './components/Question/Question';
import ThemeChoice from './components/ThemeChoice/ThemeChoice';
import veoliaLogo from "./images/RGB_VEOLIA_HD.png"
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import InfosChoice from './components/InfosChoice/InfosChoice';


function App() {

  const navigate = useNavigate()

  const questionNumber = useSelector((state) => state.userInformations.question);
  //console.log(questionNumber)


  // Fonction permettant de stopper le quizz après 3 question posées à l'utilisateur
  useEffect(() => {
    if (questionNumber === 4) {
      navigate('/login');
    }
  }, [questionNumber]);

  return (
    <>
      <img src={veoliaLogo} alt="" className="veolia-logo" />
      <Routes>
        <Route exact path="/" element={<ThemeChoice />} />
        <Route exact path="/quizz" element={<Question />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/infos" element={<InfosChoice />} />
        {/* <Route
          exact
          path="/login"
          element={
            questionNumber === 4 ? (
              <Navigate replace to={"/login"} />
            ) : (
              <Navigate replace to={"/quizz"} />
            )
          }
        />  */}
      </Routes>
    </>
  )
}

export default App;
