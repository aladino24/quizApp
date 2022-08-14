import axios from 'axios';
import React from 'react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_CATEGORY } from '../api/api';
import './style/category.css';


const Category = () => {

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
        <div>
            <table>
              <tr>
                <th>Question Category</th>
              </tr>
                  {
                    Object.keys(category).map((category) => (
                        <tr> 
                        <td>
                            <Link style={{ textDecoration: 'none' }} to={{pathname:'/home'}} state={category}>{category}</Link>
                        </td>
                        </tr> 
                    ))
                  }                          
             </table>
         </div>
     );
}

export default Category;