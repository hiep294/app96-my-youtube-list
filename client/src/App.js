import React from 'react';
import Items from './components/Items'
import ItemForm from './components/ItemForm'

function App() {
  return (
    <div className="App" style={{ minHeight: '900px' }}>

      <div className="container">
        <div className="filter" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className="todos-title">My Youtube List</h2>
          <a className="nav-link" href="https://github.com/hiep294/app96-my-youtube-list"
          >Github</a>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <Items />
          </div>
          <div className="col" >
            <ItemForm />
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
