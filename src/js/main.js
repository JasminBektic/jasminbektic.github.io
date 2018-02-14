var modules = '',
    module_prefix = 'module_',
    defined_modules = [
        'intro',
        'projects',
        'skills'
    ],
    defined_partials = [
        'header',
        'footer'
    ];

const MODULE_ROOT = 'src/views/modules/',
      PARTIAL_ROOT = 'src/views/partials/',
      SCRIPT = '/script.js',
      HTML = '/structure.html',
      JSON = '/config.json';


_init();

function _init() {
    _generateModulesString();

    $('main').append(modules);
    _generatePartials();
    _generateModules();

    $(document).ajaxStop(_requestsFinished);
    $(window).scroll(_showOnScroll);
}

/**
 * Concating all module names from defined_modules array - is used to append on main content element
 */
function _generateModulesString() {
    defined_modules.forEach((module_name) => {
        modules += '<section id="' + module_prefix + module_name + '"></section>';
    });
}

/**
 * Loading module view and scripts
 */
function _generateModules() {
    defined_modules.forEach((module_name) => {
        $('#' + module_prefix + module_name).load(MODULE_ROOT + module_name + HTML, (html, status_text, xhr) => {
            if (xhr.status == 200) {
                $.getScript(MODULE_ROOT + module_name + SCRIPT)
                    .done(() => {
                        createModuleStructure(MODULE_ROOT + module_name + JSON);
                    });
            }
        });
    });
}

/**
 * Loading partial view and scripts
 */
function _generatePartials() {
    defined_partials.forEach((partial_name) => {
        $(partial_name).load(PARTIAL_ROOT + partial_name + HTML, (html, status_text, xhr) => {
            if (xhr.status == 200) {
                $.getScript(PARTIAL_ROOT + partial_name + SCRIPT)
                    .done(() => {
                        createPartialStructure(PARTIAL_ROOT + partial_name + JSON);
                    });
            }
        });
    });
}

/**
 * Helper function - adding some css classes on scroll event
 */
function _showOnScroll() {
    if ($(this).scrollTop() > 20) {
        $('.header').addClass('header--active');
        $('.scrollbar').addClass('scrollbar--visible');
        $('.intro__scrollDownButton').removeClass('intro__scrollDownButton--visibleOnInit');
        $('.intro__scrollDownButton').removeClass('intro__scrollDownButton--visibleOnScroll');
    } else {
        $('.header').removeClass('header--active');
        $('.scrollbar').removeClass('scrollbar--visible');
        $('.intro__scrollDownButton').addClass('intro__scrollDownButton--visibleOnScroll');  
    }
}

/**
 * Helper function - prepare view when all requests are finished.
 * This is triggered on init
 */
function _requestsFinished() {
    setTimeout(function () {
        $('.loader').addClass('loader--deactivate');  
        $('.intro__scrollDownButton').addClass('intro__scrollDownButton--visibleOnInit');
        $('.intro__profile').addClass('intro__profile--active');
        $('.intro__info').addClass('intro__info--active');
    }, 300);
    setTimeout(function () { 
        $('.intro__profileImage').addClass('intro__profileImage--border');  
    }, 2400);
}

