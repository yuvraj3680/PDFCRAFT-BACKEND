import { PDFDocument } from 'pdf-lib'
import AdmZip from 'adm-zip'

export const splitPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'PDF required' })
    }

    const pdfDoc = await PDFDocument.load(req.file.buffer)
    const pageCount = pdfDoc.getPageCount()

    const zip = new AdmZip()

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create()
      const [page] = await newPdf.copyPages(pdfDoc, [i])
      newPdf.addPage(page)

      const pdfBytes = await newPdf.save()
      zip.addFile(`page-${i + 1}.pdf`, Buffer.from(pdfBytes))
    }

    const zipBuffer = zip.toBuffer()

    // 🔥 IMPORTANT (frontend ke liye useful)
    res.setHeader('x-file-size', zipBuffer.length)

    res.setHeader('Content-Type', 'application/zip')
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=split-pages.zip'
    )

    res.send(zipBuffer)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Split failed' })
  }
}
