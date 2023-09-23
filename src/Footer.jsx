import React from 'react'

function Footer(props) {

  return (
    <div>
      <footer> {props.length} List {props.length===1 ? 'item':'items'}</footer>
    </div>
  )
}

export default Footer
