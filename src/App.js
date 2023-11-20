
import './App.css';
import QuizApp from './pages/QuizApp';
import Data from './data/Questions.json';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
function App() {
 
  return (
   <>
   
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quiz' element={ <QuizApp quizData={Data} />} />
      </Routes>
    </BrowserRouter>
   </>
  
  );
}

export default App;
