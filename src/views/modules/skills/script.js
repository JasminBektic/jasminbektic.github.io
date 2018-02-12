/**
 * The creation of module structure is done here - all data is configured in module's json file
 * @param {String} json_url 
 */
function createModuleStructure(json_url) {
    $.ajax({
        url: json_url,
        success: (data) => {
            $('.skills__title').append('<h2>' +data.title+ '</h2>'+
                                       '<p>' +data.skills_desc+ '</p>');
                            
            data.grid.forEach(function(skill) {
                $('.skills__grid').append('<div class="skills__gridItem">'+
                                              '<div class="skills__gridItemImage">'+
                                                   '<img src="' +skill.background+ '" alt="' +skill.title+ '">'+
                                                   '<span style=background:' +skill.title_bg+ '>' +skill.title+ '</span>'+
                                              '</div>'+
                                          '</div>');
            });
        }
    });
}
