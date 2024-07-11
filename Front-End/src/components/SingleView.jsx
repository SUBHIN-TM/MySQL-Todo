import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


const SingleView = () => {
    const [task, setTask] = useState("")
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state) {
            setTask(location.state.task)
        }
    }, [location.state])


    if (!task) {
        return
    }
    return (
        <>
            <div className='p-2 bg-black text-white italic font-semibold text-xl '> <span onClick={() => navigate("/")} className='cursor-pointer'>Quick Tasks</span> </div>
            <div className="flex justify-center p-4 bg-gray-100 min-h-screen">
                <div key={task.id} className="mb-14 mt-2 bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-8/12 lg:w-6/12">
                    <img
                        src={task.image}
                        alt={task.heading}
                        className="w-[80%] h-60 object-cover rounded-t-lg mb-4 mx-auto"
                    />
                    <div className="p-4">
                        <h3 className="text-2xl font-bold mb-2 break-words text-gray-800">{task.heading}</h3>
                        <p className="text-gray-700 mb-4 break-words">{task.description}</p>
                        <div className="text-gray-600 mb-4">
                            <p className="mb-2">
                                <span className="font-semibold">Priority:</span>
                                <span className={`ml-2 px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-500 text-white' : task.priority === 'medium' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
                                    {task.priority.toUpperCase()}
                                </span>
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Date:</span> {new Date(task.createdAt).toLocaleDateString()}
                            </p>
                            <p>
                                <span className="font-semibold">Time:</span> {new Date(task.createdAt).toLocaleTimeString()}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default SingleView