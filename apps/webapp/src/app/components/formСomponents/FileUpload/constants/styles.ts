import { ERROR_COLOR } from '@utils/constants';

export const STYLES = {
  fileForm: {
    input: {
      display: 'none'
    },
    label: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      alignItems: 'center',
      height: '56px',
      borderRadius: '4px',
      border: '1px solid #c4c4c4',
      padding: 1.5
    },
    errorLabel: {
      border: '1px solid #d32f2f',
    },
    errorButton: {
      color: ERROR_COLOR,
      borderColor: ERROR_COLOR
    },
    error: {
      mt: 1,
      fontSize: 12,
      color: ERROR_COLOR,
      ms: 2,
      me: 2,
    }
  },
  filePromo: {
    wrapper: {
      height: '56px',
      borderRadius: '4px',
      border: '1px solid #c4c4c4',
      display: 'flex',
      alignItems: 'center',
      padding: 2,
      justifyContent: 'space-between'
    },
    leftPart: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      overflowX: 'hidden'
    },
    pdfIcon: {
      fontSize: 45,
      color: '#c4c4c4'
    },
    deleteIcon: {
      fontSize: 30,
      cursor: 'pointer'
    }
  }
}
