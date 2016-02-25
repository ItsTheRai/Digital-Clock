var worker;
var view;
var timeFlicker, timerFlicker, dateFlicker, alarmFlicker;
var switchNumber;
const numberOfOptions = 5;
var hrs, mins, secs;
var timerHrs, timerMins, timerSecs;
var timerInitTime;
var stopMilis, stopSecs, stopMins, stopHours;
var alarmHrs, alarmMins, alarmSecs;
var day, date, month, year;
var my_arc;
var sound = new Audio('media/nokia.mp3');

const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURS", "FRIDAY", "SATURDAY"];
const lapCounterSize = 4;
var hours, minutes, seconds;
var  setTimerDisplay, setStopwatchDisplay, setAlarmDisplay;
var dayDisplay, dateDisplay, monthDisplay, yearDisplay;
var timerSecondsDisplay, timerMinutesDisplay, timerHoursDisplay;
var stopwatchMillisDisplay, stopwatchSecondsDisplay, stopwatchMinutesDisplay, stopwatchHoursDisplay;
var alarmHoursDisplay, alarmMinutesDisplay, alarmSecondsDisplay;
var paper, watch, watch_side, image;
var lapCounter = 0;
var lapCnt = 1;
var lapArray = [];
var lapLabels = [];
var lapTimer1 = new Date(0);
var lapTimer2 = new Date(0);

var flickerStarted = false;
var flickering = true;
var flickerOn = true;

var x_position = 202.5;
var y_position = 270;
var radius = 80;

var hourDisplay, minutesDisplay, secondsDisplay;

var offset = 0;
var xOffset=150;
var yOffset=30;

