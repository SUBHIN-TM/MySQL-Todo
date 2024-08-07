import fs from "fs"
import cloudinary from "../configuration/cloudinary.js";
import Task from "../models/task.js";

const addTask=async(req,res)=>{
    try {
        console.log("Add Task Section");
        console.log("body", req.body);
        console.log("image path", req.file?.path);
        const {path}= req.file
        const {heading,description,priority}=req.body
        const cloudinaryResult = await cloudinary.uploader.upload(path, { folder: 'Interval Todo' });
        if(cloudinaryResult){
            console.log("image saved in cloudinary",cloudinaryResult);
            fs.unlinkSync(path); //AFTER SAVING THE IMAGE TEMP FOLDER IMAGE BACKUPS GETS DELETED
        }else{
            return res.status(400).json({ message: "cannot upload image, Please try again later" })   
        }

       const newTask=await Task.create({
        heading,
        description,
        priority,
        image:cloudinaryResult.secure_url,  //IMAGE URL FROM CLOUDINARY
        imageId:cloudinaryResult.public_id  //SAVING PUBLIC ID TO DELETE THE IMAGE FROM CLOUDINARY WHILE DOING DELETE OPERATION
       })

       console.log(newTask);
       res.status(201).json({message:'Task added successfully'});
         
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default addTask