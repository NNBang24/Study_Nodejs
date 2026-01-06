const { query } = require('express-validator')
const {Task} = require('../models')

exports.getAllTasks = async ( req , res , next) => {
    try {
        const {completed} = req.query

        const whereCondition = {} ;
        if( completed !== undefined) {
            whereCondition.completed = completed === 'true'
        }
        const tasks = await Task.findAll({
            where : whereCondition ,
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json(tasks) ;
    } catch (error) {
        next(error) ;
    } 
}
exports.getTaskById = async (req , res, next) => {
    try {
        const tasks = await Task.findAll(req.params.is) ;
        if(!tasks) {
            return res.status(404).json({message : " khong tim thay"})
        }
        res.json(tasks) ;
    } catch (error) {
        next(error)
    }
}
exports.createTask = async (req , res ,next) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask)
    } catch (error) {
        next ( error) ;
    }
}

exports.updateTask = async ( req , res , next) => {
    try {
        const [updateRows] = await Task.update(req.body , {
            where : {id: req.params.id}
        })
        if(updateRows === 0) {
            return res.status(404).json({ message: " khong tim thay" })
        }
        const updateTask = await Task.findByPk(req.params.id) ;
        res.json(updateTask)
    } catch (error) {
        next(error)
    }

}

exports.deleteTask = async ( req , res , next) => {
    try {
        const deleteRows = await Task.destroy({
            where: {id: req.params.id}
        })
        if(deleteRows === 0) {
            return res.status(404).send('khong tim thay')
        }
        res.status(204).send()
    } catch (error) {
        next(error) ;
    }
}