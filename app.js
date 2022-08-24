const http = require("http");
const server = http.createServer();

const users = [
    {
      id: 1,
      name: "Rebekah Johnson",
      email: "Glover12345@gmail.com",
      password: "123qwe",
    },
    {
      id: 2,
      name: "Fabian Predovic",
      email: "Connell29@gmail.com",
      password: "password",
    },
  ];
  
const httpRequestListener = function(request, response){
    const { url, method } = request;

    if(method === 'GET') {
        if(url === '/ping') {
    response.writeHead(200,{'Content-Type' : 'application/json'})
    response.end(JSON.stringify({message : 'pong'}));
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
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                });
                response.writeHead(200,{'Content-Type' : 'application/json'})
                response.end(JSON.stringify({"users" : users}));
            })
        }
    }
}

server.on("request", httpRequestListener)

const IP = '127.0.0.1'
const PORT = 8000

server.listen(PORT, IP, function(){
    console.log('Listening to request on ip $(IP) & port $(PORT)')
})
