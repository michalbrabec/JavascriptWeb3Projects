import http from 'http'
import {promises as fs} from 'fs'
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  console.log(`request for ${req.url}`)

  if (req.url === '/data.json') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'X-Powered-By': 'Node.js',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    });
    res.end(await fs.readFile(path.join(__dirname, '..', 'data.json'),{encoding: 'utf8'}));
  }
  else if (req.url === '/manifest.json') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'X-Powered-By': 'Node.js',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    });
    res.end(await fs.readFile(path.join(__dirname, '..', 'manifest.json'),{encoding: 'utf8'}));
  }
  else if (req.url === '/icons/icon.webp') {
    res.writeHead(200, {
      'Content-Type': 'image/webp',
      'X-Powered-By': 'Node.js',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    });
    res.end(await fs.readFile(path.join(__dirname, '..', 'icons', 'icon.webp')));
  }
  else if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'X-Powered-By': 'Node.js',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    });
    res.end(await fs.readFile(path.join(__dirname, '..', 'index.html'),{encoding: 'utf8'}));
  }
  else {
    res.writeHead(404)
    res.end()
  }
});

const port = process.argv[2]
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});