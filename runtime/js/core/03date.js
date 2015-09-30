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

function timeFromYear(y) {
    return MS_PER_DAY * dayFromYear(y);
}

function yearFromTime(t) {

}

function inLeapYear(t) {

    var d = daysInYear(yearFromTime(t));

    if (d === 365)
        return 0;
    else if (d === 366)
        return 1;
}

function dayWithInYear(t) {
    return day(t) - dayFromYear(yearFromTime(t))
}

function monthFromTime(t) {

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
