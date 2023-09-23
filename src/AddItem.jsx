import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef, useEffect} from 'react'

const AddItem = ({newItem, setNewItem, handleSubmit}) => {
const inputRef = useRef()

  return (
    <form htmlFor="addItem"  onSubmit={handleSubmit}>
    <input 
        type="text" 
        autoFocus
        ref={inputRef}
        id='addItem'
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder='Add Tasks'
    />
    
    <button
        type='submit'
        aria-label='Add Item'
        onClick={() => inputRef.current.focus()}
    >
        <FaPlus/> 
    </button>
    </form>
  )
}

export default AddItem