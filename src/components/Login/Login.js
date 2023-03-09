import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import BIOST1 from '../../data/BIOST1.json';
import CIN1 from '../../data/CIN1.json';
import CSI1 from '../../data/CSI1.json';
import CIN2 from '../../data/CIN2.json';
import CSI2 from '../../data/CSI2.json';
import N3 from '../../data/N3.json';
import M1 from '../../data/M1.json';
import M2 from '../../data/M2.json';
import db from '../../firebase'
import "./Login.css"
import { onSnapshot, collection, setDoc, doc } from 'firebase/firestore';
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [promotion, setPromotion] = useState()
  const [eleveEmail, setEleveEmail] = useState()
  const [playersOfTheDay, setPlayersOfTheDay] = useState([])
  const [playerError, setPlayerError] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectRef = useRef([]);

  const score = useSelector((state) => state.userInformations.score);
  const navigate = useNavigate()

  useEffect(() => {
    onSnapshot(collection(db, "quizzPlayers"), (snapshot) => {
      setPlayersOfTheDay(snapshot.docs.map(doc => doc.data()["email"]))
    })

    // document.addEventListener('keydown', handleJoyStick);

    // return () => {
    //     document.removeEventListener('keydown', handleJoyStick)
    // }

  }, [])

  useEffect(() => {
    if (selectedIndex === 0) {
      selectRef.current[0].focus()
    } else if (selectedIndex === 1) {
      selectRef.current[1].focus()
    }else if (selectedIndex === 2) {
      selectRef.current[2].focus()
    }
  }, [selectedIndex])

  console.log(playersOfTheDay)

  const handleNewPlayer = async (e) => {
    e.preventDefault()
    if (!playersOfTheDay.includes(`${eleveEmail}`)) {
      const docRef = doc(db, "quizzPlayers", uuidv4())
      const payload = { email: eleveEmail, score: score }
      await setDoc(docRef, payload)
      navigate("/")
    } else {
      setPlayerError("Vous avez déjà joué aujourd'hui...")
    }
  }

  function handleSelectPromotion(event) {
    setPromotion(event.target.value);
  }
  function handleSelectStudent(event) {
    setEleveEmail(event.target.value)
  }

  const elevesBIOST1 = BIOST1["elevesBIOST1"]
  const listeElevesBIOST1 = elevesBIOST1.map((element) => <option value={element}>{element}</option>);

  const elevesCIN1 = CIN1["elevesCIN1"]
  const listeElevesCIN1 = elevesCIN1.map((element) => <option value={element}>{element}</option>);

  const elevesCIN2 = CIN2["elevesCIN2"]
  const listeElevesCIN2 = elevesCIN2.map((element) => <option value={element}>{element}</option>);

  const elevesCSI1 = CSI1["elevesCSI1"]
  const listeElevesCSI1 = elevesCSI1.map((element) => <option value={element}>{element}</option>);

  const elevesCSI2 = CSI2["elevesCSI2"]
  const listeElevesCSI2 = elevesCSI2.map((element) => <option value={element}>{element}</option>);

  const elevesN3 = N3["elevesN3"]
  const listeElevesN3 = elevesN3.map((element) => <option value={element}>{element}</option>);

  const elevesM1 = M1["elevesM1"]
  const listeElevesM1 = elevesM1.map((element) => <option value={element}>{element}</option>);

  const elevesM2 = M2["elevesM2"]
  const listeElevesM2 = elevesM2.map((element) => <option value={element}>{element}</option>);

  const ListToShow = () => {
    if (promotion === "N3") {
      return listeElevesN3
    } else if (promotion === "M1") {
      return listeElevesM1
    } else if (promotion === "M2") {
      return listeElevesM2
    } else if (promotion === "BIOST1") {
      return listeElevesBIOST1
    } else if (promotion === "CIN1") {
      return listeElevesCIN1
    } else if (promotion === "CIN2") {
      return listeElevesCIN2
    } else if (promotion === "CSI1") {
      return listeElevesCSI1
    } else if (promotion === "CSI2") {
      return listeElevesCSI2
    }
  }

  const handleJoyStick = (event, index) => {
    if (event.key === 'ArrowDown' && selectedIndex < selectRef.current.length - 1) {
      event.preventDefault();
      setSelectedIndex(selectedIndex + 1);
    }
    if (event.key === 'ArrowUp' && selectedIndex > 0) {
      event.preventDefault();
      setSelectedIndex(selectedIndex - 1);
    }
    // if (event.key === 'Enter' && selectedIndex === 2) {
    //   event.preventDefault();
    //   handleNewPlayer()
    // }
  };

  return (
    <>
      <form className="email-form">
        <h3>Identifiez-vous</h3>
        <select
          name="promotion"
          id="promotion"
          value={promotion}
          onChange={handleSelectPromotion}
          ref={el => (selectRef.current[0] = el)}
          onKeyDown={event => handleJoyStick(event, 0)}
        >
          <option selected disabled hidden>Sélectionnez votre promotion</option>
          <option value="BIOST1">BIOST1</option>
          <option value="CIN1">CIN1</option>
          <option value="CIN2">CIN2</option>
          <option value="CSI1">CSI1</option>
          <option value="CSI2">CSI2</option>
          <option value="N3">N3</option>
          <option value="M1">M1</option>
          <option value="M2">M2</option>
        </select>
        <select
          name="eleves"
          id="eleves"
          value={eleveEmail}
          onChange={handleSelectStudent}
          ref={el => (selectRef.current[1] = el)}
          onKeyDown={event => handleJoyStick(event, 0)}
        >
          <option selected disabled hidden>Sélectionnez votre adresse email</option>
          <ListToShow />
        </select>
        <p style={{ paddingTop: "20px", textAlign: "center", fontWeight: "600" }}>{playerError}</p>
        <button        
        ref={el => (selectRef.current[2] = el)}
        onKeyDown={event => handleJoyStick(event, 0)}
        onClick={handleNewPlayer}
        >Enregistrer</button>
      </form >
      <h1 className='login-helper'>Appuyez sur le bouton <span>BLEU</span> pour valider !</h1>
    </>
  )
}
