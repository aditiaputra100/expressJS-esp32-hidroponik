import express from 'express';
import { getSensorData } from '../controllers/sensor.controller.js';

const router = express.Router();
router.get('/:id', getSensorData);

export default router;