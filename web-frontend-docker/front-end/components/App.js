import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './NavBar';
import ServerStats from './ServerStats';
import { Footer } from './Footer';
import TweetTable from './TweetTable';
import TrendTable from './TrendTable';
import Head from 'next/head';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time: '',
      stateName: 'United States'
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleStateNameChange = this.handleStateNameChange.bind(this);
  }

  handleDateChange(newDateValue) {
    this.setState({date: newDateValue});
  }

  handleTimeChange(newTimeValue) {
    this.setState({time: newTimeValue});
  }

  handleStateNameChange(newStateNameValue) {
    this.setState({stateName: newStateNameValue});
  }

  render() {
    const date = this.state.date;
    const time = this.state.time;
    const stateName = this.state.stateName;
    
    return (

      <div className="App">
        <NavBar></NavBar>
        <TrendTable date={date} onDateChange={this.handleDateChange} time={time} onTimeChange={this.handleTimeChange} stateName={stateName} onStateNameChange={this.handleStateNameChange}></TrendTable>
        <TweetTable date={date} onDateChange={this.handleDateChange} time={time} onTimeChange={this.handleTimeChange} stateName={stateName} onStateNameChange={this.handleStateNameChange}></TweetTable>
        <ServerStats></ServerStats>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;