import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
	{
		title: 'React',
		url: 'https://reactjs.org/',
		author: 'Jordan Walke',
		num_comments: 3,
		points: 4,
		objectId: 0,
	},
	{
		title: 'Redux',
		url: 'https://redux.js.org/',
		author: 'Dan Abramov, Andrew Clark',
		num_comments: 2,
		points: 5,
		objectId: 1,
	},
];

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
