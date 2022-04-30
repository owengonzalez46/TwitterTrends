import json
import geocoder
import time


def getTrendPerState(stateName, api, outputFile):
    try:
        stateGeoCode = geocoder.osm(stateName)
        closest_loc = api.closest_trends(stateGeoCode.lat, stateGeoCode.lng)
        trends = api.get_place_trends(closest_loc[0]['woeid'])
        f = open("trends/twitter_{}_trend.json".format(stateName), "w")
        f.write(json.dumps(trends[0], indent=1))
    except Exception as e:
        outputFile.write('Error occurred in getTrendPerState.\n')
        raise e


def getTrends(statesArray, api, outputFile):
    start = time.time()
    try:
        for i in range(0, len(statesArray)):
            stateName = statesArray[i]
            getTrendPerState(stateName, api, outputFile)
        end = time.time()
        outputFile.write('Total time to get trends: ' + str(round(end - start, 5)) + ' seconds.\n')
    except Exception as e:
        outputFile.write('Error occurred in getTrends.\n')
        raise e