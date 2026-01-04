import { PDFDocument } from 'pdf-lib'

export async function mergePDF(req, res) {
  try {
    const files = req.files

    if (!files || files.length === 0) {
      return res.status(400).send('No files uploaded')
    }

    const mergedPdf = await PDFDocument.create()

    for (const file of files) {
      const pdf = await PDFDocument.load(file.buffer)
      const copiedPages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      )
      copiedPages.forEach(page => mergedPdf.addPage(page))
    }

    const mergedBytes = await mergedPdf.save()

    // 🔥 IMPORTANT ADDITION (for frontend size display)
    res.setHeader('x-file-size', mergedBytes.length)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=merged.pdf',
    })

    res.send(Buffer.from(mergedBytes))
  } catch (error) {
    console.error(error)
    res.status(500).send('Error merging PDFs')
  }
}
