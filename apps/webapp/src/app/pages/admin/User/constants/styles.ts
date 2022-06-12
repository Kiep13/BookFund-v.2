export const STYLES = {
  page: {
    maxWidth: '100%',
    m: 'auto',
    minHeight: 'calc(100vh - 210px)',
    height: 'fit-content',
  },
  userContent: {
    wrapper: {
      p: 2,
      display: 'flex',
      flexDirection: {
        lg: 'row',
        md: 'column',
        xs: 'column'
      },
      alignItems: {
        lg: 'flex-start',
        md: 'center',
        xs: 'center'
      },
      justifyContent: {
        lg: 'flex-start',
        md: 'center',
        xs: 'center'
      },
      gap: '15px',
      maxWidth: '1100px',
      width: '100%',
      m: 'auto'
    },
    image: {
      width: '200px',
      height: '200px'
    },
    titleWrapper: {
      mb: 3
    },
    title: {
      fontWeight: 100,
      mb: 0
    },
    propertyWrapper: {
      display: 'flex',
      fontSize: '0.875rem',
      mb: 0.5,
    },
    propertyLabel: {
      color: '#888888'
    }
  }
}
