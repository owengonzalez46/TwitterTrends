import tweepy
import time

import cleaningJsonFiles
import databaseManagement
import gettingCurrentTime
import gettingTweets
import handlingOutputFiles
import jsonParser
import keys
import gettingTrends
import sendingEmails

trendsDict = []
statesArray = ['United States', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
#statesArray = ['United States']

startTotal = time.time()

dateTimeStamp = gettingCurrentTime.getCurrentTime()

outputFile = handlingOutputFiles.openOutputFile()
outputFile.write('Current Run: ' + dateTimeStamp + ' ------------------------------------\n')

uuidFile = handlingOutputFiles.openUUIDFile()

auth = tweepy.OAuthHandler(keys.consumer_key, keys.consumer_secret)
auth.set_access_token(keys.access_token, keys.access_token_secret)
api = tweepy.API(auth)

try:
    gettingTrends.getTrends(statesArray, api, outputFile)
    trendsSqlDict = jsonParser.parseTrends(statesArray, dateTimeStamp, outputFile)
    databaseManagement.insertTrendsIntoDatabase(statesArray, trendsSqlDict, outputFile)
    trendsDict = databaseManagement.getTrendsFromDatabase(statesArray, dateTimeStamp, outputFile)
    gettingTweets.getTweets(statesArray, trendsDict, outputFile)
    tweetsSqlDict, tweetUUIDArray = jsonParser.parseTweets(statesArray, trendsDict, dateTimeStamp, outputFile)
    start = time.time()
    for tweetUUID in tweetUUIDArray:
        uuidFile.write(str(tweetUUID) + '\n')
    end = time.time()
    outputFile.write('Total time to save UUIDs: '  + str(round(end - start, 5)) + ' seconds.\n')
    databaseManagement.insertTweetsIntoDatabase(statesArray, trendsDict, tweetsSqlDict, outputFile)
except Exception as e:
    outputFile.write('\nAN ERROR OCCURRED!!!! \n' + str(e) + '\n \n')
    sendingEmails.sendEmailAlerts(e, outputFile)
finally:
    cleaningJsonFiles.cleanTweetFiles(statesArray, trendsDict, outputFile)
    endTotal = time.time()
    outputFile.write('Total time for everything: ' + str(round((endTotal - startTotal)/60, 5)) + ' minutes.\n')
    uuidFile.close()
    outputFile.close()