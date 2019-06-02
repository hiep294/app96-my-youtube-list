import React, { Component } from 'react'
import Item from './Item'
import { connect } from 'react-redux'
import { fetchItems, editItem } from '../reduxEls/actions/itemActions'
import ItemHandler from '../APIConns/itemHandler'

class Items extends Component {

  componentWillMount() {
    this.props.fetchItems()
  }

  onEdit = (item) => {
    this.props.onEditItem(item)
  }

  render() {
    const items = this.props.items
    return (
      <div className="todos-container">
        {items.map(item => (
          <Item key={item._id} item={item} onEdit={this.onEdit} editedItem={this.props.editedItem} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = bigState => ({
  items: bigState.items,
  editedItem: bigState.editedItem
})

const mapDispatchToProps = (dispatch) => ({
  fetchItems: () => {
    ItemHandler.fetchItems((items) => dispatch(fetchItems(items)))
  },
  onEditItem: (item) => dispatch(editItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Items)
