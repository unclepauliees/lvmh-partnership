const http = require('node:http');
const path = require('node:path');
const send = require('next/dist/compiled/send');

// Serve the exported deck with byte-range support for its videos.
const root = path.resolve(__dirname, '../out');
http.createServer((req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  send(req, new URL(req.url, 'http://127.0.0.1').pathname, {
    root, index: ['index.html'], extensions: ['html'], dotfiles: 'deny',
  }).on('error', error => {
    res.statusCode = error.statusCode || 500;
    res.end(res.statusCode === 404 ? 'Not found' : 'Unable to serve preview');
  }).pipe(res);
}).listen(3196, '127.0.0.1', () => console.log('Local deck preview: http://127.0.0.1:3196'));
