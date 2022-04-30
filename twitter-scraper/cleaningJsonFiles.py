import os
import time

from os.path import exists


def removeTweetFile(stateName, trendName):
    filePath = "tweets/{}_{}_tweet.json".format(stateName, trendName)
    if exists(filePath):
        os.remove(filePath)


def cleanTweetFiles(statesArray, trendsDict, outputFile):
    start = time.time()
    if not len(trendsDict) == 0:
        for state in statesArray:
            for trend in trendsDict[state]:
                removeTweetFile(state, trend)
    end = time.time()
    outputFile.write('Total time to remove all tweet files: ' + str(round(end - start, 5)) + ' seconds.\n')