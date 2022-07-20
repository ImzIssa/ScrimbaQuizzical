import React from 'react'
import Question from "./components/Question"
import StartUp from "./components/StartUp"
import Questions from './Qs'

export default function App() {
    const [data, setData] = React.useState(Questions)
    const [score, setScore] = React.useState(0)
    const [start, setStart] = React.useState(false)
    const [viewScore, setViewScore] = React.useState(false)
    // const [numberOfQuestions, setNumberOfQuestions] = React.useState(0)
    const [questions, setQuestions] = React.useState(createListOfQuestions(data.slice(0, data.length/2)))

    //TO-DO: generate 5 questions per page and total at the end
    // catch the out of bounds error 
    // catach the error in use effect
    //use a state for number of question viewed

    const startQuiz = () => setStart(true)

    function createListOfQuestions(questions) {
        return questions.map((question, idx)=>(
            {
                id:idx,
                question:question.question, 
                answers:setAnswers([...question.incorrect_answers, question.correct_answer]),
                correctAnswer: question.correct_answer,
                answer: ""  
            })
        )
    }

    //  React.useEffect(() => {
    //     const url = 'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple';         
    //     fetch(url).then(res => {
    //         if(!res.ok) return
    //         const type = res.headers.get('content-type') 
    //         if(type !== "application/json") 
    //             throw new TypeError('Expected Json, Received:', type )
    //         return res.json()
    //     })
    //     .then(resData => {
    //         if(resData){
    //             setData(resData.results)
    //             // setNumberOfQuestions(data.length)
    //             setQuestions(createListOfQuestions(data.slice(0, data.length/2)))
    //         }
    //     })
    //     .catch(e =>{
    //         // if (e instanceof NetworkError)
    //         //     console.log('Network Error: Check internet Connection')
    //         // else if(e instanceof TypeError)
    //         //     console.log('Something Wrong with the Server. Try Again!')
    //         // else
    //             console.error(e)
    //     })
    // }, [])

    function setAnswers(list){
        //to-do: shuffle the list
        (() => list.sort(()=> Math.random() - 0.5))()
        return list.map((answer, idx) =>(
            {   id: idx, 
                value: answer, 
                isSelected: false, 
                isCorrectAnswer: false,
                isChecked: false
            }))
    }

    function checkAnswers(){
        setQuestions(prev => prev.map(question => {
            const flip = () => question.answers.map(answer => {
                if(answer.isSelected){
                    if (answer.value === question.correctAnswer){
                        setScore(prevScore => prevScore+1)
                        return {...answer, isChecked: true, isCorrectAnswer: !answer.isCorrectAnswer}
                    } else {
                        return {...answer, isChecked:true}
                    }
                }else{
                    return answer
                }
            });
            return ({...question, answers:flip()})
        }));
        setViewScore(true)    
    }

    function selectedAnswer(id, selectedAnswer){
        setQuestions(prev => prev.map(question => {
            if (question.id === id){    
                const flip = () => question.answers.map(answer => {
                    if (answer.value === selectedAnswer || answer.isSelected){
                        return({...answer, isSelected: !answer.isSelected})
                    }else{
                        return answer
                    }
                })
                return ({...question, answer:selectedAnswer, answers:flip()})
            }else{
               return question 
            }            
        }))
    }

    function reset(){
        setViewScore(false)
        setQuestions(createListOfQuestions(data.slice(data.length/2)))
    }


    const questionElements = questions.map((question, index) =>
        <Question 
            key={index}
            question={question.question}
            id={index}
            correctAnswer={question.correctAnswer} 
            answers={question.answers}
            select={selectedAnswer} />
    )

    return (
        <>
        { !start && <StartUp startQuiz={startQuiz} /> }
        {start && 
            <>
                {questionElements}
                <div className="bottom-bar">
                    {!viewScore ? 
                        <button className="button" onClick={checkAnswers}> 
                            Check Answers
                        </button>
                        :
                        <>
                            <span className="score">You scored {score}/{data.length} correct answers</span>
                            <button className="play-again" onClick={reset}>Play Again</button>
                        </>
                    }
                </div>
            </>
        }
        </>
    )
}