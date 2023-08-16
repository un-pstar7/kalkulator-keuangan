const { createServer } = require('http');
const { parse } = require('url');
const { join } = require('path');
const { readFileSync } = require('fs');

const server = createServer((req, res) => {
  const { pathname } = parse(req.url);
  const filePath = join(__dirname, 'public', pathname);

  if (pathname.startsWith('/v1') && pathname.endsWith('.js')) {
    const customJSPath = join(__dirname, 'public', 'v1', 'proxy.js');
    const customJSContent = readFileSync(customJSPath, 'utf8');
    res.setHeader('Content-Type', 'application/javascript');
    res.end(customJSContent);
  } else {
    res.statusCode = 404;
    res.end('File not found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
