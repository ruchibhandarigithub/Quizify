import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './quizzimage.jpg';
const Home = ()=>{
    const navigate = useNavigate();
    const handleNavigate = ()=>{
        navigate("/quiz");
    };
    return (
        <div className='container' >
          
            <div class="quiz-title">
               <h1>Quizify</h1>
            </div>
        
            <div className="instructions">
            <div>
             <img src={logo} />
                </div>
                <button onClick={handleNavigate}>start</button>
            </div>
       
        </div>
    )
}
export default Home;