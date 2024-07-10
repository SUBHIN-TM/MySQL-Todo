import { useEffect, useState } from 'react'
import AddTask from './AddTask'
import Navbar from './Navbar'
import axios from 'axios'
import { URL } from '../constants/link'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 


const Home = () => {
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState({});
  const [allTasks, setAllTasks] = useState("")
  const [updatedCount, setUpdatedCount] = useState(1)

  useEffect(() => {
    getAllTasks()
  }, [updatedCount])

  const getAllTasks = async () => {
    try {
      const response = await axios.get(`${URL}`)
      setAllTasks(response.data.allTasks)
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message)
    }
  }



  const toggleModal = () => {
    setAddModal(prevState => !prevState);
    setEditModal(false);
    setEditTaskData({});
  }


  const acknowledgement = (status, message) => {
    console.log("Acknowledged with status:", status, "and message:", message);

    setUpdatedCount(updatedCount + 1)
    if (status == 'success') {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  const deleteTask = async (id) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete the Task?',
      buttons: [
          {
              label: 'Yes',
              onClick: () => {  //IF CONFIRMED DELETION IT WIL PROCEED
                deleteProceed()
              }
          },
          {
              label: 'No',
              onClick: () => {
                  return
              }
          }
      ]
  });
   
  const deleteProceed=async()=>{
    try {
      const response= await axios.delete(`${URL}deleteTask/${id}`);
      acknowledgement("success",response.data.message)
      setUpdatedCount(updatedCount + 1);
    } catch (error) {
      console.error(error);
      acknowledgement("error",error.response.data.message)
    }
  }
  };




  const editTask = (task) => {
    setAddModal(true);
    setEditModal(true);
    setEditTaskData(task);
  };




  if (!allTasks) {
    return
  }




  return (
    <>
      <Navbar />
      <div className='p-2'>
        <button onClick={toggleModal} className='border p-1 bg-black text-white px-2 hover:bg-green-500 '> Create Post</button>
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6">Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTasks?.map((task) => (
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
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => editTask(task)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>

            </div>
           
          ))}
        </div>
        <ToastContainer />
      </div>


      {addModal && (
        <AddTask modalOff={toggleModal} acknowledgement={acknowledgement}  editModal={editModal}  editTaskData={editTaskData}  />
      )}

    </>

  )
}

export default Home