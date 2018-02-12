/**
 * The creation of module structure is done here - all data is configured in module's json file
 * @param {String} json_url 
 */
function createModuleStructure(json_url) {
    $.ajax({
        url: json_url,
        success: (data) => {
            $('.projects__title').append('<h2>' +data.title+ '</h2>'+
                                         '<p>' +data.projects_desc+ '</p>');

            data.grid.forEach(function(project) {
                $('.projects__grid').append('<div class="projects__gridItem">'+
                                                '<a href="' +project.url+ '" target="_blank">'+
                                                    '<div class="projects__gridItemCornerTag">' +project.corner_tag+ '</div>'+
                                                    '<div class="projects__gridItemTitle">' +project.title+ '</div>'+
                                                    '<div class="projects__gridItemImage">'+
                                                        '<img src="' +project.background+ '" alt="Angular">'+
                                                        '<div class="projects__gridItemImageOverlay">'+
                                                            '<div class="projects__gridItemImageOverlayTags">'+
                                                                '<span>' +project.tags.join('</span><span>')+ '</span>'+
                                                            '</div>'+
                                                            '<div class="projects__gridItemImageOverlayButton">'+
                                                                '<span>' +project.button+ '</span>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</a>'+
                                            '</div>');
            });
        }
    });
}

