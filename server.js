const http = require("http");
const url = require('url');


function start(route, handle){
    function onRequest(request, response) {
        let postData = "";
        let pathName = url.parse(request.url).pathname;
        if (pathName == '/favicon.ico'){ 
            return;
        }

        //文本上传
        request.setEncoding("utf8");

        request.on('data', (postDataChunk) => {
            postData += postDataChunk;
            console.log(`111+${postDataChunk}`);

        });
        request.on('end', () => {
            route(handle, pathName, response, postData);
        });

        //route(handle, pathName, response, request)
    }
    http.createServer(onRequest).listen(9000);
}

exports.start = start;
