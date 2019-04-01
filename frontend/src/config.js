module.exports = {
    GAME_HEIGHT: 640,
    GAME_WIDTH: 800,
    DATABASE: "jjc",
    TRACK_HEIGHT: 800,
    TRACK_WIDTH: 4998,


    // Local config
    // BACKEND_URL:  "http://localhost:8000",
    // BACKEND_PORT: 8000,
    // SOCKET_PORT: 8081,
    // MYSQL_PORT: 8889,
    MYSQL_USER: 'root',
    MYSQL_PASS: 'root',
    // APP_PORT: 3000,
    // SERVER_TYPE: "http",
    // SOCKET_SERVER: function(http, app, fs) {return http.Server(app);},
    // SOCKET_URL: 'ws://localhost:8081',


    // Server config
    BACKEND_URL: "https://forumla0.julesyan.com/api",
    BACKEND_PORT: 8000,
    SOCKET_PORT: 8081,
    MYSQL_PORT: 3306,
    APP_PORT: 3000,
    SERVER_TYPE: "https",
    SOCKET_SERVER: function(https, app, fs) {
        return new https.createServer({
            cert: fs.readFileSync('/etc/letsencrypt/live/formula0.julesyan.com/cert.pem'),
            key: fs.readFileSync('/etc/letsencrypt/live/formula0.julesyan.com/privkey.pem')
        });
    },
    SOCKET_URL: 'wss://formula0.julesyan.com:8081',
}
