import React, { Component } from 'react'
import axios from 'axios'


export default class ServerStats extends Component {

  state = {
    databaseSize: [],
    tweetsCount: [],
    trendsCount: [],
    latestDate: [],
    latestTime: []
  }

  componentDidMount() {
    axios.get('https://api.twittertrends.app/database-size')
      .then(
        response => {
          const databaseSizeInfo = response.data;
          const databaseSize = databaseSizeInfo.databaseSize;
          this.setState({databaseSize});
      })
    axios.get('https://api.twittertrends.app/trends-count')
      .then(
        response => {
          const trendsCountInfo = response.data;
          const trendsCount = trendsCountInfo.trendsCount;
          this.setState({trendsCount});
      })
    axios.get('https://api.twittertrends.app/tweets-count')
      .then(
        response => {
          const tweetsCountInfo = response.data;
          const tweetsCount = tweetsCountInfo.tweetsCount;
          this.setState({tweetsCount});
      })
    axios.get('https://api.twittertrends.app/get-time')
      .then(
        response => {
          const latestTimeInfo = response.data;
          const latestDate = latestTimeInfo.currentDateString;
          const latestTime = latestTimeInfo.currentTimeString;
          this.setState({latestDate});
          this.setState({latestTime});
      })
  }

  render() {
    return(
      <div className="bg-sky-700 pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-50 sm:text-4xl">Database Statistics</h2>
            <p className="mt-3 text-xl text-gray-50 sm:mt-4">Our project's server is hosted in DigitalOcean's Droplet enviroment. See our server statisitics below.</p>
          </div>
        </div>
        <div className="mt-10 bg-white">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-sky-700"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="rounded-lg bg-white shadow-lg p-6 sm:grid sm:grid-cols-4">
                  <div className="flex flex-col border-b border-gray-100 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Size of Database</dt>
                    <dd className="order-1 text-3xl font-extrabold text-sky-500">{this.state.databaseSize}</dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Count of Trends</dt>
                    <dd className="order-1 text-3xl font-extrabold text-sky-500">{this.state.trendsCount}</dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Count of Tweets</dt>
                    <dd className="order-1 text-3xl font-extrabold text-sky-500">{this.state.tweetsCount}</dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Last Updated</dt>
                    <dd className="order-1 text-3xl font-extrabold text-sky-500">{this.state.latestDate}</dd>

                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
