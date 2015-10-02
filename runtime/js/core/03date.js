// Copyright (c) 2015 Tzvetan Mikov.
// Licensed under the Apache License v2.0. See LICENSE in the project
// root for complete license information.

/* global hidden */

Date = function Date(year, month, date, hours, minutes, seconds, ms)
{

};

// private functions and consts
// @todo where should we put them?

var MS_PER_DAY = 86400000;
var MS_PER_HOUR = 3600000;
var MS_PER_MIN = 60000;
var MS_PER_SEC = 1000;

function day(t)
{
    if (isNaN(t))
        return NaN;

    return Math.floor(t / MS_PER_DAY)
}

function timeWithinDay(t)
{
    if (isNaN(t))
        return NaN;

    return t % MS_PER_DAY;
}

function daysInYear(y)
{
    if (isNaN(y))
        return NaN;

    var m4 = y % 4;
    var m100 = y % 100;
    var m400 = y % 400;

    if (m4 !== 0 || (m100 === 0 && m400 !== 0))
        return 365;
    else if (m400 === 0 || (0 === m4 && 0 !== m100))
        return 366;
}

function dayFromYear(y)
{
    if (isNaN(y))
        return NaN;

    return 365 * (y - 1970) + Math.floor((y - 1969) / 4) - Math.floor((y - 1901) / 100) + Math.floor((y - 1601) / 400)
}

function timeFromYear(y)
{
    return MS_PER_DAY * dayFromYear(y);
}

// http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.3
function yearFromTime(t)
{
    if (isNaN(t))
        return NaN;

    var y = Math.floor(t / 366 / MS_PER_DAY) + 1970;

    while (timeFromYear(y) <= t) {
        y++;
    }

    return y - 1;
}

function inLeapYear(t)
{
    var d = daysInYear(yearFromTime(t));

    if (d === 365)
        return 0;
    else if (d === 366)
        return 1;
}

function dayWithInYear(t)
{
    return day(t) - dayFromYear(yearFromTime(t))
}

function monthFromTime(t)
{
    if (isNaN(t))
        return NaN;

    var d = dayWithInYear(t);
    var l = inLeapYear(t);

    switch(true) {
        case 0 <= d && d < 31:
            return 0;
        case 31 <= d && d < 59 + l:
            return 1;
        case 59 + l <= d && d < 90 + l:
            return 2;
        case 90 + l <= d && d < 120 + l:
            return 3;
        case 120 + l <= d && d < 151 + l:
            return 4;
        case 151 + l <= d && d < 181 + l:
            return 5;
        case 181 + l <= d && d < 212 + l:
            return 6;
        case 212 + l <= d && d < 243 + l:
            return 7;
        case 243 + l <= d && d < 273 + l:
            return 8;
        case 273 + l <= d && d < 304 + l:
            return 9;
        case 304 + l <= d && d < 334 + l:
            return 10;
        case 334 + l <= d && d < 365 + l:
            return 11;
    }

}

function dateFromTime(t)
{
    if (isNaN(t))
        return NaN;

    var d = dayWithInYear(t);
    var m = monthFromTime(t);
    var l = inLeapYear(t);

    switch(m) {
        case 0:
            return d + 1;
        case 1:
            return d - 30;
        case 2:
            return d - 58 - l;
        case 3:
            return d - 89 - l;
        case 4:
            return d - 119 - l;
        case 5:
            return d - 150 - l;
        case 6:
            return d - 180 - l;
        case 7:
            return d - 211 - l;
        case 8:
            return d - 242 - l;
        case 9:
            return d - 272 - l;
        case 10:
            return d - 303 - l;
        case 11:
            return d - 333 - l;
    }
}

function weekDay(t)
{
    return (day(t) + 4) % 7;
}

// http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.7
function localTZA()
{

}

// http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.8
function daylightSavingTA()
{

}

function hourFromTime(t)
{
    return Math.floor(t / MS_PER_HOUR) % 24;
}

function minFromTime(t)
{
    return Math.floor(t / MS_PER_MIN) % 60;
}

function secFromTime(t)
{
    return Math.floor(t / MS_PER_SEC) % 60;
}

function msFromTime(t)
{
    return t % MS_PER_SEC;
}

// http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.11
// @todo Use `ToInteger` according to the specs.
function makeTime(hour, min, sec, ms)
{
    var h = parseInt(hour, 10);
    var m = parseInt(min, 10);
    var s = parseInt(sec, 10);
    var milli = parseInt(ms, 10);

    if (isNaN(h) || isNaN(m) || isNaN(s) || isNaN(milli))
        return NaN;

    var t = h * MS_PER_HOUR + m * MS_PER_MIN + s * MS_PER_SEC + milli;
    return t;
}

