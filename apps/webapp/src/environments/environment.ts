export const environment = {
  production: false,
  backEndUrl: process.env['NX_BACK_END_URL'],

  googleClientId: process.env['NX_GOOGLE_CLIENT_ID'] || '',
  googleRedirectUri: process.env['NX_GOOGLE_REDIRECT_URI'] || '',

  githubClientId: process.env['NX_GITHUB_CLIENT_ID'] || '',
  githubRedirectUri: process.env['NX_GITHUB_REDIRECT_URI'] || '',
  githubState: process.env['NX_GITHUB_STATE'] || '',

  facebookClientId: process.env['NX_FACEBOOK_CLIENT_ID'] || '',
  facebookRedirectUri: process.env['NX_FACEBOOK_REDIRECT_URI'] || ''
};
