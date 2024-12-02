import React from "react"
import {nanoid} from "nanoid"
import {decode} from 'html-entities';

export default function Game(props){
    
    const [answers, setAnswers] = React.useState([])
    const [previousSelectedId, setPreviousSelectedId] = React.useState(null)
    
    React.useEffect(()=>{
    const ranNum = Math.floor(Math.random()*4)
    const answerArr = props.question.incorrect_answers
    answerArr.splice(ranNum, 0, props.question.correct_answer)
    const correctAnswer = decode(props.question.correct_answer)
    
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
        console.log(answerObj)
    },[props.question])
    
    function selectChoice(id){
        setAnswers(prevAnswers => {
            const updatedAnswers = prevAnswers.map(answer => {
                 const isCurrentlySelected = answer.selected
                 if (answer.id === id) {
                    if (!isCurrentlySelected){
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

        console.log(props.selectionCheck)
        console.log(props.count)
        return updatedAnswers
        })
    }
    
    const answerElement = answers.map(answer => (
        <button 
        key={answer.id}
        onClick={() => selectChoice(answer.id)} 
        className="answer-btn" 
        style={{backgroundColor: answer.selected ? "#D6DBF5" : "transparent"}}
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