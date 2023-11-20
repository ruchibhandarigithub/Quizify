import React,{useState} from 'react';
import { BsBookmark } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
const SortingQuestion = ({ question ,onCheckAnswer ,unFlag,flag,handleNext})=>{
    const [userOrder,setUserOrder] = useState([...question.options]);
    const [draggedItem ,setDraggedItem]= useState(null);

   const handleDragStart = (e,index)=>{
    setDraggedItem(userOrder[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain',index);

   }
   const handleDragOver=(e,index) =>{
    e.preventDefault();
    const draggedOverItem = userOrder[index];
    if(draggedItem!==setDraggedItem){
        const items = userOrder.filter(item=>item!==draggedItem);
        items.splice(index,0,draggedItem);
        setUserOrder(items);
    }
   };
   const handleDrop = (e)=>{
    e.preventDefault();
    onCheckAnswer(userOrder,question.correctOrder,question.questionType);
   }
    return (
        <div>
          {
           question.flagged===true ?   (<FaBookmark  onClick={()=>unFlag()} />)
           :  (<BsBookmark  onClick={()=>flag()} />)
        }
        <h2>{question.question}</h2>
      <ul className='sorting-list'>
        {userOrder.map((item, index) => (
          <li
            key={index}
            draggable
           
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button onClick={handleDrop}>Check Answer</button>
      </div>
           
      <button onClick={()=>handleNext()}>Next</button>  
           
    </div>
    )
};
export default SortingQuestion;