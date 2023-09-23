import ItemsList from "./ItemsList";

const Content = ({items, handleCheck, handleDelete}) => {

    return (
    <>
      {(items.length) ? (
        <ItemsList
        items = {items}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
        />
      ):(
        <h2 style={{marginTop:'5rem', color:'re', textAlign:'center'}}> You are tasks are completed now</h2>
      )
      }
    </>   
  )
}

export default Content
