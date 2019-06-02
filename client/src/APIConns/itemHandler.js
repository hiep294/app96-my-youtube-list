class ItemHandler {
  static fetchItems = (handleClient) => {
    fetch('/api/items', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(items => handleClient(items))
      .catch(errs => console.log(errs))
  }

  static createItem = (newItemInForm, handleClient) => {
    fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(newItemInForm),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(itemInRes => handleClient(itemInRes))
      .catch(errs => console.log(errs))
  }

  static updateItem = (item, handleClientWhenGettingError, handleClientWhenWorking) => {
    fetch(`/api/items/${item._id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          handleClientWhenGettingError()
        } else {
          handleClientWhenWorking()
        }
      })
      .catch(errs => handleClientWhenGettingError())
  }

  static deleteItem = (_id, handleClientWhenGettingError, handleClientWhenWorking) => {
    fetch(`/api/items/${_id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          handleClientWhenGettingError()
        } else {
          handleClientWhenWorking()
        }
      })
      .catch(errs => handleClientWhenGettingError())
  }
}

export default ItemHandler