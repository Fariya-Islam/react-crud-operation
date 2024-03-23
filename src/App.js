import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {Routes, Route} from "react-router";
import FooterComponent from './components/FooterComponents';
import HeaderComponent from './components/HeaderComponent';
import ListUserComponents from './components/ListUserComponents';
import AddUserComponents from './components/AddUserComponents';
import UpdateUserComponents from './components/UpdateUserComponents';

const App = () => {
  return (
    <div>
      <Router>
        <div className="container">
            <HeaderComponent />
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<ListUserComponents/>}/>
                  <Route path="/users" element={<ListUserComponents/>}/>
                  <Route path="/add-users" element={<AddUserComponents/>}/>
                  <Route path="/update-users/:id" element={<UpdateUserComponents/>}/>
                </Routes>
              </div>
          </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
