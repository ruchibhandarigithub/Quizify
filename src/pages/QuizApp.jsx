import React,{ useState , useEffect } from 'react';
import FreeChoiceQuestion from '../component/FreeChoiceQuestion'; // Import your FreeChoiceQuestion component
import FillInTheBlankQuestion from '../component/FillInTheBlankQuestion'; // Import your FillInTheBlankQuestion component
import SingleChoiceQuestion from '../component/SingleChoiceQuestion'; // Import your SingleChoiceQuestion component
import MultipleChoiceQuestion from '../component/MultipleChoiceQuestion'; // Import your MultipleChoiceQuestion component
import SortingQuestion from '../component/SortingQuestion'; // Imp
import { render } from '@testing-library/react';
import Finish from '../component/Finish';
import { useNavigate } from 'react-router-dom';

const QuizApp = ({ quizData })=>{
    const [currentQuestionIndex,setCurrentQuestionIndex]= useState(0);
    const [flaggedQuestions, setFlaggedQuestions] = useState([]);
    const navigate = useNavigate();
    const [color,setColor]=useState('green');
   const [feedback,setFeedback]= useState('');
    const [quiz,setQuiz] = useState([
        ...quizData.quizData
    ])
    const currentQuestion = quiz[0];
    console.log(quiz);
    useEffect(()=>{
       quiz.forEach((question)=>{
            const flaggedStatus = localStorage.getItem(`flagged_${question.questionId}`);
            if(flaggedStatus !== null){
                question.flagged = JSON.parse(flaggedStatus);
            }
            
           
        })
    },[quizData]);
    
    
    const renderQuestion = ()=>{
        const currentQuestion = quiz[currentQuestionIndex];
        console.log(currentQuestionIndex);
        if (currentQuestion) {
            switch (currentQuestion.questionType) {
              case 'Free Choice':
                return (
                  <FreeChoiceQuestion
                    question={currentQuestion}
                    onCheckAnswer={onCheckAnswer}
                    unFlag={unFlag}
                    flag={flag}
                    handleNext={handleNext}
                  />
                );
              case 'Fillups':
                return (
                  <FillInTheBlankQuestion
                    question={currentQuestion}
                    onCheckAnswer={onCheckAnswer}
                    unFlag={unFlag}
                    flag={flag}
                    handleNext={handleNext}
                  />
                );
              case 'Sorting':
                return (
                  <SortingQuestion
                    question={currentQuestion}
                    onCheckAnswer={onCheckAnswer}
                    unFlag={unFlag}
                    flag={flag}
                    handleNext={handleNext}
                  />
                );
              case 'Single Choice':
                return (
                  <SingleChoiceQuestion
                    question={currentQuestion}
                    onCheckAnswer={onCheckAnswer}
                    unFlag={unFlag}
                    flag={flag}
                      handleNext={handleNext}
                  />
                );
              case 'Multiple Choice':
                return (
                  <MultipleChoiceQuestion
                    question={currentQuestion}
                    onCheckAnswer={onCheckAnswer}
                    unFlag={unFlag}
                    flag={flag}

                    handleNext={handleNext}
                  />
                );
              default:
                return <Finish />;
            }
          } else {
            return <Finish />;
          }
    }
    const onCheckAnswer = (userAnswer,correctAnswer,type)=>{
        console.log(1);
        console.log(type);
        switch (type) {
            case 'Free Choice':
                   checkFreeChoiceAnswer(userAnswer,correctAnswer);
                   break;
            case 'Fillups':
                  checkFillInTheBlankAnswer(userAnswer,correctAnswer);
                  break;
               
            case 'Sorting':
                  checkSortingAnswer(userAnswer,correctAnswer);
                  break;
            case 'Single Choice':
                  checkSingleChoiceAnswer(userAnswer,correctAnswer);
                  break;
            case 'Multiple Choice':
                  checkMultipleChoiceAnswer(userAnswer,correctAnswer);
                  break;
            default:
              return null;
          }
    }
    const handleNext = ()=>{
        setFeedback('');
        setCurrentQuestionIndex(currentQuestionIndex+1);
        render();
    }
    const flag = () => {
        const currentQuestion = quiz[currentQuestionIndex];
      
        if (currentQuestion) {
          currentQuestion.flagged = !currentQuestion.flagged;
          localStorage.setItem(
            `flagged_${currentQuestion.questionId}`,
            currentQuestion.flagged.toString()
          );
          setQuiz([...quiz]);
        } else {
          console.error('Current question is undefined');
        }
    };
   
    
   
    
    
    
    const loadFlaggedQuestions = () => {
        const flaggedQuestions = quiz.filter((question) => question.flagged);
         console.log(flaggedQuestions)
        setQuiz([...flaggedQuestions]);
      
        if (flaggedQuestions.length > 0) {
          setCurrentQuestionIndex(quiz.indexOf(flaggedQuestions[0])); // Reset to the first flagged question
        } else {
          alert('No flagged questions.');
        }
      };
      
      
      const checkFreeChoiceAnswer = (userAnswer, correctAnswer) => {
        console.log(1);
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
          setFeedback('Hurry !! Correct Answer 🥳');
          setColor('green');
          // Perform actions related to correct answer here
        } else {
            setFeedback('Oops !! wrong Answer ☹️');
            setColor('red');
          // Perform actions related to incorrect answer here
        }
      };
      
      const checkFillInTheBlankAnswer = (userAnswer, correctAnswer) => {
        console.log(1);
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            setFeedback('Hurry !! Correct Answer 🥳');
            setColor('green');
         
          // Perform actions related to correct answer here
        } else {
            setFeedback('Oops !! wrong Answer ☹️');
            setColor('red');
        }
      };
      
      const checkSortingAnswer = (userOrder, correctOrder) => {
        if (arraysEqual(userOrder, correctOrder)) {
            setFeedback('Hurry !! Correct Answer 🥳');
            setColor('green');
         
          // Perform actions related to correct answer here
        } else {
            setFeedback('Oops !! wrong Answer ☹️');
            setColor('red');
          // Perform actions related to incorrect answer here
        }
      };
      
      const checkSingleChoiceAnswer = (userAnswer, correctAnswer) => {
        if (userAnswer && userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            setFeedback('Hurry !! Correct Answer 🥳');
            setColor('green');
          // Perform actions related to correct answer here
        } else {

            setFeedback('Oops !! wrong Answer ☹️');
            setColor('red');
          // Perform actions related to incorrect answer here
        }
      };
      
      const checkMultipleChoiceAnswer = (userAnswers, correctAnswers) => {
        if (arraysEqual(userAnswers, correctAnswers)) {
            setFeedback('Hurry !! Correct Answer 🥳');
            setColor('green');
        } else {
            setFeedback('Oops !! wrong Answer ☹️');
            setColor('red');
          
        }
      };
      const arraysEqual = (arr1, arr2) => {
        return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
      };
      const unFlag = () => {
        const currentQuestion = quiz[currentQuestionIndex];
    
        if (currentQuestion) {
          currentQuestion.flagged = false;
          localStorage.setItem(
            `flagged_${currentQuestion.questionId}`,
            'false'
          );
          setFlaggedQuestions(quiz.filter((question) => question.flagged));
          setQuiz([...quiz]);
        } else {
          console.error('Current question is undefined');
        }
      };
      const handleExit = ()=>{
        navigate('/')
      }
    return (
        <> 
         <div class="quiz-title">
               <h1>Quizify</h1>
          </div>
       <div style={{display:'flex',justifyContent:'space-between',margin:'40px',}}>
       <button onClick={handleExit}>Exit</button>
       <button onClick={loadFlaggedQuestions}>Flagged Questions</button>
        </div>
      <div className="container">
       
        {renderQuestion()}
        <div>
       
        
       
        {feedback && <p style={{color:color,border:`1px solid ${color}` }}>{feedback}</p>}
        </div>
      </div>
    </>
        
      );
     
}
export default QuizApp;