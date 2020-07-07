
  
  const initialState = ''
  
  export const showNote = (note) => {
    return {
      type: 'SHOW_NOTE',
      data: {
          text: note
      }
    }
  }
  
  const noteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_NOTE':
        return state = action.data.text
      default:
        return state
    }
  }
  
  export default noteReducer
  