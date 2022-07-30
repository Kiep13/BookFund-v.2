export const STYLES_PAGE_WRAPPER = {
  pageWithSidebar: {
    height: '100vh',
    display: 'flex'
  },
  pageWithoutSidebar: {
    maxWidth: {
      lg: 'calc(100% - 350px)',
      md: '100%'
    },
    width: '100%',
    m: 'auto'
  },
  box: {
    width: 'calc(100% - 200px)',
    flexGrow: 1,
    p: 3,
    height: 'fit-content'
  },
  header: {
    mb: 4
  }
}

export const STYLES_HEADER = {
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  loginButton: {
    ml: 2
  }
}

export const STYLES_SIDENAV = {
  drawer: {
    width: 200,
    flexShrink: 0,
    border: 0,
    [`& .MuiDrawer-paper`]: {width: 200, boxSizing: 'border-box'},
  },
  linksBlock: {
    marginTop: 'auto !important'
  }
}

export const STYLES_NAV_LINK = {
  navItem: {
    color: 'black',
    textDecoration: 'none'
  },
  navIcon: {
    color: '#2079ff'
  },
  navLink: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#ddeeff !important'
    }
  },
  navLinkActive: {
    display: 'block',
    color: 'black',
    backgroundColor: '#63a4ff !important',
    backgroundImage: 'linear-gradient(270deg, #ddeeff 60%, #63a4ff 95%)'
  }
}
