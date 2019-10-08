// ==UserScript==
// @name          TIQ ObservePoint Trigger Audits Integration - New UI
// @namespace     TIQ
// @run-at        document-end
// @version       1
// @author        Rui
// @description   Addons to TealiumTIQ
// @include       *.tealiumiq.com/tms*
// @updateURL     https://solutions.tealium.net/hosted/tampermonkey/newUI/tiq.observepoint.trigger.audits.user.js
// ==/UserScript==

(function() {
    'use strict';

    var audits;
    var selectedAudits = [];

    var getAudits = function () {
        return new Promise(function(resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                 if (this.readyState == 4 && this.status == 200) {
                     resolve(JSON.parse(this.responseText));
                 }
            };
            xhttp.open("get", "https://api.observepoint.com/v2/web-audits", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Authorization", "api_key ZW1jYTIyaGsxY3FuY3UzcHI4dDZtMThnY2tqMWFodWsxbTY3ZmNpaHY1YzUwYW9nZ2xmNnRmczR1MCYyMDg4NCYxNTY5ODUzMjM5Mzcz");
            xhttp.send();
        })
    };

    var fireAudit = function (auditId) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("post", "https://api.observepoint.com/v2/web-audits/" + auditId + "/runs", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("Authorization", "api_key ZW1jYTIyaGsxY3FuY3UzcHI4dDZtMThnY2tqMWFodWsxbTY3ZmNpaHY1YzUwYW9nZ2xmNnRmczR1MCYyMDg4NCYxNTY5ODUzMjM5Mzcz");
        xhttp.send();
    };

    var opAuditChecker = function() {
        var isSelected = this.checked;
        var auditId = this.dataset.auditId;
        if(isSelected === true) {
            selectedAudits.push(auditId);
        } else {
            selectedAudits.splice(selectedAudits.indexOf(auditId), 1);
        }
        console.log(selectedAudits);
    };

    var observeContainer = function() {
        var publishTable = document.getElementsByClassName("publishHistoryContainerTable");
        if(publishTable.length > 0) {

            var row = document.createElement('tr');
            var td = document.createElement('td');
            td.setAttribute("id", "op_audits");
            td.setAttribute("colspan", "2");
            var header = document.createElement("div");
            header.setAttribute("class", "publish_sectionTitle");
            header.innerHTML = "ObservePoint Audits";
            var container = document.createElement('div');
            container.setAttribute("style", "border: 1px solid #eee;height: 150px;overflow-y:auto");
            for(var i = 0; i < audits.length; i++) {
                var checkbox = document.createElement('input');
                checkbox.setAttribute("type", "checkbox");
                checkbox.setAttribute("name", "op_audits_names");
                checkbox.setAttribute("data-audit-id", audits[i].id);
                checkbox.addEventListener("click", opAuditChecker, false);
                var checkboxContainer = document.createElement("div");
                checkboxContainer.setAttribute("style", "padding: 3px");
                checkboxContainer.appendChild(checkbox);
                checkboxContainer.appendChild(document.createTextNode(audits[i].name));
                checkboxContainer.appendChild(document.createElement('br'));
                container.appendChild(checkboxContainer);
            }
            td.appendChild(header);
            td.appendChild(container);
            row.appendChild(td);
            publishTable[0].appendChild(row);

            var save = document.getElementById("savePublish_dialog_saveBtn");
            save.addEventListener("click", function() {
                var title = document.getElementById("savepublish_version_title");
                var notes = document.getElementById("publish_notes");
                if ((title && title.value === "") || (notes && notes.value === "")) {
                    return;
                }
                console.log(selectedAudits);
                for(var j = 0; j < selectedAudits.length; j++) {
                    var auditId = selectedAudits[j];
                    fireAudit(auditId);
                    console.log("observepoint audit id " + auditId + " triggered!")
                }
            }, false);

        } else {
            setTimeout(function() {
                observeContainer();
            }, 500);
        }
    };

    var init = async function() {
        audits = await getAudits();

        var global_save = document.getElementById("global_save");
        global_save.addEventListener("click", function() {
            observeContainer();
        }, false);
    };

    init();
})();