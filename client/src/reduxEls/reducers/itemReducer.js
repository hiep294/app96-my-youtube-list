import { FETCH_ITEMS, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../actions/type'

const itemReducer = (smallState = [], action) => {
  switch (action.type) {
    case FETCH_ITEMS: return action.payload
    case CREATE_ITEM: return [action.payload, ...smallState]
    case UPDATE_ITEM:
      const updatedItem = action.payload
      return smallState.map(item => {
        if (item._id === updatedItem._id) {
          item = updatedItem
        }
        return item
      })
    case DELETE_ITEM:
      return smallState.filter(item => item._id !== action.payload)
    default: return smallState
  }
}

export default itemReducer