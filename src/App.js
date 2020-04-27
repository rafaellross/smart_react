import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Pdf from './PDF/Pdf'
import PropTypes from 'prop-types'
import * as API from './Api'




class App extends Component {
    static propTypes = {

    }

    
        componentDidMount = () => {
            console.log(API.get(32));
          }
    

    render() {
    
        
        return (
          <div className="App">
              <Pdf />
          </div>
        );
      }
}


export default App;
