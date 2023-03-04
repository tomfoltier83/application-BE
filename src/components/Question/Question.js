import React, { useState, useEffect, useRef } from 'react'
import "./Question.css"
import questions from '../../data/questions.json';
import { useTransition, animated } from 'react-spring';
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setScore, setQuestion } from "../../redux";
import { redirect } from "react-router-dom";

export default function Question() {

    const [questionId, setQuestionId] = useState(parseInt(Math.random() * 40))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setQuestion())
    }, [questionId]);

    //const questionNumber = useSelector((state) => console.log(state.userInformations.question));

    const transitions = useTransition(questionId, {
        from: {
            opacity: 0,
            transform: 'scale(0)',
            delay: 500
        },
        enter: {
            opacity: 1,
            transform: 'scale(1)',
            delay: 500
        },
        leave: {
            opacity: 0,
            position: 'absolute',
            transform: 'scale(0)',
        }
    })

    const answerClick = (e) => {
        e.preventDefault()
        checkAnswer(e.target.innerHTML)
        const newQuestionId = parseInt(Math.random() * 40)
        // On change de question
        setQuestionId(newQuestionId)
    }

    const checkAnswer = (userAnswer) => {
        if (userAnswer === questions["questions"][questionId][0]["reponse_correcte"]){
            dispatch(setScore())
        }else{
            console.log('bad')
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const questionArray = []

    questionArray.push(questions["questions"][questionId][0]["reponse_correcte"], questions["questions"][questionId][0]["reponseB"], questions["questions"][questionId][0]["reponseC"])

    const shuffledArray = shuffle(questionArray)

    // const buttons = useRef([]);
    // const [selectedIndex, setSelectedIndex] = useState(0);

    // useEffect(() => {
    //     buttons.current[selectedIndex].focus();
    // }, [selectedIndex]);

    // const handleKeyDown = (event, index) => {
    //     if (event.key === 'ArrowRight' && selectedIndex < buttons.current.length - 1) {
    //         setSelectedIndex(selectedIndex + 1);
    //     }
    //     if (event.key === 'ArrowLeft' && selectedIndex > 0) {
    //         setSelectedIndex(selectedIndex - 1);
    //     }
    //     if (event.key === 'Enter') {
    //         console.log(buttons.current[selectedIndex])
    //     }
    // };

    return (
        <form className='form-container' tabIndex="0">
            {transitions((style) =>
                <animated.div style={style}>
                    <div className="form-content">
                        <div className="question">
                            <h1>{questions["questions"][questionId][0]["enonce"]}</h1>
                        </div>

                        <div className="answers">
                            <button className='answer-button' onClick={answerClick}>{shuffledArray[0]}</button>
                            <button className='answer-button' onClick={answerClick}>{shuffledArray[1]}</button>
                            <button className='answer-button' onClick={answerClick}>{shuffledArray[2]}</button>
                        </div>
                        {/* <div className="answers">
                            {[[questions["questions"][questionId][0]["reponse_correcte"], "correcte"], [questions["questions"][questionId][0]["reponseB"], "incorrecte"], [questions["questions"][questionId][0]["reponseC"], "incorrecte"]].map((button, index) => (
                                <button
                                    ref={el => (buttons.current[index] = el)}
                                    onKeyDown={event => handleKeyDown(event, index)}
                                    className='answer-button'
                                    id={button[1]}
                                >
                                    {button[0]}
                                </button>
                            ))}
                        </div> */}
                    </div>
                </animated.div>
            )}
        </form>
    )
}
