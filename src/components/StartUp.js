import React from "react"

export default function StartUp({startQuiz}) {
    return (
        <div className="startup-div">
            <div className="header">Quizzical</div>
            <p>A Simple Quiz Game</p>
            <button onClick={startQuiz}>Start Quiz</button>
        </div>
        
    )
}
