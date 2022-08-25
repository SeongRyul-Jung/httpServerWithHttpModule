const http = require("http");
const server = http.createServer();

const users = [
        {
            userID: 1,
            userName: 'Rebekah Johnson',
            postingId: 1,
            postingTitle: '간단한 HTTP API 개발 시작!',
            postingContent: 'Node.js에 내장되어 있는 http 모듈을 사용해서 server를 구현',
        },
        {
            userID: null,
            userName: '',
            postingId: null,
            postingTitle: '',
            postingContent: ','
        },
    ]

//http -v POST http://127.0.0.1:8000/users/signup userId=1 userName='Rebekah Jonson' postingId=1 postingTitle='간단한 HTTP APIt 개발 시작!' postingContent='Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.'
//http -v POST http://127.0.0.1:8000/users/signup userId=2 userName='Fabian Predovie' postingId=2 postingTitle='HTTP의 특성' postingContent='Request/Responsedhk Stateless!!'
//http -v POST http://127.0.0.1:8000/users/signup userId=3 userName='new user 1' postingId=3 postingTitle='내용 1' postingContent='sampleContent3'
//http -v POST http://127.0.0.1:8000/users/signup userId=4 userName='new user 2' postingId=4 postingTitle='내용 2' postingContent='sampleContent4'
//http -v GET http://127.0.0.1:8000/users/signup

const httpRequestListener = function(request, response){
    const { url, method } = request;

    if(method === 'GET') {
        if(url === '/users/signup') {
                response.writeHead(200,{'Content-Type' : 'application/json'})
                response.end(JSON.stringify({"users" : users}));
        };
    } else if (method === "POST") {
        if (url === "/users/signup"){
            let body = "";

            request.on("data", (data) => {
                body += data;
            });

            request.on("end", () => {
                const user = JSON.parse(body);

                users.push({
                    userID: user.userID,
                    userName: user.userName,
                    postingId: user.postingId,
                    postingTitle: user.postingTitle,
                    postingContent: user.postingContent
                });
                response.writeHead(200,{'Content-Type' : 'application/json'})
                // response.end("ok");
                response.end(JSON.stringify({"users" : users}));
            });
        }
    }
}

server.on("request", httpRequestListener)

const IP = '127.0.0.1'
const PORT = 8000

server.listen(PORT, IP, function(){
    console.log('Listening to request on ip $(IP) & port $(PORT)')
})
