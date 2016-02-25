/**
 * Created by rai on 08/02/16.
 */

var timeScale = 6;
const refreshRate = 100;
const secondsScale = timeScale / 1000;

var running;
var timerRunning;
var timerStarted = false;
var stopwatchStarted = false;
var stopwatchRunning;

var stopwatchFunction;

//var secondsTickIncrease = getTickAngle(secondsScale);//get angle in degrees for each second tick
//var minutesTickIncrease = 6;    //get angle in degrees for each minute tick
//var hoursTickIncrease = 6 * 5;  //get angle in degrees for each hour tick

running = true;
timerRunning = false;
stopwatchRunning = false;
var alarmRunning = false;
var alarmStarted = false;

//get current date and time
var mainDate = new Date();
//get timer for timer
var baseTime = new Date();
baseTime.setTime(0);
var timer = new Date(baseTime);
var stopwatch = new Date(0);
var alarmClock = new Date(0);

function getTickSeconds(date) {
    return ((360 / 60) * getMilliseconds(date)) / 1000 + 180;
}
function getTickMinutes(date) {
    return ((360 / 60) * date.getMinutes()) + 180
}

function getTickHours(date) {
    return ((360 / 12) * formatTime(date.getHours())) + 180;
}

function getTickAngle(metric) {
    return metric * refreshRate;
}

function formatTime(h24) {
    return h24 % 12;
}

function getMilliseconds(date) {
    var m = date.getMilliseconds();
    var s = date.getSeconds();
    return s * 1000 + m;
}
function toggleTime() {
    running = !running;
}

self.addEventListener("message", function (e) {

    var data = e.data;

    switch (data) {

        case "Work bitch":
            running = true;
            updateTime();
            running = true;


            running = true;
            runTime();
            break;
        case "start0"://normal time
            running = true;
            break;
        case "stop0":
            running = false;
            break;
        case "start2":
            if (timer.getTime() != 0) {
                self.postMessage("timerStart:" + (timer.getTime() - baseTime.getTime()));
            }

            if (timerStarted) {//need this to reset timer function after running one already
                timerRunning = !timerRunning;
            }
            else if (timer.getTime() != 0) {
                timerStarted = true;
                timerRunning = true;
                runTimer();
            }
            break;

        case "start3":
            if (stopwatchStarted) {
                stopwatchRunning = !stopwatchRunning;
            }
            else {
                stopwatchStarted = true;
                stopwatchRunning = true;
                runStopwatch();
            }
            ;
            break;

        case "stop2":
            timerRunning = false;
            break;
        case "start4":
            console.log("running alarm");
            if (alarmStarted) {
                alarmRunning = !alarmRunning;
            }
            else {
                alarmStarted = true;
                alarmRunning = true;
                runAlarm();
            }
            ;


            break;
        case "stop4":
            alarmRunning = false;
            break;
        case "main button":
            break;
        case "left button: 0 1":
            mainDate.setSeconds(mainDate.getSeconds() - 1);
            updateTime();
            break;

        case "right button: 0 1":
            mainDate.setSeconds(mainDate.getSeconds() + 1);
            updateTime();
            break;
        case "left button: 0 2":
            mainDate.setMinutes(mainDate.getMinutes() - 1);
            updateTime();
            break;

        case "right button: 0 2":
            mainDate.setMinutes(mainDate.getMinutes() + 1);
            updateTime();
            break;
        case "left button: 0 3":
            mainDate.setHours(mainDate.getHours() - 1);
            updateTime();
            break;

        case "right button: 0 3":
            mainDate.setHours(mainDate.getHours() + 1);
            updateTime();
            break;
        case "left button: 1 1":
            mainDate.setDate(mainDate.getDate() - 1);
            updateTime();
            break;

        case "right button: 1 1":
            mainDate.setDate(mainDate.getDate() + 1);
            updateTime();
            break;
        case "left button: 1 2":
            mainDate.setMonth(mainDate.getMonth() - 1);
            updateTime();
            break;

        case "right button: 1 2":
            mainDate.setMonth(mainDate.getMonth() + 1);
            updateTime();
            break;
        case "left button: 1 3":
            mainDate.setFullYear(mainDate.getFullYear() - 1);
            updateTime();
            break;

        case "right button: 1 3":
            mainDate.setFullYear(mainDate.getFullYear() + 1);
            updateTime();
            break;
        case "left button: 2 0":
            timerRunning = false;
            timer.setTime(0);
            updateTimer();
            self.postMessage("resetView: asdf");
            break;
        case "left button: 2 1":
            if (timer.getTime() / 1000 > baseTime.getTime() / 1000) {
                timer.setSeconds(timer.getSeconds() - 1);
                updateTimer();
            }
            break;
        case "right button: 2 1":
            if (timer.getTime() / 1000 - baseTime.getTime() / 1000 < 86400 - 1) {
                timer.setSeconds(timer.getSeconds() + 1);
                updateTimer();
            }
            break;
        case "left button: 2 2":
            if ((timer.getMinutes() > baseTime.getMinutes()) ||
                timer.getHours() > baseTime.getHours()) {
                timer.setMinutes(timer.getMinutes() - 1);
                updateTimer();
            }
            break;
        case "right button: 2 2":
            if (timer.getTime() / (1000 * 60) - baseTime.getTime() / (1000 * 60) < 1440 - 1) {
                timer.setMinutes(timer.getMinutes() + 1);
                updateTimer();
            }
            break;
        case "left button: 2 3":
            if (timer.getHours() > baseTime.getHours()) {
                timer.setHours(timer.getHours() - 1);
                updateTimer();
            }
            break;
        case "right button: 2 3":
            if (timer.getHours() - baseTime.getHours() < 23) {
                timer.setHours(timer.getHours() + 1);
                updateTimer();
            }
            break;
        case "left button: 3 0":
            stopwatchRunning = false;
            stopwatch = new Date(0);
            updateStopwatch();
            stopStopwatch();
            break;
        case "right button: 3 0":
            updateLaptime();
            break;
        case "left button: 3 1":
            stopwatchRunning = false;
            stopwatch = new Date(0);
            updateStopwatch();
            stopStopwatch();
            break;
        case "right button: 3 1":
            updateLaptime();
            break;
        case "left button: 3 2":
            stopwatchRunning = false;
            stopwatch = new Date(0);
            updateStopwatch();
            stopStopwatch();
            break;
        case "right button: 3 2":
            updateLaptime();
            break;
        case "left button: 3 3":
            stopwatchRunning = false;
            stopwatch = new Date(0);
            updateStopwatch();
            stopStopwatch();
            break;
        case "right button: 3 3":
            updateLaptime();
            break;
        case "left button: 4 1":
            alarmClock.setSeconds(alarmClock.getSeconds() - 1);
            updateAlarm();
            break;
        case "right button: 4 1":
            alarmClock.setSeconds(alarmClock.getSeconds() + 1);
            updateAlarm();
            break;
        case "left button: 4 2":
            alarmClock.setMinutes(alarmClock.getMinutes() - 1);
            updateAlarm();
            break;

        case "right button: 4 2":
            alarmClock.setMinutes(alarmClock.getMinutes() + 1);
            updateAlarm();
            break;
        case "left button: 4 3":
            alarmClock.setHours(alarmClock.getHours() - 1);
            updateAlarm();
            break;

        case "right button: 4 3":
            alarmClock.setHours(alarmClock.getHours() + 1);
            updateAlarm();
            break;
    }
});

