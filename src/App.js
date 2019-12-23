import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import axios from "axios";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search_by_date";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";

class App extends Component {
  __isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: "",
      error: null
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  setSearchTopStories(result) {
    if (this.__isMounted) {
      this.setState({ result });
    }
  }

  componentDidMount() {
    this.__isMounted = true;
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: Object.assign({}, this.state.result, { hits: updatedHits })
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    axios
      .get(
        `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
      )
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { searchTerm, result, error } = this.state;
    const page = (result && result.page) || 0;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
          {error ? <p>Something went wrong.</p> : null}
          {result ? (
            <div>
              <Table
                list={result.hits}
                pattern={searchTerm}
                onDismiss={this.onDismiss}
              />
              <Button
                onClick={() => this.fetchSearchTopStories(searchTerm, page - 1)}
              >
                {result.page}
              </Button>
              {page + 1}
              <Button
                onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
              >
                {result.page + 2}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <input type="text" onChange={onChange} value={value} />
    <button type="submit">{children}</button>
  </form>
);

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.string
};

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.map(item => (
      <div key={item.objectID} className="table-row">
        <span className="title">
          <a href={item.story_url}>{item.story_title}</a>
        </span>
        <span className="author">{item.author}</span>
        <span className="num_comments">{item.num_comments}</span>
        <span className="points">{item.points}</span>
        <span className="button-inline">
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

Table.propTypes = {
  list: PropTypes.array.isRequired,
  pattern: PropTypes.string,
  onDismiss: PropTypes.func.isRequired
};

const Button = ({ onClick, className = "", children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.any
};

export default App;

export { Button, Search, Table };
