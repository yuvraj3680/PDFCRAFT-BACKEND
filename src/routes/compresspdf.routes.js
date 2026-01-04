import express from 'express'
import multer from 'multer'
import { compressPDF } from '../controllers/compresspdf.controller.js'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/compress', upload.single('pdf'), compressPDF)

export default router
