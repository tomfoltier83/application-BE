import React, { useState } from 'react';
import "./InfosChoice.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import tokenResponse from '../../data/data.json';


export default function InfosChoice() {

    var tempCurrentYear = [];
    var tempLastYear = [];
    const waterConsumptionCurrentYear = [];
    const waterConsumptionLastYear = [];
    const electricityConsumptionCurrentYear = [];
    const electricityConsumptionLastYear = [];
    const [test, setTest] = useState();
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
        tempCurrentYear = [response.data[0]["consommation"], response.data[1]["consommation"], response.data[2]["consommation"], response.data[3]["consommation"], response.data[4]["consommation"], response.data[5]["consommation"], response.data[6]["consommation"]];
        setTempJ1CurrentYear(response.data[0]["consommation"]);
        setTempJ2CurrentYear(response.data[1]["consommation"]);
        setTempJ3CurrentYear(response.data[2]["consommation"]);
        setTempJ4CurrentYear(response.data[3]["consommation"]);
        setTempJ5CurrentYear(response.data[4]["consommation"]);
        setTempJ6CurrentYear(response.data[5]["consommation"]);
        setTempJ7CurrentYear(response.data[6]["consommation"]);
        console.log('tempCurrentYear:', tempCurrentYear);
    }).catch(error => console.error(error));

    axios.get('https://api-noe.alerteo.com/noe/v1.1/compteurs/158249582/donnees-par-jour?dateDebut=2022-03-03&dateFin=2022-03-10', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log('Response:', response);
        tempLastYear = [response.data[0]["consommation"], response.data[1]["consommation"], response.data[2]["consommation"], response.data[3]["consommation"], response.data[4]["consommation"], response.data[5]["consommation"], response.data[6]["consommation"]];
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

    const daysMap = [
        { day: '2023-03-04' },
        { day: '2023-03-05' },
        { day: '2023-03-06' },
        { day: '2023-03-07' },
        { day: '2023-03-08' },
        { day: '2023-03-09' },
        { day: '2023-03-10' },
    ];

    const temperatureData = daysMap.map((item, index) => {
        const container = {};

        container.day = item.day;
        container.currentYear = Math.round(tempCurrentYear[index]);
        container.lastYear = Math.round(tempLastYear[index]);
    });

    console.log('temperatureData: ', temperatureData);

    // const temperatureData = [
    //     { day: '2023-03-04', currentYear: tempJ1CurrentYear, lastYear: tempJ1LastYear },
    //     { day: '2023-03-05', currentYear: tempJ2CurrentYear, lastYear: tempJ2LastYear },
    //     { day: '2023-03-06', currentYear: tempJ3CurrentYear, lastYear: tempJ3LastYear },
    //     { day: '2023-03-07', currentYear: tempJ4CurrentYear, lastYear: tempJ4LastYear },
    //     { day: '2023-03-08', currentYear: tempJ5CurrentYear, lastYear: tempJ5LastYear },
    //     { day: '2023-03-09', currentYear: tempJ6CurrentYear, lastYear: tempJ6LastYear },
    //     { day: '2023-03-10', currentYear: tempJ7CurrentYear, lastYear: tempJ7LastYear },
    // ];

    return (
        <div className='infos-choice-container'>
            <Link to="/" style={{ color: "red" }}>
                <i class="fa-solid fa-temperature-half"></i>
            </Link>
            <div style="width: 800px;"><canvas id="temperatureWeekComparison"></canvas></div>
            <script type="module" src="TemperatureComparisonChart.js"></script>

            <Link to="/" style={{ color: "yellow" }}>
                <i class="fa-solid fa-bolt"></i>
            </Link>
            <Link to="/" style={{ color: "blue" }}>
                <i class="fa-sharp fa-solid fa-droplet"></i>
            </Link>
            <h1>{temperatureData}</h1>
        </div>
    )
}