function makeDay(year, month, date)
{
    var y = parseInt(year, 10);
    var m = parseInt(month, 10);
    var dt = parseInt(date, 10);

    if (isNaN(y) || isNaN(m) || isNaN(dt))
        return NaN;

    var ym = y + Math.floor(m / 12);
    var mn = m % 12;
    var md = (mn === 1 ? 28 : 30) * mn;

    var t = ((ym - 1970) * 365 + md + dt) * MS_PER_DAY;

    while(yearFromTime(t) <= ym && monthFromTime(t) <= mn && dateFromTime(t) <= 1)
    {
        t += MS_PER_DAY;
    }

    t -= MS_PER_DAY;

    if (yearFromTime(t) === ym && monthFromTime(t) === mn && dateFromTime(t) === 1)
        return day(t) + dt - 1;
    else
        return NaN;
}

function makeDate(day, time)
{
    var d = parseInt(day, 10);
    var m = parseInt(time, 10);

    if (isNaN(d) || isNaN(m))
        return NaN;

    return d * MS_PER_DAY + m;
}

// static functions

hidden(Date, "UTC", function date_utc(x)
{

});


hidden(Date, "parse", function date_parse(x)
{

});


hidden(Date, "now", function date_now(x)
{

});



hidden(Date.prototype, "constructor", function date_constructor(x)
{

});


hidden(Date.prototype, "toString", function date_tostring(x)
{

});


hidden(Date.prototype, "toDateString", function date_todatestring(x)
{

});


hidden(Date.prototype, "toTimeString", function date_totimestring(x)
{

});


hidden(Date.prototype, "toLocaleString", function date_tolocalestring(x)
{

});


hidden(Date.prototype, "toLocaleDateString", function date_tolocaledatestring(x)
{

});


hidden(Date.prototype, "toLocaleTimeString", function date_tolocaletimestring(x)
{

});


hidden(Date.prototype, "valueOf", function date_valueof(x)
{

});


hidden(Date.prototype, "getTime", function date_gettime(x)
{

});


hidden(Date.prototype, "getFullYear", function date_getfullyear(x)
{

});


hidden(Date.prototype, "getUTCFullYear", function date_getutcfullyear(x)
{

});


hidden(Date.prototype, "getMonth", function date_getmonth(x)
{

});


hidden(Date.prototype, "getUTCMonth", function date_getutcmonth(x)
{

});


hidden(Date.prototype, "getDate", function date_getdate(x)
{

});


hidden(Date.prototype, "getUTCDate", function date_getutcdate(x)
{

});


hidden(Date.prototype, "getDay", function date_getday(x)
{

});


hidden(Date.prototype, "getUTCDay", function date_getutcday(x)
{

});


hidden(Date.prototype, "getHours", function date_gethours(x)
{

});


hidden(Date.prototype, "getUTCHours", function date_getutchours(x)
{

});


hidden(Date.prototype, "getMinutes", function date_getminutes(x)
{

});


hidden(Date.prototype, "getUTCMinutes", function date_getutcminutes(x)
{

});


hidden(Date.prototype, "getSeconds", function date_getseconds(x)
{

});


hidden(Date.prototype, "getUTCSeconds", function date_getutcseconds(x)
{

});


hidden(Date.prototype, "getMilliseconds", function date_getmilliseconds(x)
{

});


hidden(Date.prototype, "getUTCMilliseconds", function date_getutcmilliseconds(x)
{

});


hidden(Date.prototype, "getTimezoneOffset", function date_gettimezoneoffset(x)
{

});


hidden(Date.prototype, "setTime", function date_settime(x)
{

});


hidden(Date.prototype, "setMilliseconds", function date_setmilliseconds(x)
{

});


hidden(Date.prototype, "setUTCMilliseconds", function date_setutcmilliseconds(x)
{

});


hidden(Date.prototype, "setSeconds", function date_setseconds(x)
{

});


hidden(Date.prototype, "setUTCSeconds", function date_setutcseconds(x)
{

});


hidden(Date.prototype, "setMinutes", function date_setminutes(x)
{

});


hidden(Date.prototype, "setUTCMinutes", function date_setutcminutes(x)
{

});


hidden(Date.prototype, "setHours", function date_sethours(x)
{

});


hidden(Date.prototype, "setUTCHours", function date_setutchours(x)
{

});


hidden(Date.prototype, "setDate", function date_setdate(x)
{

});


hidden(Date.prototype, "setUTCDate", function date_setutcdate(x)
{

});


hidden(Date.prototype, "setMonth", function date_setmonth(x)
{

});


hidden(Date.prototype, "setUTCMonth", function date_setutcmonth(x)
{

});


hidden(Date.prototype, "setFullYear", function date_setfullyear(x)
{

});


hidden(Date.prototype, "setUTCFullYear", function date_setutcfullyear(x)
{

});


hidden(Date.prototype, "toGMTString", function date_togmtstring(x)
{

});


hidden(Date.prototype, "toUTCString", function date_toutcstring(x)
{

});


hidden(Date.prototype, "getYear", function date_getyear(x)
{

});


hidden(Date.prototype, "setYear", function date_setyear(x)
{

});


hidden(Date.prototype, "toISOString", function date_toisostring(x)
{

});


hidden(Date.prototype, "toJSON", function date_tojson(x)
{

});
