import React from "react"
import Answer from "./Answer"

export default function Question(props) {
       
    const answerElements = props.answers.map((answer,i) =>
        <Answer 
            key={i} 
            id={i} 
            {...answer} 
            handleClick={() => props.select(props.id, answer.value)}
        />
    )   

    return (
        <div className="questions-div">
            <div className="question">{props.question}</div>
            <div className="answers">
                {answerElements}
            </div>
            <div className="line"></div>
        </div>
    )
}