onload = function () {
    view = 0; //init default view
    switchNumber = 0;   //init default control number
    //draw the watch
    paper = Raphael("canvas", 1200, 1000);

    watch = paper.image('media/sony_watch.png', xOffset+78, yOffset+25, 250, 500);   //read watch image
    watch_side = paper.image('media/watch_side.svg', xOffset+378, yOffset+25, "50%", "50%");

    var sideMain = paper.image("media/side_main_button2.svg",xOffset+406,yOffset+220,40,100);
    sideMain.click(function(){
        button0Function();
    })
    var sideTop = paper.image("media/side_switch_button.svg",xOffset+406,yOffset+335,40,40);
    sideTop.click(function () {
        button1Function();
    });
    var sideBotton = paper.image("media/side_switch_button.svg",xOffset+406,yOffset+165,40,40);
    sideBotton.click(function () {
        button2Function();
    });

    var button = paper.image("media/main_button.svg",xOffset+67,yOffset+240,10,75);
    button.click(function () {
        buttonFunction();
    });

    var button0 = paper.image("media/main_button2.svg",xOffset+326,yOffset+220,10,100);
    button0.click(function () {
        button0Function();
    });

    var button1 = paper.image("media/switch_button.svg",xOffset+326,yOffset+335,9,40);
    button1.click(function () {
        button1Function();
    });

    var button2 = paper.image("media/switch_button.png",xOffset+326,yOffset+165,9,40);
    button2.click(function () {
        button2Function();
    });
    image = paper.image('media/face1.svg', xOffset+100, yOffset+150, 200, 200); //read custom watch face
    //start drawing the watch hands
    //hours hand
    //add text
    var text1 = paper.text(xOffset+10,yOffset+30);
    text1.attr({"font-family": "digital-7regular"});
    text1.attr({fill: "gray"});
    text1.attr({"font-size": 20});
    text1.attr({text:"Switch between \n all views"});
    var line1 = paper.path( "M150,100 L210,300" );
    line1.attr("stroke", "#D7D7D7");
    line1.attr("stroke-width", "3");
    line1.attr("opacity", 0.5);
    line1.translate(0.5, 0.5);

    var text2 = paper.text(xOffset+900,yOffset+50);
    text2.attr({"font-family": "digital-7regular"});
    text2.attr({fill: "gray"});
    text2.attr({"font-size": 20});
    text2.attr({text:"Increase time. \n In stopwatch view, \n takes lap time\n (may not work in Firefox).\n " +
    "To use, first the middle \n button has to be pressed"});
    var line2 = paper.path( "M920,50 L500,210" );
    line2.attr("stroke", "#D7D7D7");
    line2.attr("stroke-width", "3");
    line2.attr("opacity", 0.5);
    line2.translate(0.5, 0.5);
    var line3 = paper.path( "M920,50 L600,220" );
    line3.attr("stroke", "#D7D7D7");
    line3.attr("stroke-width", "3");
    line3.attr("opacity", 0.5);
    line3.translate(0.5, 0.5);

    var text3 = paper.text(xOffset+900,yOffset+530);
    text3.attr({"font-family": "digital-7regular"});
    text3.attr({fill: "gray"});
    text3.attr({"font-size": 20});
    text3.attr({text:"Decrease time. \n In stopwatch view, \n stops and resets the timer.\n " +
    "To use, first the middle \n button has to be pressed"});
    var line4 = paper.path( "M920,580 L500,390" );
    line4.attr("stroke", "#D7D7D7");
    line4.attr("stroke-width", "3");
    line4.attr("opacity", 0.5);
    line4.translate(0.5, 0.5);
    var line5 = paper.path( "M920,580 L600,390" );
    line5.attr("stroke", "#D7D7D7");
    line5.attr("stroke-width", "3");
    line5.attr("opacity", 0.5);
    line5.translate(0.5, 0.5);

    var text4 = paper.text(xOffset+650,yOffset+280);
    text4.attr({"font-family": "digital-7regular"});
    text4.attr({fill: "gray"});
    text4.attr({"font-size": 20});
    text4.attr({text:"Switch between setting \n seconds/minutes/hours. \n " +
    "In stopwatch view, \n starts/stops timer.\n " +
    "The appropriate part will flicker\n  when in use. \n The 3rd press will activate the \n " +
    "time/timer/stopwatch/alarm"});
    var line6 = paper.path( "M670,280 L500,310" );
    line6.attr("stroke", "#D7D7D7");
    line6.attr("stroke-width", "3");
    line6.attr("opacity", 0.5);
    line6.translate(0.5, 0.5);
    var line7 = paper.path( "M670,280 L600,320" );
    line7.attr("stroke", "#D7D7D7");
    line7.attr("stroke-width", "3");
    line7.attr("opacity", 0.5);
    line7.translate(0.5, 0.5);

    hours = paper.rect(xOffset+200, yOffset+250, 5, 60);
    hours.attr({fill: "white"});
    //minutes hand
    minutes = paper.rect(xOffset+200, yOffset+250, 3, 75);
    minutes.attr({fill: "blue"});
    //seconds hand
    seconds = paper.rect(xOffset+200, yOffset+250, 2, 90);
    seconds.attr({fill: "red"});

    hourDisplay = paper.text(xOffset+140, yOffset+370)
    hourDisplay.attr({fill: "white"});
    hourDisplay.attr({"font-size": 45});
    hourDisplay.attr({"font-family": "digital-7regular"});
    hourDisplay.attr({text: ""})

    minutesDisplay = paper.text(xOffset+200, yOffset+370)
    minutesDisplay.attr({fill: "white"});
    minutesDisplay.attr({"font-size": 45});
    minutesDisplay.attr({"font-family": "digital-7regular"});
    minutesDisplay.attr({text: ""})

    secondsDisplay = paper.text(xOffset+260, yOffset+370)
    secondsDisplay.attr({fill: "white"});
    secondsDisplay.attr({"font-size": 45});
    secondsDisplay.attr({"font-family": "digital-7regular"});
    secondsDisplay.attr({text: ""})

    //view 2 text
    dayDisplay = paper.text(xOffset+200, yOffset+230);
    dayDisplay.attr({fill: "white"});
    dayDisplay.attr({"font-size": 35});
    dayDisplay.attr({"font-family": "digital-7regular"});
    dayDisplay.attr({text: ""});

    dateDisplay = paper.text(xOffset+140, yOffset+270)
    dateDisplay.attr({fill: "white"});
    dateDisplay.attr({"font-size": 35});
    dateDisplay.attr({"font-family": "digital-7regular"});
    dateDisplay.attr({text: "cc"})

    monthDisplay = paper.text(xOffset+180, yOffset+270)
    monthDisplay.attr({fill: "white"});
    monthDisplay.attr({"font-size": 35});
    monthDisplay.attr({"font-family": "digital-7regular"});
    monthDisplay.attr({text: "cc"})

    yearDisplay = paper.text(xOffset+240, yOffset+270)
    yearDisplay.attr({fill: "white"});
    yearDisplay.attr({"font-size": 35});
    yearDisplay.attr({"font-family": "digital-7regular"});
    yearDisplay.attr({text: "cc"})


    setTimerDisplay = paper.text(xOffset+200, yOffset+240)
    setTimerDisplay.attr({fill: "white"});
    setTimerDisplay.attr({"font-size": 15});
    setTimerDisplay.attr({"font-family": "digital-7regular"});
    setTimerDisplay.attr({text: "Set timer"});

    timerSecs = "00";
    timerMins = "00";
    timerHrs = "00";

    timerSecondsDisplay = paper.text(xOffset+250, yOffset+270)
    timerSecondsDisplay.attr({fill: "white"});
    timerSecondsDisplay.attr({"font-size": 35});
    timerSecondsDisplay.attr({"font-family": "digital-7regular"});
    timerSecondsDisplay.attr({text: timerSecs});

    timerMinutesDisplay = paper.text(xOffset+205, yOffset+270)
    timerMinutesDisplay.attr({fill: "white"});
    timerMinutesDisplay.attr({"font-size": 35});
    timerMinutesDisplay.attr({"font-family": "digital-7regular"});
    timerMinutesDisplay.attr({text: timerMins});

    timerHoursDisplay = paper.text(xOffset+160, yOffset+270)
    timerHoursDisplay.attr({fill: "white"});
    timerHoursDisplay.attr({"font-size": 35});
    timerHoursDisplay.attr({"font-family": "digital-7regular"});
    timerHoursDisplay.attr({text: timerHrs});

    setStopwatchDisplay = paper.text(xOffset+200, yOffset+170)
    setStopwatchDisplay.attr({fill: "white"});
    setStopwatchDisplay.attr({"font-size": 15});
    setStopwatchDisplay.attr({"font-family": "digital-7regular"});
    setStopwatchDisplay.attr({text: "Stopwatch"});

    //make a stopwatch display
    stopMilis = "000";
    stopSecs = "00";
    stopMins = "00"
    stopHours = "00";

    stopwatchMillisDisplay = paper.text(xOffset+270, yOffset+200);
    stopwatchMillisDisplay.attr({fill: "white"});
    stopwatchMillisDisplay.attr({"font-size": 30});
    stopwatchMillisDisplay.attr({"font-family": "digital-7regular"});

    stopwatchSecondsDisplay = paper.text(xOffset+220, yOffset+200);
    stopwatchSecondsDisplay.attr({fill: "white"});
    stopwatchSecondsDisplay.attr({"font-size": 30});
    stopwatchSecondsDisplay.attr({"font-family": "digital-7regular"});

    stopwatchMinutesDisplay = paper.text(xOffset+175, yOffset+200);
    stopwatchMinutesDisplay.attr({fill: "white"});
    stopwatchMinutesDisplay.attr({"font-size": 30});
    stopwatchMinutesDisplay.attr({"font-family": "digital-7regular"});

    stopwatchHoursDisplay = paper.text(xOffset+130, yOffset+200);
    stopwatchHoursDisplay.attr({fill: "white"});
    stopwatchHoursDisplay.attr({"font-size": 30});
    stopwatchHoursDisplay.attr({"font-family": "digital-7regular"});

    updateStopwatch();
    stopSecs = "00";
    stopMins = "00"
    stopHours = "00";

    alarmSecondsDisplay = paper.text(xOffset+250, yOffset+200);
    alarmSecondsDisplay.attr({fill: "white"});
    alarmSecondsDisplay.attr({"font-size": 40});
    alarmSecondsDisplay.attr({"font-family": "digital-7regular"});

    alarmMinutesDisplay = paper.text(xOffset+200, yOffset+200);
    alarmMinutesDisplay.attr({fill: "white"});
    alarmMinutesDisplay.attr({"font-size": 40});
    alarmMinutesDisplay.attr({"font-family": "digital-7regular"});

    alarmHoursDisplay = paper.text(xOffset+150, yOffset+200);
    alarmHoursDisplay.attr({fill: "white"});
    alarmHoursDisplay.attr({"font-size": 40});
    alarmHoursDisplay.attr({"font-family": "digital-7regular"});

    setAlarmDisplay = paper.text(xOffset+200, yOffset+170);
    setAlarmDisplay.attr({fill: "white"});
    setAlarmDisplay.attr({"font-size": 15});
    setAlarmDisplay.attr({"font-family": "digital-7regular"});
    setAlarmDisplay.attr({text: "Set Alarm"});

    worker = new Worker("watch_model.js");

    //add event listener
    worker.addEventListener("message", function (e) {
    }, false);

    //display updates from worker thread
    worker.onmessage = function (e) {
        var data = e.data;
        data = data.split(":");

        var time = data[0].trim();
        var message = data[1].trim();

        if (time == "secondsTick") {
            var secondsIncrease = data[1].trim();
            seconds.animate({transform: ['r', secondsIncrease, xOffset+200, yOffset+250]});
        }
        else if (time == "minutesTick") {
            var minutesIncrease = data[1].trim();
            minutes.animate({transform: ['r', minutesIncrease, xOffset+200, yOffset+250]});
        }
        else if (time == "hoursTick") {
            var hoursIncrease = data[1].trim();
            hours.animate({transform: ['r', hoursIncrease, xOffset+200, yOffset+250]});
        }

        else if (time == "seconds") {
            secs = checkTime(parseInt(message));
            secondsDisplay.attr({text: secs});
        }
        else if (time == "minutes") {
            mins = checkTime(message);
            minutesDisplay.attr({text: mins});
        }
        else if (time == "hours") {
            hrs = checkTime(message);
            hourDisplay.attr({text: hrs});
        }
        else if (time == "day") {
            day = days[message];
            dayDisplay.attr({text: day});
        }
        else if (time == "date") {
            date = checkTime(message);
            dateDisplay.attr({text: date});
        }
        else if (time == "month") {
            parseFloat(message);
            message++;
            month = checkTime(message);
            monthDisplay.attr({text: month});
        }
        else if (time == "year") {
            year = message;
            yearDisplay.attr({text: year});
            //dateDisplay.attr({text: day + "\n" + date + "/" + month + "/" + year});
        }
        else if (time == "animateTimer") {
            var increment = ((timerInitTime - message) / (timerInitTime / 1000)) / (10.0)
            my_arc.animate({
                arc: [xOffset+x_position, yOffset+y_position, increment, 100, radius]
            }, 1000)
        }
        else if (time == "timer") {

            timerSecs = checkTime(Math.floor(message / 1000) % 60);
            timerMins = checkTime(Math.floor(message / (1000 * 60)) % 60);
            timerHrs = checkTime(Math.floor(message / (1000 * 60 * 60)) % 24);
            timerSecondsDisplay.attr({text: timerSecs});
            timerMinutesDisplay.attr({text: timerMins});
            timerHoursDisplay.attr({text: timerHrs});
    }
        else if (time == "timerStart") {
            timerInitTime = message;    //reset total time
        }
        else if (time == "play") {
            sound.play();
            sound.curentTime = 0;
        }
        else if (time == "stopwatchTime") {
            stopMilis = checkTime(Math.floor(message) % 1000);
            if (stopMilis < 100) {
                stopMilis = "0" + stopSecs;
            }
            stopSecs = checkTime(Math.floor(message / 1000) % 60);
            stopMins = checkTime(Math.floor(message / (1000 * 60)) % 60);
            stopHours = checkTime(Math.floor(message / (1000 * 60 * 60)) % 24);
            updateStopwatch();
        }
        else if (time == "lapTime") {

            var lapMilis = checkTime(Math.floor(message) % 1000);
            if (lapMilis < 100) {
                lapMilis = "0" + stopSecs;
            }
            lapTimer1.setMilliseconds(lapMilis);
            lapTimer1.setSeconds(checkTime(Math.floor(message / 1000) % 60));
            lapTimer1.setMinutes(checkTime(Math.floor(message / (1000 * 60)) % 60));
            lapTimer1.setHours(checkTime(Math.floor(message / (1000 * 60 * 60)) % 24));
        }
        else if (time == "lapUpdate") {
            if (lapTimer1.getTime() > lapTimer2.getTime()) {
                lapTimer2.setTime(lapTimer1.getTime());
                if (lapCounter < lapCounterSize) {

                    lapLabels[lapCounter] = paper.text(xOffset+200, yOffset+250 + offset - 20);
                    lapLabels[lapCounter].attr({fill: "white"});
                    lapLabels[lapCounter].attr({"font-size": 12});
                    lapLabels[lapCounter].attr({"font-family": "digital-7regular"});
                    lapLabels[lapCounter].attr({text: "Lap " + (lapCnt) + ":"});


                    lapArray[lapCounter] = paper.text(xOffset+200, yOffset+250 + offset);
                    lapArray[lapCounter].attr({fill: "white"});
                    lapArray[lapCounter].attr({"font-size": 22});
                    lapArray[lapCounter++].attr({"font-family": "digital-7regular"});
                    offset = offset + 40;
                }
                for (i = lapCounter - 1; i > 0; i--) {
                    //shuffle down labels
                    lapArray[i].attr({text: (lapArray[i - 1].attr("text"))});
                    lapLabels[i].attr({text: (lapLabels[i - 1].attr("text"))});
                }
                var sss = checkTime(lapTimer2.getMilliseconds());
                if (sss < 100) {
                    sss = "0" + sss;
                }
                lapArray[0].attr({
                    text: checkTime(lapTimer2.getHours())
                    + ":" + checkTime(lapTimer2.getMinutes())
                    + ":" + checkTime(lapTimer2.getSeconds())
                    + ":" + sss
                });
                lapLabels[0].attr({
                    text: "Lap " + (lapCnt++) + ":"
                });
            }
        }
        else if (time == "stopStopwatch") {
            stopHours = "00";
            stopMins = "00"
            stopSecs = "00";
            stopMilis = "000";
            updateStopwatch();
            for (i = 0; i < lapCounter; i++) {
                lapArray[i].remove();
                lapLabels[i].remove();
            }
            offset = 0;
            lapCounter = 0;
            lapCnt = 1;
            lapTimer1 = new Date(0);
            lapTimer2 = new Date(0);
        }
        else if (time == "alarmSeconds") {
            alarmSecs = checkTime(message);
            alarmSecondsDisplay.attr({text: alarmSecs});
            }
        else if (time == "alarmMinutes") {
            alarmMins = checkTime(message);
            alarmMinutesDisplay.attr({text: alarmMins});
            }
        else if (time == "alarmHours") {
            alarmHrs = checkTime(message);
            alarmHoursDisplay.attr({text: alarmHrs});
            }
        else if (time == "resetView") {
            hideAll();
            resetArc();
            var fn = window["showView" + view];
            fn();
        }

    }
    ;
    worker.postMessage("Work bitch");


    paper.customAttributes.arc = function (xloc, yloc, value, total, R) {
        var alpha = 360 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = xloc + R * Math.cos(a),
            y = yloc - R * Math.sin(a),
            path;
        if (total == value) {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
            ];
        } else {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, +(alpha > 180), 1, x, y]
            ];
        }
        return {
            path: path
        };
    };

    function angleToPercent(angle) {
        return angle / 3.6;
    }

    backgroundCircle = paper.circle(xOffset+x_position, yOffset+y_position, radius);
    backgroundCircle.attr({
        "stroke": "white",
        "stroke-width": 3
    })
    //make an arc at 50,50 with a radius of 30 that grows from 0 to 40 of 100 with a bounce
    my_arc = paper.path().attr({
        "stroke": "blue",
        "stroke-width": 5,
        //'fill-opacity': 0,
        arc: [xOffset+x_position,   //start x
            yOffset+y_position,     //start y
            0,     //start path completed in percent
            100,    //no idea what this does but keeping at 100 seems to work fine
            radius]       //30 is readius of arc
    });
    hideAll();
    showView0();

    worker.postMessage("right button: 2 1");
    worker.postMessage("left button: 2 1");
    worker.postMessage("right button: 3 1");
    worker.postMessage("left button: 3 1");
    worker.postMessage("right button: 4 1");
    worker.postMessage("left button: 4 1");
};

