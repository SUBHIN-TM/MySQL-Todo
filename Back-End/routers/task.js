import express from 'express' ;
const router = express.Router();
import multer from 'multer';
const uploads = multer({ dest: './tmp/' });

import { home } from '../controllers/home.js';
import addTask from '../controllers/addTask.js';

router.get('/',home);
router.post('/addTask',uploads.single('image'),addTask)


export default router;