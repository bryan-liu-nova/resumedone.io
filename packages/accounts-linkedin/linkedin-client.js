import { ServiceConfiguration } from 'meteor/service-configuration';
import { Random } from 'meteor/random';
import { OAuth } from 'meteor/oauth';

const LinkedIn = {
  requestCredential(options, credentialRequestCompleteCallback) {
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
      credentialRequestCompleteCallback = options;
      options = {};
    }

    const config = ServiceConfiguration.configurations.findOne({ service: 'linkedin' });
    if (!config) {
      if (credentialRequestCompleteCallback) {
        credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError('Service not configured'));
        return;
      }
    }

    const credentialToken = Random.id();
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    const display = mobile ? 'touch' : 'popup';

    let scope = 'r_liteprofile';
    if (options && options.requestPermissions) {
      scope = options.requestPermissions.join(' ');
    }

    const loginStyle = OAuth._loginStyle('linkedin', config, options);

    const loginUrl =
      `https://www.linkedin.com/oauth/v2/authorization?client_id=${config.appId
      }&redirect_uri=${OAuth._redirectUri('linkedin', config)
      }&display=${display}&scope=${scope
      }&state=${OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl)
      }&response_type=code`;

    OAuth.launchLogin({
      loginService: 'linkedin',
      loginStyle,
      loginUrl,
      credentialRequestCompleteCallback,
      credentialToken,
    });
  },
};

export { LinkedIn };
