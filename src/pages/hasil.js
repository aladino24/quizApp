import React  from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './style/hasil.css';

const Hasil = () => {
    const location = useLocation();
   console.log(location.state);
    const history = useNavigate();
    useEffect(() => {
        alert("Kerjakan Quiz dan Klik Tombol 'Finish' Untuk Melihat Hasil");
        if (!location.state) history("/");
      }, []);

    
    // console.log(data);
    // console.log(location.state);
    return !location.state ?(
        <h1>Forbidden</h1>
    ):(
        <div className="box-container">
            <h1 className="title-hasil">Quiz Answer</h1>
            <div style={{ border: '1 solid black' }} className="box-hasil">
               
                <table>
                    <tr>
                        <th>Benar</th>
                        <th>Salah</th>
                        <th>Nilai</th>
                        <th>Rank</th>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'center' }}>{location.state.score.correct}</td>
                        <td style={{ textAlign: 'center' }}>{location.state.score.false}</td>
                        <td style={{ textAlign: 'center' }}>{(location.state.score.correct*100)/location.state.kuiz.length}</td>
                        <Link
                        className="lihat-rank" 
                        to={'/rank'} 
                        state={{
                            score: (location.state.score.correct*100)/location.state.kuiz.length,
                            name: "Anda"
                        }}
                        style={{ 
                            backgroundColor: '#28a745'
                         }}>Lihat</Link>
                    </tr>
                </table>
            </div>
            {
                location.state.kuiz.map((kuiz, index) => {
                    return <div className="card-box-content">
                    <div className="card-box-header">
                        <div className="text-question" key={kuiz.id}>
                           <h4>No {index+1}.</h4> <p className="pertanyaan">{kuiz.question}</p>
                        </div>
                    </div>
                    <div className="card-box-body">
                                <div style={{
                                        height: 20,
                                        width: 20,
                                        borderRadius: 100,
                                        backgroundColor: "greenyellow" ,
                                        cursor: "pointer",
                                        marginRight: 5,
                                    }}>                          
                                </div>
                            {kuiz.correctAnswer}
                        </div>
                       {
                        kuiz.incorrectAnswers?.map((item,index) => {
                            return <div className="card-box-body">
                                <div style={{
                                        height: 20,
                                        width: 20,
                                        borderRadius: 100,
                                        backgroundColor: "red" ,
                                        cursor: "pointer",
                                        marginRight: 5,
                                    }}>                          
                                </div>
                            {item}
                        </div>
                        })
                       }
                    <div className="card-box-bahas">
                            <div className="text-question">
                                {
                                    kuiz.options ?
                                    <div 
                                      style={{ 
                                        color: kuiz.options === kuiz.correctAnswer ? 'green' : 'red',
                                       }}
                                    >
                                        {kuiz.options}
                                    </div> : "Tidak ada jawaban"
                                }
                            </div>
                    </div>
                </div>
                })
            }
        </div>
    );
}

export default Hasil;