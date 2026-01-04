import express from 'express'
import cors from 'cors'

// ROUTES
import pdfRoutes from './routes/pdf.js'                 // merge
import splitPDFRoutes from './routes/splitpdf.routes.js' // split
import compressPDFRoutes from './routes/compresspdf.routes.js' // compress

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// ✅ ROUTE MAPPING (clear & correct)

// MERGE PDF
app.use('/api/pdf', pdfRoutes) 
// example: POST /api/pdf/merge

// SPLIT PDF
app.use('/api/splitpdf', splitPDFRoutes)
// example: POST /api/splitpdf

// COMPRESS PDF
app.use('/api/compress', compressPDFRoutes)
// example: POST /api/compress

// HEALTH CHECK
app.get('/', (req, res) => {
  res.send('PDFNest Backend is running ✅')
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
