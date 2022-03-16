import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

import { Providers } from '../enums';

export const PROVIDER_COLOR = {
  [Providers.GOOGLE]: '#4285F4',
  [Providers.LINKEDIN]: '#0073b1',
  [Providers.FACEBOOK]: '#4267b2'
}

export const PROVIDER_ICON = {
  [Providers.GOOGLE]: GoogleIcon,
  [Providers.LINKEDIN]: LinkedInIcon,
  [Providers.FACEBOOK]: FacebookIcon
}

export const PROVIDER_NAME = {
  [Providers.GOOGLE]: 'Google',
  [Providers.LINKEDIN]: 'LinkedIn',
  [Providers.FACEBOOK]: 'Facebook'
}
