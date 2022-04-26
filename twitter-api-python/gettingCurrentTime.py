import datetime
import pytz


def getCurrentMinutes(current_time):
    if current_time.minute > 15 and current_time.minute < 45:
        return '30'
    else:
        return '00'


def getCurrentTime():
    current_time = datetime.datetime.now(pytz.timezone('America/Chicago'))
    minute = getCurrentMinutes(current_time)
    return str(current_time.year) + '-0' + str(current_time.month) + '-0' + str(current_time.day) + ' ' + str(current_time.hour) + ':' + minute + ':00.000000'


def getCurrentTimeFileFormat():
    current_time = datetime.datetime.now(pytz.timezone('America/Chicago'))
    minute = getCurrentMinutes(current_time)
    return str(current_time.year) + '-0' + str(current_time.month) + '-0' + str(current_time.day) + '_' + str(current_time.hour) + '-' + minute + '-00'


def getCurrentTimeOnlyDay():
    current_time = datetime.datetime.now(pytz.timezone('America/Chicago'))
    return str(current_time.year) + '-0' + str(current_time.month) + '-0' + str(current_time.day)