function updateTime() {
    self.postMessage("seconds:" + mainDate.getSeconds());
    self.postMessage("secondsTick:" + getTickSeconds(mainDate));
    self.postMessage("minutes:" + mainDate.getMinutes());
    self.postMessage("minutesTick:" + getTickMinutes(mainDate));
    self.postMessage("hours:" + mainDate.getHours());
    self.postMessage("hoursTick:" + getTickHours(mainDate));
    self.postMessage("day:" + mainDate.getDay());
    self.postMessage("date:" + mainDate.getDate());
    self.postMessage("month:" + mainDate.getMonth());
    self.postMessage("year:" + mainDate.getFullYear());
}

function updateTimer() {
    self.postMessage("timer:" + (timer.getTime() - baseTime.getTime()));
}

function animateTimer() {
    self.postMessage("animateTimer:" + (timer.getTime() - baseTime.getTime()));
}

function updateStopwatch() {
    self.postMessage("stopwatchTime: " + stopwatch.getTime());
}

function updateLaptime() {
    self.postMessage("lapTime: " + stopwatch.getTime());
    self.postMessage("lapUpdate:" + "aasdf");
}

function stopStopwatch() {
    clearTimeout(stopwatchFunction);
    stopwatchRunning = false;
    stopwatchStarted = false;
    self.postMessage("stopStopwatch:" + "asdfasdf");

}

function updateAlarm() {
    self.postMessage("alarmSeconds:" + alarmClock.getSeconds());
    self.postMessage("alarmMinutes:" + alarmClock.getMinutes());
    self.postMessage("alarmHours:" + alarmClock.getHours());
}

function runTimer() {
    if (timerRunning) {
        if (timer.getTime() / 1000 - baseTime.getTime() / 1000 > 0) {
            timer.setSeconds(timer.getSeconds() - 1);
            updateTimer();

            if (timer.getTime() / 1000 - baseTime.getTime() / 1000 > 0) {
                timer.setSeconds(timer.getSeconds() - 1);
                animateTimer();
                timer.setSeconds(timer.getSeconds() + 1);
            }
        }

        if (Math.floor(timer.getTime() / 1000 - baseTime.getTime() / 1000) === 0) {
            timerRunning = false;
            timerStarted = false;
            self.postMessage("play: timer");
            return;
        }
    }

    setTimeout(function () {

        runTimer();
    }, 1000)
}

function runStopwatch() {
    if (stopwatchRunning) {
        stopwatch.setMilliseconds(stopwatch.getMilliseconds() + 10);
        updateStopwatch();
    }
    stopwatchFunction = setTimeout(function () {
        runStopwatch();
    }, 10)
}

function runAlarm() {
    if (alarmRunning) {
        if (alarmClock.getHours() - mainDate.getHours() === 0 &&
            alarmClock.getMinutes() - mainDate.getMinutes() === 0 &&
            alarmClock.getSeconds() - mainDate.getSeconds() === 0) {
            alarmRunning = false;
            alarmStarted = false;
            self.postMessage("play: timer");
            return;
        }
    }
    setTimeout(function () {
        runAlarm();
    }, 1000)
}

function runTime() {
    if (running) {
        mainDate.setMilliseconds(mainDate.getMilliseconds() + refreshRate);
        updateTime();
    }
    setTimeout(function () {
        runTime()
    }, refreshRate);
}