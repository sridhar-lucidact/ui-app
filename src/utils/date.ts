import {
    format,
    formatDate as coreFormatDate,
    getHours,
    getMinutes,
    isValid,
    parse,
    parseISO,
} from 'date-fns';

const minTimeDay = parse('12:00 AM', 'h:mm a', new Date());

const maxTimeDay = parse('11:59 PM', 'h:mm a', new Date());

/**
 * Parse ISO string date into a valid date object
 */
export const parseISODate = (date: string) => parseISO(date);

/**
 * Check if passed date object is valid
 * @param date
 */
export const isValidDate = (date: Date) => isValid(date);

/**
 * Takes ISO date string and returns a formatted date string if valid date string is provided else null is returned
 * @param dateStr
 *
 * @param dateFormat  Date format in which date object will be formatted
 *
 * For date format
 * @see https://date-fns.org/v3.6.0/docs/format
 *
 */
export const formatISODate = (dateStr: string, dateFormat: string) => {
    const parsedDate = parseISODate(dateStr);

    return isValidDate(parsedDate) ? format(dateStr, dateFormat) : null;
};

/**
 * Create time interval options
 * @param step Number of minutes for interval
 * @default 30
 */
export const createTimeIntervalsOptsList = (step: number = 30) => {
    let start: number;
    const interval: number = step * 60000;
    start = +minTimeDay.setMilliseconds(0);
    const end: number = +maxTimeDay.setMilliseconds(0);

    let timeList: { label: string; value: Date }[] = [];
    while (end >= start) {
        timeList.push({
            label: coreFormatDate(new Date(start), 'h:mm a'),
            value: new Date(start),
        });
        start += interval;
    }

    return timeList;
};

export const getHrsAndMinsFromDate = (d: Date) => {
    return {
        hrs: getHours(d),
        minutes: getMinutes(d),
    };
};

export const formatDate = coreFormatDate;

/**
 * It takes a date and rounds it off to the nearest provided interval
 * Get rounded date to the nearest provided interval
 * @param minutes Interval in minutes for rounding off
 * @param d Date
 */
export const getRoundedDate = (minutes: number, d: Date) => {
    let ms = 1000 * 60 * minutes; // convert minutes to ms
    let roundedDate = new Date(Math.round(d.getTime() / ms) * ms);

    return roundedDate;
};
