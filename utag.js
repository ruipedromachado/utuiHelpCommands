// load tag
// stop from "send"

utag.loader.cfg[xx].send = 0;
utag.loader.AS(utag.loader.cfg[xx]);

// access tag template "u" object
utag.sender[164]

// get all tags by tag template
var ids = [];
try {
    for (var key in utag.loader.cfg) {
        if (utag.loader.cfg.hasOwnProperty(key)) {
            var element = utag.loader.cfg[key];
            if (element.tid === templateId) {
                ids.push(parseInt(key));
            }
        }
    }
} catch (error) {}
return ids;