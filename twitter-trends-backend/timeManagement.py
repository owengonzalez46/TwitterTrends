import datetime
import pytz
from flask import jsonify


def getCurrentMonthDayHourMinute(current_time):
    if current_time.minute <= 25:
        if current_time.hour == 00:
            if current_time.day == 1:
                return 4, 30, 23, 30
            else:
                return current_time.month, current_time.day - 1, 23, 30
        else:
            return current_time.month, current_time.day, current_time.hour - 1, 30
    else:
        if current_time.minute > 25 or current_time.minute < 55:
            return current_time.month, current_time.day, current_time.hour, 00
        else:
            return current_time.month, current_time.day, current_time.hour, 30


def getCurrentTime():
    current_time = datetime.datetime.now(pytz.timezone('America/Chicago'))
    monthUpdated, dayUpdated, hourUpdated, minuteUpdated = getCurrentMonthDayHourMinute(current_time)
    currentTimeString =  str(current_time.year) + '-0' + str(monthUpdated) + '-0' + str(dayUpdated) + ' ' + str(hourUpdated) + ':' + str(minuteUpdated) + ':00.000000'
    return currentTimeString


def getCurrentTimeHumanReadable():
    timeDict = {}
    current_time = datetime.datetime.now(pytz.timezone('America/Chicago'))
    monthUpdated, dayUpdated, hourUpdated, minuteUpdated = getCurrentMonthDayHourMinute(current_time)
    if minuteUpdated == 0:
	minuteUpdatedString = '00'
    else:
        minuteUpdatedString = '30'
    currentDateString = str(hourUpdated) + ':' + minuteUpdatedString + ' on ' + str(monthUpdated) + '-' + str(dayUpdated)
    timeDict['currentDateString'] = currentDateString
    return jsonify(timeDict)


def timeModified(dateTimeString):
    currentTimeString = getCurrentTime()
    currentTime = datetime.datetime.strptime(currentTimeString, '%Y-%m-%d %H:%M:%S.%f')
    dateTimeStringUpdated = dateTimeString + ':00.000000'
    timePassedIn = datetime.datetime.strptime(dateTimeStringUpdated, '%Y-%m-%d %H:%M:%S.%f')
    if currentTime < timePassedIn:
        return currentTimeString
    else:
        return dateTimeString


def getModifiedTime(time):
    temp = time.split(':')
    hour = temp[0]
    minutes = int(temp[1])
    if minutes > 30:
        minutesUpdated = '30'
    else:
        minutesUpdated = '00'
    return hour + ':' + minutesUpdated

