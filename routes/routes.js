module.exports = [
  {
    method: ['GET', 'POST'],
    path: '/login/facebook',
    config: {
      auth: {
        strategy: 'facebook',
        mode: 'try'
      },
      handler: function(request, reply) {
        if (!request.auth.isAuthenticated) {
          return reply('Authentication failed due to: ' + request.auth.error.message);
        }

        request.auth.session.set(request.auth.credentials);

        return reply.redirect('/dashboard');
      }
    }
  },

  {
    method: ['GET', 'POST'],
    path: '/login/google',
    config: {
      auth: {
        strategy: 'google',
        mode: 'try'
      },
      handler: function(request, reply) {
        if (!request.auth.isAuthenticated) {
          return reply('Authentication failed due to: ' + request.auth.error.message);
        }

        request.auth.session.set(request.auth.credentials.profile);

        return reply.redirect('/dashboard');
      }
    }
  },

  {
    method: 'GET',
    path: '/dashboard/{param*}',
    config: {
      auth: {
        mode: 'required'
      },
      handler: {
        directory: {
          path: 'public/dashboard'
        }
      }
    }
  },

  {
    method: 'GET',
    path: '/logout',
    handler: function(request, reply) {
      request.auth.session.clear();
      return reply.redirect('/');
    }
  },

  {
    method: 'GET',
    path: '/{param*}',
    config: {
      auth: {
        mode: 'optional'
      },
      handler: {
        directory: {
          path: 'public'
        }
      }
    }
  },

  {
    method: 'GET',
    path: '/user',
    config: {
      auth: {
        mode: 'required'
      },
      handler: function(request, reply) {
        return reply(request.auth.credentials.profile);
      }
    }
  }
]
