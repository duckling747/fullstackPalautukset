


export const showNote = (note, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTE',
      data: {
        text: note
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'SHOW_NOTE',
        data: {
          text: ''
        }
      })
    }, timeout * 1000);// timeout in seconds
  }
}

const noteReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTE':
      return state = action.data.text
    default:
      return state
  }
}

export default noteReducer
