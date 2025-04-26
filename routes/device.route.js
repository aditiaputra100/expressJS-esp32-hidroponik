import express from 'express';
import { addDevice, getDevice, updateParameter, updateToken } from '../controllers/device.controller.js';

const router = express.Router();
router.post('/', addDevice);
router.get('/:id', getDevice);
router.put('/parameter/:id', updateParameter)
router.put('/token/:id', updateToken)

export default router;