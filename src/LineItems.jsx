import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const LineItems = ({item, handleCheck, handleDelete}) => {
  return (
    <li className='item'>
    <input 
    type="checkbox" 
    onChange={() => handleCheck(item.id)}
    checked={item.is_completed} 
    />

    <label
    style={(item.is_completed)?
    {textDecoration:"line-through"}:null
    }
    onDoubleClick={() => handleCheck(item.id)}>{item.task}
    </label>

    <FaTrashAlt
    role='button'
    tabIndex='0'
    onClick={()=> handleDelete(item.id)}
    aria-label={`Delete ${item.item}`}
    />
  </li>
  )
}

export default LineItems