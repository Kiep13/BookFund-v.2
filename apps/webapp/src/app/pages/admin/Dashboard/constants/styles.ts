const CARD_HEIGHT: string = '470px'

export const STYLES = {
  loaderWrapper: {
    height: 'calc(100vh - 160px)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    display: 'flex',
    gap: 2,
    mb: 3
  },
  overallStatisticCard: {
    flex: 1
  },
  cardRow: {
    display: 'flex',
    gap: 2,
    mb: 3
  },
  actionsStatisticCard: {
    flex: 2.05,
    height: CARD_HEIGHT
  },
  genresCard: {
    flex: 1,
    height: CARD_HEIGHT
  },
  popularBookCard: {
    flex: 1,
    height: CARD_HEIGHT
  },
  commentsCard: {
    flex: 2,
    height: CARD_HEIGHT
  },
  socialAuthCard: {
    flex: 2,
    height: CARD_HEIGHT
  }
}
