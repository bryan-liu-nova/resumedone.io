Package.describe({
  name: 'accounts-linkedin',
  version: '0.1.0',
  summary: 'oAuth for LinkedIn',
  git: '',
  documentation: 'README.md',
});

Package.onUse((api) => {
  api.versionsFrom('1.8');
  api.use(['ecmascript', 'oauth2', 'random', 'oauth', 'service-configuration']);
  api.use('http', ['server']);
  api.mainModule('linkedin-server.js', 'server');
  api.mainModule('linkedin-client.js', 'client');
  api.addFiles('accounts-linkedin-server.js', 'server');
  api.addFiles('accounts-linkedin-client.js', 'client');
});
