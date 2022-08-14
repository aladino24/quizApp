import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { user as userData } from "../api/fakerUser";
import { useState } from "react";

const Rank = () => {
    const location = useLocation();
    console.log(location.state);
    const history = useNavigate();
    useEffect(() => {
        if (!location.state) history("/home");
        rankList();
    } , []);

    const id = userData.length+1;
    const myData = location.state;
    const dataSaya = [{
        id: id,
        nama: myData.name,
        select: true,
        score: myData.score}];

    const[data,setData] = useState(userData);
    

    const rankList = () => {
        setData([...data, ...dataSaya]);
    }

     data.sort((a, b) => b.score - a.score);
    
     

    return !location.state ? (
        <h1>Forbidden</h1>
    ) : (
        <table>
            <thead>
            <tr>
                <th>Nama</th>
                <th>Nilai</th>
                <th>Rank</th>
            </tr>
            </thead>
            <tbody>
        {
            data.map((data,index) => {
            
                return <tr key={index}>
                    <td style={{ backgroundColor: data.select ? 'greenyellow' : 'none' }}>{data.nama}</td>
                    <td style={{ backgroundColor: data.select ? 'greenyellow' : 'none' }}>{data.score}</td>
                    <td style={{ backgroundColor: data.select ? 'greenyellow' : 'none' }}>{index+1}</td>
                </tr>
            } )
        }
            </tbody>
        </table>
    );

}

export default Rank;