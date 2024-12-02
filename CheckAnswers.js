import React from "react"

export default function CheckAnswers(props){
    
    const [gameOver, setGameOver] = React.useState(false)
    
    if(props.selectionCheck === 5){
       document.querySelector(".check-btn").classList.remove("disabled")  
    } 
    
    function getScore(){
        const btnElements = document.querySelectorAll(".choice-list")
        if (gameOver === true){
            setGameOver(false)
            props.setCount(0)
            props.setSelectionCheck(0)
            props.startGame()
            document.querySelector(".check-btn").classList.add("disabled") 
            document.querySelector(".score").classList.add("hidden")
            btnElements.forEach(btn => btn.classList.remove("disabled"))
        } else {
        document.querySelector(".score").classList.remove("hidden")
        btnElements.forEach(btn => btn.classList.add("disabled"))
        setGameOver(true)  
        }
    }
    
    return(
        <>
        <p className="score hidden">You scored {props.count}/5</p> 
        <button onClick={getScore} className="check-btn disabled">
        { gameOver === false ? "Check Answers" : "Play Again?"}
        </button> 
        </>
    )
}