import Task from "../models/task.js"

 const home= async(req,res)=>{
    console.log("Home Page");
    try {    
        const allTasks=await Task.findAll({
            order: [['createdAt', 'ASC']] //MENTIONED IN MACHINE TEST ,POST SHOULD BE IN ASCENDING ORDER
        });
        const filteredTasks=allTasks.map((data)=> data.dataValues)
        console.log(filteredTasks);
        return res.status(200).json({allTasks:filteredTasks})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
   
   
}


export default home