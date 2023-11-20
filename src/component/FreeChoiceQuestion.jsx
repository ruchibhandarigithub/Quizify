import React,{useState} from 'react';
import { BsBookmark } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
const FreeChoiceQuestion = ({ question , onCheckAnswer ,unFlag, flag ,handleNext })=>{
  const [userAnswer,setUserAnswer] = useState('');
  const handleInputChange =(e)=>{
    setUserAnswer(e.target.value);
  }
  const handleCheck=()=>{
    onCheckAnswer(userAnswer,question.answer,question.questionType);
  }
  return (
    <div>
             {
           question.flagged===true ?   (<FaBookmark  onClick={()=>unFlag()} />)
           :  (<BsBookmark  onClick={()=>flag()} />)
        }
        <h2>{question.question}</h2>
        <input type="text"  className='fillups_input' value = {userAnswer} onChange={handleInputChange} />
        <br/>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button onClick={handleCheck}>Check Answer</button>
        </div>
        <button onClick={()=>handleNext()}>Next</button>
           
        
    </div>
  )
}
export default FreeChoiceQuestion;