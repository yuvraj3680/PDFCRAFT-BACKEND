import express from 'express'
import cors from 'cors'

// Routes
import pdfRoutes from './routes/pdf.js'
import splitPDFRoutes from './routes/splitpdf.routes.js'
import compressPDFRoutes from './routes/compresspdf.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/pdf', pdfRoutes)         // Merge PDF
app.use('/api/splitpdf', splitPDFRoutes) // Split PDF
app.use('/api/compress', compressPDFRoutes) // Compress PDF

app.get('/', (req, res) => {
  res.send('PDFCraft Backend is running ✅')
})

export default app
