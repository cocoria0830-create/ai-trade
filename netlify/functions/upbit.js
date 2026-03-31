const https = require('https');

exports.handler = async function(event) {
  const path = event.queryStringParameters?.path || '/v1/ticker?markets=KRW-BTC';
  
  return new Promise((resolve) => {
    const url = 'https://api.upbit.com' + path;
    https.get(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: data
        });
      });
    }).on('error', (e) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: e.message })
      });
    });
  });
};
