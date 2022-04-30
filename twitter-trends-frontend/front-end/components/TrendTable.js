import React, { Component } from "react";
import axios from 'axios';

export default class TrendTable extends Component {

    state = { 
        previousStateName: this.props.previousStateName,
        submitted: this.props.submitted,
        submittedAlready: this.props.submittedAlready,
        topTrends: this.props.topTrends
    };

    constructor(props) {
        super(props);
        this.state = {
            previousStateName: 'United States',
            submitted: 0,
            submittedAlready: 0,
            topTrends: []
        };
    
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleStateNameChange = this.handleStateNameChange.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        const submitted = this.state.submitted + 1
        this.setState({submitted: submitted})
    }

    componentDidUpdate() {
        if(this.state.submitted > this.state.submittedAlready){
            this.setState({submittedAlready: this.state.submitted})
            this.setState({previousStateName: this.props.stateName})
            const urlParams = 'date=' + this.props.date + '&time=' + this.props.time + '&state=' + this.props.stateName
            axios.get('https://api.twittertrends.app/top-trends?'+urlParams)
            .then(
                response => {
                const topTrendsInfo = response.data;
                const topTrends = topTrendsInfo.stateTopTrends;
                this.setState({topTrends});
            })
        }
    }

    componentDidMount() {
        axios.get('https://api.twittertrends.app/current-top-trends')
        .then(
            response => {
            const topTrendsInfo = response.data;
            const topTrends = topTrendsInfo.CurrentTopTrends;
            this.setState({topTrends});
        })
    }

    render () {
        const date = this.props.date;
        const time = this.props.time;
        const stateName = this.props.stateName;
        return(
            <div>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center"/>
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="bg-white py-4">
                                <div className="max-w-4xl mx-auto text-center">
                                    <h2 className="text-3xl font-extrabold text-sky-700 sm:text-4xl">Twitter Trends - {this.state.previousStateName}</h2>
                                </div>
                            </div>
                            <form onSubmit={this.handleSubmit} className="px-20">
                                <div className="columns-3">
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
                                </div>
                                <div className="pt-5">
                                    <div className="flex justify-end">
                                    <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Search</button>
                                    </div>
                                </div>
                            </form>
                            <div className="bg-white">
                                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                                <p className="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">These are the trending topics.</p>
                                    <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8 center-content">
                                        <div className="col-span-1 flex justify-center py-8 px-8 bg-sky-700 rounded-lg shadow-lg">
                                            <p className="whitespace-nowrap px-3 py-4 text-lg md:text-xl text-white font-black">1 - {this.state.topTrends[0]}</p>
                                        </div>
                                        <div className="col-span-1 flex justify-center py-8 px-8 bg-sky-700 rounded-lg shadow-lg">
                                            <p className="whitespace-nowrap px-3 py-4 text-lg md:text-xl text-white font-black">2 - {this.state.topTrends[1]}</p>
                                        </div>
                                        <div className="col-span-1 flex justify-center py-8 px-8 bg-sky-700 rounded-lg shadow-lg">
                                            <p className="whitespace-nowrap px-3 py-4 text-lg md:text-xl text-white font-black">3 - {this.state.topTrends[2]}</p>
                                        </div>
                                        <div className="col-span-1 flex justify-center py-8 px-8 bg-sky-700 rounded-lg shadow-lg">
                                            <p className="whitespace-nowrap px-3 py-4 text-lg md:text-xl text-white font-black">4 - {this.state.topTrends[3]}</p>
                                        </div>
                                        <div className="col-span-1 flex justify-center py-8 px-8 bg-sky-700 rounded-lg shadow-lg">
                                            <p className="whitespace-nowrap px-3 py-4 text-lg md:text-xl text-white font-black">5 - {this.state.topTrends[4]}</p>
                                        </div>
                                        <div className="col-span-1 flex justify-center py-8 px-8 bg-sky-700 rounded-lg shadow-lg">
                                            <p className="whitespace-nowrap px-3 py-4 text-lg md:text-xl text-white font-black">6 - {this.state.topTrends[5]}</p>
                                        </div>
                                        <div className="col-span-1 flex justify-center py-8 px-8 bg-sky-700 rounded-lg shadow-lg">
                                            <p className="whitespace-nowrap px-3 py-4 text-lg md:text-xl text-white font-black">7 - {this.state.topTrends[6]}</p>
                                        </div>
                                        <div className="col-span-1 flex justify-center py-8 px-8 bg-sky-700 rounded-lg shadow-lg">
                                            <p className="whitespace-nowrap px-3 py-4 text-lg md:text-xl text-white font-black">8 - {this.state.topTrends[7]}</p>
                                        </div>
                                        <div className="col-span-1 flex justify-center py-8 px-8 bg-sky-700 rounded-lg shadow-lg">
                                            <p className="whitespace-nowrap px-3 py-4 text-lg md:text-xl text-white font-black">9 - {this.state.topTrends[8]}</p>
                                        </div>
                                        <div className="col-span-1 flex justify-center md:col-start-2 py-8 px-8 bg-sky-700 rounded-lg shadow-lg">
                                            <p className="whitespace-nowrap px-3 py-4 text-lg md:text-xl text-white font-black">10 - {this.state.topTrends[9]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}