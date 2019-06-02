import React, { useEffect } from 'react'
import './Item.css'
import editIcon from '../icon/edit.png'
import GhimOfEditedItem from './GhimOfEditedItem'


export default function Item({ item, editedItem, onEdit }) {
  const { _id, title, link } = item
  const styleBody = { display: 'flex', justifyContent: 'space-between' }

  useEffect(() => {
    document.getElementById(`com${_id}`).style.opacity = 1
  })

  const styleComponent = { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', opacity: 0.3, transition: 'opacity 0.5s ease 0s' }

  return (
    <div id={`com${_id}`} className="todo-card card card-body video" style={styleComponent}>
      <div className="sth card-title">
        <div className="false" >
          <div className="title">
            <div style={{ marginBottom: '10px' }} id={`title${_id}`}>
              {title}
            </div>
          </div>
          <div style={styleBody}>
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${link}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="sth"
            ></iframe>

            <div className="edit">
              <GhimOfEditedItem _id={_id} editedItem={editedItem} />
            </div>
          </div>

        </div>
        <div className="video-func-icons" style={styleBody}>
          <div>
          </div>
          <div>
            <img src={editIcon} alt="" style={{ marginRight: "-20px" }}
              onClick={() => onEdit(item)}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
