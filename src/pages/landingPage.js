import React from "react";
import axios from 'axios';
import { API_CATEGORY } from '../api/api';
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './style/landingPage.css';

const LandingPage = () => {
    const[category, setCategory] = useState([]);

    const getCategory = () => {
        axios.get(API_CATEGORY)
            .then(res => {
                setCategory(res.data);
               
            }).catch(err => {
                console.log(err);
            }
        );
    }
    useEffect(() => {
        getCategory();
    }
    , []);

    return (
        <>
            <h1>Harisenin Quiz</h1>
            <div className="box-container">
                <div className="box-header">
                    <h2 style={{ textAlign: 'center' }}>Pilih kategori yang kamu suka!</h2>
                </div>
                <hr />
                <div className="box-content">
                    
                    {/* dropdown menu */}
                    <div class="dropdown">
                    <button class="dropbtn">Mulai</button>
                    <div class="dropdown-content">
                        {
                            Object.keys(category).map((category) => (
                                <Link style={{ textDecoration: 'none' }} to={{pathname:'/home'}} state={category}>{category}</Link>
                            ))
                        }         
                    </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default LandingPage;