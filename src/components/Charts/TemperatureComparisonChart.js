import Chart from 'chart.js/auto';
import { temperatureData } from '../InfosChoice/InfosChoice';

    new Chart(
        document.getElementById('temperatureWeekComparison'),
        {
            type: 'line',
            data: {
                labels: temperatureData.map(row => row.day),
                datasets: [
                    {
                        label: 'Moyenne journalière de la température mesurée à l\'accueil sur les 7 derniers jours (en °C)',
                        data: temperatureData.map(row => row.currentYear),
                        fill: true,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0
                    },
                    {
                        label: 'Moyenne journalière de la température mesurée à l\accueil sur la même période l\année dernière (en °C)',
                        data: temperatureData.map(row => row.lastYear),
                        fill: true,
                        borderColor: 'rgb(75, 75, 192)',
                        tension: 1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        min: new Date('2023-03-10').valueOf(),
                        max: new Date('2023-03-04').valueOf()
                    },
                    y: {
                        type: 'linear',
                        min: 0,
                        max: 35
                    }
                }
            }
        }
    );