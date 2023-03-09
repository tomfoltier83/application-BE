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
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isAnswer, setIsAnswer] = useState(false)
    const [isGoodAnswer, setIsGoodAnswer] = useState(false)
    //const [answerButtons, setAnswerButtons] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        /// A chaque fois que l'id de la question change :
        /// On met à jour un compteur qui compte le nombre de question auxquelles l'utilisateur a répondu
        dispatch(setQuestion())
        var baseAnswers = []
        /// On récupère les réponses à la question du fichier JSON que l'on stock dans un tableau
        if (questions["questions"][questionId][0]["reponseC"] === undefined) {
            baseAnswers.push(questions["questions"][questionId][0]["reponse_correcte"], questions["questions"][questionId][0]["reponseB"])
        } else {
            baseAnswers.push(questions["questions"][questionId][0]["reponse_correcte"], questions["questions"][questionId][0]["reponseB"], questions["questions"][questionId][0]["reponseC"])
        }
        /// On génère un tableau aléatoire avec les réponses précédentes afin de ne pas avoir la réponse correcte toujours en première position
        const newRandomArray = shuffle(baseAnswers)
        setAnswersArray(newRandomArray)
        /// On replace l'index des boutons à la position 1
        setSelectedIndex(1)

        document.addEventListener('keydown', handleKeyDown);
        const firstButton = document.getElementById('button1');
        const secondButton = document.getElementById('button2');
        const thirdButton = document.getElementById('button3');
        firstButtonRef.current = firstButton;
        secondButtonRef.current = secondButton;
        thirdButtonRef.current = thirdButton;

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [questionId]);

    const firstButtonRef = useRef();
    const secondButtonRef = useRef();
    const thirdButtonRef = useRef();

    const handleKeyDown = (event) => {
        if (event.key === 'a') {
            event.preventDefault()
            checkAnswer(firstButtonRef.current.innerHTML)
            // console.log(firstButtonRef.current.innerHTML)
            setIsAnswer(true)
        }
        if (event.key === 'z') {
            event.preventDefault()
            checkAnswer(secondButtonRef.current.innerHTML)
            // console.log(secondButtonRef.current.innerHTML)
            setIsAnswer(true)
        }
        if (event.key === 'Enter') {
            event.preventDefault()
            checkAnswer(thirdButtonRef.current.innerHTML)
            // console.log(thirdButtonRef.current.innerHTML)
            setIsAnswer(true)
        }
    }

    const checkAnswer = (userAnswer) => {
        console.log(userAnswer)
        console.log(questions["questions"][questionId][0]["reponse_correcte"])
        if (userAnswer === questions["questions"][questionId][0]["reponse_correcte"]) {
            dispatch(setScore())
            setIsGoodAnswer(true)
        } else {
            setIsGoodAnswer(false)
        }
    }

    /// Fonction permettant de générer un tableau aléatoire à partir d'un tableau de base
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /// On affiche la réponse avec le complément
    const ShowAnswer = () => {
        return (
            <div className="complement" style={isAnswer ? {} : { display: "none" }}>
                {isGoodAnswer ? <h3>Bonne réponse !</h3> : <h3>Mauvaise réponse ... <p style={{ fontSize: "15px", padding: "10px 0" }}>La réponse était : {questions["questions"][questionId][0]["reponse_correcte"]}</p></h3>}
                <p className='complement-text'>{questions["questions"][questionId][0]["complement"]}</p>
                <button autoFocus onKeyDown={event => handleNextKeyDown(event)} className='answer-button' style={{ backgroundColor: "white", color: "black" }}><p>Suivant</p><i class="fa-solid fa-arrow-right"></i></button>
                <h3>Poussez le joystick vers la droite pour continuer.</h3>
            </div>
        )
    }

    /// On écoute le comportement sur le joystick dans le but de passer à la question suivante
    const handleNextKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault()
            const newQuestionId = parseInt(Math.random() * 40)
            setIsAnswer(false)
            setIsGoodAnswer(false)
            // On change de question
            setQuestionId(newQuestionId)
        }
        if (event.key === 'Enter') {
            event.preventDefault()
        }
    };


    const transitions = useTransition(questionId, {
        from: {
            width: "90%",
            opacity: 0,
            transform: 'scale(0)',
            delay: 1000
        },
        enter: {
            width: "90%",
            opacity: 1,
            transform: 'scale(1)',
            delay: 1000
        },
        leave: {
            width: "90%",
            opacity: 0,
            position: 'absolute',
            transform: 'scale(0)',
        }
    })

    return (
        <form className='form-container' tabIndex="0">
            {transitions((style) =>
                <animated.div style={style}>
                    <div className="form-content" style={isAnswer ? { display: "none" } : {}}>
                        <div className="question">
                            <h1>{questions["questions"][questionId][0]["enonce"]}</h1>
                        </div>
                        <div className="answers">
                            <button id='button1' className='answer-button'>{answersArray[0]}</button>
                            <button id='button2' className='answer-button'>{answersArray[1]}</button>
                            <button id='button3' className='answer-button'>{answersArray[2]}</button>
                        </div>
                    </div>
                    <ShowAnswer />
                </animated.div>
            )}
        </form>
    )
}
