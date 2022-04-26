import json
import time
import uuid
import random

from os.path import exists


def getUUID():
    firstUUID = uuid.uuid1()
    secondUUID = uuid.uuid4()
    firstRandomInt = str(random.random()).split('.')[1]
    secondRandomInt = str(random.random()).split('.')[1]
    uuidGenerated = str(firstUUID) + '-' + str(secondUUID) + '-' + firstRandomInt + '-' + secondRandomInt
    return uuidGenerated


def parseTrendPerState(stateName, dateTimeStamp, trendsDict):
    try:
        stateTopTrends = []
        filePath = 'trends/twitter_{}_trend.json'.format(stateName)
        if exists(filePath):
            stateTrendsFile = open(filePath)
            data = json.load(stateTrendsFile)
            count = 1
            for trend in data['trends']:
                if count <= 10:
                    trendUUID = getUUID()
                    newTrend = trend['name'].replace("\'", "’")
                    sqlQuery = """INSERT INTO trends VALUES ('{}', '{}', '{}', '{}', '{}');""".format(trendUUID, dateTimeStamp, stateName, count, newTrend)
                    stateTopTrends.append(sqlQuery)
                    count = count + 1
            stateTrendsFile.close()
            trendsDict[stateName] = stateTopTrends
        return trendsDict
    except Exception as e:
        raise e


def parseTrends(statesArray, dateTimeStamp, outputFile):
    start = time.time()
    try:
        trendsDict = {}
        for i in range(0, len(statesArray)):
            stateName = statesArray[i]
            trendsDict = parseTrendPerState(stateName, dateTimeStamp, trendsDict)
        end = time.time()
        outputFile.write('Total time to parse trends: ' + str(round(end - start, 5)) + ' seconds.\n')
        return trendsDict
    except Exception as e:
        outputFile.write('Error occurred in parseTrends.\n')
        raise e


def parseTweetPerState(stateName, trendName, dateTimeStamp, tweetsDict, tweetUUIDArray):
    try:
        stateTopTweets = []
        tempList = []
        filePath = 'tweets/{}_{}_tweet.json'.format(stateName, trendName)
        if exists(filePath):
            stateTweetsFile = open(filePath, encoding='utf-8')
            for jsonObj in stateTweetsFile:
                tempDict = json.loads(jsonObj)
                tempList.append(tempDict)
            count = 1
            for tweet in tempList:
                tweetUUID = getUUID()
                tweetUUIDArray.append(tweetUUID)
                newTweet = tweet['tweet'].replace("\'", "’")
                sqlQuery = """INSERT INTO tweets VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}');""".format(tweetUUID, dateTimeStamp, stateName, trendName, count, tweet['username'], newTweet, tweet['link'])
                stateTopTweets.append(sqlQuery)
                count = count + 1
            stateTweetsFile.close()
            identifier = stateName + '-' + trendName
            tweetsDict[identifier] = stateTopTweets
        return tweetsDict, tweetUUIDArray
    except Exception as e:
        raise e


def parseTweets(statesArray, trendsDict, dateTimeStamp, outputFile):
    start = time.time()
    tweetUUIDArray = []
    try:
        tweetsDict = {}
        for state in statesArray:
            for trend in trendsDict[state]:
                tweetsDict, tweetUUIDArray = parseTweetPerState(state, trend, dateTimeStamp, tweetsDict, tweetUUIDArray)
        end = time.time()
        outputFile.write('Total time to parse tweets: ' + str(round(end - start, 5)) + ' seconds.\n')
        return tweetsDict, tweetUUIDArray
    except Exception as e:
        outputFile.write('Error occurred in parseTweets.\n')
        raise e