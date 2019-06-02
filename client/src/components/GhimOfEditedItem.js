import React, { useEffect } from 'react'
import ghimIcon from '../icon/ghim.png'

export default function GhimOfEditedItem({ _id = 0, editedItem }) {

  useEffect(() => {
    if (_id && editedItem.data && _id === editedItem.data._id) {
      document.getElementById(`ghim${_id}`).style.opacity = 1
    } else {
      document.getElementById(`ghim${_id}`).style.opacity = 0
    }
  })

  return (
    <div style={{ opacity: 0, transition: 'opacity 0.5s' }} id={`ghim${_id}`}>
      <img src={ghimIcon} alt="" width="40px"
        style={{ position: "absolute" }}
      />
    </div>
  )
}
