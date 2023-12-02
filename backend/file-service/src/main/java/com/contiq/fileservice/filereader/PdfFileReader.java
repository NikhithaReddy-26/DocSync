package com.contiq.fileservice.filereader;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.IOException;

public class PdfFileReader implements FileReader{

    @Override
    public String getFileContent(byte[] bytes) throws IOException {
        PDDocument document = Loader.loadPDF(bytes);
        PDFTextStripper textStripper = new PDFTextStripper();
        String content = textStripper.getText(document);
        document.close();
        return content;
    }
}