function resetArc() {
    my_arc.animate({
        arc: [xOffset+x_position, yOffset+y_position, 0, 100, radius]
    }, 1000)
}


function startTimerFlicker() {
    if (view === 2) {
        console.log("starting flick")
        if (flickering) {
            if (flickerOn) {
                if (switchNumber === 1) {
                    console.log("timer seconds display")
                    timerSecondsDisplay.hide();
                }
                else if (switchNumber === 2) {
                    timerMinutesDisplay.hide();
                }
                else if (switchNumber === 3) {
                    timerHoursDisplay.hide();
                    hourDisplay.hide();
                }
                flickerOn = false;
            }
            else if (!flickerOn) {
                if (switchNumber === 1) {
                    timerSecondsDisplay.attr({text: timerSecs});
                }
                else if (switchNumber === 2) {
                    timerMinutesDisplay.attr({text: timerMins})
                }
                else if (switchNumber === 3) {
                    timerHoursDisplay.attr({text: timerHrs})
                }
                timerSecondsDisplay.show();
                timerMinutesDisplay.show();
                timerHoursDisplay.show();
                flickerOn = true;
            }
            timeFlicker = setTimeout(function () {
                startTimerFlicker();
            }, 500)
        }
        else {
            timerSecondsDisplay.attr({text: timerSecs});
            timerMinutesDisplay.attr({text: timerMins});
            timerHoursDisplay.attr({text: timerHrs});
            timerSecondsDisplay.show();
            timerMinutesDisplay.show();
            timerHoursDisplay.show();
            return;
        }
    }
}

