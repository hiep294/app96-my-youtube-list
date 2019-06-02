import { EDIT_ITEM } from '../actions/type'
const initialState = { status: false }
/**
 * in default, return status is false, whatever user choose save, close, delete item, it will return false status
 */
const editItemReducer = (smallState = initialState, action) => {
  switch (action.type) {
    case EDIT_ITEM: return { status: true, data: action.payload }
    default: return initialState
  }
}

export default editItemReducer