time = 0

module.exports.info = function (logel) {
    time = time + 1;
    console.log("[ " + time + " ] [ info ]  " + logel);
}

module.exports.verbose = function (logel) {
    time = time + 1;
    if (config.verbose) {
        console.log("[ " + time + " ] [ verbose ]  " + logel);
    }
}

module.exports.warn = function (logel) {
    time = time + 1;
    console.log("[ " + time + " ] [ warn ]  " + logel);
}

module.exports.error = function (logel) {
    time = time + 1;
    console.log("[ " + time + " ] [ error ]  " + logel);
    process.exit()
}