function stopTimerFlick() {
    flickering = false;
    flickerStarted = false;
    timerSecondsDisplay.show();
    timerMinutesDisplay.show();
    timerHoursDisplay.show();
    }

function startTimeFlicker() {
    if (view === 0) {
        if (flickering) {
            if (flickerOn) {
                if (switchNumber === 1) {
                    secondsDisplay.hide();
                }
                else if (switchNumber === 2) {
                    minutesDisplay.hide();
                }
                else if (switchNumber === 3) {
                    hourDisplay.hide();
                }
                flickerOn = false;
            }
            else if (!flickerOn) {
                if (switchNumber === 1) {
                    secondsDisplay.attr({text: secs});
                }
                else if (switchNumber === 2) {
                    minutesDisplay.attr({text: mins});
                }
                else if (switchNumber === 3) {
                    hourDisplay.attr({text: hrs});
                }
                secondsDisplay.show();
                minutesDisplay.show();
                hourDisplay.show();
                flickerOn = true;
            }
            timeFlicker = setTimeout(function () {
                startTimeFlicker();
            }, 500)
        }
        else {
            secondsDisplay.attr({text: secs});
            secondsDisplay.show();
            minutesDisplay.attr({text: mins});
            minutesDisplay.show();
            hourDisplay.attr({text: hrs});
            hourDisplay.show();
            return;
        }
    }
}

