const express = require('express');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const { createTaskValidationRules, updateBookValidationRules, commonIdParamValidation } = require('../validators/taskValidator')
const { handleValidationErrors } = require('../middlewares/validationErrorHandler')

const router = express.Router();

router.get('/:id',
    commonIdParamValidation(),
    handleValidationErrors ,
    getTaskById
);
router.get('/',
    getAllTasks
);

router.post('/',
    createTaskValidationRules(),
    handleValidationErrors,
    createTask
);
router.put('/:id',
    commonIdParamValidation(),
    updateBookValidationRules(),
    handleValidationErrors,
    updateTask
)
router.delete('/:id',
    commonIdParamValidation(),
    deleteTask
)


module.exports = router;