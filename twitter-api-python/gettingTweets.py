import twint
import time

from time import sleep


def getTweetsPerState(stateName, trendName, outputFile, count):
    check = 0
    while check < 1:
        try:
            config = twint.Config()
            config.Search = trendName
            config.Popular_tweets = True
            #config.Near = stateName
            config.Limit = 100
            config.Store_json = True
            config.Hide_output = True
            config.Output = "tweets/{}_{}_tweet.json".format(stateName, trendName)
            twint.run.Search(config)
            check = 1
            return count
        except Exception as e:
            if count < 2:
                count = count + 1
                outputFile.write('Twitter Connection Error. Sleeping for one minute. Count Number:' + str(count) + '\n')
                sleep(60)
            else:
                outputFile.write('Error occurred in getTweetsPerState.\n')
                raise e


def getTweets(statesArray, trendsDict, outputFile):
    start = time.time()
    count = 0
    try:
        for state in statesArray:
            for trend in trendsDict[state]:
                count = getTweetsPerState(state, trend, outputFile, count)
        end = time.time()
        outputFile.write('Total time to get tweets: ' + str(round(end - start, 5)) + ' seconds.\n')
    except Exception as e:
        outputFile.write('Error occurred in getTweets.\n')
        raise e