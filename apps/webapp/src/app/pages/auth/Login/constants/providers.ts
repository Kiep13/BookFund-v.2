import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';

import { Providers } from '@utils/enums';

export const PROVIDER_COLOR = {
  [Providers.Google]: '#4285F4',
  [Providers.GitHub]: '#333333',
  [Providers.Facebook]: '#4267b2'
}

export const PROVIDER_ICON = {
  [Providers.Google]: GoogleIcon,
  [Providers.GitHub]: GitHubIcon,
  [Providers.Facebook]: FacebookIcon
}

export const PROVIDER_NAME = {
  [Providers.Google]: 'Google',
  [Providers.GitHub]: 'GitHub',
  [Providers.Facebook]: 'Facebook'
}
