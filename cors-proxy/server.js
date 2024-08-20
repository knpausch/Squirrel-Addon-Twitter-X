// server.js
const cors_anywhere = require('cors-anywhere');
const port = 3000; // Port number for your proxy server

cors_anywhere.createServer({
    // Allow all origins by setting '*' (CORS wildcard)
    originWhitelist: [], // Allow all origins
}).listen(port, () => {
    console.log(`CORS proxy server running on port ${port}`);
});
