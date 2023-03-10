import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import tokenResponse from '../../data/data.json';

export default function ElecCharts() {

    const [dateLastMeasure, setDateLastMeasure] = useState();
    const [elecJ1CurrentYear, setElecJ1CurrentYear] = useState();
    const [elecJ2CurrentYear, setElecJ2CurrentYear] = useState();
    const [elecJ3CurrentYear, setElecJ3CurrentYear] = useState();
    const [elecJ4CurrentYear, setElecJ4CurrentYear] = useState();
    const [elecJ5CurrentYear, setElecJ5CurrentYear] = useState();
    const [elecJ6CurrentYear, setElecJ6CurrentYear] = useState();
    const [elecJ7CurrentYear, setElecJ7CurrentYear] = useState();
    const [elecJ1LastYear, setElecJ1LastYear] = useState();
    const [elecJ2LastYear, setElecJ2LastYear] = useState();
    const [elecJ3LastYear, setElecJ3LastYear] = useState();
    const [elecJ4LastYear, setElecJ4LastYear] = useState();
    const [elecJ5LastYear, setElecJ5LastYear] = useState();
    const [elecJ6LastYear, setElecJ6LastYear] = useState();
    const [elecJ7LastYear, setElecJ7LastYear] = useState();

    const token = tokenResponse["access_token"];
    axios.get('https://api-noe.alerteo.com/noe/v1.1/compteurs/158249575/date-derniere-mesure', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log('Response:', response);
        setDateLastMeasure(response.data["date"]);
    }).catch(error => console.error(error));

    axios.get(`https://api-noe.alerteo.com/noe/v1.1/compteurs/158249575/donnees-par-jour?dateDebut=2023-03-03&dateFin=2023-03-10`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log('Response:', response);
        setElecJ1CurrentYear(response.data[0]["consommation"]);
        setElecJ2CurrentYear(response.data[1]["consommation"]);
        setElecJ3CurrentYear(response.data[2]["consommation"]);
        setElecJ4CurrentYear(response.data[3]["consommation"]);
        setElecJ5CurrentYear(response.data[4]["consommation"]);
        setElecJ6CurrentYear(response.data[5]["consommation"]);
        setElecJ7CurrentYear(response.data[6]["consommation"]);
    }).catch(error => console.error(error));

    axios.get('https://api-noe.alerteo.com/noe/v1.1/compteurs/158249575/donnees-par-jour?dateDebut=2022-03-03&dateFin=2022-03-10', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log('Response:', response);
        setElecJ1LastYear(response.data[0]["consommation"]);
        setElecJ2LastYear(response.data[1]["consommation"]);
        setElecJ3LastYear(response.data[2]["consommation"]);
        setElecJ4LastYear(response.data[3]["consommation"]);
        setElecJ5LastYear(response.data[4]["consommation"]);
        setElecJ6LastYear(response.data[5]["consommation"]);
        setElecJ7LastYear(response.data[6]["consommation"]);
    }).catch(error => console.error(error));

    // id compteur eau global = 158249574
    // id compteur EDF global = 158249575

    const electriciteData = [
        { day: '2023-03-04', currentYear: elecJ1CurrentYear, lastYear: elecJ1LastYear },
        { day: '2023-03-05', currentYear: elecJ2CurrentYear, lastYear: elecJ2LastYear },
        { day: '2023-03-06', currentYear: elecJ3CurrentYear, lastYear: elecJ3LastYear },
        { day: '2023-03-07', currentYear: elecJ4CurrentYear, lastYear: elecJ4LastYear },
        { day: '2023-03-08', currentYear: elecJ5CurrentYear, lastYear: elecJ5LastYear },
        { day: '2023-03-09', currentYear: elecJ6CurrentYear, lastYear: elecJ6LastYear },
        { day: '2023-03-10', currentYear: elecJ7CurrentYear, lastYear: elecJ7LastYear },
    ];

  function Table() {
    return (
      <table style={{position: "absolute", bottom: 0, left: "50%", transform: "translate(-50%,-20%)", color: "white", textShadow: "3px 0px 7px rgba(0, 0, 0, 0.8), -3px 0px 7px rgba(0, 0, 0, 0.8), 0px 4px 7px rgba(0, 0, 0, 0.8)"}}>
        <tbody>
        <tr>
              <td>Date</td>
              <td>Consommation du jour (en kWh)</td>
              <td>Consommation du même jour l'année précédente (en kWh)</td>
            </tr>
          {electriciteData.map((item, index) => (
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
