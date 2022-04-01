export const STYLES = {
  page: {
    maxWidth: 1250,
    m: 'auto',
    mb: 3
  },
  searchTextField: {
    mt: 2,
    mb: 2
  },
  searchResultWrapper: {
    flexGrow: 1,
    display: 'flex',
    height: 'calc(100vh - 320px)'
  },
  searchResultBox: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  searchResultTabs: {
    borderRight: 1,
    borderColor: 'divider',
    overflow: 'initial'
  }
}


export const STYLES_TAB_PANEL = {
  tabPanel: {
    p: 3,
    height: '100%',
    overflowY: 'auto',
    width: '100%'
  }
}

export const STYLES_TAB_LABEL = {
  tabLabel: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '3px'
  }
}

export const STYLES_BOOK_SEARCH_RESULTS = {
  wrapper: {
    width: '100%'
  },
  book: {
    mb: 2
  },
  loadMoreWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    m: 'auto',
    mt: 2,
  },
  loadMoreButton: {
    width: 350
  },
  noBooks: {
    fontWeight: 200,
    fontSize: '22px'
  }
}

export const STYLES_COLLECTIONS_SEARCH_RESULTS = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  loadMoreWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    m: 'auto',
    mt: 2,
  },
  loadMoreButton: {
    width: 350
  },
  noCollections: {
    fontWeight: 200,
    fontSize: '22px'
  }
}

export const STYLES_AUTHORS_SEARCH_RESULTS = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '20px',
  },
  loadMoreWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    m: 'auto',
    mt: 2,
  },
  loadMoreButton: {
    width: 350
  },
  noAuthors: {
    fontWeight: 200,
    fontSize: '22px'
  }
}
