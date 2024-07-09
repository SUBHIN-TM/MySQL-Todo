import React, { useState } from 'react'
import axios from 'axios'
import { URL } from '../constants/link'


const AddTask = () => {
    const [input,setInput]=useState({
        heading:'',
        image:null
    })

    const inputOnChange=(e)=>{
    const {name,value,files}=e.target;
    if(name=='image'){
        setInput((pvs)=>({
            ...pvs,
            [name]:files[0]
        }))
    }else{
        setInput((pvs)=>({
            ...pvs,
            [name]:value
        }))
    }      
    }

    const formData=new FormData();
    formData.append('heading',input.heading);
    formData.append('image',input.image)

    const addTask =async (e) => {
        e.preventDefault()

        try {
            const response=await axios.post(`${URL}addTask`,formData,{
            headers:{'Content-Type' : 'multipart/form-data'}
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={addTask}>
                <label htmlFor="heading">Heading</label> <input className='border' type="text" value={input.heading} onChange={inputOnChange} name="heading" id="" /> <br />
                <input  type="file" name="image" onChange={inputOnChange} id="" /> <br />
                <input type="submit" value="submit"  />
            </form>
        </div>
    )
}

export default AddTask