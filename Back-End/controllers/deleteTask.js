import cloudinary from "../configuration/cloudinary.js";
 import Task from "../models/task.js";

 const deleteTask=async(req,res)=>{  //DELETING THE BLOG POST 
    try {
        console.log("Delete post Section");
        console.log("Delete the task id :",req.params.id);
        const taskId=req.params.id
        
        const task = await Task.findByPk(taskId)
        if(!task){
            return res.status(404).json({ message: "Task not found" });
        }
        const imageId=task.dataValues.imageId
        if (imageId) {
            const cloudinaryResponse = await cloudinary.uploader.destroy(imageId);
            console.log("Cloudinary response:", cloudinaryResponse);
        }
        const response = await Task.destroy({ where: {id: taskId } });
        console.log(response);
        if(response==1){
            return res.status(200).json({message:'Task successfully Deleted'})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export default deleteTask
