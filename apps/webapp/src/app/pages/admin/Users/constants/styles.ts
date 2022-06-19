export const STYLES = {
  box: {
    mb: 3
  },
  content: {
    width: '100%',
    maxWidth: '1440px',
    m: 'auto'
  },
  searchInput: {
    mb: 1
  },
  hint: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  cardsWrapper: {
    width: '100%',
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: {
      xl: '1fr 1fr 1fr 1fr',
      lg: '1fr 1fr 1fr',
      md: '1fr 1fr',
      xs: '1fr'
    },
    gap: '15px',
    m: 'auto'
  },
  userCard: {
    wrapper: {
      width: '100%'
    },
    content: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: '10px'
    },
    image: {
      width: '50px',
      height: '50px'
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }
};

