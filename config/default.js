module.exports = {
  api: {
    allowCors: true,
    secret: 'secret',
    tokenExpiresIn: '7d',
    port: 3001,
    auth: {
      google: {
      }
    }
  },
  mongo: {
    debug: true,
    uri: 'mongodb://localhost/test',
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
