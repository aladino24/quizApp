import React  from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { API_QUESTION } from "../api/api";
import './style/home.css';
import { useTimer } from "react-timer-hook";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const location = useLocation();
    console.log(location.state);
     const history = useNavigate();
     useEffect(() => {
         if (!location.state) history("/");
       }, []);
   

    const [currentindex, setCurrentindex] = useState(0);
    const [quiz, setQuiz] = useState([]);
    const [score, setScore] = useState({
        correct: 0,
        false: 0,
      });
    const [timer, setTimer] = useState(true);
   

    const MINUTES = 2*90;
    const time = new Date();
    time.setSeconds(time.getSeconds() + MINUTES);

    const { seconds, minutes, hours } = useTimer({
      expiryTimestamp: time,
      onExpire: () => {
        setTimer(false);
        setCurrentindex(quiz.length - 1)
        alert("Waktu Habis!!");
    },
    });
    
   let { category, correctAnswer, difficulty,id, incorrectAnswers,question } = quiz[currentindex] || {};

    

    
    //menggabungkan array
    let jawabSalah = incorrectAnswers || [];
    let jawabBenar = correctAnswer || [];
    let options = [...jawabSalah,jawabBenar];


 
    

    // const shuffledOptions = options.sort(() => Math.random() - 0.5);
    // console.log("ini pilihan acak : " + shuffledOptions);
  
    const getQuiz = () => {
        axios.get(API_QUESTION + '?categories=' + location.state + '&limit=10')
            .then(res => {
                setQuiz(res.data);
                // setPertanyaan(res.data[currentindex].question);
                // console.log(res.data);
                
            }).catch(err => {
                console.log(err);
            }
        );
    }

    const checkScore = () => {
        const questionAnswer = quiz.filter(item => item.selected);
        const questionCorrect = quiz.filter(item => item.options === item.correctAnswer);
         const scoreCorrect = questionCorrect.length;
         console.log("ini skornya : " + scoreCorrect);
         setScore({
            correct: scoreCorrect,
            false: quiz.length - scoreCorrect,
         });
    }

    useEffect(() => {
        getQuiz();
        // checkScore();
    }
    , []);
    
   

    const selectOption = (indexSelected,indexOptionSelected,option) => {
        setQuiz(
            quiz.map((item, index) =>
              index === indexSelected
                ? {
                    ...item,
                    selected: true,
                    options: option,
                    choice:options
                  }
                : item
            )
          );
          
      };
    
      

    const nextQuestion = () => {
        if(quiz.length - 1 === currentindex) return;
        setCurrentindex(currentindex + 1);
    }

    // const previousQuestion = () => {
    //     if(currentindex === 0) return;
    //     setCurrentindex(currentindex - 1);
    // }

    //  console.log(quiz);
    //  console.log("Ini currentindex: " + currentindex);
    //  console.log("length: " + (quiz.length-2));
    //end fetch data from api axios
    // console.log(quiz)
    return (
        <>
            
            <h1 className="quiz-title">Quiz Screen - Timer: {hours}:
        {minutes}:{seconds}</h1>
            <div className="card-container">
                
                    
                    {
                        quiz.map((quiz,index) => (
                            <div className="kotak-quiz" key={quiz.id}
                               style={{cursor: 'pointer', 
                                backgroundColor: index === currentindex ? '#007bff' : quiz?.selected ? 'green' : '#f5f5f5',
                             }}
                            //  onClick={() => {
                            //     if(index != currentindex){
                            //         return;
                            //     }
                            //     setCurrentindex(index);
                            //  }}
                             
                            >
                                <h4 className="number-quiz" >
                                   {index+1}
                               
                                </h4>
                           </div>
                        ))
                    }
    
            </div>
          
                    <div className="card-option">
                    <div className="card-option-title">
                        
                        <h3>{currentindex+1}. {question}</h3>
                    </div>

                    {
        options.map((option, index) => (          
                <div className="name-option-title" key={index} >
                        <div  
                            
                            style={{
                            height: 20,
                            width: 20,
                            borderRadius: 100,
                            cursor: "pointer",
                            backgroundColor: option === quiz[currentindex]?.options ? 'green' : '#757677',
                            marginRight: 5,
                            }}
                        onClick={() => {
                           if(timer === true){
                            selectOption(currentindex,index, option);
                           }
                        }}
                        >  
                        </div>
                      {option}
                      {/* {console.log(index?.selected)} */}
                    </div>
                    
                ))
            }                       
            </div> 
            <div
              className="button-container"
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 20,
               }}
            >
                {/* <button className="button-prev" 
                onClick={() => previousQuestion()} 
                disabled={currentindex === 0 ? true : false}
                style={{ backgroundColor: currentindex === 0 ? '#798088' : '#007bff' }}
                >
                    Previous
                </button> */}
                {
                    quiz.length-1  === currentindex ? (
                        <Link className="btn-finish" style={{ 
                            backgroundColor: '#28a745'
                         }}
                         to={{ pathname: "/hasil"}}
                         state={{kuiz:quiz ,score: score }}
                         >    
                                Finish                  
                        </Link>
                    ) : (
                        <button className="btn-next"
                        onClick={() => {
                            //mengacak array
                            checkScore();
                            nextQuestion();
                        }}
                        style={{ backgroundColor: '#007bff' }}
                        >
                            Next
                        </button>
                    )
                }
            </div> 
        </>
    );

    
   
   
    
    
}

export default Home;