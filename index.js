global.mpws = {
    "version": "1.1",
    "copyright": "2019"
}

global.log = require('./server/log')
global.fs = require('fs')
console.log("")
console.log("Minteck Projects Web Server");
console.log("version " + mpws.version);
console.log("");
console.log("Copyright (c) " + mpws.copyright + " Minteck Projects");
console.log("All Rights Reserved");
console.log("");
log.info("Reading configuration...")
global.config = require('./global/config.json')
log.info("Checking configuration integrity...")
log.verbose("Checking 'port'")
if (isNaN(config.port)) {
    log.error("'port' is invalid")
}
log.verbose("Checking 'document_root'")
if (typeof config.document_root == 'string') {
    log.info("Loading storage module...")
    if (config.document_root.startsWith(".")) {
        global.wwwdata = __dirname + "/" + config.document_root
    } else {
        global.wwwdata = config.document_root
    }
    if (fs.existsSync(wwwdata)) {
        log.info("Will start MPWS at " + wwwdata)
        log.info("Checking for port availability...")
        log.verbose("Running server/check.js/check")
        require('./server/check.js').check()
    } else {
        log.error("'document_root' cannot be found")
    }
} else {
    log.error("'document_root' is invalid")
}