const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000;

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathname === '/create' && request.method === 'POST') {
    const filePath = path.join(__dirname, query.filename);
    fs.writeFile(filePath, query.content || '', (err) => {
      if (err) {
        response.statusCode = 500;
        response.end(`Error creating file: ${err.message}`);
      } else {
        response.statusCode = 200;
        response.end('File created successfully');
      }
    });
  } else if (pathname === '/read' && request.method === 'GET') {
    const filePath = path.join(__dirname, query.filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        response.statusCode = 500;
        response.end(`Error reading file: ${err.message}`);
      } else {
        response.statusCode = 200;
        response.end(data);
      }
    });
  } else if (pathname === '/delete' && request.method === 'DELETE') {
    const filePath = path.join(__dirname, query.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        response.statusCode = 500;
        response.end(`Error deleting file: ${err.message}`);
      } else {
        response.statusCode = 200;
        response.end('File deleted successfully');
      }
    });
  } else {
    response.statusCode = 404;
    response.end('Endpoint not found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
