import './App.css';
import Login from './components/Login/Login';
import Question from './components/Question/Question';
import ThemeChoice from './components/ThemeChoice/ThemeChoice';
import veoliaLogo from "./images/veolia.png"
import cityLabLogo from "./images/citylab.png"
import isenLogo from "./images/isen.png"
import tvtLogo from "./images/tvt.png"
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import InfosChoice from './components/InfosChoice/InfosChoice';
import EcoWatt from './components/EcoWatt/EcoWatt';


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
      <div className="logos">
        <img src={veoliaLogo} alt="" className="veolia-logo"/>
        <img src={cityLabLogo} alt="" className="citylab-logo"/>
        <img src={isenLogo} alt="" className="isen-logo"/>
        <img src={tvtLogo} alt="" className="tvt-logo"/>
      </div>
      <Routes>
        <Route exact path="/" element={<ThemeChoice />} />
        <Route exact path="/quizz" element={<Question />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/infos" element={<InfosChoice />} />
        <Route exact path="/eco-watt" element={<EcoWatt />} />
      </Routes>
    </>
  )
}

export default App;
