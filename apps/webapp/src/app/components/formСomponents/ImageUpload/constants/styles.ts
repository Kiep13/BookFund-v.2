import { ERROR_COLOR } from '@utils/constants';

export const STYLES_IMAGE_FORM = {
  formWrapper: {
    display: 'flex',
    alignItems: 'top'
  },
  fileInputWrapper: {
    flex: 3,
    height: '56px',
    display: 'flex',
    alignItems: 'center'
  },
  fileInput: {
    display: 'none',
  },
  orPutLabel: {
    flex: 1,
    height: '56px',
    display: 'flex',
    alignItems: 'center'
  },
  urlInput: {
    flex: 8
  },
  errorText: {
    mt: 1,
    fontSize: 12,
    color: '#d32f2f',
    ms: 2,
    me: 2,
  },
  errorButton: {
    color: ERROR_COLOR,
    borderColor: ERROR_COLOR
  }
}

export const STYLES_IMAGE_PROMO = {
  promoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageWrapper: {
    maxHeight: '300px',
    width: 'fit-content',
    display: 'flex',
    borderRadius: '8px',
    mb: 2,
  },
  image: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '4px',
    position: 'relative'
  }
}
