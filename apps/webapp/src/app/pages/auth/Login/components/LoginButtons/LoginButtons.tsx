import { Box, Button } from '@mui/material';

import { PROVIDER_COLOR, PROVIDER_NAME, PROVIDER_ICON, STYLES_LOGIN_BUTTONS } from '../../constants';
import { Providers } from '../../enums';
import { getProvidersUrls } from '../../helpers';

export const LoginButtons = () => {
  const providersUrls = getProvidersUrls();

  return (
    <Box sx={STYLES_LOGIN_BUTTONS.wrapper}>
      {Object.values(Providers).map(provider => {
        const Icon = PROVIDER_ICON[provider];

        return (
          <Box
            key={provider}
            sx={STYLES_LOGIN_BUTTONS.buttonWrapper}>
            <a href={providersUrls[provider]}>
              <Button
                sx={{
                  ...STYLES_LOGIN_BUTTONS.button,
                  color: PROVIDER_COLOR[provider],
                  border: `1px solid ${PROVIDER_COLOR[provider]}`
                }}
              >
                <Icon/>
                {PROVIDER_NAME[provider]}
              </Button>
            </a>
          </Box>
        )
      })}
    </Box>
  )
}
