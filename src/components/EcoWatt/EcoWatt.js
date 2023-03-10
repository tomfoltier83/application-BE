import React, { useEffect, useRef } from 'react'
import "./EcoWatt.css"
import ecoWattData from "../../data/ecoWattData.json"

export default function EcoWatt() {

    const dayRef = useRef([]);

    useEffect(() => {
        console.log(ecoWattData.signals)

        document.addEventListener('keydown', handleKeyDown);
        dayRef.current[0].focus()

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'a') {
            event.preventDefault()
            dayRef.current[0].focus()
        }
        if (event.key === 'z') {
            event.preventDefault()
            dayRef.current[1].focus()
        }
        if (event.key === 'Enter') {
            event.preventDefault()
            dayRef.current[2].focus()
        }
        if (event.key === 'ArrowLeft') {
            event.preventDefault()
            window.history.back()
        }
    }

    return (
        <div className="eco-watt-container">
            <div className="hourly-timeline-container">
                <h1>{ecoWattData.signals[0].message}</h1>
                <div className="timeline">
                    <div className={"time-block"} style={{ backgroundColor: "transparent" }}></div>
                    <div className="time-block"><p>0h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block"><p>2h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block"><p>4h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block"><p>6h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block"><p>8h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block"><p>10h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block"><p>12h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block"><p>14h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block"><p>16h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block"><p>18h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block"><p>20h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block"><p>22h</p></div>
                    <div className="time-block"></div>
                    <div className="time-block" style={{ backgroundColor: "transparent" }}><p>24h</p></div>
                </div>
            </div>
            <div className="days-container">
                <div className="projection-day-container" ref={el => (dayRef.current[0] = el)} tabIndex={0} style={{borderBottom: "10px solid #f32121"}}>
                    <img src="https://www.monecowatt.fr/courbes-signaux/courbe-signal-green.png" alt="" />
                    <div className="day-date">
                        <h1>Vendredi</h1>
                        <p>10 Mars</p>
                    </div>
                </div>
                <div className="projection-day-container" ref={el => (dayRef.current[1] = el)} tabIndex={0} style={{borderBottom: "10px solid #f3e521"}}>
                    <img src="https://www.monecowatt.fr/courbes-signaux/courbe-signal-green.png" alt="" />
                    <div className="day-date">
                        <h1>Samedi</h1>
                        <p>11 Mars</p>
                    </div>
                </div>
                <div className="projection-day-container" ref={el => (dayRef.current[2] = el)} tabIndex={0} style={{borderBottom: "10px solid #0400ff"}}>
                    <img src="https://www.monecowatt.fr/courbes-signaux/courbe-signal-green.png" alt="" />
                    <div className="day-date">
                        <h1>Dimanche</h1>
                        <p>12 Mars</p>
                    </div>
                </div>
            </div>
            <h1 className='helper'>Poussez le joystick vers la GAUCHE pour revenir.</h1>
        </div>
    )
}