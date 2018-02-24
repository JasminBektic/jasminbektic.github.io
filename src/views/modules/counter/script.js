var BREAKPOINT = {
        one: 135,
        two: 225,
        three: 315,
        four: 405
    },
    rotation = {
        start: 45,
        seconds: 45,
        minutes: 45,
        hours: 45,
        days: 45,
        years: 45
    },
    START = '2016-06-15 08:00:00';


/**
 * The creation of module structure is done here - all data is configured in module's json file
 * @param {String} json_url 
 */
function createModuleStructure(json_url) {
    $.ajax({
        url: json_url,
        success: (data) => {
            var circles = '',
                c = data.default_color,
                color = {
                    start: {
                        state_one:      'transparent ' +c+ ' ' +c+ ' ' +c,
                        state_two:      'transparent transparent ' +c+ ' ' +c,
                        state_three:    'transparent transparent transparent ' +c,
                        state_four:     '',
                    },
                    end: {
                        state_one:      c+ ' ' +c+ ' ' +c+ ' transparent',
                        state_two:      c+ ' ' +c+ ' transparent transparent',
                        state_three:    c+ ' transparent transparent transparent',
                        state_four:     c+ ' transparent transparent transparent',
                    }
                };
            
            var counter = _calculateRotation(true);

            data.circles.forEach((circle) => {
                circle = _determineCircleType(circle, counter);
                circles += _createCircle(circle, color, true);
            });
            $('.counter__circles').append(circles);
            $('.counter__description').append('<p>' +data.description+ '</p>');

            setInterval(() => {
                counter = _calculateRotation(false);

                data.circles.forEach((circle) => {
                    circle = _determineCircleType(circle, counter);
                    circles += _createCircle(circle, color, false);
                })
            }, 1000);
        }
    });
}

/**
 * This is where circle is created initially, every other function call is updating circle style.
 * @param {Object} circle 
 * @param {Object} color 
 * @param {Boolean} init 
 */
function _createCircle(circle, color, init) {
    color.start.state_four = circle.color + ' transparent transparent transparent';
    var css = {};

    if (circle.rotation >= BREAKPOINT.one && circle.rotation < BREAKPOINT.two) {
        css = {
            start: 'border-color:' + color.start.state_two,
            end: 'border-color:' + color.end.state_two,
        }
    }
    if (circle.rotation >= BREAKPOINT.two && circle.rotation < BREAKPOINT.three) {
        css = {
            start: 'border-color:' + color.start.state_three,
            end: 'border-color:' + color.end.state_three
        }
    }
    if (circle.rotation >= BREAKPOINT.three && circle.rotation < BREAKPOINT.four) {
        css = {
            start: 'border-color:' +color.start.state_four+ ';z-index:1',
            end: 'border-color:' + color.end.state_four
        }
    }
    if (circle.rotation >= BREAKPOINT.four || circle.rotation < BREAKPOINT.one) {
        css = {
            start: 'border-color:' +color.start.state_one+ ';z-index:0',
            end: 'border-color:' + color.end.state_one
        }
    }

    css.start += ';transform:rotate(' +rotation.start+ 'deg)';
    css.end += ';transform:rotate(' +circle.rotation+ 'deg)';

    if (init) {
        return '<div class="counter__circle">\
                    <div id="' +circle.label+ '-default" class="counter__circleDefault" style="border-color:' +circle.color+ '">\
                        <div class="counter__circleDefaultTitle">\
                            <span>' +circle.label+ '</span>\
                            <span style="color:' +circle.color+ '">' +circle.value+ '</span>\
                        </div>\
                    </div>\
                    <div id="' +circle.label+ '-start" class="counter__circleStart" style="' +css.start+ '"></div>\
                    <div id="' +circle.label+ '-end" class="counter__circleEnd" style="' +css.end+ '"></div>\
                </div>';
    } else {
        $('#' +circle.label+ '-default').find('span')[1].innerText = circle.value;
        $('#' +circle.label+ '-start')[0].style.cssText = css.start;
        $('#' +circle.label+ '-end')[0].style.cssText = css.end;
    }
}

/**
 * Calculating rotation degree for every circle based on difference between CURRENT and START date.
 * Also, counter object is returned and processed in _determineCircleType function
 * @param {Boolean} init 
 */
function _calculateRotation(init) {
    var CURRENT = moment().format('YYYY-MM-DD HH:mm:ss'),
        counter = moment.preciseDiff(START, CURRENT, true),
        seconds = Math.round(360 / (60 / counter.seconds)),
        minutes = Math.round(360 / (60 / counter.minutes)),
        hours = Math.round(360 / (24 / counter.hours)),
        days = Math.round(360 / (365 / (counter.months * 30.42 + counter.days))),
        years = Math.round(360 / (365 / (counter.months * 30.42 + counter.days)));

    if(init) {
        rotation.seconds += seconds;
        rotation.minutes += minutes;
        rotation.hours += hours;
        rotation.days += days;
        rotation.years += years;
    } else {
        rotation.seconds = seconds + rotation.start;
        rotation.minutes = minutes + rotation.start;
        rotation.hours = hours + rotation.start;
        rotation.days = days + rotation.start;
        rotation.years = years + rotation.start;
    }

    return counter;
}

/**
 * Determine which circle is looped - add rotation degree and proper time value to it
 * @param {Object} circle 
 * @param {Object} counter 
 */
function _determineCircleType(circle, counter) {
    switch(circle.label) {
        case 'seconds':
            circle.type = 'seconds';
            circle.rotation = rotation.seconds;
            circle.value = counter.seconds;
            break;

        case 'minutes':
            circle.type = 'minutes';
            circle.rotation = rotation.minutes;
            circle.value = counter.minutes;
            break;

        case 'hours':
            circle.type = 'hours';
            circle.rotation = rotation.hours;
            circle.value = counter.hours;
            break;

        case 'days':
            circle.type = 'days';
            circle.rotation = rotation.days;
            circle.value = Math.round(counter.months * 30.42 + counter.days);
            break;

        case 'years':
            circle.type = 'years';
            circle.rotation = rotation.years;
            circle.value = counter.years;
            break;
    }

    return circle;
}