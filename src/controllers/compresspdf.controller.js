import { PDFDocument } from 'pdf-lib'

export const compressPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF uploaded' })
    }

    const pdfDoc = await PDFDocument.load(req.file.buffer)

    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      compress: true,
    })

    // 🔥 FRONTEND KE LIYE SIZE HEADER
    res.setHeader('x-file-size', compressedPdfBytes.length)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=compressed.pdf',
    })

    res.send(Buffer.from(compressedPdfBytes))
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Compression failed' })
  }
}
