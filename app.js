const http = require('http')

const server = http.createServer((req,res)=>{
    res.end('HELLO WORLD\n');
});

const port = 8000;

server.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})