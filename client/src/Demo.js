import React from 'react'
import { connect } from 'react-redux'

function Demo(props) {
  return (
    <div>
      <button>{props.number}</button>
    </div>
  )
}
export default connect()(Demo)