import React, { Component } from "react";
import axios from 'axios';

export default class TweetTable extends Component{

  state = {
    trendName: this.props.trendName,
    previousStateName: this.props.previousStateName,
    submitted: this.props.submitted,
    submittedAlready: this.props.submittedAlready,
    topTweetUsers: this.props.topTweetUsers,
    topTweets: this.props.topTweets,
    topTweetLinks: this.props.topTweetLinks,
    tableKeyValue: this.props.tableKeyValue
  };

  constructor(props) {
    super(props);
    this.state = {
      trendName: '',
      previousStateName: 'United States',
      submitted: 0,
      submittedAlready: 0,
      topTweetUsers: [],
      topTweets: [],
      topTweetLinks: [],
      tableKeyValue: 0
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleStateNameChange = this.handleStateNameChange.bind(this);
    this.handleTrendNameChange = this.handleTrendNameChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDateChange(event) {
    this.props.onDateChange(event.target.value);
  }

  handleTimeChange(event) {
    this.props.onTimeChange(event.target.value);
  }

  handleStateNameChange(event) {
    this.props.onStateNameChange(event.target.value);
  }

  handleTrendNameChange(event) {
    this.setState({trendName: event.target.value});
  }

  handleNext(event){
    event.preventDefault();
    if(this.state.tableKeyValue < 90){
      const tableKeyValue = this.state.tableKeyValue + 10
      this.setState({tableKeyValue: tableKeyValue})
    }
  }

  handleBack(event){
    event.preventDefault();
    if(this.state.tableKeyValue > 0){
      const tableKeyValue = this.state.tableKeyValue - 10
      this.setState({tableKeyValue: tableKeyValue})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const submitted = this.state.submitted + 1
    this.setState({submitted: submitted})
  }

  componentDidUpdate() {
    if(this.state.submitted > this.state.submittedAlready){
      this.setState({submittedAlready: this.state.submitted})
      this.setState({previousStateName: this.props.stateName})
      this.setState({tableKeyValue: 0})
      let tempTrendName = this.state.trendName
      if(tempTrendName.includes('#')){
        tempTrendName = tempTrendName.replace('#','pound123456-')
      }
      const urlParams = 'date=' + this.props.date + '&time=' + this.props.time + '&state=' + this.props.stateName + '&trendName=' + tempTrendName
      axios.get('https://api.twittertrends.app/top-tweets?'+urlParams)
      .then(
        response => {
        const topTweetsInfo = response.data;
        const topTweetUsers =topTweetsInfo.stateTopTweetUsernames;
        const topTweets = topTweetsInfo.stateTopTweets;
        const topTweetLinks = topTweetsInfo.stateTopTweetLinks;
        this.setState({topTweetUsers});
        this.setState({topTweets});
        this.setState({topTweetLinks});
      })
    }
  }

  render () {
    const date = this.props.date;
    const time = this.props.time;
    const stateName = this.props.stateName;
    return(
      <div className="center-content">
        <div className="bg-white py-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-sky-700 sm:text-4xl">Trending Tweets - {this.state.previousStateName}</h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">These are the current popular tweets based off a selected trend.</p>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className="px-20">
          <div className="columns-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <div className="mt-1">
                    <input type="date" value={date} onChange={this.handleDateChange} name="date" id="date" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
                </div>
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                <div className="mt-1">
                    <input type="time" value={time} onChange={this.handleTimeChange} name="time" id="time" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
                </div>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <select id="location" value={stateName} onChange={this.handleStateNameChange} name="location" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option defaultValue>United States</option>
                    <option>Alabama</option>
                    <option>Alaska</option>
                    <option>Arizona</option>
                    <option>Arkansas</option>
                    <option>California</option>
                    <option>Colorado</option>
                    <option>Connecticut</option>
                    <option>Delaware</option>
                    <option>Florida</option>
                    <option>Georgia</option>
                    <option>Hawaii</option>
                    <option>Idaho</option>
                    <option>Illinois</option>
                    <option>Indiana</option>
                    <option>Iowa</option>
                    <option>Kansas</option>
                    <option>Kentucky</option>
                    <option>Louisiana</option>
                    <option>Maine</option>
                    <option>Maryland</option>
                    <option>Massachusetts</option>
                    <option>Michigan</option>
                    <option>Minnesota</option>
                    <option>Mississippi</option>
                    <option>Missouri</option>
                    <option>Montana</option>
                    <option>Nebraska</option>
                    <option>Nevada</option>
                    <option>New Hampshire</option>
                    <option>New Jersey</option>
                    <option>New Mexico</option>
                    <option>New York</option>
                    <option>North Carolina</option>
                    <option>North Dakota</option>
                    <option>Ohio</option>
                    <option>Oklahoma</option>
                    <option>Oregon</option>
                    <option>Pennsylvania</option>
                    <option>Rhode Island</option>
                    <option>South Carolina</option>
                    <option>South Dakota</option>
                    <option>Tennessee</option>
                    <option>Texas</option>
                    <option>Utah</option>
                    <option>Vermont</option>
                    <option>Virginia</option>
                    <option>Washington</option>
                    <option>West Virginia</option>
                    <option>Wisconsin</option>
                    <option>Wyoming</option>
                </select>
              </div>
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">Trend</label>
                <div className="mt-1">
                    <input type="text" value={this.state.trendName} onChange={this.handleTrendNameChange} name="text" id="text" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter Trend Name"/>
                </div>
              </div>
          </div>
          <div className="pt-5">
              <div className="flex justify-end">
              <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Search</button>
              </div>
          </div>
      </form>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="min-w-auto items-center py-10 px-12">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y align-middle divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">Tweet Rank</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Username</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Tweet</th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{this.state.tableKeyValue + 1}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{this.state.topTweetUsers[this.state.tableKeyValue]}</td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">{this.state.topTweets[this.state.tableKeyValue]}</td>
                        <td className="whitespace-normal align-middle px-3 py-4 text-sm text-gray-500">
                          <a href={this.state.topTweetLinks[this.state.tableKeyValue]} target="_blank">{this.state.topTweetLinks[this.state.tableKeyValue]}</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{this.state.tableKeyValue + 2}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{this.state.topTweetUsers[this.state.tableKeyValue + 1]}</td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">{this.state.topTweets[this.state.tableKeyValue + 1]}</td>
                        <td className="whitespace-normal align-middle px-3 py-4 text-sm text-gray-500">
                          <a href={this.state.topTweetLinks[this.state.tableKeyValue + 1]} target="_blank">{this.state.topTweetLinks[this.state.tableKeyValue + 1]}</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{this.state.tableKeyValue + 3}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{this.state.topTweetUsers[this.state.tableKeyValue + 2]}</td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">{this.state.topTweets[this.state.tableKeyValue + 2]}</td>
                        <td className="whitespace-normal align-middle px-3 py-4 text-sm text-gray-500">
                          <a href={this.state.topTweetLinks[this.state.tableKeyValue + 2]} target="_blank">{this.state.topTweetLinks[this.state.tableKeyValue + 2]}</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{this.state.tableKeyValue + 4}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{this.state.topTweetUsers[this.state.tableKeyValue + 3]}</td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">{this.state.topTweets[this.state.tableKeyValue + 3]}</td>
                        <td className="whitespace-normal align-middle px-3 py-4 text-sm text-gray-500">
                          <a href={this.state.topTweetLinks[this.state.tableKeyValue + 3]} target="_blank">{this.state.topTweetLinks[this.state.tableKeyValue + 3]}</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{this.state.tableKeyValue + 5}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{this.state.topTweetUsers[this.state.tableKeyValue + 4]}</td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">{this.state.topTweets[this.state.tableKeyValue + 4]}</td>
                        <td className="whitespace-normal align-middle px-3 py-4 text-sm text-gray-500">
                          <a href={this.state.topTweetLinks[this.state.tableKeyValue + 4]} target="_blank">{this.state.topTweetLinks[this.state.tableKeyValue + 4]}</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{this.state.tableKeyValue + 6}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{this.state.topTweetUsers[this.state.tableKeyValue + 5]}</td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">{this.state.topTweets[this.state.tableKeyValue + 5]}</td>
                        <td className="whitespace-normal align-middle px-3 py-4 text-sm text-gray-500">
                          <a href={this.state.topTweetLinks[this.state.tableKeyValue + 5]} target="_blank">{this.state.topTweetLinks[this.state.tableKeyValue + 5]}</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{this.state.tableKeyValue + 7}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{this.state.topTweetUsers[this.state.tableKeyValue + 6]}</td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">{this.state.topTweets[this.state.tableKeyValue + 6]}</td>
                        <td className="whitespace-normal align-middle px-3 py-4 text-sm text-gray-500">
                          <a href={this.state.topTweetLinks[this.state.tableKeyValue + 6]} target="_blank">{this.state.topTweetLinks[this.state.tableKeyValue + 6]}</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{this.state.tableKeyValue + 8}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{this.state.topTweetUsers[this.state.tableKeyValue + 7]}</td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">{this.state.topTweets[this.state.tableKeyValue + 7]}</td>
                        <td className="whitespace-normal align-middle px-3 py-4 text-sm text-gray-500">
                          <a href={this.state.topTweetLinks[this.state.tableKeyValue + 7]} target="_blank">{this.state.topTweetLinks[this.state.tableKeyValue + 7]}</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{this.state.tableKeyValue + 9}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{this.state.topTweetUsers[this.state.tableKeyValue + 8]}</td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">{this.state.topTweets[this.state.tableKeyValue + 8]}</td>
                        <td className="whitespace-normal align-middle px-3 py-4 text-sm text-gray-500">
                          <a href={this.state.topTweetLinks[this.state.tableKeyValue + 8]} target="_blank">{this.state.topTweetLinks[this.state.tableKeyValue + 8]}</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{this.state.tableKeyValue + 10}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{this.state.topTweetUsers[this.state.tableKeyValue + 9]}</td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">{this.state.topTweets[this.state.tableKeyValue + 9]}</td>
                        <td className="whitespace-normal align-middle px-3 py-4 text-sm text-gray-500">
                          <a href={this.state.topTweetLinks[this.state.tableKeyValue + 9]} target="_blank">{this.state.topTweetLinks[this.state.tableKeyValue + 9]}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-700">
                        Showing 
                        <span className="font-medium"> {this.state.tableKeyValue + 1} </span>
                        to 
                        <span className="font-medium"> {this.state.tableKeyValue + 10} </span>
                        of 
                        <span className="font-medium"> 100 </span>
                        results
                      </p>
                    </div>
                    <div className="flex-1 flex justify-between sm:justify-end">
                      <button type="button" onClick={this.handleBack} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </button>
                      <button type="button" onClick={this.handleNext} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}