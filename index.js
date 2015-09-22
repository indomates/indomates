var Hapi = require('Hapi');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: process.env.PORT || 3000
});

server.register([require('bell'), require('inert'), require('hapi-auth-cookie')], function(err) {
  if (err) {
    throw err;
  }

  server.auth.strategy('session', 'cookie', {
    cookie: 'sid',
    password: 'cookie_encryption_password',
    isSecure: false
  });

  server.auth.strategy('facebook', 'bell', {
    provider: 'facebook',
    password: 'password',
    clientId: '414923908703237',
    clientSecret: '30d7f3be455712049ed662c751eb1a66',
    isSecure: false,
    location: server.info.uri
  });

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: 'password',
    clientId: '643756479515-s2mcuurb8hrpto260jagvl2sni7m0tul.apps.googleusercontent.com',
    clientSecret: 'J9kgag9G6_lTpUpmtJ45kw4B',
    isSecure: false,
    location: server.info.uri
  });

  server.auth.default('session');

  server.route(require('./routes/routes'));

  server.start(function(err) {
    if (err) {
      throw err;
    }

    console.log('Server running at:', server.info.uri);
  });

});
