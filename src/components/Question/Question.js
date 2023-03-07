import React, { useState, useEffect, useRef } from 'react'
import "./Question.css"
import questions from '../../data/questions.json';
import { useTransition, animated } from 'react-spring';
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setScore, setQuestion } from "../../redux";
import { redirect } from "react-router-dom";

export default function Question() {

    const [questionId, setQuestionId] = useState(parseInt(Math.random() * 40))
    const [answersArray, setAnswersArray] = useState([])
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const buttons = useRef([]);

    useEffect(() => {
        /// A chaque fois que l'id de la question change :
        /// On met à jour un compteur qui compte le nombre de question auxquelles l'utilisateur a répondu
        dispatch(setQuestion())
        /// On récupère les réponses à la question du fichier JSON que l'on stock dans un tableau
        const baseAnswers = [questions["questions"][questionId][0]["reponse_correcte"], questions["questions"][questionId][0]["reponseB"], questions["questions"][questionId][0]["reponseC"]]
        /// On génère un tableau aléatoire avec les réponses précédentes afin de ne pas avoir la réponse correcte toujours en première position
        const newRandomArray = shuffle(baseAnswers)
        setAnswersArray(newRandomArray)
        /// On replace l'index des boutons à la position 1
        setSelectedIndex(1)
    }, [questionId]);

    useEffect(() => {
        buttons.current[selectedIndex].focus();
    });

    //const questionNumber = useSelector((state) => console.log(state.userInformations.question));

    const transitions = useTransition(questionId, {
        from: {
            opacity: 0,
            transform: 'scale(0)',
            delay: 1000
        },
        enter: {
            opacity: 1,
            transform: 'scale(1)',
            delay: 1000
        },
        leave: {
            opacity: 0,
            position: 'absolute',
            transform: 'scale(0)',
        }
    })

    // const answerClick = (e) => {
    //     e.preventDefault()
    //     checkAnswer(e.target.innerHTML)
    //     const newQuestionId = parseInt(Math.random() * 40)
    //     // On change de question
    //     setQuestionId(newQuestionId)
    // }

    const checkAnswer = (userAnswer) => {
        if (userAnswer === questions["questions"][questionId][0]["reponse_correcte"]) {
            dispatch(setScore())
            console.log("good")
        } else {
            console.log('bad')
        }
    }

    /// Fonction permettant de générer un tableau aléatoire à partir d'un tableau de base
    function shuffle(array) {
        console.log(array)
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        console.log(array)
        return array;
    }

    /// On écoute le comportement sur chacun des boutons de réponse
    const handleKeyDown = (event, index) => {
        if (event.key === 'ArrowRight' && selectedIndex < buttons.current.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
        if (event.key === 'ArrowLeft' && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
        if (event.key === 'Enter') {
            event.preventDefault()
            checkAnswer(event.target.innerHTML)
            const newQuestionId = parseInt(Math.random() * 40)
            // On change de question
            setQuestionId(newQuestionId)
        }
    };

    return (
        <form className='form-container' tabIndex="0">
            {transitions((style) =>
                <animated.div style={style}>
                    <div className="form-content">
                        <div className="question">
                            <h1>{questions["questions"][questionId][0]["enonce"]}</h1>
                        </div>

                        {/* <div className="answers">
                            <button className='answer-button' onClick={answerClick}>{shuffledArray[0]}</button>
                            <button className='answer-button' onClick={answerClick}>{shuffledArray[1]}</button>
                            <button className='answer-button' onClick={answerClick}>{shuffledArray[2]}</button>
                        </div> */}
                        <div className="answers">
                            {[[answersArray[0]], [answersArray[1]], [answersArray[2]]].map((button, index) => (
                                <button
                                    ref={el => (buttons.current[index] = el)}
                                    onKeyDown={event => handleKeyDown(event, index)}
                                    className='answer-button'
                                    id={button[1]}
                                >
                                    {button[0]}
                                </button>
                            ))}
                        </div>
                    </div>
                </animated.div>
            )}
        </form>
    )
}
