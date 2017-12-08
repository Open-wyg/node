const querystring = require("querystring"),
      fs = require('fs'),
      formidable = require("formidable");

const readFile = function(path,params){
    return new Promise((resolve, reject) => {
        fs.readFile(path,params,(err,data) => err ? reject(err) : resolve(data));
    });
}

async function start(response){
    console.log('start');
    let body = '';
    try {
        body = await readFile('./index.html','utf8');
    } catch(e) {
        body = '读取失败';
    }
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
    
}

//文本上传
function upload(response, postData){
    response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    response.write(`提交数据：${querystring.parse(postData).text}`);
    response.end();
}
//图片上传
// function upload(response, request){
//     const form = new formidable.IncomingForm();
//     form.parse(request, function (error, fields, files) {
//         console.log("parsing done");
//         fs.renameSync(files.upload.path, "./pic/test.png");
//         response.writeHead(200, { "Content-Type": "text/html" });
//         response.write("received image:<br/>");
//         response.write("<img src='/show' />");
//         response.end();
//     });
// }

function show(response){
    fs.readFile('./pic/test.png', 'binary', (err, file) => {
        if(err){
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(`${err}\n`);
            response.end();
        }else{
            response.writeHead(200, { "Content-Type": "image/png" });
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;