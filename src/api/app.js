import express from 'express'
import cors from 'cors'

// ROUTES
import pdfRoutes from '../routes/pdf.js'
import splitPDFRoutes from '../routes/splitpdf.routes.js'
import compressPDFRoutes from '../routes/compresspdf.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

// ROUTE MAPPING

// MERGE PDF
app.use('/api/pdf', pdfRoutes)
// POST /api/pdf/merge

// SPLIT PDF
app.use('/api/splitpdf', splitPDFRoutes)
// POST /api/splitpdf

// COMPRESS PDF
app.use('/api/compress', compressPDFRoutes)
// POST /api/compress

// HEALTH CHECK
app.get('/', (req, res) => {
  res.send('PDFCraft Backend is running on Vercel ✅')
})

export default app
