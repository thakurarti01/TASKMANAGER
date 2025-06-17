const Task = require("../models/Task");

//@desc get all tasks(admin: all, user: only assigned tasks)
//@route Get /api/tasks/
//@access private
const getTasks = async (req, res)=>{
    try{
        const {status} =req.query;
        let filter = {};

        if(status){
            filter.status = status;
        }

        let tasks;

        if(req.user.role === "admin"){
            tasks = await Task.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        } else{
            tasks = await Task.find({...filter, assignedTo: req.user._id}).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        }

        // add completed todoChecklist count to each task
        tasks = await Promise.all(
            tasks.map(async(task) => {
                const completedCount = task.todoChecklist.filter(
                    (item) => item.completed
                ).length;
                return { ...task._doc, completedTodoCount: completedCount};
            })
        );

        //status 
    } catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

//@desc get task by id
//@route GET /api/tasks/:id
//@access private
const getTaskById = async (req, res) => {
    try{

    } catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

//@desc create a new task(admin only)
//@route POST/api/tasks
//@access private(admin)
const createTask = async (req, res) => {
    try{
        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoChecklist,
        } = req.body;

        if(!Array.isArray(assignedTo)){
            return res
            .status(400)
            .json({message: "assignedTo must be an array of user IDs"});
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user._id,
            todoChecklist,
            attachments,
        });

        res.status(201).json({message: "Task created successfully", task});
    } catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

//@desc update task details
//@route PUT/api/tasks/:id
//@access private
const updateTask = async(req, res) => {
    try{

    } catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

//@desc delete a task (admin only)
//@route DELETE/api/tasks/:id
//@access private(admin)
const deleteTask = async(req, res) => {
    try{

    } catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

//@desc update task status
//@route PUT/api/tasks/:id/status
//@access private
const updateTaskStatus = async(req, res) => {
    try{

    } catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

//@desc update task checklist
//@route PUT/api/tasks/:id/todo
//@access private
const updateTaskChecklist = async(req, res) => {
    try{

    } catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

//@desc dashboard data(admin only)
//@route GET/api/task/dashboard-data
//@access private
const getDashboardData  =async(req, res) => {
    try{

    } catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

//@desc dashboard data(user specific)
//@route GET/api/tasks/user-dashboard-data
//@access private
const getUserDashboardData = async(req, res) => {
    try{

    } catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData,
};