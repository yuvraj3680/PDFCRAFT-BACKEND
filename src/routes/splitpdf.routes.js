import express from 'express'
import upload from '../utils/multer.js'
import { splitPDF } from '../controllers/splitpdf.controller.js'

const router = express.Router()

router.post('/', upload.single('pdf'), splitPDF)

export default router
