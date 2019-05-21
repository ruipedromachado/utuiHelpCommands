// another reference https://solutions.tealium.net/hosted/tealiumTools/bulk_edit/page_code.js




/*
 * extensions
 */

// lists extensions 
utui.data.customizations

// remove extension and update ui (only need to update ui when not on the correct tab)
utui.customizations.dropExtension(extId);
utui.customizations.drawJUIAccordion();

// snippet to auto remove
for (var ext in utui.data.customizations) {

    if (utui.data.customizations[ext].status === "inactive") {
        utui.customizations.dropExtension(ext);
    }

}

// show old js extensions
utui.config.customizationList[100036].load = "true"


/*
 * load rules
 */

// list load rules
utui.loadrules.containerMap

// view load rules attached tags
utui.loadrules.loadRuleTags

// remove load rule
utui.loadrules.containerLookup(loadruleId);
utui.loadrules.drop(container);

// get tag ids asssing to a load rule
utui.loadrules.getLoadruleTags(104)

// snippet to auto remove
for (var lr in utui.loadrules.loadRuleTags) {
    var lrAssignments = utui.loadrules.loadRuleTags[lr];
    if (lrAssignments.active === 0 &&
            lrAssignments.inactive === 0 &&
            lr !== "all") {
        var t = utui.loadrules.containerLookup(lr);
        utui.loadrules.drop(t);
    }

}


/*
 * tags
 */


// get tags
utui.automator.getTags()
utui.automator.getTagById(tagId)

// update a tag
w.utui.automator.updateTag(tagId, {
    status: "inactive",
    title: tags[tagId].title + " (Disabled by Migration)"
});


// add a tag

var newTag = {
    map = {},
    name = defaultDataObj.tag_name,
    advconfig_bundle = defaultDataObj.advconfig_bundle,
    advconfig_loadtype = defaultDataObj.advconfig_loadtype,
    advconfig_optout = defaultDataObj.advconfig_optout,
    advconfig_send = defaultDataObj.advconfig_send,
    advconfig_src = defaultDataObj.advconfig_src,
    advconfig_wait = defaultDataObj.advconfig_wait,
    title = "new tag title",
    loadrule = defaultDataObj.loadrule,
    multipleLoadRules = defaultDataObj.multipleLoadRules,
    multipleLoadRulesTitle = defaultDataObj.multipleLoadRulesTitle,
    status = defaultDataObj.status,
    labels = defaultDataObj.labels,
    notes = defaultDataObj.notes,
    selectedTargets = defaultDataObj.selectedTargets,
};

utui.automator.addTag(newTag, function (tag_id) {
    w.console.log("tag id: " + tag_id + " migrated.");
});


// show hiden tag
utui.manage.prepareToAddItem({tag_id : 7117})

// add a static mapping
newTag.map[index + 1] = {
    key: "conversion",
    type: "static.text",
    variable: "conversion:conversion"
};



/*
 * variables
 */

// list variables
utui.data.define
dsapi.getData();

// remove and update ui
dsapi.removeDataSource(dataObj.name, dataObj.type);
utui.define.show();


// snippet to auto remove
var all = dsapi.getData();
for (var name in all) {
    if(name.indexOf("qp") === -1) continue;
    var variable = all[name];
    if (variable.data_layer_specs.length === 0 &&
        variable.extensions.length === 0 &&
        variable.loadrules.length === 0 &&
        variable.tags.length === 0) {
        dsapi.removeDataSource(variable.name, variable.type);
    }
}
utui.define.show();



/*
 * privacy manager
 */


utui.privacy_management.util.enableV2()
utui.privacy_management.util.disableV2()
