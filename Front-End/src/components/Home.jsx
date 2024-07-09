import { useEffect, useState } from 'react'
import AddTask from './AddTask'
import Navbar from './Navbar'
import axios from 'axios'
import { URL } from '../constants/link'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [addModal,setAddModal]=useState(false)
  const [editModal,setEditModal]=useState(false)
  const [modalName,setModalName]=useState("")
  const [allTasks,setAllTasks]=useState("")

  useEffect(()=>{
   getAllTasks()
  },[])

  const getAllTasks =async()=>{
try {
  const response=await axios.get(`${URL}`)
  setAllTasks(response.data.allTasks)
} catch (error) {
  console.error(error);
  toast.error(error.response.data.message)
}
  }


  console.log(allTasks);

const createPost=()=>{
  if(addModal){
    setAddModal(false)
    setModalName("")
  }else{
    setAddModal(true)
    setModalName("Create")
  }
}

 const modalOff=(boolean)=>{
  setAddModal(boolean)
 }
  return (
    <>
      <Navbar/>
      <div className='p-2'>
      <button onClick={createPost} className='border p-1'> Create Post</button> 
      </div>
     
      <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTasks.map((task) => (
                    <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img
                            src={task.image}
                            alt={task.heading}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold">{task.heading}</h3>
                        <p className="text-gray-700">{task.description}</p>
                        <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                        <p className="text-sm text-gray-500">
                            Date: {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            Time: {new Date(task.createdAt).toLocaleTimeString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>



     {addModal && (
      <AddTask modalName={modalName} modalOff={modalOff} />
     )}
        <ToastContainer />
    </>

  )
}

export default Home