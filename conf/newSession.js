var session = require('express-session');
var redisStore = require('connect-redis')(session);

// session 配置
var option = {
    name: 'connect.sid',
/*    genid: (function(req){
        return req.session
    })(),*/
    secret: Math.random().toString(31).substr(2, 128),
    resave: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        signed: false,
        domain: 'localhost'
    },
    store: new redisStore({
        ttl: '600',
    })
}
var newSession = session(option);

module.exports = newSession;