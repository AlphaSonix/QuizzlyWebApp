import React from "react"
import ReactLoading from "react-loading"

import MainMenu from "./MainMenu.js"
import Game from "./Game.js"
import CheckAnswers from "./CheckAnswers.js"

export default function App(){
    
    const [questions, setQuestions] = React.useState([])
    
    const [isLoading, setIsLoading] = React.useState(false)
    
    const [gameOn, setGameOn] = React.useState(false)
    
    const [count, setCount] = React.useState(0)
    
    const [selectedCount, setSelectedCount] = React.useState(0)
    
    function startGame(){
        setGameOn(true) 
        setIsLoading(true)
        fetch('https://opentdb.com/api.php?amount=5&category=14&type=multiple')
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                setIsLoading(false) 
                })
    }
    
    function handleAnswerSelection(isSelected){
        setSelectedCount(prev=>
        isSelected ? prev + 1 : prev - 1)
    }
    
    const questionElement = questions.map(question => (
        <Game question={question} 
        setCount={setCount}
        count={count}
        setSelection = {setSelectedCount}
        selectionCheck={selectedCount}
        handleAnswerSelection={handleAnswerSelection}
        />
    ))
    
    return(
        <main>
            {!gameOn && <MainMenu startGame={startGame}/>}
            {gameOn && isLoading && <ReactLoading className="loading" type="spin" color="#D6DBF5"/>}
            {gameOn && !isLoading && questionElement}
            {gameOn && !isLoading && (
            <CheckAnswers count={count} 
            selectionCheck={selectedCount}
            setSelectionCheck={setSelectedCount}
            setCount={setCount}
            startGame={startGame}
            />)}
        </main>
    )
}