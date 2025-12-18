import express from "express";
import {shortenController,redirectController} from '../controllers/urlsController.js'

const router = express.Router();

router.post('/shorten',shortenController)
router.get('/:shortCode',redirectController)

export default router;