import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        const helloWorld = 'Hey, Welcome to the Road to learn React';
        return (
            <div className="App">
             <h2>{helloWorld}</h2>
            </div>
        );
    }
}

export default App;
