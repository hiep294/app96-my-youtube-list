import React from 'react'
import { connect } from 'react-redux'
import Demo from './Demo'
function Demos(props) {
  return (
    <div>
      <Demo number={props.number} />

    </div>
  )
}
export default connect()(Demos)
