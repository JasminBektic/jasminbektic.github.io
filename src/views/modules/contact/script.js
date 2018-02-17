$("#submit-btn").on('click', function(event) {
    event.preventDefault();

    var $form = $('#gform');
    
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbwZPL6ylly7c0pIh0gryIl8Jc4WbjcsM-rUB7wdSFocHwRlfs5U/exec',
        method: 'POST',
        data: 'name=Jaskio&message=testmessage&subject=subject',
        success: (data) => {
            console.log(data);
        },
        error: (data) => {
            console.log(data);
        }
    });
});

/**
 * The creation of module structure is done here - all data is configured in module's json file
 * @param {String} json_url 
 */
function createModuleStructure(json_url) {
    $.ajax({
        url: json_url,
        success: (data) => {

        }
    });
}
