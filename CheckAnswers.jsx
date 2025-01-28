import React from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

export default function CheckAnswers(props){
    
    // const [gameOver, setGameOver] = React.useState(false)
    const { width, height } = useWindowSize()
    
    if(props.selectionCheck === 5){
       document.querySelector(".check-btn").classList.remove("disabled")  
    } 
    
    //calculates total correct answers, enables button to retry and highlights correct answers.
    function getScore(){
        const btnElements = document.querySelectorAll(".choice-list")
        if (props.gameOver === true){
            props.setGameOver(false)
            props.setCount(0)
            props.setSelectionCheck(0)
            props.startGame()
            document.querySelector(".check-btn").classList.add("disabled") 
            document.querySelector(".score").classList.add("hidden")
            btnElements.forEach(btn => btn.classList.remove("disabled"))
        } else {
        document.querySelector(".score").classList.remove("hidden")
        btnElements.forEach(btn => btn.classList.add("disabled"))
        props.showAnswer 
        props.setGameOver(true)  
        }
    }
    
    return(
        <>
            <p className="score hidden">You scored {props.count}/5</p> 
            <button onClick={getScore} className="check-btn disabled">
            { props.gameOver === false ? "Check Answers" : "Play Again?"}
            </button>
            {props.gameOver && props.count === 5 && <Confetti width={width} height={height}/>} 
        </>
    )
}