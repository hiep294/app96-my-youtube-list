import React, { Component } from 'react'
import saveIcon from '../icon/save.png'
import cancelIcon from '../icon/cancel.png'
import submitIcon from '../icon/submit.png'
import { connect } from 'react-redux'
import ItemHandler from '../APIConns/itemHandler'
import { createItem, cancelEditingItem, updateItem, deleteItem } from '../reduxEls/actions/itemActions'

import garbageIcon from '../icon/garbage.png'

class VideoForm extends Component {

  state = {
    _id: '',
    title: '',
    link: ''
  }
  YouTubeGetID = (url) => {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
    return ID;
  }//https://gist.github.com/takien/4077195

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidUpdate(prevProps) {
    // map editedItem to current state
    if (prevProps.editedItem !== this.props.editedItem) {
      const editedItem = this.props.editedItem
      if (editedItem.status) {
        const { _id, title, link } = editedItem.data
        this.setState({
          _id,
          title,
          link: `https://www.youtube.com/watch?v=${link}`
        })
      } else {
        this.setState({
          title: '',
          link: ''
        })
      }

    }
  }


  onSubmit = () => {
    if (!this.props.editedItem.status) {
      const newItemInForm = {
        title: this.state.title,
        link: this.YouTubeGetID(this.state.link)
      }

      this.props.createItem(newItemInForm)

      this.setState({
        title: '',
        link: ''
      })
    }
  }

  cancelEditingItem = () => {
    this.props.cancelEditingItem()
  }

  updateItem = () => {
    if (this.props.editedItem.status) {
      this.props.updateItem({
        _id: this.state._id,
        title: this.state.title,
        link: this.YouTubeGetID(this.state.link)
      })
      this.setState({
        _id: '',
        title: '',
        link: ''
      })
    }
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.props.editedItem.status ? this.updateItem() : this.onSubmit()
    }
  }

  deleteItem = () => {
    const { _id } = this.state
    if (_id) {
      this.props.deleteItem(_id)
    }
  }

  render() {
    const { editedItem } = this.props
    const buttonsStyle = {
      display: 'flex',
      justifyContent: 'space-between'
    }
    return (
      <div className="todo-form" style={{ position: 'sticky', top: 0 }}>
        <div>
          <div className="form-group">
            <input name="title" id="todoTitle" placeholder="Title" type="text" className="form-control"
              value={this.state.title}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
            />
          </div>
          <div className="form-group">
            <input name="link" id="todoTitle" placeholder="Link" type="text" className="form-control"
              value={this.state.link}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
            />
          </div>
          <div className="buttons" style={buttonsStyle}>
            <div>
              <button className="btn btn-light"
                onClick={this.onSubmit}
              ><img src={submitIcon} alt="" width="22px" />
              </button>
              <span style={{ opacity: editedItem.status ? 1 : 0.3 }}>
                <button className="btn btn-light"
                  onClick={this.updateItem}
                ><img src={saveIcon} alt="" width="22px" />
                </button>
                <button type="button" className="btn btn-light"
                  onClick={this.cancelEditingItem}
                ><img src={cancelIcon} alt="" width="22px" /></button>
              </span>
            </div>

            <button type="button" className="btn btn-light"
              style={{ opacity: editedItem.status ? 1 : 0.3 }}
              onClick={this.deleteItem}
            ><img src={garbageIcon} alt="" width="22px" /></button>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (bigState) => ({
  editedItem: bigState.editedItem
})

const mapDispatchToProps = (dispatch) => ({
  createItem: (newItemInForm) => {
    ItemHandler.createItem(newItemInForm, (itemInRes) => {
      dispatch(createItem(itemInRes))
    })
  },
  cancelEditingItem: () => dispatch(cancelEditingItem()),
  updateItem: (item) => {
    ItemHandler.updateItem(item, () => {
      // if error: network or sth else
      let ui = document.getElementById(`title${item._id}`)
      ui.innerHTML = '<p style="color: red" id="' + item._id + 'alert-disconnect"><b>*Cannot update this item, please try to check internet connection</b></p>' + ui.innerHTML
    }, () => {
      // if work
      // need to delete alert-disconnect
      let alertDis = document.getElementById(`${item._id}alert-disconnect`)
      if (alertDis) alertDis.remove()
    })
    // handle in client:
    dispatch(updateItem(item))
  },
  deleteItem: (_id) => {
    // API connection
    ItemHandler.deleteItem(_id, () => {
      //if error: network or sth else
      let comp = document.getElementById(`com${_id}`)
      comp.style.opacity = 1
      let title = document.getElementById(`title${_id}`)
      title.innerHTML = `<p style="color: red" id="cannot-delete-${_id}"><b>*Cannot delete this item, please try to check internet connection</b></p>` + title.innerHTML
    }, () => {
      // if deleted in server, 
      // delete in client
      dispatch(deleteItem(_id))
    })

    // make opacity down in client
    let comp = document.getElementById(`com${_id}`)
    if (comp) comp.style.opacity = 0.5
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoForm)