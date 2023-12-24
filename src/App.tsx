import { useEffect, useState } from "react"
import { fetchQuizQuestions } from "./API"
import QuestionCard from "./components/QuestionCard"
import { Difficulty } from "./API"

const TOTAL_QUESTIONS = 10

//types

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([]);
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
    

  

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS, Difficulty.EASY
      )
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  


  return (
    <div>
      <h1>React Quiz</h1>
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      <p className="score">Score:{}</p>
      <p className="loading">Loading Questions...</p>
      {<p>question. </p>}
      {/* <QuestionCard 
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? 'asd' : undefined}
        callback={checkAnswer}
  /> */}
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  )
}

export default App