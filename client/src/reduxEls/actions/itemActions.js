import { FETCH_ITEMS, CREATE_ITEM, EDIT_ITEM, CANCEL_EDITING_ITEM, UPDATE_ITEM, DELETE_ITEM } from './type'

export const fetchItems = (items) => ({
  type: FETCH_ITEMS,
  payload: items
})

export const createItem = (item) => ({
  type: CREATE_ITEM,
  payload: item
})

export const editItem = (item) => ({
  type: EDIT_ITEM,
  payload: item
})

export const cancelEditingItem = () => ({
  type: CANCEL_EDITING_ITEM
})

export const updateItem = (item) => ({
  type: UPDATE_ITEM,
  payload: item
})

export const deleteItem = (_id) => ({
  type: DELETE_ITEM,
  payload: _id
})