function stopTimeFlick() {
    flickering = false;
    flickerStarted = false;
}

function startDateFlicker() {
    if (view === 1) {
        if (flickering) {
            if (flickerOn) {
                if (switchNumber === 1) {
                    dateDisplay.hide();
                }
                else if (switchNumber === 2) {
                    monthDisplay.hide();
                }
                else if (switchNumber === 3) {
                    yearDisplay.hide();
                }
                flickerOn = false;
            }
            else if (!flickerOn) {
                if (switchNumber === 1) {
                    dateDisplay.attr({text:date});
                }
                else if (switchNumber === 2) {
                    monthDisplay.attr({text:month});
                }
                else if (switchNumber === 3) {
                    yearDisplay.attr({text:year});
                }
                dateDisplay.show();
                monthDisplay.show();
                yearDisplay.show();
                flickerOn = true;
            }
            timeFlicker = setTimeout(function () {
                startDateFlicker();
            }, 500)
        }
        else {
            dateDisplay.attr({text:date});
            dateDisplay.show();
            monthDisplay.attr({text:month});
            monthDisplay.show();
            yearDisplay.attr({text:year});
            yearDisplay.show();
            return;
        }
    }
}

function stopDateFlick() {
    flickering = false;
    flickerStarted = false;
    dateDisplay.show();
}

