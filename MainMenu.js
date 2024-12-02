import React from 'react'

export default function MainMenu(props){
    
    return(
        <div className="bg-intro">
            <div className="menu-text">
                <h1>Quizzly</h1>
                <h2>Test your mettle in the ultimate entertainment quiz!</h2>
                <button onClick={props.startGame}>Let's Play</button>
            </div>
        </div>
    )
}