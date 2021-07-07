import { ServiceConfiguration } from 'meteor/service-configuration';
import { OAuth } from 'meteor/oauth';
import { HTTP } from 'meteor/http';

const getIdentity = (accessToken) => {
  const config = ServiceConfiguration.configurations.findOne({ service: 'linkedin' });
  if (!config) {
    throw new ServiceConfiguration.ConfigError();
  }

  try {
    const result = HTTP.get('https://www.linkedin.com/v1/people/~', {
      params: {
        oauth2_access_token: accessToken,
        format: 'json',
      },
    });

    if (result.error) {
      throw result.error;
    }
    return result.data.response[0];
  } catch (err) {
    throw Object.assign(
      new Error(`Failed to fetch identity from LinkedIn. ${err.message}`),
      { response: err.response },
    );
  }
};

const LinkedIn = {
  retrieveCredential(credentialToken) {
    return OAuth.retrieveCredential(credentialToken);
  },
  handleAuthFromAccessToken(accessToken, expiresAt) {
    const whitelisted = ['firstName', 'headline', 'lastName'];

    const identity = getIdentity(accessToken);

    const serviceData = {
      accessToken,
      expiresAt,
    };

    const fields = whitelisted.reduce((o, k) => Object.assign(o, { [k]: identity[k] }), {});
    Object.assign(serviceData, fields);

    return {
      serviceData,
      options: {
        profile: {
          name: `${identity.firstName} ${identity.lastName}`,
        },
      },
    };
  },
};

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
const getTokenResponse = (query) => {
  const config = ServiceConfiguration.configurations.findOne({ service: 'linkedin' });
  if (!config) {
    throw new ServiceConfiguration.ConfigError('Service not configured');
  }

  let responseContent;

  try {
    // Request an access token
    responseContent = HTTP.post('https://www.linkedin.com/oauth/v2/accessToken', {
      params: {
        grant_type: 'authorization_code',
        client_id: config.appId,
        redirect_uri: OAuth._redirectUri('linkedin', config),
        client_secret: OAuth.openSecret(config.secret),
        code: query.code,
      },
    }).content;
  } catch (err) {
    throw Object.assign(
      new Error(`Failed to complete OAuth handshake with LinkedIn. ${err.message}`),
      { response: err.response },
    );
  }

  const parsedResponse = JSON.parse(responseContent);

  const linkedinAccessToken = parsedResponse.access_token;
  const linkedinExpires = parsedResponse.expires_in;

  if (!linkedinAccessToken) {
    throw new Error(`${'Failed to complete OAuth handshake with LinkedIn ' +
    '-- can\'t find access token in HTTP response. '}${responseContent}`);
  }
  return {
    accessToken: linkedinAccessToken,
    expiresIn: linkedinExpires,
  };
};

OAuth.registerService('linkedin', 2, null, (query) => {
  const response = getTokenResponse(query);
  const { accessToken, expiresIn } = response;

  return LinkedIn.handleAuthFromAccessToken(accessToken, (+new Date()) + (1000 * expiresIn));
});

export { LinkedIn };
