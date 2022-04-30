import time
import psycopg2

databaseConnection = psycopg2.connect(host='localhost', port='port', user='user', password='password', database='database')
databaseCurser = databaseConnection.cursor()


def insertTrendsIntoDatabase(statesArray, trendsSqlDict, outputFile):
    try:
        start = time.time()
        for state in statesArray:
            for i in range(0, len(trendsSqlDict[state])):
                sql = trendsSqlDict[state][i]
                databaseCurser.execute(sql)
        databaseConnection.commit()
        end = time.time()
        outputFile.write('Total time to commit trends: ' + str(round(end - start, 5)) + ' seconds.\n')
    except Exception as e:
        outputFile.write('Error occurred in insertTrendsIntoDatabase.\n')
        raise e


def getTrendsFromDatabase(statesArray, dateTimeStamp, outputFile):
    trendsDict = {}
    start = time.time()
    try:
        for state in statesArray:
            stateTrends = []
            sql = """SELECT trendname FROM trends WHERE datestamp='{}' AND state='{}';""".format(dateTimeStamp, state)
            databaseCurser.execute(sql)
            databaseResults = databaseCurser.fetchall()
            for trend in databaseResults:
                stateTrends.append(trend[0])
            trendsDict[state] = stateTrends
        end = time.time()
        outputFile.write('Total time to retrieve trends: ' + str(round(end - start, 5)) + ' seconds.\n')
        return trendsDict
    except Exception as e:
        outputFile.write('Error occurred in getTrendsFromDatabase.\n')
        raise e


def insertTweetsIntoDatabase(statesArray, trendsDict, tweetsSqlDict, outputFile):
    start = time.time()
    count = 0
    try:
        for state in statesArray:
            for trend in trendsDict[state]:
                identifier = state + '-' + trend
                if identifier in tweetsSqlDict:
                    try:
                        for i in range(0, len(tweetsSqlDict[identifier])):
                            sql = tweetsSqlDict[identifier][i]
                            databaseCurser.execute(sql)
                        databaseConnection.commit()
                    except Exception as e:
                        if count < 511:
                            count = count + 1
                        else:
                            raise e
        end = time.time()
        if count < 0:
            outputFile.write('Errosr caught but ignored. Count Number: ' + str(count) + '\n')
        outputFile.write('Total time to commit tweets: ' + str(round(end - start, 5)) + ' seconds.\n')
    except Exception as e:
        outputFile.write('Error occurred in insertTweetsIntoDatabase.\n')
        raise e
