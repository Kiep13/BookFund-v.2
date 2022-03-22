import queryString from 'query-string';

import { FACEBOOK_AUTH_URL, FACEBOOK_SCOPE, GITHUB_AUTH_URL, GOOGLE_AUTH_URL, GOOGLE_SCOPE } from '@utils/constants';
import { environment } from '@environments/environment';

import { IGoogleAuthUrlParams, IFacebookAuthUrlParams, IGitHubAuthUrl } from '../interfaces';
import { Providers } from '../enums';

const getUrlWithQueryParams = (baseUrl: string, params: IGoogleAuthUrlParams | IFacebookAuthUrlParams | IGitHubAuthUrl) => {
  const query = queryString.stringify(params);
  return `${baseUrl}?${query}`;
}

export const getProvidersUrls = () => ({
  [Providers.GOOGLE]: getUrlWithQueryParams(GOOGLE_AUTH_URL, {
    client_id: environment.googleClientId,
    redirect_uri: environment.googleRedirectUri,
    scope: GOOGLE_SCOPE,
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent'
  }),
  [Providers.GITHUB]: getUrlWithQueryParams(GITHUB_AUTH_URL, {
    client_id: environment.githubClientId,
    redirect_uri: environment.githubRedirectUri,
    state: environment.githubState
  }),
  [Providers.FACEBOOK]: getUrlWithQueryParams(FACEBOOK_AUTH_URL, {
    client_id: environment.facebookClientId,
    redirect_uri: environment.facebookRedirectUri,
    scope: FACEBOOK_SCOPE,
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup'
  })
})
