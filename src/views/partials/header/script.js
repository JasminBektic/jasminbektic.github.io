/**
 * Set events
 */
$(document).on('click', '.header__navbar ul li', _slideToElement);


/**
 * Just a helper function to animate slide effect on selected module
 */
function _slideToElement() {
    var module_name = this.getAttribute('data-module');

    $('html, body').animate({
        scrollTop: $('#' + module_name).offset().top
    }, 500);
}

/**
 * The creation of partial structure is done here - all data is configured in json file
 * @param {String} json_url 
 */
function createPartialStructure(json_url) {
    $.ajax({
        url: json_url,
        success: (data) => {
            var elements = '';

            $.each(data.navbar_items, (index, item) => {
                elements += '<li data-module="module_' +item.module+ '">'+
                                '<span data-hover="' +item.title+ '">' +item.title+ '</span>'+
                            '</li>';
            });
            $('.header__logo').append('<a href=""><img src="' +data.logo+ '" alt="Logo"></a>');
            $('.header__navbar').append('<ul>' +elements+ '</ul>');
        }
    });
}