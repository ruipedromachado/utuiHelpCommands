// ==UserScript==
// @name          UDH Copy Connector Actions - New UI
// @namespace     UDH
// @require       http://code.jquery.com/jquery-2.1.1.min.js
// @require       https://code.jquery.com/ui/1.11.2/jquery-ui.js
// @run-at        document-end
// @version       1
// @author        Rui
// @description   Addons to TealiumUDH
// @include       *.tealiumiq.com/datacloud*
// @updateURL     https://solutions.tealium.net/hosted/tampermonkey/newUI/udh.copy.connector.actions.user.js
// ==/UserScript==

(function(w) {
    var copyConnAction = function(actionId) {
        var connectorId = w.document.URL.split("connectors/").pop();
        var currentAction = gApp.inMemoryModels.serviceCollection._byId[connectorId].get('actions')._byId[actionId];
        if (currentAction) {
            var newAction = w.jQuery.extend(true, {}, currentAction.attributes);
            var parameters = currentAction.get('parameters').map(function cb(currentAction) {
                return new gApp.models.Parameter(w.jQuery.extend(true, {}, currentAction.attributes));
            });
            newAction.id = null;
            newAction.title = newAction.title ? (newAction.title + " - Copy") : "";
            newAction.name = newAction.name ? (newAction.name + " - Copy") : "";
            newAction.service_id = w.parseInt(connectorId);
            newAction.parameters = new gApp.collections.Parameters(parameters);
            gApp.inMemoryModels.serviceCollection._byId[connectorId].get('actions').add(newAction);
            w.jQuery("#saveProfileButton").addClass("dirty").addClass("btn-warning");
        }
    };

    var htmlHandler = function() {
        w.jQuery('.accordionHeader.selected').parent().find(".actionBlock").each(function(index) {
            if (!w.jQuery('.accordionHeader.selected').parent().find('[id^="duplicateAction' + index + '"]').length) {
                var element;
                if (w.jQuery(this).find('.priority').text().trim() != "") {
                    element = ".linkedTransformationTitle";
                    w.jQuery(this).find('.priority').css('margin-left', "auto");
                    w.jQuery(this).find('.editAction').css('margin-left', "auto");
                } else if (jQuery(this).find('.priority').text().trim() == "") {
                    element = ".editAction";
                }
                if(element) {
                    var copyActionElementId = "duplicateAction" + index;
                    var copyActionHtmlElement = '<div><i class="fas fa-copy mr-1"></i>Duplicate</div>';
                    var actionId = w.jQuery(this).data("action");
                    if(w.jQuery("#" + copyActionElementId).length < 1) {
                        w.jQuery(copyActionHtmlElement)
                        .attr("id", copyActionElementId)
                        .addClass("clickable")
                        .addClass("tmui")
                        .addClass("btn-default")
                        .css('margin-left', '-97px')
                        .css('font-weight', '700')
                        .insertBefore(w.jQuery(this).find(element))
                        .click(function() { copyConnAction(actionId); });
                    }
                }
            }
        });
        w.setTimeout(htmlHandler, 500);
    };

    var init = function() {
        htmlHandler();
    };

    init();
})(window);