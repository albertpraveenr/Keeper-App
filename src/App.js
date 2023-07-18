import React, { useEffect, useState } from 'react'
import List from './Components/List'
import axios from "axios";
import { baseURL } from './utils/constant';
import "./App.css"


const App = () => {
  const [input,setinput]=useState("")
  const [tasks,setTasks]=useState([])
  const[updateUI,setUpdateUI]=useState(false);
  const [updateId,setUpdateId]=useState(null);

  useEffect(()=>{
    axios.get(`${baseURL}/get`).then((res)=>{
      console.log(res.data)
      setTasks(res.data);
    
    })

  },[updateUI])

  const addTask=()=>{
    axios.post(`${baseURL}/save`,{task:input}).then((res)=>{
      console.log(res.data);
      setinput("")
      setUpdateUI((prevState)=>!prevState);
      
    })
  }
  
  const updateMode = (id,text) => {
    console.log(text);
    setinput(text)
    setUpdateId(id)

  }
  
  const updateTask=()=>{
    axios.put(`${baseURL}/update/${updateId}`,{task:input}).then((res)=>{
      console.log(res.data);
      setUpdateUI((prevState)=> !prevState)
      setUpdateId(null)
      setinput("")
    })
  }

  return <main>
    <div className='head'>
   <h1 className='heading'>Keeper App</h1>
   <img src="https://www.citypng.com/public/uploads/preview/hd-light-bulb-cartoon-clipart-png-31627608552dwzbpm6tjo.png" alt="bulb" className='img' />
   </div>
   
   <div className='inp'>
    <textArea type="text" value={input} onChange={(e)=>setinput(e.target.value)}  className='input'>Add Notes...</textArea>

    <button type='submit' onClick={updateId?updateTask:addTask} className='but'>{updateId?"Update Note":"Add Note"}</button>
     <br />
     <br />
     <br />
   </div>
     
  <div className='results'>
   <ul id='unli'>
    {tasks.map((task)=>(
      <List key={task._id} id={task._id} task={task.task} setUpdateUI={setUpdateUI} updateMode={updateMode} />
    ))}
   </ul >

   </div>

  </main>
    
  
}

export default App
