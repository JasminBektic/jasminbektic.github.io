/**
 * Set events
 */
$(document).on('click', '#contact-modal', _showContactForm);
$(document).on('click', '#contact-close-btn', _closeContactForm);
$(document).on('click', '#contact-submit-btn', _sendEmail);


/**
 * The creation of module structure is done here - all data is configured in module's json file
 * @param {String} json_url 
 */
function createModuleStructure(json_url) {
    $.ajax({
        url: json_url,
        success: (data) => {
            $('.contact__section').append($('<h2>').text(data.title))
                                  .append($('<p>').text(data.desc))
                                  .append($('<div>').addClass('contact__sectionButton')
                                      .append($('<button>').attr('id', 'contact-modal')
                                          .append($('<span>').text(data.button))));

            $('.contact__form').append($('<div>').addClass('contact__formBlock contact__formBlock--left'))
                               .append($('<div>').addClass('contact__formBlock contact__formBlock--right'))
                               .append($('<div>').addClass('contact__formCloseButton')
                                    .append($('<button>').attr('id', 'contact-close-btn')))
                               .append($('<form>').attr({
                                                            id: 'gform',
                                                            method: 'POST',
                                                            action: data.form_action})
                                    .append($('<div>').addClass('contact__formSubmitButton')
                                        .append($('<button>').attr({
                                                                        id: 'contact-submit-btn',
                                                                        type: 'submit'})
                                                             .text(data.submit_btn)))
                                    .prepend(() => {
                                        var fields = '';
                                        data.fields.forEach((field) => {
                                            fields += '<fieldset class="contact__formItem"> \
                                                            <' +field.type+ ' placeholder="&nbsp;" name="' +field.name+ '">' +(field.type !== "input" ? "</"+field.type+">" : "")+ ' \
                                                            <label for="' +field.name+ '">' +field.label+ '</label> \
                                                       </fieldset>';
                                        })
                                        return fields;
                                    })
                                    .prepend($('<div>').addClass('contact__formTitle').text(data.form_title)));
        }
    });
}

/**
 * After form is validated - email will be sent
 */
function _sendEmail(event) {
    event.preventDefault();

    if ( _validateForm() ) {
        var $form = $('#gform'),
            parameters = '';

        $form.children('.contact__formItem').find(':input').each((index, field) => {
            parameters += field.name +'='+ field.value +'&';
        });
        
        $.ajax({
            url: $form.attr('action'),
            method: 'POST',
            data: parameters,
            success: (data) => {
                console.log('message sent');
            },
            error: (data) => {
                console.log('message failed to send');
            }
        });
    }
}

/**
 * Check fields and validate form
 */
function _validateForm() {
    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        $form_fields = $('.contact__formItem'),
        error_class = 'contact__formItem--error';

    $form_fields.each((index, field) => {
        var input = field.firstElementChild;

        if (input.value === '') {
            $(field).addClass(error_class);
        } else {
            $(field).removeClass(error_class);
        }

        if (input.name === 'email') {
            !email_regex.test(input.value) ? $(field).addClass(error_class) : '';
        }
    });

    return !$form_fields.hasClass(error_class);
}

/**
 * Reseting all field values and css classes when form is closed
 */
function _resetFields() {
    var $form_fields = $('.contact__formItem');

    $form_fields.each((index, field) => {
        field.firstElementChild.value = '';
        $(field).removeClass('contact__formItem--error');
    });
}

/**
 * Helper function - adding some css classes on show contact form
 */
function _showContactForm() {
    $('.contact__formBlock--left').toggleClass('contact__formBlock--leftReset');  
    $('.contact__formBlock--right').toggleClass('contact__formBlock--rightReset'); 
    $('.contact__form').toggleClass('contact__form--visible');
    $('.contact__formCloseButton').toggleClass('contact__formCloseButton--active');
    $('html,body').toggleClass('scrollbar--disable');
}

/**
 * Helper function - remove css classes and reset all fields after form is closed
 */
function _closeContactForm() {
    $('.contact__formBlock--left').toggleClass('contact__formBlock--leftReset');  
    $('.contact__formBlock--right').toggleClass('contact__formBlock--rightReset'); 
    $('.contact__form').toggleClass('contact__form--visible');
    $('.contact__formCloseButton').toggleClass('contact__formCloseButton--active');
    $('html,body').toggleClass('scrollbar--disable');

    _resetFields();
}
