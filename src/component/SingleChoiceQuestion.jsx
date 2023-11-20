import React,{useState} from 'react';
import { BsBookmark } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
const SingleChoiceQuestion =({ question,onCheckAnswer ,unFlag,flag,handleNext}) =>{
    const [userAnswer,setUserAnswer] = useState('');
    const handleInputChange = (e)=>{
        setUserAnswer(e.target.value);
    }
    const handleCheck = () =>{
        onCheckAnswer(userAnswer,question.correctAnswer,question.questionType);
    }
    return (
        <div>
             {
           question.flagged===true ?   (<FaBookmark  onClick={()=>unFlag()} />)
           :  (<BsBookmark  onClick={()=>flag()} />)
        }
            <h2>{question.question}</h2>
            {question.options.map((option, index) => (
                <div key={index}>
                <input
                    type="radio"
                    id={`option-${index}`}
                    name="single-choice-answer"
                    value={option}
                    checked={userAnswer === option}
                    onChange={handleInputChange}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
                </div>
            ))}
           <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button onClick={handleCheck}>Check Answer</button>
            </div>
            <button onClick={()=>handleNext()}>Next</button>
        </div>
    )
}
export default SingleChoiceQuestion;