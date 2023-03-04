import React from 'react'
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <form className="email-form">
        <h3>Welcome to <br></br> Elisabeth Borne</h3>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Email ISEN" id="email"/>
        <Link to="/">S'enregistrer</Link>
      </form>
    </>
  )
}