function startAlarmFlicker() {
    if (view === 4) {
        if (flickering) {
            if (flickerOn) {
                if (switchNumber === 1) {
                    alarmSecondsDisplay.hide();
                }
                else if (switchNumber === 2) {
                    alarmMinutesDisplay.hide();
                }
                else if (switchNumber === 3) {
                    alarmHoursDisplay.hide();
                }
                flickerOn = false;
            }
            else if (!flickerOn) {
                if (switchNumber === 1) {
                    alarmSecondsDisplay.attr({text: alarmSecs});
                }
                else if (switchNumber === 2) {
                    alarmMinutesDisplay.attr({text: alarmMins});
                }
                else if (switchNumber === 3) {
                    alarmHoursDisplay.attr({text: alarmHrs});
                }
                alarmSecondsDisplay.show();
                alarmMinutesDisplay.show();
                alarmHoursDisplay.show();
                flickerOn = true;
            }
            timeFlicker = setTimeout(function () {
                startAlarmFlicker();
            }, 500)
        }
        else {
            alarmSecondsDisplay.attr({text: alarmSecs});
            alarmMinutesDisplay.attr({text: alarmMins});
            alarmHoursDisplay.attr({text: alarmHrs});
            alarmSecondsDisplay.show();
            alarmMinutesDisplay.show();
            alarmHoursDisplay.show();
            return;
        }
    }
    return;

}

