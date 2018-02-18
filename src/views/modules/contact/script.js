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
 * 
 */
function _sendEmail(event) {
    event.preventDefault();

    console.log(event);

    var $form = $('#gform');

    // $.ajax({
    //     url: 'https://script.google.com/macros/s/AKfycbwZPL6ylly7c0pIh0gryIl8Jc4WbjcsM-rUB7wdSFocHwRlfs5U/exec',
    //     method: 'POST',
    //     data: 'name=Jaskio&message=testmessage&subject=subject&email=email@gmail.com',
    //     success: (data) => {
    //         console.log(data);
    //     },
    //     error: (data) => {
    //         console.log(data);
    //     }
    // });
}

/**
 * Helper function - adding some css classes on show contact form
 */
function _showContactForm() {
    $('.contact__formBlock--left').toggleClass('contact__formBlock--leftReset');  
    $('.contact__formBlock--right').toggleClass('contact__formBlock--rightReset'); 
    $('.contact__form').toggleClass('contact__form--visible');
    $('.contact__formCloseButton').toggleClass('contact__formCloseButton--active');
    $('body').toggleClass('scrollbar--disable');
}

function _closeContactForm() {
    $('.contact__formBlock--left').toggleClass('contact__formBlock--leftReset');  
    $('.contact__formBlock--right').toggleClass('contact__formBlock--rightReset'); 
    $('.contact__form').toggleClass('contact__form--visible');
    $('.contact__formCloseButton').toggleClass('contact__formCloseButton--active');
    $('body').toggleClass('scrollbar--disable');
}
