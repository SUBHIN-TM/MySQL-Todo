import fs from "fs"
import cloudinary from "../configuration/cloudinary.js";
import Task from "../models/task.js";

const editTask = async (req, res) => {
    try {
        console.log("Edit Task Section");
        console.log("field to be edited", req.body);
        console.log("task id which need to be edited is", req.params.id);
        const editId = req.params.id
        const path = req.file?.path
        const { heading, description, priority } = req.body
        let updateData = {
            heading,
            description,
            priority
        }

        if(!heading || !description || !priority){
            return res.status(400).json({ message: "heading, description, priority, All Field should be required" })
        }

       
        if (path) {
           const cloudinaryResult = await cloudinary.uploader.upload(path, { folder: 'Interval Todo' });
            if (cloudinaryResult) {
                console.log("image saved in cloudinary", cloudinaryResult);
                fs.unlinkSync(path);
                updateData.image = cloudinaryResult.secure_url;
                updateData.imageId = cloudinaryResult.public_id; //SAVING PUBLIC ID TO DELETE THE IMAGE FROM CLOUDINARY
            } else {
                return res.status(400).json({ message: "cannot Update image, Please try again later" })
            }
        }

        const [updatedTask] = await Task.update(updateData, { where: {id:editId} });
       
        if (updatedTask===0) { //IF IT SUCCESS IT RETURN 1 AND IF FAILS RETURN 0
            return res.status(404).json({ message: "Task not found" });
          }
        console.log(updatedTask);
        res.status(200).json({ message: 'Task Edited successfully' ,task: updatedTask});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default editTask