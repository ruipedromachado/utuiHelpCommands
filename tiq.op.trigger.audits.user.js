// @name          TIQ ObservePoint Trigger Audits Integration - New UI
// @namespace     TIQ
// @require       http://code.jquery.com/jquery-2.1.1.min.js
// @require       https://code.jquery.com/ui/1.11.2/jquery-ui.js
// @run-at        document-end
// @version       1
// @author        Rui
// @description   Addons to TealiumTIQ
// @include       *.tealiumiq.com/tms*
// ==/UserScript==
(function(){
    var audits;
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
    
    var handleClick = function(cb) {
        console.log(cb.checked);
    };

    var observeContainer = function() {
        var publishTable = $(".publishHistoryContainerTable");
        if(publishTable.length > 0) {
            
            var t = "";
            t += "<tr> " +
                "    <td id='op_audits' colspan='2'> " + 
                "       <div style='border: 1px solid #eee;'>"
            
            //onclick='handleClick(this);'

            for(var i = 0; i < audits.length; i++) {
                t += "<input type='checkbox' name='op_audits_names'  data-audit-id='" + audits[i].id + "'>" + audits[i].name + "</input><br>";
            }

            t += "      </div>" + 
                "    </td> " +       
                "</tr> "
    
            publishTable.append(t);

            var save = document.getElementById("savePublish_dialog_saveBtn");
            save.addEventListener("click", function() {
                var op_audits_checkboxes = document.getElementsByName("op_audits_names");
                var op_checked_audits = [];
                for(var i = 0; i < op_audits_checkboxes.length; i++) {
                    if(op_audits_checkboxes[i].checked === true) {
                        op_checked_audits.push(op_audits_checkboxes[i]);
                    }
                }
                console.log(op_checked_audits);
                for(var i = 0; i < op_checked_audits.length; i++) {
                    var auditId = op_checked_audits[i].dataset.auditId;
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

