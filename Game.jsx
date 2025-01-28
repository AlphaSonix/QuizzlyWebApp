import React from "react"
import {nanoid} from "nanoid"
import {decode} from 'html-entities';
import { clsx } from "clsx"

export default function Game(props){
    
    const [answers, setAnswers] = React.useState([])
    const [previousSelectedId, setPreviousSelectedId] = React.useState(null)
    
    //Inserts correct answer choice into a random position in each question. 
    React.useEffect(()=>{
        const ranNum = Math.floor(Math.random()*4)
        const answerArr = props.question.incorrect_answers
        answerArr.splice(ranNum, 0, props.question.correct_answer)
        const correctAnswer = decode(props.question.correct_answer)
        props.setShowAnswer(correctAnswer)
        
        const answerObj = answerArr.map(answer => {
            return {
                id: nanoid(),
                choice: decode(answer),
                isTrue: decode(answer) === correctAnswer ? true : false,
                selected: false
            }
        })  
            setAnswers(answerObj)
            setPreviousSelectedId(null)
    },[props.question])
    
    function selectChoice(id){
        setAnswers(prevAnswers => {
            const updatedAnswers = prevAnswers.map(answer => {
                 const isCurrentlySelected = answer.selected
                 if (answer.id === id) {
                    if (!isCurrentlySelected && previousSelectedId === null){
                       props.handleAnswerSelection(true)
                    } 
                    if (answer.isTrue && !isCurrentlySelected) {
                        props.setCount(prev => prev + 1)
                    }
                    if (!answer.isTrue && previousSelectedId !== null) {
                        const prevSelectedAnswer = prevAnswers.find(answer => answer.id === previousSelectedId)
                        if (prevSelectedAnswer.isTrue) {
                            props.setCount(prev => prev - 1)
                        }
                    }
                    setPreviousSelectedId(id);
                    return { ...answer, selected: true }
                } else {
                    return { ...answer, selected: false }
                }
            })
            
        return updatedAnswers
        })
    }
    
    const answerElement = answers.map(answer => (
        <button
        key={answer.id}
        onClick={() => selectChoice(answer.id)} 
        className={clsx("answer-btn", props.gameOver && answer.isTrue ? "right-answer" : "")}  
        style={{backgroundColor: answer.selected ? "#4E63D0" : "", color: answer.selected ? "white" : ""}}
        >
        {answer.choice}
        </button>
    ))
    
    return(
        <div className="game-container">
            <h2>{decode(props.question.question)}</h2>
            <div className="choice-list">
            {answerElement}
            </div>
            <hr />
        </div>
    )
}