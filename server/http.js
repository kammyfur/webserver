global.fs = require('fs')
global.os = require('os')
global.mime = require('node-mime');
global.dirconf = null;

module.exports.start = function () {
    String.prototype.replacei = function (search, replace) {
        var regex = new RegExp(search, "ig");
        return this.replace(regex, replace);
    }

    global.http = require('http');
 
    http.createServer(function (req, res) {
        global.res = res;
        req.url_orig = req.url;
        log.verbose("request: " + req.connection.remoteAddress)

        if (req.url.startsWith("/@info")) {
            log.verbose("return info");
            file = wwwdata + req.url.slice(6);

            json = new Object
            json.file = req.url.slice(6)
            if (fs.existsSync(file)) {
                if (fs.lstatSync(file).isDirectory()) {
                    json.type = "inode/directory"
                    json.size = null
                    json.inode = null
                    json.device = null
                    json.mode = null
                } else {
                    json.type = mime.lookUpType(file.split(".").pop());
                    // json.type = file.split(".").pop();
                    json.size = fs.lstatSync(file).size
                    json.inode = fs.lstatSync(file).ino
                    json.device = fs.lstatSync(file).dev
                    json.mode = fs.lstatSync(file).mode
                }
            } else {
                if (json.file.startsWith("/debug")) {
                    json.type = "mpws-special/debuginfo";
                    json.size = null
                    json.inode = null
                    json.device = null
                    json.mode = null
                } else if (json.file.startsWith("/@info")) {
                    json.type = "mpws-special/fileinfo";
                    json.size = null
                    json.inode = null
                    json.device = null
                    json.mode = null
                } else if (json.file.startsWith("/@json")) {
                    json.type = "mpws-special/fileapi";
                    json.size = null
                    json.inode = null
                    json.device = null
                    json.mode = null
                } else {
                    json.type = "error/notfound";
                    json.size = null
                    json.inode = null
                    json.device = null
                    json.mode = null
                }
            }

            res.writeHead(200, {'Content-Type': 'application/json'}); 
            res.write(JSON.stringify(json));
            res.end()
            return;
        }

        if (req.url.startsWith("/@json")) {
            log.verbose("return json");
            file = wwwdata + req.url.slice(6);

            json = new Object
            json.file = req.url.slice(6)
            if (fs.existsSync(file)) {
                if (fs.lstatSync(file).isDirectory()) {
                    json.type = "inode/directory"
                    json.size = null
                    json.inode = null
                    json.device = null
                    json.mode = null
                    json.lines = null
                } else {
                    json.type = mime.lookUpType(file.split(".").pop());
                    json.size = fs.lstatSync(file).size
                    json.inode = fs.lstatSync(file).ino
                    json.device = fs.lstatSync(file).dev
                    json.mode = fs.lstatSync(file).mode
                    json.lines = fs.readFileSync(file).toString().split("\n");
                }
            } else {
                if (json.file.startsWith("/debug")) {
                    json.type = "mpws-special/debuginfo";
                    json.size = null
                    json.inode = null
                    json.device = null
                    json.mode = null
                    json.lines = null
                } else if (json.file.startsWith("/@info")) {
                    json.type = "mpws-special/fileinfo";
                    json.size = null
                    json.inode = null
                    json.device = null
                    json.mode = null
                    json.lines = null
                } else if (json.file.startsWith("/@json")) {
                    json.type = "mpws-special/fileapi";
                    json.size = null
                    json.inode = null
                    json.device = null
                    json.mode = null
                    json.lines = null
                } else {
                    json.type = "error/notfound";
                    json.size = null
                    json.inode = null
                    json.device = null
                    json.mode = null
                    json.lines = null
                }
            }

            res.writeHead(200, {'Content-Type': 'application/json'}); 
            res.write(JSON.stringify(json));
            res.end()
            return;
        }

        if (req.url == "/debug") {
            log.verbose("return debug")
            res.writeHead(200, {'Content-Type': 'application/json'}); 
            var date = new Date();
            var hour = date.getHours();
            // hour = (hour < 10 ? "0" : "") + hour;
            var min  = date.getMinutes();
            // min = (min < 10 ? "0" : "") + min;
            var sec  = date.getSeconds();
            // sec = (sec < 10 ? "0" : "") + sec;
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            // month = (month < 10 ? "0" : "") + month;
            var day  = date.getDate();
            // day = (day < 10 ? "0" : "") + day;
            debug = {
                "version": {
                    "server": mpws.version,
                    "kernel": process.version.replace("v","")
                },
                "date": {
                    "day": day,
                    "month": month,
                    "year": year,
                    "hour": hour,
                    "min": min,
                    "sec": sec
                },
                "server": {
                    "process": {
                        "pid": process.pid,
                        "name": process.title,
                        "priority": os.getPriority(process.pid)
                    },
                    "software": {
                        "hostname": os.hostname(),
                        "arch": os.arch(),
                        "platform": os.platform(),
                        "release": os.release(),
                        "type": os.type(),
                        "uptime": os.uptime(),
                        "tempfiles": os.tmpdir()
                    },
                    "hardware": {
                        "cpus": os.cpus(),
                        "network": os.networkInterfaces(),
                        "memory": {
                            "total": os.totalmem(),
                            "free": os.freemem(),
                            "used": os.totalmem() - os.freemem(),
                            "process": process.memoryUsage()
                        }
                    }
                }
            }
            res.write(JSON.stringify(debug));
            res.end();
            return;
        }
        // res.writeHead(200, {'Content-Type': 'text/html'}); 
        // res.write('Node.js says hello!');
        // res.end();
        frhtml = false;
        if (req.url.includes(".")) {} else {
            if (fs.existsSync(wwwdata + req.url + "/index.html")) {
                req.url = req.url + "/index.html"
            } else {
                req.url = req.url + "/index.fr.html"
                frhtml = true;
            }
        }
        if (req.url.endsWith('.fr.html')) {
            frhtml = true;
        }
        if (req.url.includes("..")) {
            if (config.errors_show_trace) {
                trace = "<div><code>MPWS WEBSERVER - System Backtrace<br><br>Server Backtrace:<br>401F0000     PERMISSION_DENIED<br>00000001     SERVER_RUNTIME<br>0000001A     HTTP_WEBSERVER<br><br>Kernel Backtrace:<br></code></div>"
            } else {
                trace = "";
            }
            log.verbose("return 401")
            res.writeHead(401, {'Content-Type': 'text/html'}); 
            res.write("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"><title>MPWS Fatal Error</title></head><body><h1>Internal Server Error</h1>Minteck Projects Web Server returned an error while trying to request your file.<br><br>0x401: Forbidden<br>" + req.url + "<br><br><b>Minteck Projects Web Server " + mpws.version + ", kernel " + process.version + "</b>" + trace + "</body></html>");
            res.end();
            return;
        }
        global.dirconf = null;
        if (fs.existsSync(wwwdata + req.url.substring(0, req.url.indexOf('/')) + "/" + config.access)) {
            log.verbose('reading ' + config.access + ' file...')
            try {
                if (require.cache[require.resolve(wwwdata + req.url.substring(0, req.url.indexOf('/')) + "/" + config.access)]) {
                    delete require.cache[require.resolve(wwwdata + req.url.substring(0, req.url.indexOf('/')) + "/" + config.access)]
                }
                global.dirconf = require(wwwdata + req.url.substring(0, req.url.indexOf('/')) + "/" + config.access)
            } catch (err) {
                global.dirconf = null;
                if (config.errors_show_trace) {
                    trace = "<div><code>MPWS WEBSERVER - System Backtrace<br><br>Server Backtrace:<br>50A00000     INVALID_DIR_CONF<br>00000001     SERVER_RUNTIME<br>0000001A     HTTP_WEBSERVER<br><br>Kernel Backtrace:<br>" + err.toString().replace('\n','<br>') + "</code></div>"
                } else {
                    trace = "";
                }
                log.verbose("return 500")
                res.writeHead(500, {'Content-Type': 'text/html'}); 
                res.write("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"><title>MPWS Fatal Error</title></head><body><h1>Internal Server Error</h1>Minteck Projects Web Server returned an error while trying to request your file.<br><br>0x50A: Invalid Directory Configuration<br>" + req.url + "<br><br><b>Minteck Projects Web Server " + mpws.version + ", kernel " + process.version + "</b>" + trace + "</body></html>");
                res.end();
                return;
            }
            if (dirconf == null) {} else {
                if (typeof(dirconf.access) != "undefined") {
                    if (typeof(dirconf.access) == "boolean") {
                        if (dirconf.access == false) {
                            if (config.errors_show_trace) {
                                trace = "<div><code>MPWS WEBSERVER - System Backtrace<br><br>Server Backtrace:<br>401F0000     PERMISSION_DENIED<br>00000001     SERVER_RUNTIME<br>0000001A     HTTP_WEBSERVER<br><br>Kernel Backtrace:<br></code></div>"
                            } else {
                                trace = "";
                            }
                            log.verbose("return 401")
                            res.writeHead(500, {'Content-Type': 'text/html'}); 
                            res.write("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"><title>MPWS Fatal Error</title></head><body><h1>Internal Server Error</h1>Minteck Projects Web Server returned an error while trying to request your file.<br><br>0x401: Forbidden<br>" + req.url + "<br><br><b>Minteck Projects Web Server " + mpws.version + ", kernel " + process.version + "</b>" + trace + "</body></html>");
                            res.end();
                            return;
                        }
                    }
                }
            }
        }
        console.log(wwwdata + req.url_orig + "/$command.json");
        if (fs.existsSync(wwwdata + req.url) || fs.existsSync(wwwdata + req.url_orig + "/$command.json")) {
            if (fs.existsSync(wwwdata + req.url_orig + "/$command.json")) {
                res.writeHead(200, {'Content-Type': 'application/json', 'Set-Cookie': '__mpws_request=' + year + month + day + hour + min + sec});
                filebuffer = fs.readFileSync(wwwdata + req.url_orig + "/$command.json");
                filestring = filebuffer.toString()
                filejson = JSON.parse(filestring);
                require('./commands.js')(filejson, (callback) => {
                    output = JSON.stringify(callback);
                    res.write(output);
                    res.end();
                });
                return;
            }
            if (frhtml) {
                log.verbose("return " + mime.lookUpType((wwwdata + req.url).split(".").pop()))
                var date = new Date();
                var hour = date.getHours();
                hour = (hour < 10 ? "0" : "") + hour;
                var min  = date.getMinutes();
                min = (min < 10 ? "0" : "") + min;
                var sec  = date.getSeconds();
                sec = (sec < 10 ? "0" : "") + sec;
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                month = (month < 10 ? "0" : "") + month;
                var day  = date.getDate();
                day = (day < 10 ? "0" : "") + day;
                res.writeHead(200, {'Content-Type': mime.lookUpType((wwwdata + req.url).split(".").pop()), 'Set-Cookie': '__mpws_request=' + year + month + day + hour + min + sec});
                res.write(require('./frhtml.js').ConvertirVersHTML(fs.readFileSync(wwwdata + req.url).toString()));
                res.end();
                return;
            } else {
                log.verbose("return " + mime.lookUpType((wwwdata + req.url).split(".").pop()))
                var date = new Date();
                var hour = date.getHours();
                hour = (hour < 10 ? "0" : "") + hour;
                var min  = date.getMinutes();
                min = (min < 10 ? "0" : "") + min;
                var sec  = date.getSeconds();
                sec = (sec < 10 ? "0" : "") + sec;
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                month = (month < 10 ? "0" : "") + month;
                var day  = date.getDate();
                day = (day < 10 ? "0" : "") + day;
                res.writeHead(200, {'Content-Type': mime.lookUpType((wwwdata + req.url).split(".").pop()), 'Set-Cookie': '__mpws_request=' + year + month + day + hour + min + sec}); 
                if (req.url.endsWith("/$command.json")) {
                    prejson = JSON.parse(fs.readFileSync(wwwdata + req.url));
                    prejson.token = "<-- TOKEN TRUNCATED - Access file on real server to get the authentication token -->"
                    res.write(JSON.stringify(prejson));
                } else {
                    res.write(fs.readFileSync(wwwdata + req.url));
                }
                res.end();
                return;
            }
            return;
        } else {
            if (config.errors_show_trace) {
                trace = "<div><code>MPWS WEBSERVER - System Backtrace<br><br>Server Backtrace:<br>404F0000     FILE_NOT_FOUND<br>00000001     SERVER_RUNTIME<br>0000001A     HTTP_WEBSERVER<br><br>Kernel Backtrace:<br></code></div>"
            } else {
                trace = "";
            }
            log.verbose("return 404")
            res.writeHead(404, {'Content-Type': 'text/html'}); 
            res.write("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"><title>MPWS Fatal Error</title></head><body><h1>Internal Server Error</h1>Minteck Projects Web Server returned an error while trying to request your file.<br><br>0x404: Not Found<br>" + req.url + "<br><br><b>Minteck Projects Web Server " + mpws.version + ", kernel " + process.version + "</b>" + trace + "</body></html>");
            res.end();
        }
    }).listen(config.port);
    log.info('Started MPWS at port ' + config.port)
}