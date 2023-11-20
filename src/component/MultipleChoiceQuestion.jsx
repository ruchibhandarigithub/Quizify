import React ,{useState} from 'react';
import { FaBookmark } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
const MultipleChoiceQuestion = ({ question,onCheckAnswer ,unFlag,flag,handleNext})=>{
  const [userAnswer,setUserAnswer] = useState([]);
  const handleInputChange = (e)=>{
    const value = e.target.value;
    setUserAnswer((prevAnswer)=>{
        if(prevAnswer.includes(value)){
            return prevAnswer.filter((ans)=> ans !== value);

        }
        else{
            return [...prevAnswer,value];
        }
    });

  }
  const handleCheck =()=>{
    onCheckAnswer(userAnswer,question.correctAnswers,question.questionType);
  };
  return (
    <div>
      {
           question.flagged===true ?   (<FaBookmark  onClick={()=>unFlag()} />)
           :  (<BsBookmark  onClick={()=>flag()} />)
           }
        <h2>{question.question}</h2>
        {
            question.options.map((option,index)=>(
                <div>
                    <input
                  
                      type="checkbox"
                      id={`option-${index}`}
                      value={option}
                      checked={userAnswer.includes(option)}
                      onChange={handleInputChange}
                      />
                      <label htmlFor={`option-${index}`}>{option}</label>
                </div>
            ))
        }
       <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button onClick={handleCheck}>Check Answer</button>
        </div>
        <button onClick={()=>handleNext()}>Next</button>
           
    </div>
  )
}
export default MultipleChoiceQuestion;