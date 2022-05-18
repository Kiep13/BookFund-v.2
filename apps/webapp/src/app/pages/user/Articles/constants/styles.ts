export const STYLES = {
  pageHeader: {
    mb: 3
  },
  pageHeaderActions: {
    display: 'flex',
    gap: '10px'
  },
  content: {
    width: '100%',
    maxWidth: '1440px',
    m: 'auto',
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: {
      xl: '1fr 1fr 1fr 1fr',
      lg: '1fr 1fr 1fr',
      md: '1fr 1fr',
      xs: '1fr'
    },
    gap: '15px',
  },
  folderCard: {
    wrapper: {
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
    defaultFolderName: {
      fontStyle: 'italic'
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
