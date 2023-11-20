import React, { useState } from 'react';
import { BsBookmark } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";

const FillInTheBlankQuestion = ({ question, onCheckAnswer, unFlag, flag, handleNext }) => {
    const [userAnswer, setUserAnswer] = useState('');

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    }

    const handleCheck = () => {
        onCheckAnswer(userAnswer, question.answer, question.questionType);
    };

    const renderQuestion = () => {
        if (typeof question.question === 'string') {
            const questionWithInput = question.question.replace('{blank}', `<input type="text" value="${userAnswer}" onChange='${handleInputChange}' className='fillups_input' onBlur='${handleInputChange}' />`);
            return (
                <div dangerouslySetInnerHTML={{ __html: questionWithInput }} />
            );
        }
        return <h2>{question.question}</h2>;
    };

    return (
        <div>
            {
                question.flagged === true ? (<FaBookmark onClick={() => unFlag()} />)
                    : (<BsBookmark onClick={() => flag()} />)
            }
            {renderQuestion()}
            <br />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleCheck}>Check Answer</button>
            </div>
            <button onClick={() => handleNext()}>Next</button>
        </div>
    );
}

export default FillInTheBlankQuestion;
