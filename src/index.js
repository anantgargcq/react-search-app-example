import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const USER_DATA = [
  'Mariah Barajas',
  'Moses Townsend',
  'Elisha Huynh',
  'Mylie Bird',
  'Dawson Brandt',
  'Amya Best',
  'Coleman Luna',
  'Nora Kemp',
  'Geovanni Carrillo',
  'King Silva',
  'Bridget Wells',
  'Nico Savage',
  'Yasmine Silva',
  'Amiah Goodman',
  'Mila Shields',
  'Thomas Mccoy',
  'Zachary Ferguson',
  'Jennifer Alvarez',
  'Jamie Whitney',
  'Jensen Bush',
  'Savannah Coleman',
  'Eliezer Petty',
  'Deven Hendrix',
  'Hayden Weeks',
  'Jacoby Peck',
  'Jessica Duarte',
  'Ryleigh Berry',
  'Danica Olson',
  'Asher Gutierrez',
  'Henry Thompson',
  'Tiana Lowery',
  'Eve Arnold',
  'Michael Harding',
  'Marely Olsen',
  'Lillianna Duffy',
  'Giovanni Olson',
  'Kiersten Rowland',
  'Nash Rollins',
  'Ayana Quinn',
  'Jamie James',
  'Jasmin Johnson',
  'Dominique Hicks',
  'Kasey Bond',
  'Ariella Crosby',
  'Sheldon Barron',
];

class SearchApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      page: 1,
      totalPages: NaN,
      size: 10,
      data: [],
    };
  	// code here
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    const {
      page,
      size
    } = this.state;

    this.setState({
      totalPages: Math.ceil(USER_DATA.length / size)
    });

    const data = USER_DATA.slice((page - 1) * size, page * size);

    this.setState({ data });
  }

  refreshData() {
    const { 
      searchValue,
      page,
      size 
    } = this.state;

    let data = USER_DATA;
    let totalPages = Math.ceil(USER_DATA.length / size);
    if(searchValue) {
      data = USER_DATA.filter(el => el.includes(searchValue));
      totalPages = data.length ? Math.ceil(data.length / size) : 1;
    }

    data = data.slice((page - 1) * size, page * size);

    this.setState({
      data,
      totalPages,
    });
  }

  handleSearch(searchValue) {
    this.setState({ 
      page: 1,
      searchValue,
    }, this.refreshData);
  }

  handlePrev() {
    const { page } = this.state;

    this.setState({ 
      page: page - 1,
    }, this.refreshData);
  }

  handleNext() {
    const { page } = this.state;

    this.setState({ 
      page: page + 1,
    }, this.refreshData);
  }

  render() {
      return(
          <div id="search-app">
              <SearchInput onChange={this.handleSearch} />
              <DataList data={this.state.data}/>
              <div id="button-container">
                <button id="prev-button" disabled={this.state.page === 1} onClick={this.handlePrev}>Prev</button>
                <button id="next-button" disabled={this.state.page === this.state.totalPages} onClick={this.handleNext}>Next</button>
              </div>
          </div>
      )
  }
}

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value : '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    this.setState({ value: inputValue });
    this.props.onChange(inputValue);
  }

  render() {
      return(
          <div>
              <label>Search Data: </label>
              <input type="text" value={this.state.value} placeholder="search here..." onChange={this.handleChange} />
          </div>
      );
  }
}

class DataList extends React.Component {
  render() {
      return(
          <div>
              {
                this.props.data 
                ? this.props.data.map((el, index) => <p key={el + index}>{el}</p>)
                : 'No Data Available!'
              }
          </div>
      );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <SearchApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
