import React, { Component } from 'react'
import './App.css';
//import * as API from './Api'
import { Link, Route } from 'react-router-dom'
import  Home from './Scenes/Home'
import Jobs from './Scenes/Jobs';
import NavBar from './Components/NavBar';
import 'typeface-roboto';


class App extends Component {
  
    state = {
      scenes: [
        {
          description: "Home",
          path: "/",
          component: Home
        }
      ]
    }

    componentDidMount = () => {
        //console.log(API.get(32));
      }
    

    render() {
    
        
        return (
          <div className="App">
            <NavBar/>            
            <Route exact path="/" component={Home}/>                        
            <Route exact path="/jobs" component={Jobs}/>                        
          </div>
        );
      }
}


export default App;
