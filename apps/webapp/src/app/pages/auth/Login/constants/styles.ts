export const STYLES_COPYRIGHT = {
  text: {
    mt: 1
  }
}

export const STYLES_LOGIN_BUTTONS = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  buttonWrapper: {
    mb: 2,
    width: '100%'
  },
  button: {
    width: '100%'
  }
}

export const STYLES_LOGIN_PAGE = {
  pageGrid: {
    height: '100vh'
  },
  imageBlock: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: (t) =>
      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  signInForm: {
    my: 8,
    mx: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    mb: 2
  },
  signInLabel: {
    fontWeight: 300
  },
  buttons: {
    width: '80%',
    mt: 1
  },
  copyright: {
    mt: 5
  }
}
