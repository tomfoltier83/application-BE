import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import tokenResponse from '../../data/data.json';
import { useNavigate } from "react-router-dom";

export default function WaterCharts() {

    const [dateLastMeasure, setDateLastMeasure] = useState();
    const [waterJ1CurrentYear, setWaterJ1CurrentYear] = useState();
    const [waterJ2CurrentYear, setWaterJ2CurrentYear] = useState();
    const [waterJ3CurrentYear, setWaterJ3CurrentYear] = useState();
    const [waterJ4CurrentYear, setWaterJ4CurrentYear] = useState();
    const [waterJ5CurrentYear, setWaterJ5CurrentYear] = useState();
    const [waterJ6CurrentYear, setWaterJ6CurrentYear] = useState();
    const [waterJ7CurrentYear, setWaterJ7CurrentYear] = useState();
    const [waterJ1LastYear, setWaterJ1LastYear] = useState();
    const [waterJ2LastYear, setWaterJ2LastYear] = useState();
    const [waterJ3LastYear, setWaterJ3LastYear] = useState();
    const [waterJ4LastYear, setWaterJ4LastYear] = useState();
    const [waterJ5LastYear, setWaterJ5LastYear] = useState();
    const [waterJ6LastYear, setWaterJ6LastYear] = useState();
    const [waterJ7LastYear, setWaterJ7LastYear] = useState();
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
    axios.get('https://api-noe.alerteo.com/noe/v1.1/compteurs/158249574/date-derniere-mesure', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log('Response:', response);
        setDateLastMeasure(response.data["date"]);
    }).catch(error => console.error(error));

    axios.get(`https://api-noe.alerteo.com/noe/v1.1/compteurs/158249574/donnees-par-jour?dateDebut=2023-03-03&dateFin=2023-03-10`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log('Response:', response);
        setWaterJ1CurrentYear(response.data[0]["consommation"]);
        setWaterJ2CurrentYear(response.data[1]["consommation"]);
        setWaterJ3CurrentYear(response.data[2]["consommation"]);
        setWaterJ4CurrentYear(response.data[3]["consommation"]);
        setWaterJ5CurrentYear(response.data[4]["consommation"]);
        setWaterJ6CurrentYear(response.data[5]["consommation"]);
        setWaterJ7CurrentYear(response.data[6]["consommation"]);
    }).catch(error => console.error(error));

    axios.get('https://api-noe.alerteo.com/noe/v1.1/compteurs/158249574/donnees-par-jour?dateDebut=2022-03-03&dateFin=2022-03-10', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log('Response:', response);
        setWaterJ1LastYear(response.data[0]["consommation"]);
        setWaterJ2LastYear(response.data[1]["consommation"]);
        setWaterJ3LastYear(response.data[2]["consommation"]);
        setWaterJ4LastYear(response.data[3]["consommation"]);
        setWaterJ5LastYear(response.data[4]["consommation"]);
        setWaterJ6LastYear(response.data[5]["consommation"]);
        setWaterJ7LastYear(response.data[6]["consommation"]);
    }).catch(error => console.error(error));

    const waterData = [
        { day: '2023-03-04', currentYear: waterJ1CurrentYear, lastYear: waterJ1LastYear },
        { day: '2023-03-05', currentYear: waterJ2CurrentYear, lastYear: waterJ2LastYear },
        { day: '2023-03-06', currentYear: waterJ3CurrentYear, lastYear: waterJ3LastYear },
        { day: '2023-03-07', currentYear: waterJ4CurrentYear, lastYear: waterJ4LastYear },
        { day: '2023-03-08', currentYear: waterJ5CurrentYear, lastYear: waterJ5LastYear },
        { day: '2023-03-09', currentYear: waterJ6CurrentYear, lastYear: waterJ6LastYear },
        { day: '2023-03-10', currentYear: waterJ7CurrentYear, lastYear: waterJ7LastYear },
    ];

  function Table() {
    return (
      <table style={{position: "absolute", bottom: 0, left: "50%", transform: "translate(-50%,-20%)", color: "white", textShadow: "3px 0px 7px rgba(0, 0, 0, 0.8), -3px 0px 7px rgba(0, 0, 0, 0.8), 0px 4px 7px rgba(0, 0, 0, 0.8)"}}>
        <tbody>
        <tr>
        <td>Date</td>
              <td>Consommation du jour (en m3)</td>
              <td>Consommation du même jour l'année précédente (en m3)</td>
        </tr>
          {waterData.map((item, index) => (
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
