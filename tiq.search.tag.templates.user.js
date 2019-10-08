// ==UserScript==
// @name          TIQ Search TAG Templates - New UI
// @namespace     TIQ
// @require       http://code.jquery.com/jquery-2.1.1.min.js
// @require       https://code.jquery.com/ui/1.11.2/jquery-ui.js
// @run-at        document-end
// @version       1
// @author        Rui
// @description   Addons to TealiumTIQ
// @include       *.tealiumiq.com/tms*
// @updateURL     https://solutions.tealium.net/hosted/tampermonkey/newUI/tiq.search.tag.templates.user.js
// ==/UserScript==

(function(w){
    var reference, container;

    var buildHtml = function(){
        return 
        '<div class="tab-menu-item" id="tagsTemplateSearch">' +
        '    <div>' +
        '        <button id="tagsTemplateSearch_button" class="btn btn-default js-dropdown-button status_button" title="" original-title="">' +
        '            <span id="tagsTemplateSearch_text">' +
        '                <span class="menufont">Search Templates</span>' +
        '            </span>' +
        '            <i style="display: none;" class="icon-caret-down ml-1"></i>' +
        '            <div style="display: inline-block;" class="rotating ml-1">' +
        '                <i class="icon-spinner" style="display: none;"></i>' +
        '            </div>' +
        '        </button>' +
        '    </div>' +
        '</div>';
    };

    var observe = function(){
        if(w.jQuery("#tagsTemplateSearch").length < 1){
            w.jQuery(container).append(w.jQuery(buildHtml()));
        }
        w.setTimeout(observe, 1000);
    };

    var getHtmlObjects = function() {
        reference = w.jQuery("#tags_filterSearch_container");
        container = w.jQuery(reference).parent();
    };

    var init = function(){
        if(!w.jQuery)
            return;
        getHtmlObjects();
        if(reference.length < 1 || container.length < 1)
            return;
        observe();
    };

    init();
})(window);