function stopAlarmFlick() {
    flickering = false;
    flickerStarted = false;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    // add zero in front of numbers < 10
    return i;
}

function hideAll() {
    image.hide(), hours.hide(), minutes.hide(), seconds.hide(),
        hourDisplay.hide();
    minutesDisplay.hide();
    secondsDisplay.hide()
    dayDisplay.hide();
    dateDisplay.hide();
    monthDisplay.hide();
    yearDisplay.hide();
    timerSecondsDisplay.hide();
    timerMinutesDisplay.hide();
    timerHoursDisplay.hide();
    stopwatchHoursDisplay.hide();
    stopwatchMillisDisplay.hide();
    stopwatchMinutesDisplay.hide();
    stopwatchSecondsDisplay.hide();

    backgroundCircle.hide();
    alarmHoursDisplay.hide();
    alarmMinutesDisplay.hide();
    alarmSecondsDisplay.hide();
    for (i = 0; i < lapCounter; i++) {
        lapArray[i].hide();
        lapLabels[i].hide();
    }
    my_arc.hide();
    setTimerDisplay.hide();
    setStopwatchDisplay.hide();
    setAlarmDisplay.hide();
}

function showView0() {

    image.show().animate({ opacity : 1 }, 1000);
    hours.show().animate({ opacity : 1 }, 1000);
    minutes.show().animate({ opacity : 1 }, 1000);
    seconds.show().animate({ opacity : 1 }, 1000);
    hourDisplay.show();//.animate({ opacity : 1 }, 1000);
    minutesDisplay.show();//.animate({ opacity : 1 }, 1000);
    secondsDisplay.show();//.animate({ opacity : 1 }, 1000);
}

