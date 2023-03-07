import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import N1 from '../../data/M1.json';
import N2 from '../../data/M1.json';
import N3 from '../../data/N3.json';
import M1 from '../../data/M1.json';
import M2 from '../../data/M2.json';
import db from '../../firebase'
import { onSnapshot, collection, setDoc, doc } from 'firebase/firestore';
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [promotion, setPromotion] = useState()
  const [eleveEmail, setEleveEmail] = useState()
  const [playersOfTheDay, setPlayersOfTheDay] = useState([])
  const [playerError, setPlayerError] = useState("")

  const score = useSelector((state) => state.userInformations.score);
  const navigate = useNavigate()

  useEffect(() => {
      onSnapshot(collection(db, "quizzPlayers"), (snapshot) => {
        setPlayersOfTheDay(snapshot.docs.map(doc => doc.data()["email"]))
      })
  }, [])

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
    }
  }

  return (
    <>
      <form className="email-form">
        <h3>Welcome to <br></br> Elisabeth Borne</h3>
        <label htmlFor="email">Identifiez-vous</label>
        <select name="promotion" id="promotion" value={promotion} onChange={handleSelectPromotion}>
          <option selected disabled hidden>Sélectionnez votre promotion</option>
          <option value="N1">N1</option>
          <option value="N2">N2</option>
          <option value="N3">N3</option>
          <option value="M1">M1</option>
          <option value="M2">M2</option>
        </select>
        <select name="eleves" id="eleves" disabled={promotion ? "" : "true"} value={eleveEmail} onChange={handleSelectStudent}>
          <option selected disabled hidden>Sélectionnez votre adresse email</option>
          <ListToShow />
        </select>
        <p style={{paddingTop: "20px", textAlign: "center", fontWeight: "600"}}>{playerError}</p>
        <button onClick={handleNewPlayer}>Enregistrer</button>
      </form >
    </>
  )
}
