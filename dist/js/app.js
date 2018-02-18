"use strict";function _init(){_generateModulesString(),$("main").append(modules),_generatePartials(),_generateModules(),$(document).ajaxStop(_requestsFinished),$(window).scroll(_showOnScroll)}function _generateModulesString(){defined_modules.forEach(function(e){modules+='<section id="'+module_prefix+e+'" class="module-'+e+'"></section>'})}function _generateModules(){defined_modules.forEach(function(e){$("#"+module_prefix+e).load(MODULE_ROOT+e+HTML,function(o,t,n){200==n.status&&$.getScript(MODULE_ROOT+e+SCRIPT).done(function(){createModuleStructure(MODULE_ROOT+e+JSON_CONFIG)})})})}function _generatePartials(){defined_partials.forEach(function(e){$(e).load(PARTIAL_ROOT+e+HTML,function(o,t,n){200==n.status&&$.getScript(PARTIAL_ROOT+e+SCRIPT).done(function(){createPartialStructure(PARTIAL_ROOT+e+JSON_CONFIG)})})})}function _showOnScroll(){$(this).scrollTop()>20?($(".header").addClass("header--active"),$(".scrollbar").addClass("scrollbar--visible"),$(".intro__scrollDownButton").removeClass("intro__scrollDownButton--visibleOnInit"),$(".intro__scrollDownButton").removeClass("intro__scrollDownButton--visibleOnScroll")):($(".header").removeClass("header--active"),$(".scrollbar").removeClass("scrollbar--visible"),$(".intro__scrollDownButton").addClass("intro__scrollDownButton--visibleOnScroll"))}function _requestsFinished(){setTimeout(function(){$(".loader").addClass("loader--deactivate"),$(".intro__scrollDownButton").addClass("intro__scrollDownButton--visibleOnInit"),$(".intro__profile").addClass("intro__profile--active"),$(".intro__info").addClass("intro__info--active")},300),setTimeout(function(){$(".intro__profileImage").addClass("intro__profileImage--border")},2400)}var modules="",module_prefix="module_",defined_modules=["intro","projects","skills","contact"],defined_partials=["header","footer"],MODULE_ROOT="src/views/modules/",PARTIAL_ROOT="src/views/partials/",SCRIPT="/script.js",HTML="/structure.html",JSON_CONFIG="/config.json";_init();
//# sourceMappingURL=app.js.map
