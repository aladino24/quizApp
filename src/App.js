import React from "react";
import { BrowserRouter as Router,Routes as Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./component/header";
import Category from "./pages/category";
import Hasil from "./pages/hasil";
import About from "./pages/about";
import Rank from "./pages/rank";
import LandingPage from "./pages/landingPage";

const App = () => {
    return (
        <Router>
            <Header />  
            <div className="container">
                <Switch>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route  path="/category" element={<Category />} />
                    <Route  path="/hasil" element={<Hasil />} />
                    <Route  path="/about" element={<About />} />
                    <Route  path="/rank" element={<Rank />} />
                </Switch>
            </div>     
        </Router>
    );
}


export default App;