import psycopg2

import timeManagement
import mathManagement

from flask import jsonify


def getSizeOfDatabase():
    databaseConnection = psycopg2.connect(host='host', port='port', user='svcacct', password='password',
                                          database='test')
    databaseCurser = databaseConnection.cursor()
    sql = """SELECT pg_database_size('test');"""
    databaseCurser.execute(sql)
    databaseResults = databaseCurser.fetchall()
    databaseSize = str(databaseResults[0][0])
    databaseSize = float(databaseSize)
    databaseSize = mathManagement.convertSize(databaseSize)
    databaseConnection.close()
    return jsonify(databaseSize=databaseSize)


def getTrendsCount():
    databaseConnection = psycopg2.connect(host='host', port='port', user='svcacct', password='password',
                                          database='test')
    databaseCurser = databaseConnection.cursor()
    sql = """SELECT COUNT (*) FROM trends;"""
    databaseCurser.execute(sql)
    databaseResults = databaseCurser.fetchall()
    trendsCount = str(databaseResults[0][0])
    databaseConnection.close()
    return jsonify(trendsCount=trendsCount)


def getTweetsCount():
    databaseConnection = psycopg2.connect(host='host', port='port', user='svcacct', password='password',
                                          database='test')
    databaseCurser = databaseConnection.cursor()
    sql = """SELECT reltuples::bigint AS estimate FROM   pg_class WHERE  oid = 'public.tweets'::regclass;"""
    databaseCurser.execute(sql)
    databaseResults = databaseCurser.fetchall()
    tweetsCount = str(databaseResults[0][0])
    databaseConnection.close()
    return jsonify(tweetsCount=tweetsCount)


def getCurrentTopTrends():
    databaseConnection = psycopg2.connect(host='host', port='port', user='svcacct', password='password',
                                          database='test')
    databaseCurser = databaseConnection.cursor()
    trendsDict = {}
    stateTrends = []
    dateTimeStamp = timeManagement.getCurrentTime()
    sql = """SELECT trendname FROM trends WHERE datestamp='{}' AND state='United States' ORDER BY trendnumber;""".format(dateTimeStamp)
    databaseCurser.execute(sql)
    databaseResults = databaseCurser.fetchall()
    for trend in databaseResults:
        stateTrends.append(trend[0])
    trendsDict['CurrentTopTrends'] = stateTrends
    databaseConnection.close()
    return jsonify(trendsDict)


def getTopTrends(date, time, state):
    databaseConnection = psycopg2.connect(host='host', port='port', user='svcacct', password='password',
                                          database='test')
    databaseCurser = databaseConnection.cursor()
    trendsDict = {}
    stateTrends = []
    dateTimeStamp = date + ' ' + time
    dateTimeStampChecked = timeManagement.timeModified(dateTimeStamp)
    sql = """SELECT trendname FROM trends WHERE datestamp='{}' AND state='{}' ORDER BY trendnumber;""".format(dateTimeStampChecked, state)
    databaseCurser.execute(sql)
    databaseResults = databaseCurser.fetchall()
    for trend in databaseResults:
        stateTrends.append(trend[0])
    trendsDict['stateTopTrends'] = stateTrends
    databaseConnection.close()
    return jsonify(trendsDict)

def getTopTweets(date, time, state, trendName):
    databaseConnection = psycopg2.connect(host='host', port='port', user='svcacct', password='password',
                                          database='test')
    databaseCurser = databaseConnection.cursor()
    if 'pound123456-' in trendName:
        trendName = trendName.replace('pound123456-', '#')
    tweetsDict = {}
    tweetUsernames = []
    tweets = []
    tweetLinks = []
    dateTimeStamp = date + ' ' + time
    dateTimeStampChecked = timeManagement.timeModified(dateTimeStamp)
    sql = """SELECT username, tweet, tweetlink FROM tweets WHERE datestamp='{}' AND state='{}' AND trendname='{}' ORDER BY tweetnumber LIMIT 100;""".format(dateTimeStampChecked, state, trendName)
    databaseCurser.execute(sql)
    databaseResults = databaseCurser.fetchall()
    for tweet in databaseResults:
        tweetUsernames.append(tweet[0])
        tweets.append(tweet[1])
        tweetLinks.append(tweet[2])
    tweetsDict['stateTopTweetUsernames'] = tweetUsernames
    tweetsDict['stateTopTweets'] = tweets
    tweetsDict['stateTopTweetLinks'] = tweetLinks
    databaseConnection.close()
    return jsonify(tweetsDict)