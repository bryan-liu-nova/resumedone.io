module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '46.101.212.172',
      username: 'root',
      pem: '~/.ssh/id_rsa',
    }
  },

  app: {
    // TODO: change app name and path
    name: 'resumedone',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
      debug: false
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://resumedone.io',
      MONGO_URL: 'mongodb://localhost/meteor',
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.11.3-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  proxy: {
    domains: 'resumedone.io,www.resumedone.io',
    ssl: {
      // Enable let's encrypt to create free certificates.
      // The email is used by Let's Encrypt to notify you when the
      // certificates are close to expiring.
      letsEncryptEmail: 'info@resumedone.io',
      forceSSL: true
    }
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
