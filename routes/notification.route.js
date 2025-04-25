import express from 'express'
import { addNotification, getListNotification } from '../controllers/notification.controller.js'

const router = express.Router()
router.get('/:id', getListNotification)
router.post('/', addNotification)

export default router