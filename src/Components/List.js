import React from 'react'
import {BsTrash} from "react-icons/bs"
import {BiEditAlt} from "react-icons/bi"
import axios from 'axios'
import { baseURL } from '../utils/constant'
import "./List.css"


const List = ({id,task,setUpdateUI,updateMode}) => {
  const removeTask =()=>{
    axios.delete(`${baseURL}/delete/${id}`).then((res)=>{
      console.log(res)
      setUpdateUI((prevState)=>!prevState)
    })
  }
  
  return( 
  <div className='box'>
  <li className='res'>
 {task}
    <div className='icon_holder'>
<BiEditAlt className='icon1' onClick={()=>updateMode(id,task)}/>
<BsTrash className='icon2' onClick={removeTask}/>
    </div>
  </li>
  </div>
  
  )
    
  
}

export default List
