"use client";

import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas'; // No longer needed for this approach

export default function NotePage() {
  const { t } = useLanguage();
  const [image, setImage] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfFilename, setPdfFilename] = useState("extracted_notes");
  const [error, setError] = useState("");
  const noteAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setExtractedText(""); // Clear previous OCR text
      setError("");
    }
  };

  const handleOcr = async () => {
    if (!image) {
      setError(t("note.error.no_image"));
      return;
    }
    setIsLoading(true);
    setError("");
    setExtractedText("");

    // Simulate API call for OCR - This will be replaced
    // try {
    //   // In a real app, you would send the image to an OCR API endpoint
    //   // For demo purposes, we'll simulate a delay and return placeholder text
    //   await new Promise(resolve => setTimeout(resolve, 2000));
    //   let mockExtractedText = t("note.ocr.mock_result_placeholder");
    //   if (image && image.name) {
    //     mockExtractedText = mockExtractedText.replace("{fileName}", image.name);
    //   }
    //   setExtractedText(mockExtractedText);
    //   setNote(prevNote => prevNote ? prevNote + "\n\n" + mockExtractedText : mockExtractedText); // Append or set
    // } catch (err) {
    //   console.error("OCR Error:", err);
    //   setError(t("note.error.ocr_failed"));
    // } finally {
    //   setIsLoading(false);
    // }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || t("note.error.ocr_failed"));
      }

      setExtractedText(data.text);
      setNote(prevNote => prevNote ? prevNote + "\n\n" + data.text : data.text); // Append or set

    } catch (err: any) {
      console.error("OCR Error:", err);
      setError(err.message || t("note.error.ocr_failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = () => {
    // For demo, we'll just log it. In a real app, this would save to localStorage or a backend.
    console.log("Note saved:", note);
    alert(t("note.save_success"));
  };

  const handleDownloadPdf = async () => {
    if (!extractedText.trim()) {
      setError(t("note.error.no_text_to_download")); // New translation key needed
      return;
    }
    setIsDownloadingPdf(true);
    setError("");

    try {
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      // Add extracted text to PDF
      // Set font size, margins etc.
      pdf.setFontSize(12);
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 15; // mm
      const lineHeight = 7; // mm, adjust based on font size
      let y = margin;

      // Split text into lines that fit page width
      const lines = pdf.splitTextToSize(extractedText, pageWidth - margin * 2);

      lines.forEach((line: string) => {
        if (y + lineHeight > pageHeight - margin) { // Check if new page is needed
          pdf.addPage();
          y = margin; // Reset y for new page
        }
        pdf.text(line, margin, y);
        y += lineHeight;
      });

      // Ensure filename has .pdf extension
      const finalFilename = pdfFilename.endsWith('.pdf') ? pdfFilename : `${pdfFilename}.pdf`;
      pdf.save(finalFilename);

    } catch (err) {
      console.error("PDF Generation Error:", err);
      setError(t("note.error.pdf_generation_failed"));
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {t("note.title")}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {t("note.subtitle")}
            </p>
          </header>

          <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("note.ocr_section_title")}</h2>
            <div className="mb-4">
              <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">
                {t("note.upload_label")}
              </label>
              <input 
                id="image-upload"
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            {image && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">{t("note.selected_image")}: {image.name}</p>
                <img src={URL.createObjectURL(image)} alt={t("note.image_preview_alt")} className="mt-2 rounded-md max-h-60 object-contain border" />
              </div>
            )}

            <button
              onClick={handleOcr}
              disabled={!image || isLoading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? t("note.loading_ocr") : t("note.button_extract_text")}
            </button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            
            {extractedText && (
              <div className="mt-4 p-3 bg-gray-100 rounded-md">
                <h3 className="text-md font-semibold text-gray-700 mb-1">{t("note.extracted_text_title")}</h3>
                <p className="text-sm text-gray-800 whitespace-pre-wrap">{extractedText}</p>
              </div>
            )}
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("note.notes_section_title")}</h2>
            <textarea
              ref={noteAreaRef}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t("note.placeholder_notes")}
              rows={10}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="mt-4 flex flex-col gap-4">
              {/* Filename input for PDF download */}
              <div>
                <label htmlFor="pdf-filename" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("note.pdf_filename_label")}
                </label>
                <input
                  type="text"
                  id="pdf-filename"
                  value={pdfFilename}
                  onChange={(e) => setPdfFilename(e.target.value)}
                  placeholder={t("note.pdf_filename_placeholder")}
                  className="block w-full sm:w-auto sm:min-w-[250px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleSaveNote}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex-1"
                >
                  {t("note.button_save_note")}
                </button>
                <button
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf || !extractedText.trim()}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex-1"
                >
                  {isDownloadingPdf ? t("note.downloading_pdf") : t("note.button_download_pdf")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 