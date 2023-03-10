import React, { useEffect } from 'react';
import "./InfosChoice.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function InfosChoice() {

    const navigate = useNavigate()

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'a') {
            navigate("/")
        }
        if (event.key === 'z') {
            navigate("/")
        }
        if (event.key === 'Enter') {
            navigate("/")
        }
    }

    return (
        <div className='infos-choice-container'>
            <Link to="/" style={{ color: "red" }}>
                <i class="fa-solid fa-temperature-half"></i>
            </Link>
            <Link to="/" style={{ color: "yellow" }}>
                <i class="fa-solid fa-bolt"></i>
            </Link>
            <Link to="/" style={{ color: "blue" }}>
                <i class="fa-sharp fa-solid fa-droplet"></i>
            </Link>
        </div>
    )
}
