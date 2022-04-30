from flask import Flask, request
from flask_cors import CORS

import databaseManagement
import timeManagement


app = Flask(__name__)
CORS(app)

@app.route('/database-size')
def databaseSize():
    return databaseManagement.getSizeOfDatabase()


@app.route('/trends-count')
def getTrendsCount():
    return databaseManagement.getTrendsCount()


@app.route('/tweets-count')
def getTweetsCount():
    return databaseManagement.getTweetsCount()

@app.route('/get-time')
def getCurrentTimeHumanReadable():
    return timeManagement.getCurrentTimeHumanReadable()


@app.route('/current-top-trends')
def getCurrentTopTrends():
    return databaseManagement.getCurrentTopTrends()


@app.route('/top-trends')
def getTopTrends():
    date = request.args.get('date')
    time = request.args.get('time')
    timeUpdated = timeManagement.getModifiedTime(time)
    state = request.args.get('state')
    return databaseManagement.getTopTrends(date, timeUpdated, state)


@app.route('/modified-time')
def getModifiedTime():
    time = request.args.get('time')
    return timeManagement.getModifiedTime(time)


@app.route('/top-tweets')
def getTopTweets():
    date = request.args.get('date')
    time = request.args.get('time')
    timeUpdated = timeManagement.getModifiedTime(time)
    state = request.args.get('state')
    trendName = request.args.get('trendName')
    return databaseManagement.getTopTweets(date, timeUpdated, state, trendName)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)