function showView1() {
    dayDisplay.show();//.animate({ opacity : 1 }, 1000);
    dateDisplay.show();//.animate({ opacity : 1 }, 1000);
    monthDisplay.show();//.animate({ opacity : 1 }, 1000);
    yearDisplay.show();//.animate({ opacity : 1 }, 1000);
}

function showView2() {
    timerSecondsDisplay.show();
    timerMinutesDisplay.show();
    timerHoursDisplay.show();
    my_arc.show();
    backgroundCircle.show();
    setTimerDisplay.show();
}

function showView3() {
    stopwatchSecondsDisplay.show();
    stopwatchMillisDisplay.show();
    stopwatchMinutesDisplay.show();
    stopwatchHoursDisplay.show();
    setStopwatchDisplay.show();
    for (i = 0; i < lapCounter; i++) {
        lapArray[i].show();
        lapLabels[i].show();
    }
}

function showView4() {
    alarmSecondsDisplay.show();
    alarmMinutesDisplay.show();
    alarmHoursDisplay.show()
    setAlarmDisplay.show();
}
function updateStopwatch() {
    stopwatchMillisDisplay.attr({text: stopMilis});
    stopwatchSecondsDisplay.attr({text: stopSecs});
    stopwatchMinutesDisplay.attr({text: stopMins});
    stopwatchHoursDisplay.attr({text: stopHours});
    }

function buttonFunction(){
    clearTimeout(timeFlicker);
    clearTimeout(timerFlicker);
    clearTimeout(dateFlicker);
    clearTimeout(alarmFlicker);
    flickering = false;
    flickerStarted = false;
    //increase view
    view = (view + 1) % numberOfOptions;
    //call appropriate function to display correct window
    hideAll();
    var fn = window["showView" + view];
    fn();
    switchNumber = 0;
    if (view === 0 || view === 1) {
        worker.postMessage("start" + view);
    }
}
function button0Function(){
    //stop all views equaly with first press
    if (switchNumber === 0) {
        worker.postMessage("stop" + view);
    }
    //just one function of stopwatch
    if (view === 3) {
        worker.postMessage("start3");
    }
    //start all views equally with first press
    else if (switchNumber === 3) {
        worker.postMessage("start" + view);

    }
    //special stuff for timers since we need flicker
    if (view === 0) {
        if (switchNumber === 0) {
            if (flickerStarted) {
                flickering = !flickering;
            }
            else {
                flickerStarted = true;
                flickering = true;
                startTimeFlicker();
            }
            ;
        }
        else if (switchNumber === 3) {
            stopTimeFlick();
        }
    }
    if (view === 1) {
        if (switchNumber === 0) {
            if (flickerStarted) {
                flickering = !flickering;
            }
            else {
                flickerStarted = true;
                flickering = true;
                startDateFlicker();
            }
            ;
        }
        else if (switchNumber === 3) {
            stopDateFlick();
        }
    }
    if (view === 2) {
        if (switchNumber === 0) {
            //reset the timer animation
            my_arc.animate({
                arc: [xOffset+x_position, yOffset+y_position, 0, 100, radius]
            }, 1000)


            if (flickerStarted) {
                flickering = !flickering;
            }
            else {
                flickerStarted = true;
                flickering = true;
                startTimerFlicker();
            }
            ;
        }
        else if (switchNumber === 3) {
            stopTimerFlick();
        }
    }

    if (view === 4) {
        if (switchNumber === 0) {
            if (flickerStarted) {
                flickering = !flickering;
            }
            else {
                flickerStarted = true;
                flickering = true;
                startAlarmFlicker();
            }
            ;
        }
        else if (switchNumber === 3) {
            stopAlarmFlick();
        }
    }

    switchNumber = (switchNumber + 1) % 4;
}

function button1Function(){
    worker.postMessage("left button: " + view + " " + switchNumber);
    //worker.postMessage("right button: " + view + " " + switchNumber);

}

function button2Function(){
    //worker.postMessage("left button: " + view + " " + switchNumber);
    worker.postMessage("right button: " + view + " " + switchNumber);
}