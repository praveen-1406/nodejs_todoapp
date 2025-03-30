import ErrorHandler from '../middlewares/error.js';
import { Task } from '../models/task.js'

export const newTask = async (req, res) => {

    try {
        const { title, description } = req.body;


        const task = await Task.create({
            title,
            description,
            user: req.user,
        })

        res.json({
            success: true,
            message: "Task Added",
            task,
        })
    } catch (error) {
        next(error)
    }
}

export const getMyTasks = async (req, res) => {
    try {
        const user = req.user._id;
        const tasks = await Task.find({ user });
        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new ErrorHandler("Task not found", 404))
        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated"
        })
    } catch (error) {
        next(error)
    }
}


export const deleteTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new ErrorHandler("Task not found", 404))

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted"
        })
    } catch (error) {
        next(error)
    }
}

