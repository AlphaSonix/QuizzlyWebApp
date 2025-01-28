import React from 'react'

export default function MainMenu({startGame, setDifficulty}){
    
    return(
        <div className="bg-intro">
            <div className="menu-text">
                <h1>Quizzly</h1>
                <h2>Test your mettle in the ultimate entertainment quiz!</h2>
                <label htmlFor="difficulty">Choose Difficulty: </label>
                <select onChange={(e)=> setDifficulty(e.target.value)} name="difficulty" id="difficulty">
                    <option value="any">Any</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button onClick={startGame}>Let's Play</button>
            </div>
        </div>
    )
}