const server = require('./server.js');
const {route} = require('./router.js');
const requestHandlers = require('./requestHandlers.js');
const {config} = require('./config.js');

const handle = {};
const routerArr = Object.entries(config);
routerArr.forEach((item) => {
    handle[item[0]] = requestHandlers[item[1]];
});

server.start(route, handle);