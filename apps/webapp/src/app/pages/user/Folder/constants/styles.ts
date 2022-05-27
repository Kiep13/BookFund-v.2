export const STYLES = {
  header: {
    mb: 3
  },
  content: {
    width: '100%',
    maxWidth: '1440px',
    margin: 'auto'
  },
  searchInput: {
    mb: 1
  },
  cardsWrapper: {
    display: 'grid',
    gridTemplateColumns: {
      xl: '1fr 1fr 1fr 1fr',
      lg: '1fr 1fr 1fr',
      md: '1fr 1fr',
      xs: '1fr'
    },
    gap: '10px',
  },
  articleCard: {
    wrapper: {
      width: '100%',
      maxWidth: 345,
      height: 150,
      display: 'flex',
      justifyContent: 'center',
      m: 'auto'
    },
    actionArea: {
      height: '100%'
    },
    content: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    title: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    subInfo: {
      display: 'flex',
      flexDirection: 'row',
      gap: '3px',
      alignItems: 'center'
    },
    bottomBlock: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    },
    iconActions: {
      padding: 0
    }
  }
}
