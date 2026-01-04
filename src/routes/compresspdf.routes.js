import express from 'express'
import upload from '../utils/multer.js'
import { compressPDF } from '../controllers/compresspdf.controller.js'

const router = express.Router()
router.post('/', upload.single('pdf'), compressPDF)
export default router
