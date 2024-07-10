import express from 'express' ;
const router = express.Router();
import multer from 'multer';
const uploads = multer({ dest: './tmp/' });

import { home } from '../controllers/home.js';
import addTask from '../controllers/addTask.js';
import editTask from '../controllers/editTask.js';
import deleteTask from '../controllers/deleteTask.js';

router.get('/',home);
router.post('/addTask',uploads.single('image'),addTask)
router.put('/editTask/:id',uploads.single('image'),editTask)
router.delete('/deleteTask/:id',uploads.single('image'),deleteTask)






export default router;