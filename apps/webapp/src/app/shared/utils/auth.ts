import queryString from 'query-string';

import { GOOGLE_AUTH_URL, GOOGLE_SCOPE } from '@core/constants';
import { environment } from '@environments/environment';
import { IGoogleAuthUrlParams, Providers } from '@pages/auth/login';

const getUrlWithQueryParams = (baseUrl: string, params: IGoogleAuthUrlParams) => {
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
  })
})
