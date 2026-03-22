const https = require('https');

const req = https.request({
  hostname: 'api.github.com',
  path: '/search/repositories?q=neondatabase/create-branch-action',
  method: 'GET',
  headers: { 'User-Agent': 'Node.js' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
req.end();
