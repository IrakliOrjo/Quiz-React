import { AnswerObject } from "../App"

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions
}) => {

    console.log(question,'question')
  return (
    <div className="card">
        <p className="number">
            Question: {questionNr} / {totalQuestions}
        </p>
        <p className="question" dangerouslySetInnerHTML={{__html: question}}></p>
        <div className="button-div">
            {answers.map(answer => (
                <div className="" key={answer}>
                    <button 
                     className={`answer ${userAnswer?.correctAnswer === answer && userAnswer ? 'correct' : null}
                        ${userAnswer?.answer === answer && !userAnswer?.correct ? 'incorrect' : null}
                     `}
                    disabled={userAnswer ? true : false} 
                    value={answer} 
                    onClick={callback}>
                        <span  dangerouslySetInnerHTML={{__html: answer}} />
                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default QuestionCard