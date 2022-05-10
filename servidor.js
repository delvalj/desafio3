
// Codigo del server
const http = require("http");

const server = http.createServer((req, res) => {
    res.end('Hola Mundo!');
});

server.listen(8080, () => console.log("Server corriendo!"));

// Math.random();