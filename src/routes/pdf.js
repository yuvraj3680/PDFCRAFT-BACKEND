import express from 'express'
import multer from 'multer'
import { mergePDF } from '../controllers/pdfController.js'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/merge', upload.array('pdfs'), mergePDF)

export default router
