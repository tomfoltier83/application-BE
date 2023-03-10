import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import tokenResponse from '../../data/data.json';
import { useNavigate } from "react-router-dom";

export default function TempCharts() {


    const [dateLastMeasure, setDateLastMeasure] = useState();
    const [tempJ1CurrentYear, setTempJ1CurrentYear] = useState();
    const [tempJ2CurrentYear, setTempJ2CurrentYear] = useState();
    const [tempJ3CurrentYear, setTempJ3CurrentYear] = useState();
    const [tempJ4CurrentYear, setTempJ4CurrentYear] = useState();
    const [tempJ5CurrentYear, setTempJ5CurrentYear] = useState();
    const [tempJ6CurrentYear, setTempJ6CurrentYear] = useState();
    const [tempJ7CurrentYear, setTempJ7CurrentYear] = useState();
    const [tempJ1LastYear, setTempJ1LastYear] = useState();
    const [tempJ2LastYear, setTempJ2LastYear] = useState();
    const [tempJ3LastYear, setTempJ3LastYear] = useState();
    const [tempJ4LastYear, setTempJ4LastYear] = useState();
    const [tempJ5LastYear, setTempJ5LastYear] = useState();
    const [tempJ6LastYear, setTempJ6LastYear] = useState();
    const [tempJ7LastYear, setTempJ7LastYear] = useState();
    const navigate = useNavigate()

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);

      return () => {
          document.removeEventListener('keydown', handleKeyDown)
      }
  }, []);

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
          navigate("/infos")
      }
  }

    const token = tokenResponse["access_token"];
    axios.get('https://api-noe.alerteo.com/noe/v1.1/compteurs/158249582/date-derniere-mesure', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log('Response:', response);
        setDateLastMeasure(response.data["date"]);
    }).catch(error => console.error(error));

    axios.get(`https://api-noe.alerteo.com/noe/v1.1/compteurs/158249582/donnees-par-jour?dateDebut=2023-03-03&dateFin=2023-03-10`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log('Response:', response);
        setTempJ1CurrentYear(response.data[0]["consommation"]);
        setTempJ2CurrentYear(response.data[1]["consommation"]);
        setTempJ3CurrentYear(response.data[2]["consommation"]);
        setTempJ4CurrentYear(response.data[3]["consommation"]);
        setTempJ5CurrentYear(response.data[4]["consommation"]);
        setTempJ6CurrentYear(response.data[5]["consommation"]);
        setTempJ7CurrentYear(response.data[6]["consommation"]);
    }).catch(error => console.error(error));

    axios.get('https://api-noe.alerteo.com/noe/v1.1/compteurs/158249582/donnees-par-jour?dateDebut=2022-03-03&dateFin=2022-03-10', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log('Response:', response);
        setTempJ1LastYear(response.data[0]["consommation"]);
        setTempJ2LastYear(response.data[1]["consommation"]);
        setTempJ3LastYear(response.data[2]["consommation"]);
        setTempJ4LastYear(response.data[3]["consommation"]);
        setTempJ5LastYear(response.data[4]["consommation"]);
        setTempJ6LastYear(response.data[5]["consommation"]);
        setTempJ7LastYear(response.data[6]["consommation"]);
    }).catch(error => console.error(error));

    // id compteur temp accueil = 158249582
    // id compteur eau global = 158249574
    // id compteur EDF global = 158249575

    const temperatureData = [
        { day: '2023-03-04', currentYear: tempJ1CurrentYear, lastYear: tempJ1LastYear },
        { day: '2023-03-05', currentYear: tempJ2CurrentYear, lastYear: tempJ2LastYear },
        { day: '2023-03-06', currentYear: tempJ3CurrentYear, lastYear: tempJ3LastYear },
        { day: '2023-03-07', currentYear: tempJ4CurrentYear, lastYear: tempJ4LastYear },
        { day: '2023-03-08', currentYear: tempJ5CurrentYear, lastYear: tempJ5LastYear },
        { day: '2023-03-09', currentYear: tempJ6CurrentYear, lastYear: tempJ6LastYear },
        { day: '2023-03-10', currentYear: tempJ7CurrentYear, lastYear: tempJ7LastYear },
    ];

  function Table() {
    return (
      <table  style={{position: "absolute", bottom: 0, left: "50%", transform: "translate(-50%,-20%)", color: "white", textShadow: "3px 0px 7px rgba(0, 0, 0, 0.8), -3px 0px 7px rgba(0, 0, 0, 0.8), 0px 4px 7px rgba(0, 0, 0, 0.8)"}}>
        <tbody>
        <tr>
          <td>Date</td>
            <td>Moyenne journalière de la température mesurée à l'accueil sur les 7 derniers jours (en °C)</td>
            <td>Moyenne journalière de la température mesurée à l'accueil sur la même période l'année dernière (en °C)</td>
        </tr>
          {temperatureData.map((item, index) => (
            <tr key={index}>
              <td>{item.day}</td>
              <td>{item.currentYear}</td>
              <td>{item.lastYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <Table />
    </div>
  )
}
