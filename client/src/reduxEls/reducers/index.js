import itemReducer from './itemReducer'
import editedItemReducer from './editedItemReducer'

const rootReducer = (bigState = {}, action) => ({
  items: itemReducer(bigState.items, action),
  editedItem: editedItemReducer(bigState.editedItem, action)
})

export default rootReducer