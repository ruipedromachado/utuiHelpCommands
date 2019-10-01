(function(w) {    
    var copyConnAction = function(actionId) {
        var connectorId = w.document.URL.split("connectors/").pop();
        var currentAction = w.gApp.inMemoryModels.serviceCollection._byId[connectorId].get('actions')._byId[actionId];
        if (currentAction) {
            var newAction = $.extend(true, {}, currentAction.attributes);
            var parameters = currentAction.get('parameters').map(function cb(currentAction) {
                return new w.gApp.models.Parameter($.extend(true, {}, currentAction.attributes));
            });
            newAction.id = null;
            newAction.title = newAction.title ? (newAction.title + " - Copy") : "";
            newAction.name = newAction.name ? (newAction.name + " - Copy") : "";
            newAction.service_id = w.parseInt(connectorId);
            newAction.parameters = new w.gApp.collections.Parameters(parameters);
            w.gApp.inMemoryModels.serviceCollection._byId[connectorId].get('actions').add(newAction);
        }
    };
    
    var init = function() {
        setTimeout(function(){
            jQuery('.accordionHeader.selected').parent().find(".actionBlock").each(function(index) {
                if (!jQuery('.accordionHeader.selected').parent().find('[id^="duplicateAction' + index + '"]').length) {
                    if (jQuery(this).find('.priority').text().trim() != "") {
                        var marginLeft = "759px";
                        var element = ".linkedTransformationTitle";
                        jQuery(this).find('.priority').css('margin-left', "auto");
                        jQuery(this).find('.editAction').css('margin-left', "auto");
                    } else if (jQuery(this).find('.priority').text().trim() == "") {
                        var marginLeft = "-81px";
                        var element = ".editAction";
                    }
                    var actionId = $(this).data("action");
                    $('<div id="duplicateAction' + index + '" class="clickable tmui btn-default" style="font-weight:700;"><i class="fas fa-copy mr-1" ></i>Duplicate</div>')
                        .css('margin-left', '-97px')
                        .insertBefore(jQuery(this).find(element))
                        .click(function() { copyConnAction(actionId); });
                }
            });
        }, 200);  
    };

    init();
})(window);