import Headers from "./Headers";
import Content from "./Content";
import Footer from "./Footer";
import { useEffect, useState }  from 'react';
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";


function App(){

  const API_URL = 'http://localhost:3500/items'
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try{
        const response = await fetch(API_URL);
        if (!response.ok)  throw Error("Data not received!!!")
        console.log(response)
        const listItems = await response.json()
        console.log(listItems)
        setItems(listItems);
        setFetchError(null)
      }catch(err){
          setFetchError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    setTimeout(() =>{
      (async () => await fetchItems())()
    }, 2000)
  }, [])

  const addItem = async (task) =>{
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = {id, is_completed: false, task}
    const listItems = [...items, addNewItem]
    setItems(listItems)

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(addNewItem)
    }
    console.log("client Request:",postOptions)
    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchError(result) 
  }

  const handleCheck = async (id) =>{
      const listItems = items.map((item)=> 
        item.id===id ? {...item, is_completed:!item.is_completed}: item)
       setItems(listItems)

       const myItem = listItems.filter((item) => item.id===id)
       const updateOptions = {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({is_completed:myItem[0].is_completed})
      }
      const reqUrl=`${API_URL}/${id}`
      console.log("client Request:",updateOptions)
      const result = await apiRequest(reqUrl, updateOptions)
      if (result) setFetchError(result) 
      }

  const handleDelete = async (id) =>{
    const listItems = items.filter((item)=> 
      item.id !== id )
      setItems(listItems)

    const deleteOptions = {
      method:"DELETE"
    } 
    const reqUrl=`${API_URL}/${id}`
    console.log("client Request:",deleteOptions)
    const result = await apiRequest(reqUrl, deleteOptions)
    if (result) setFetchError(result) 
    }
 
  const handleSubmit = (e) =>{
    e.preventDefault()
    if (!newItem) return;
    addItem(newItem)
  }    

  return (
    <div className="App">
     <Headers title = "Daily Task Lists"/>

     <AddItem
      newItem = {newItem}
      setNewItem = {setNewItem}
      handleSubmit = {handleSubmit}
     />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p> Loading Items...</p>}
        {fetchError && <p> {`Error: ${fetchError}`} </p>}
        {!isLoading &&  !fetchError && <Content
        items = {items.filter(item =>(item.task).toLowerCase().includes(search.toLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />}
    </main>
     <Footer 
     length = {items.length} 
     />
    
    </div>
  );
}

export default App;

 