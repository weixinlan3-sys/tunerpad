const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
    try {
        console.log(`Request: ${req.url}`);
        
        // Remove query strings
        const urlPath = req.url.split('?')[0];
        let safeUrl = decodeURI(urlPath);
        if (safeUrl.startsWith('/')) safeUrl = safeUrl.slice(1);
        if (safeUrl === '') safeUrl = 'index.html';

        const filePath = path.join(__dirname, safeUrl);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error(`404 Not Found: ${filePath}`);
            res.writeHead(404);
            res.end(`404 Not Found: ${safeUrl}`);
            return;
        }

        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;
        
        const extname = path.extname(filePath).toLowerCase();
        let contentType = 'text/html';
        switch (extname) {
            case '.js': contentType = 'text/javascript'; break;
            case '.css': contentType = 'text/css'; break;
            case '.json': contentType = 'application/json'; break;
            case '.png': contentType = 'image/png'; break;
            case '.jpg': contentType = 'image/jpg'; break;
            case '.jpeg': contentType = 'image/jpg'; break;
            case '.webp': contentType = 'image/webp'; break;
            case '.mp4': contentType = 'video/mp4'; break; 
            case '.svg': contentType = 'image/svg+xml'; break;
        }

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            
            if(start >= fileSize || end >= fileSize) {
                 res.writeHead(416, {'Content-Range': `bytes */${fileSize}`});
                 res.end();
                 return;
            }

            const file = fs.createReadStream(filePath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType,
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': contentType,
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
        }
    } catch (e) {
        console.error('Server Error:', e);
        if (!res.headersSent) {
            res.writeHead(500);
            res.end('Internal Server Error');
        }
    }
});

server.on('error', (e) => {
    console.error('Server socket error:', e);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Serving files from: ${__dirname}`);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});