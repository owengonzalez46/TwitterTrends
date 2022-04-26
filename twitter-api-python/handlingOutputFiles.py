from os.path import exists

import gettingCurrentTime


def openOutputFile():
    date = gettingCurrentTime.getCurrentTimeOnlyDay()
    filePath = 'logging/output_{}.json'.format(date)
    if exists(filePath):
        openIdentifier = 'a'
    else:
        openIdentifier = 'w'
    outputFile = open(filePath, openIdentifier)
    return outputFile


def openUUIDFile():
    current_time = gettingCurrentTime.getCurrentTimeFileFormat()
    filePath = 'logging/uuidFolder/output_{}.json'.format(current_time)
    return open(filePath, 'w')