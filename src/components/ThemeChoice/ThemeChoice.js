import React, { useEffect } from 'react'
import "./ThemeChoice.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ThemeChoice() {

    const navigate = useNavigate()
    const questionNumber = useSelector((state) => state.userInformations.question);
    console.log(questionNumber)
    const scoreNumber = useSelector((state) => state.userInformations.score);
    console.log(scoreNumber)

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'a') {
            navigate("/infos")
        }
        if (event.key === 'z') {
            navigate("/quizz")
        }
        if (event.key === 'Enter') {
            navigate("/eco-watt")
        }
    }

    return (
        <div className="theme-container">
            <h1>Welcome to <span style={{ color: "green" }}>G.R.E.T.A</span></h1>
            <div class="container">
                <div class="card">
                    <div class="box">
                        <div class="content">
                            <h2><i class="fa-solid fa-info"></i></h2>
                            <h3>Infos</h3>
                            <p>Jetez un coup d'oeil sur la consommation de la Maison du Numérique et de l'Innovation.</p>
                            <Link to='/infos' activeClassName="current" style={{  textShadow: "3px 0px 7px rgba(0, 0, 0, 0.8), -3px 0px 7px rgba(0, 0, 0, 0.8), 0px 4px 7px rgba(0, 0, 0, 0.8)"
}}>Commencer</Link>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="box">
                        <div class="content">
                            <h2><i class="fa-solid fa-question"></i></h2>
                            <h3>Quizz</h3>
                            <p>Testez vos connaissances sur les enjeux écologiques d'aujourd'hui.</p>
                            <Link to='/quizz' activeClassName="current" style={{
                                textShadow: "3px 0px 7px rgba(0, 0, 0, 0.8), -3px 0px 7px rgba(0, 0, 0, 0.8), 0px 4px 7px rgba(0, 0, 0, 0.8)"
                            }}>Commencer</Link>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="box">
                        <div class="content">
                            <h2><i class="fa-solid fa-cloud-sun"></i></h2>
                            <h3>Eco-Watt</h3>
                            <p>Consultez l'état du réseau électrique métropolitain avec la météo de l'électricité.</p>
                            <Link to='/eco-watt' activeClassName="current" style={{  textShadow: "3px 0px 7px rgba(0, 0, 0, 0.8), -3px 0px 7px rgba(0, 0, 0, 0.8), 0px 4px 7px rgba(0, 0, 0, 0.8)"
}}>Commencer</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
