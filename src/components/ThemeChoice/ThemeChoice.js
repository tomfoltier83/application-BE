import React from 'react'
import "./ThemeChoice.css"
import { Link } from "react-router-dom";

export default function ThemeChoice() {

        const idQuestion = parseInt(Math.random()*5)

    return (
        <div className="theme-container">
            <div class="container">
                <div class="card">
                    <div class="box">
                        <div class="content">
                            <h2><i class="fa-solid fa-info"></i></h2>
                            <h3>Infos</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, totam velit? Iure nemo labore inventore?</p>
                            <Link to='/infos' activeClassName="current">Commencer</Link>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="box">
                        <div class="content">
                            <h2><i style={{ rotate: "30deg" }} class="fa-solid fa-question"></i></h2>
                            <h3>Quizz</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, totam velit? Iure nemo labore inventore?</p>
                            <Link to='/quizz' activeClassName="current">Commencer</Link>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="box">
                        <div class="content">
                            <h2><i class="fa-solid fa-cloud-sun"></i></h2>
                            <h3>Eco-Watt</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, totam velit? Iure nemo labore inventore?</p>
                            <Link to='/eco-watt' activeClassName="current">Commencer</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
