import React, {useState} from 'react';
import "./InfosChoice.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import tokenResponse from '../../data/data.json';

export default function InfosChoice() {

    const [test, setTest] = useState()
    
    const token = tokenResponse["access_token"];
    axios.get('https://api-noe.alerteo.com/noe/v1.1/sites/10076/compteurs', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log('Response:', response);
        // filesystem.writeFile('response.json', response.data, function (err) {
        //     console.log(err);
        // });
        setTest(response.data[0]["id"])
    })
    .catch(error => console.error(error));


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
            <h1>{test}</h1>
        </div>
    )
}
