const HEADER_HEIGHT = '55px';

export const STYLES = {
  page: {
    wrapper: {
      width: '100%',
      height: '100vh',
      overflow: 'hidden'
    }
  },
  header: {
    wrapper: {
      minHeight: `${HEADER_HEIGHT} !important`,
      maxHeight: HEADER_HEIGHT,
      display: 'flex',
      justifyContent: 'space-between',
      pr: '35px !important'
    },
    titleBlock: {
      display: 'flex',
      alignItems: 'center'
    },
    title: {
      mb: 0
    },
    selector: {
      minWidth: 120
    }
  },
  content: {
    height: `calc(100vh - ${HEADER_HEIGHT})`,
    mt: HEADER_HEIGHT
  },
  document: {
    content: {
      flex: 1,
      justifyContent: 'center',
      height: 'calc(100% - 60px)',
      pt: '15px',
      pb: '15px'
    },
    actionButtons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '40px',
      mb: '20px'
    },
    pageInput: {
      width: '60px',
      pt: '5px',
      pb: '5px'
    }
  }
}
