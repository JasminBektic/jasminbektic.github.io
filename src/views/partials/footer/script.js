/**
 * The creation of partial structure is done here - all data is configured in json file
 * @param {String} json_url 
 */
function createPartialStructure(json_url) {
    $.ajax({
        url: json_url,
        success: (data) => {
            var elements = '';

            $.each(data.social_icons, (index, icon) => {
                elements += '<li>'+
                                '<a href="' +icon.url+ '">'+
                                    '<i class="' +icon.fa_class+ '" style=background:' +icon.color+ '></i>'+
                                '</a>'+
                            '</li>';
            });
            $('.footer__socialIcons').append(elements);
        }
    });
}