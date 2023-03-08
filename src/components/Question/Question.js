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
    const dispatch = useDispatch();

    const answerButtons = useRef([]);

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
        answerButtons.current[selectedIndex].focus();
        console.log(answersArray)
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
            setIsGoodAnswer(true)
        } else {
            setIsGoodAnswer(false)
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

    /// On affiche la réponse avec le complément
    const ShowAnswer = () => {
        return (
            <div className="complement" style={isAnswer ? {} : { display: "none" }}>
                {isGoodAnswer ? <h3>Bonne réponse !</h3> : <h3>Mauvaise réponse ... <p style={{ fontSize: "15px", padding: "10px 0" }}>La réponse était : {questions["questions"][questionId][0]["reponse_correcte"]}</p></h3>}
                <p className='complement-text'>{questions["questions"][questionId][0]["complement"]}</p>
                <button autoFocus onKeyDown={event => handleNextKeyDown(event)} className='answer-button'>Suivant</button>
            </div>
        )
    }

    /// On écoute le comportement sur chacun des boutons de réponse
    const handleAnswerKeyDown = (event, index) => {
        if (event.key === 'ArrowRight' && selectedIndex < answerButtons.current.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
        if (event.key === 'ArrowLeft' && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
        if (event.key === 'Enter') {
            event.preventDefault()
            checkAnswer(event.target.innerHTML)
            setIsAnswer(true)
            // On change de question
            //setQuestionId(newQuestionId)
        }
    };
    /// On écoute le comportement sur chacun des boutons de réponse
    const handleNextKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            const newQuestionId = parseInt(Math.random() * 40)
            setIsAnswer(false)
            setIsGoodAnswer(false)
            // On change de question
            setQuestionId(newQuestionId)
        }
    };

    console.log(isAnswer)

    return (
        <form className='form-container' tabIndex="0">
            {transitions((style) =>
                <animated.div style={style}>
                    <div className="form-content" style={isAnswer ? { display: "none" } : {}}>
                        <div className="question">
                            <h1>{questions["questions"][questionId][0]["enonce"]}</h1>
                        </div>
                        <div className="answers">
                            {[[answersArray[0]], [answersArray[1]], [answersArray[2]]].map((button, index) => (
                                <button
                                    ref={el => (answerButtons.current[index] = el)}
                                    onKeyDown={event => handleAnswerKeyDown(event, index)}
                                    className='answer-button'
                                    id={button[1]}
                                >
                                    {button[0]}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ShowAnswer />
                </animated.div>
            )}
            <h1>Appuyez sur le bouton <span>BLEU</span> pour valider votre réponse !</h1>
        </form>
    )
}
