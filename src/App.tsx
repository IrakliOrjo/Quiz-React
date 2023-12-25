import { useState } from "react"
import { fetchQuizQuestions } from "./API"
import QuestionCard from "./components/QuestionCard"
import { Difficulty } from "./API"

import './index.css'

const TOTAL_QUESTIONS = 10

//types

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<any>([]);
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)


  //console.log('fetch',fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY ))
  {/*const mapped = data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    )) */}
    

  

  const startTrivia = async (level:string) => {
    setLoading(true)
    setGameOver(false)
    console.log(level, 'level')
    


    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS, Difficulty[level as keyof typeof Difficulty]
      )
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      const answer = e.currentTarget.value
      console.log(answer,'answer')
      
        //check answer against correct answer
        const correct = questions[number].correct_answer === answer
        //add score if answer is correct
   
        if(correct) {
          setScore(prev => prev + 1)
        }
        const answerObject = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer,
        }
        setUserAnswers(prev => [...prev, answerObject])
      }
  }

  const nextQuestion = () => {
    //move to next questions
    const nextQuestion = number +1

    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    }else{
      setNumber(nextQuestion)
    }
  }

  


  return (
    <div className="quiz-container">
      <h1 className="quiz-title ">Q u i z</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <div className="level">
          <h2>START GAME</h2>
          <div>
        <button className="start" onClick={() => startTrivia('EASY')}>
          Easy
        </button>
        <button className="start" onClick={() => startTrivia('MEDIUM')}>
          Normal
        </button>
        <button className="start" onClick={() => startTrivia('HARD')}>
          Hard
        </button>
        </div>
        </div>
      )}
      {!gameOver && userAnswers.length !== 10 && <p className="score">Score: {score}</p>}
      {!gameOver && userAnswers.length === 10 && <p className="final-score">Your Final Score is: {score}</p>}
      {loading && <p className="loading">Loading Questions...</p>}
     
      {!loading && !gameOver && userAnswers.length !== 10 && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      )}
    </div>
  )
}

export default App