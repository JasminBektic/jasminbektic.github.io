/**
 * Set events and init
 */
$(document).on('click', 'a[href^="#"]', _slideToElement);
$(document).ready(() => {
    _parallaxConfig();
});


/**
 * The creation of module structure is done here - all data is configured in module's json file
 * @param {String} json_url 
 */
function createModuleStructure(json_url) {
    $.ajax({
        url: json_url,
        success: (data) => {
            $('.intro__profile').append('<div class="intro__profileImage">'+
                                            '<img src="' +data.profile_img+ '" alt="Profile image">'+
                                        '</div>');

            $('.intro__info').append('<div class="intro__infoTitle">' +data.title+ '</div>'+
                                     '<div class="intro__infoTitleDescription">' +
                                         '<span>' +data.title_desc+ '</span>' +
                                     '</div>'+
                                     '<div class="intro__infoSummary">' +data.summary+ '</div>'+
                                     '<div class="intro__infoResume">'+
                                         '<a href="' +data.pdf+ '" target="_blank">'+
                                             '<span>' +data.resume+ '</span>'+
                                             '<span><i class="far fa-file-pdf"></i></span>'+
                                         '</a>'+
                                     '</div>');

            $('.intro__scrollDownButton').append('<a href="#' +module_prefix + defined_modules[1]+ '"><span></span></a>');
        }
    });
}

/**
 * Just a helper function to animate slide effect to the next module when scroll 
 * button is clicked
 * @param {Object} event 
 */
function _slideToElement(event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
}

/**
 * Config object for parallax effect
 */
function _parallaxConfig() {
    $('.introParallax').parallax({
        imageSrc: './assets/images/intro-bg.jpg',
        speed: 0.6
    });
}

/**
 * Config object for particles effect
 */
particlesJS('particles-js',
{
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 4,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "repulse"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true,
    "config_demo": {
        "hide_card": false,
        "background_color": "#b61924",
        "background_image": "",
        "background_position": "50% 50%",
        "background_repeat": "no-repeat",
        "background_size": "cover"
    }
});