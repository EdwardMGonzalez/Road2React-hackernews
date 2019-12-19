import React, { Component } from 'react';
//import logo from './logo.svg';
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
	constructor(props) {
		super(props);

		this.state = {
			list,
			searchTerm: '',
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.isSearched = this.isSearched.bind(this);
	}

	onDismiss(id) {
		const isNotId = item => item.objectId !== id;
		const updatedList = this.state.list.filter(isNotId);
		this.setState({ list: updatedList });
	}

	onSearchChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

	render() {
		const {searchTerm, list} = this.state;
		return (
			<div className="App">
				<form>
					<input type="text"
					onChange={this.onSearchChange}/>
				</form>
				{list.filter(this.isSearched(this.state.searchTerm)).map( item =>
				<div key={item.objectId}>
				 	<span>
						<a href={item.url}>{item.title}</a>
					</span>
					<span>{item.author}</span>
					<span>{item.num_comments}</span>
					<span>{item.points}</span>
					<span>
						<button
							onClick={() => this.onDismiss(item.objectId)}
							type="button"
						>
							Dismiss
						</button>
					</span>
				</div>
			)}
			</div>
		);
	}
}

export default App;
