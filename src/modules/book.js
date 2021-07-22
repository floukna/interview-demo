export const CREATE = 'book/CREATE'
export const DELETE = 'book/DELETE'
export const UPDATE = 'book/UPDATE'

const initialState = {
  data: []
  //   isIncrementing: false,
  //   isDecrementing: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      state.data.push(action.payload.data)
      return {
        ...state
      }
    case UPDATE:
      const findIndex = state.data.findIndex(
        val => val.id === action.payload.data.id
      )
      //   let newData = [...state.data]
      //   newData[findIndex] = { ...newData[findIndex]}
      state.data[findIndex] = { ...action.payload.data }
      return {
        ...state
      }
    case DELETE:
      state.data = state.data.filter(val => val.id !== action.payload)
      return {
        ...state
      }
    default:
      return state
  }
}

export const createBook = data => {
  return dispatch => {
    dispatch({
      type: CREATE,
      payload: {
        data: {
          ...data,
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          id: Date.now()
        }
      }
    })
  }
}

export const updateBook = data => {
  return dispatch => {
    dispatch({
      type: UPDATE,
      payload: { data }
    })
  }
}

export const deleteBook = id => {
  return dispatch => {
    dispatch({
      type: DELETE,
      payload: id
    })
  }
}
