import React from "react";
import './style/header.css';
import {Link} from "react-router-dom";


const Header = () => {
    return (
       <nav className="navbar">
        
            <div>
                <div className="heading">
                    <Link className="title-header" to="/">
                            Harisenin Quiz
                    </Link>
                </div>     
                <ul>
                    <div className="nav-menu">
                        <Link className="a" to="/home">
                            Home
                        </Link>
                    </div>
                    <div className="nav-menu">
                        <Link className="a" to="/category">
                            Category
                        </Link>
                    </div>
                    <div className="nav-menu">
                        <Link className="a" to="/hasil">
                            Achievement
                        </Link>
                    </div>
                    <div className="nav-menu">
                        <Link className="a" to="/about">
                            About
                        </Link>
                    </div>              
                </ul>
            </div>

       </nav>
    );
}


export default Header;