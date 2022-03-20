import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';

import { Providers } from '../enums';

export const PROVIDER_COLOR = {
  [Providers.GOOGLE]: '#4285F4',
  [Providers.GITHUB]: '#333333',
  [Providers.FACEBOOK]: '#4267b2'
}

export const PROVIDER_ICON = {
  [Providers.GOOGLE]: GoogleIcon,
  [Providers.GITHUB]: GitHubIcon,
  [Providers.FACEBOOK]: FacebookIcon
}

export const PROVIDER_NAME = {
  [Providers.GOOGLE]: 'Google',
  [Providers.GITHUB]: 'GitHub',
  [Providers.FACEBOOK]: 'Facebook'
}
