/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from '../constants/link'
import { ClipLoader } from 'react-spinners';
const AddTask = ({modalOff,acknowledgement,editModal,editTaskData }) => {

const[isWaiting,setIsWaiting]=useState(false) //WAITING WILL BE TRUE WHEN THE CRUD OPERATIONS LOADING..
const [isEditModal,setIsEditModal]=useState(false) //STATE FOR MODAL ENSURING CURRENT MODAL IS USING FOR EDIT PURPOSE
const [pvsImage,setPvsImage]=useState("") //TO DISPLAY  ALREADY UPLOADED  IMAGE IN FORM SECTION

    const [input, setInput] = useState({ //STATE FOR GETTING ALL INPUT FIELD VALUES
        heading: '',
        description: "",
        priority: 'high',
        image: null
    })

    const [inputError,setInputError]=useState({ //STATE TO DISPLAY ERROS FOR CORRESPONDING INPUT FIELDS
        headingError:"",
        descriptionError:"",
        imageError:""
    })


    useEffect(() => {
        if (editModal && editTaskData) { //IF THE STATE HAS VALUES ,THE INPUT FILED GET FILLED WITH EDIT DETAILS
          setInput({
            heading: editTaskData.heading,
            description: editTaskData.description,
            priority: editTaskData.priority,
            image: null, 
          });

          setPvsImage(editTaskData.image)
          setIsEditModal(true)
        }
      }, [editModal, editTaskData]);
    





    const inputOnChange = (e) => {  //GETTING INPUT VALUES
        const { name, value, files } = e.target;
        if (name == 'image') {
            setInput((pvs) => ({
                ...pvs,
                [name]: files[0]
            }))
        } else {
            setInput((pvs) => ({
                ...pvs,
                [name]: value
            }))
        }
    }



    const validation=()=>{ //VALIDATION FUNCTION TO CHECK THE INPUT FIELDS PROPERLY
        const heading= input.heading.trim()
        const description=input.description.trim()
 
        let count=0;
        if(heading.length <3 || heading.length >30 ){
            count ++
         setInputError((pvs)=> ({
            ...pvs,
            headingError:'length Should be in between 3 and 30 characters'
         }))
        }else{
            setInputError((pvs)=> ({
                ...pvs,
                headingError:''
             }))
        }

        if(description.length <3 || description.length >100 ){
            count ++
            setInputError((pvs)=> ({
               ...pvs,
               descriptionError:'length Should be in between 3 and 100 characters'
            }))
        }else{
            setInputError((pvs)=> ({
                ...pvs,
                descriptionError:''
             })) 
        }

       if(!isEditModal){
        if(!input.image){
            count ++
            setInputError((pvs)=> ({
               ...pvs,
               imageError:'Image Required'
            }))
        }else{
            setInputError((pvs)=> ({
                ...pvs,
                imageError:''
             })) 
        }
       }


        if(count==0){ //FORM SUBMITS ONLY AFTER VALIDATIONS SEND TRUE
            return true
         }else{
            return false
         }
    }



    const addTask = async (e) => {
        e.preventDefault()
        const result=validation() //AFTER GETTING TRUE FROM VALIDATION, IT PROCEED THE CREATE TASK OPERATION
        if (!result){
            return
        }

        const formData = new FormData();  //CHANGED TO FORM DATA
        formData.append('heading', input.heading);
        formData.append('description', input.description);
        formData.append('priority', input.priority);
        formData.append('image', input.image)

        try {
            setIsWaiting(true)
            let response;
            if(isEditModal){
                response = await axios.put(`${URL}editTask/${editTaskData.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            }else{
                response = await axios.post(`${URL}addTask`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            }

            // console.log(response);
            acknowledgement('success',response.data.message)
            setTimeout(() => {
                clear();
            }, 1000);
           
        } catch (error) {
            console.error(error);
            acknowledgement('error',error.response.data.message)

        }
        finally{
            setIsWaiting(false)
        }
    }


const clear=()=>{ //MODAL CLOSE AND CLEAR THE INPUT FIELDS 
    modalOff()
    setInput({
        heading: '',
        description: '',
        priority: 'high',
        image: null
    });
}

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6 relative z-10">
                     <h2 className="text-2xl font-bold mb-4"> {isEditModal ? ("Edit Task"): ("Create Task")} </h2>
                        <form onSubmit={addTask} className="space-y-4 px-3">
                            <div className=''>
                                <label htmlFor="heading" className="block text-sm font-medium text-gray-700">
                                    Heading
                                </label>
                                <input
                                    type="text"
                                    name="heading"
                                    id="heading"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm sm:text-sm rounded-md"
                                    value={input.heading}
                                    onChange={inputOnChange}
                                />
                                <small className='text-red-500 pl-1'>{inputError.headingError}</small>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm sm:text-sm rounded-md"
                                    value={input.description}
                                    onChange={inputOnChange}
                                />
                                <small className='text-red-500 pl-1'>{inputError.descriptionError}</small>
                            </div>
                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                                    Priority
                                </label>
                                <select
                                    name="priority"
                                    id="priority"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm sm:text-sm rounded-md"
                                    value={input.priority}
                                    onChange={inputOnChange}
                                >
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Image
                                </label>
                                {isEditModal && ( <img  style={{ width: '100px', height: '100px', objectFit: 'contain' }}  src={pvsImage}  />)}
                               
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-smsm:text-sm rounded-md"
                                    onChange={inputOnChange}
                                    accept="image/*"
                                />
                                <small className='text-red-500 pl-1'>{inputError.imageError}</small>
                            </div>
                            {isWaiting? ( <div className='flex items-center'> <ClipLoader color="#000000" size={15} /><span className='ml-3'>Processing</span> </div>):(
                                <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => clear()}
                                    className="inline-block bg-gray-500 text-white px-4 py-2 mr-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md"> Submit </button>
                            </div>
                            )}
                           
                            
                        </form>
                    </div>
                </div>
    )
}

export default AddTask