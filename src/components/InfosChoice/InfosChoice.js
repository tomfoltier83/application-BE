import React from 'react';
import "./InfosChoice.css";
import { Link } from 'react-router-dom';

export default function InfosChoice() {
    return (
        <div className='infos-choice-container'>
            <Link to="/" style={{ color: "red"}}>
            <i class="fa-solid fa-temperature-half"></i>
            </Link>
            <Link to="/" style={{ color: "yellow"}}>
            <i class="fa-solid fa-bolt"></i>
            </Link>
            <Link to="/" style={{ color: "blue"}}>
            <i class="fa-sharp fa-solid fa-droplet"></i>
            </Link>
        </div>
    )
}
