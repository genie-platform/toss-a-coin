module.exports = {
  api: {
    allowCors: true,
    secret: 'secret',
    secretOptions: {
      expiresIn: '30d'
    },
    port: 3001,
    auth: {
      google: {
        clientId: '258894479393-0msb45loib4653r6kq2bc21kdiq0jbr4.apps.googleusercontent.com'
      }
    }
  },
  session: {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  },
  mongo: {
    debug: true,
    uri: 'mongodb://localhost/last-survivor',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  mail: {
    sendgrid: {
      templates: {}
    }
  },
  crypto: {
    apiBase: "http://localhost:3000/api/v1"
  }
}
