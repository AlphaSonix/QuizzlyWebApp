import React from "react"
import ReactLoading from "react-loading"

import MainMenu from "./MainMenu"
import Game from "./Game"
import CheckAnswers from "./CheckAnswers"

export default function App(){
    
    const [questions, setQuestions] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [gameOn, setGameOn] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [selectedCount, setSelectedCount] = React.useState(0)
    const [showAnswer, setShowAnswer] = React.useState(null)
    const [difficulty, setDifficulty] = React.useState("any")
    const [gameOver, setGameOver] = React.useState(false)
    
    const difficultyParam = difficulty !== "any" ? `&difficulty=${difficulty}` : ""
    
    async function startGame(){
        try{
            setGameOn(true) 
            setIsLoading(true)
            const res = await fetch(`https://opentdb.com/api.php?amount=5&category=14&type=multiple${difficultyParam}`)
            if (!res.ok){
                throw new Error(`HTTP error! Status: ${res.status}`)
            }   
            const data = await res.json()
            setQuestions(data.results)
        } catch (err) {
            console.error(`Failed to fetch questions:`, err)
        } finally {
            setIsLoading(false)
        }
    }
    
    const questionElement = questions.map(question => (
        <Game question={question} 
        setCount={setCount}
        count={count}
        setSelection = {setSelectedCount}
        selectionCheck={selectedCount}
        handleAnswerSelection={(isSelected)=> setSelectedCount(prev => isSelected && prev + 1)}
        setShowAnswer={setShowAnswer}
        gameOver={gameOver}
        />
    ))
    
    return(
        <main>
            {!gameOn && <MainMenu startGame={startGame} setDifficulty={setDifficulty}/>}
            {gameOn && isLoading && <ReactLoading className="loading" type="spin" color="#D6DBF5"/>}
            {gameOn && !isLoading && questionElement}
            {gameOn && !isLoading && (
            <CheckAnswers count={count} 
            selectionCheck={selectedCount}
            setSelectionCheck={setSelectedCount}
            setCount={setCount}
            startGame={startGame}
            showAnswer={showAnswer}
            gameOver={gameOver}
            setGameOver={setGameOver}
            />)}
        </main>
    )
}