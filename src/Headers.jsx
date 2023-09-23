import React from 'react'

const Headers = (props) => {
  
  return (
    <div>
      <hr />
      <div><h2>{props.title}</h2></div>
    </div>
  )
}
Headers.defaultProps = {
  title:"Hi Hello world"
}

export default Headers