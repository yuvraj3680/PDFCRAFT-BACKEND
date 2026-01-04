import express from 'express'
import upload from '../utils/multer.js'
import { mergePDF } from '../controllers/pdfController.js'

const router = express.Router()
router.post('/merge', upload.array('pdfs'), mergePDF)
export default router
