const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app, (req, res) => {

});

server.listen(port, () => console.log('Example app listening on port 3000!'));