import express from 'express';
import {signupController,userLogin} from '../controllers/userController.js'
const router = express.Router();
router.post('/signup', signupController);
router.post('/login',userLogin)
export default router;