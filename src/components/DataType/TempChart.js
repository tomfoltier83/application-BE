import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import tokenResponse from '../../data/NoeData.json';
import { useNavigate } from "react-router-dom";
import "./DataType.css"

export default function TempCharts() {


  const [noeData, setNoeData] = useState({})
  const navigate = useNavigate()

  const currentYearDateDebut = new Date();

  const currentYearDateFin = new Date(currentYearDateDebut);
  currentYearDateFin.setDate(currentYearDateDebut.getDate() - 7);

  const lastYearDateDebut = new Date(currentYearDateDebut);
  lastYearDateDebut.setFullYear(currentYearDateDebut.getFullYear() - 1);

  const lastYearDateFin = new Date(currentYearDateFin);
  lastYearDateFin.setFullYear(currentYearDateFin.getFullYear() - 1);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    axios.get(`https://api-noe.alerteo.com/noe/v1.1/compteurs/158249582/donnees-par-jour?dateDebut=${formatDate(currentYearDateFin)}&dateFin=${formatDate(currentYearDateDebut)}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(currentYearResponse => {
      axios.get(`https://api-noe.alerteo.com/noe/v1.1/compteurs/158249582/donnees-par-jour?dateDebut=${formatDate(lastYearDateFin)}&dateFin=${formatDate(lastYearDateDebut)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(lastYearResponse => {
        console.log(currentYearResponse, lastYearResponse)
        setNoeData({ currentYear: currentYearResponse, lastYear: lastYearResponse })
      }).catch(error => console.error(error));
    }).catch(error => console.error(error));

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

  // id compteur eau global = 158249574
  // id compteur EDF global = 158249575

  const formatedDate = (dateString) => {
    const dateAcquisition = dateString.dateAcquisition.split("T")[0];
    const parts = dateAcquisition.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }

  const cutConsommation = (conso) => {
    const numberString = conso;
    const number = parseFloat(numberString);
    const roundedNumber = number.toFixed(1);
    return roundedNumber.toString();
  }

  function Table() {
    return (
      <table>
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Date</th>
            <th>Moyenne journalière de la température mesurée à l'accueil sur les 7 derniers jours (en °C)</th>
            <th>Moyenne journalière de la température mesurée à l'accueil sur la même période l'année dernière (en °C)</th>
          </tr>
        </thead>
        <tbody>
          {noeData.currentYear && noeData.currentYear.data.map((currentYearItem, currentYearIndex) => (
            <tr key={currentYearIndex}>
              <td>{formatedDate(currentYearItem)}</td>
              <td>{cutConsommation(currentYearItem.consommation)}</td>
              {noeData.lastYear && noeData.lastYear.data.map((lastYearItem, lastYearIndex) => {
                if (currentYearIndex === lastYearIndex) {
                  return <td>{cutConsommation(lastYearItem.consommation)}</td>
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function Graph() {
    const chartRef = useRef();

    useEffect(() => {
      // Vérifiez que les données nécessaires sont présentes
      if (noeData.currentYear && noeData.lastYear) {
        const currentYearData = noeData.currentYear.data;
        const lastYearData = noeData.lastYear.data;

        // Préparez les données pour le graphique
        const labels = currentYearData.map(item => formatedDate(item));
        const currentYearValues = currentYearData.map(item => item.consommation);
        const lastYearValues = lastYearData.map(item => item.consommation);

        // Créez le graphique
        const ctx = chartRef.current.getContext('2d')
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Température mesurée à l\'accueil cette année',
                data: currentYearValues,
                borderColor: 'blue',
                fill: false
              },
              {
                label: 'Température mesurée à l\'accueil l\'année précédente',
                data: lastYearValues,
                borderColor: 'red',
                fill: false
              }
            ]
          },
          options: {
            plugins: {
              legend: {
                labels: {
                  color: 'black' // Couleur du texte de la légende
                }
              }
            }

            // Définissez les options du graphique ici
          }
        });
      }
    }, [noeData]);

    return <canvas ref={chartRef} style={{ borderRadius: "20px", padding: "10px" }}></canvas>;
  }

  return (
    <div className='chart-table-block'>
      <Table />
      <div>
        <Graph />
      </div>
    </div>
  )
}
