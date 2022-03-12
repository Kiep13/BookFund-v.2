export const STYLES = {
  pageHeader: {
    card: {
      mb: 1,
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontWeight: 100,
      m: 0
    }
  },
  page: {
    maxWidth: 1100,
    m: 'auto',
    minHeight: 'calc(100vh - 170px)',
    height: 'fit-content',
  },
  content: {
    display: 'flex',
    gap: '20px'
  },
  authorImage: {
    flex: 1,
    borderRadius: '4px',
    overflow: 'hidden',
    alignSelf: 'center'
  },
  authorInfo: {
    flex: 2
  },
  booksCount: {
    color: '#2079ff'
  },
  bookBox: {
    mb: 2
  },
  loadMoreButton: {
    width: '100%',
    height: 50
  }
}
