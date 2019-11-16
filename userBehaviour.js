/**
 * @author Taha Al-Jody <taha@ta3design.com>
 * https://github.com/TA3/web-user-behaviour
 */
var userBehaviour = (function () {
    var defaults = {
        userInfo: true,
        clicks: true,
        mouseMovement: true,
        mouseMovementInterval: 1,
        mouseScroll: true,
        mousePageChange: true, //todo
        timeCount: true,
        clearAfterProcess: true, // todo
        processTime: 15,
        processData: function (results) {
            console.log(results);
        },
    };
    var user_config = {};
    var mem = {
        processInterval: null,
        mouseInterval: null,
        mousePosition: [], //x,y,timestamp
        eventListeners: {
            scroll: null,
            click: null,
            mouseMovement: null,
        },
        eventsFunctions: {
            scroll: () => {
                results.mouseScroll.push([window.scrollX, window.scrollY, getTimeStamp()]);
            },
            click: (e) => {
                results.clicks.clickCount++;
                var path = [];
                var node = "";
                e.path.forEach((el, i) => {
                    if ((i !== e.path.length - 1) && (i !== e.path.length - 2)) {
                        node = el.localName;
                        (el.className !== "") ? el.classList.forEach((clE) => {
                            node += "." + clE
                        }): 0;
                        (el.id !== "") ? node += "#" + el.id: 0;
                        path.push(node);
                    }
                })
                path = path.reverse().join(">");
                results.clicks.clickDetails.push([e.clientX, e.clientY, path, getTimeStamp()]);
            },
            mouseMovement: (e) => {
                mem.mousePosition = [e.clientX, e.clientY, getTimeStamp()];
            }
        }
    };
    var results = {};

    function resetResults() {
        results = {
            userInfo: {
                appCodeName: navigator.appCodeName || '',
                appName: navigator.appName || '',
                vendor: navigator.vendor || '',
                platform: navigator.platform || '',
                userAgent: navigator.userAgent || ''
            },
            time: { //todo
                startTime: 0,
                currentTime: 0,
            },
            clicks: {
                clickCount: 0,
                clickDetails: []
            },
            mouseMovements: [],
            mouseScroll: [],
            contextChange: [], //todo
            //keyLogger: [], //todo

        }
    };
    resetResults();

    function getTimeStamp() {
        return Date.now();
    };

    function config(ob) {
        user_config = {};
        Object.keys(defaults).forEach((i) => {
            i in ob ? user_config[i] = ob[i] : user_config[i] = defaults[i];
        })
    };

    function start() {

        if (Object.keys(user_config).length !== Object.keys(defaults).length) {
            console.log("no config provided. using default..");
            user_config = defaults;
        }
        // TIME SET
        if (user_config.timeCount !== undefined && user_config.timeCount) {
            results.time.startTime = getTimeStamp();
        }
        // MOUSE MOVEMENTS
        if (user_config.mouseMovement) {
            mem.eventListeners.mouseMovement = window.addEventListener("mousemove", mem.eventsFunctions.mouseMovement);
            mem.mouseInterval = setInterval(() => {
                if (mem.mousePosition && mem.mousePosition.length) { //if data has been captured
                    if (!results.mouseMovements.length || ((mem.mousePosition[0] !== results.mouseMovements[results.mouseMovements.length - 1][0]) && (mem.mousePosition[1] !== results.mouseMovements[results.mouseMovements.length - 1][1]))) {
                        results.mouseMovements.push(mem.mousePosition)
                    }
                }
            }, defaults.mouseMovementInterval * 1000);
        }
        //CLICKS
        if (user_config.clicks) {
            mem.eventListeners.click = window.addEventListener("click", mem.eventsFunctions.click);
        }
        //SCROLL
        if (user_config.mouseScroll) {
            mem.eventListeners.scroll = window.addEventListener("scroll", mem.eventsFunctions.scroll);
        }
        //PROCESS INTERVAL
        if (user_config.processTime !== false) {
            mem.processInterval = setInterval(() => {
                user_config.processData(result());
            }, user_config.processTime * 1000)
        }
    };

    function processResults() {
        user_config.processData(result());
        if (user_config.clearAfterProcess) {
            resetResults();
        }
    }

    function stop() {
        if (user_config.processTime !== false) {
            clearInterval(mem.processInterval);
        }
        clearInterval(mem.mouseInterval);
        window.removeEventListener("scroll", mem.eventsFunctions.scroll);
        window.removeEventListener("click", mem.eventsFunctions.click);
        window.removeEventListener("mousemove", mem.eventsFunctions.mouseMovement);
    }

    function result() {
        if (user_config.userInfo === false && userBehaviour.showResult().userInfo !== undefined) {
            delete userBehaviour.showResult().userInfo;
        }
        if (user_config.timeCount !== undefined && user_config.timeCount) {
            results.time.currentTime = getTimeStamp();
        }
        return results
    };

    function showConfig() {
        if (Object.keys(user_config).length !== Object.keys(defaults).length) {
            return defaults;
        } else {
            return user_config;
        }
    };
    return {
        showConfig: showConfig,
        config: config,
        start: start,
        stop: stop,
        showResult: result,
        processResults: processResults,
    };

})();