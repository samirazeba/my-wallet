import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function usePdfUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // 1. Upload PDF file
  const uploadPdf = async (file) => {
    setUploading(true);
    setUploadError(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axiosInstance.post("/file-upload/pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedFile(res.data);
      setUploading(false);
      return res.data;
    } catch (err) {
      setUploadError(err.response?.data?.error || "Upload failed");
      setUploading(false);
      return null;
    }
  };

  // 2. Parse and save PDF transactions
  const parseAndSavePdf = async (filename) => {
    setUploading(true);
    setUploadError(null);
    try {
      const res = await axiosInstance.post(
        "/file-upload/parse-and-save-pdf",
        { filename }
      );
      setUploading(false);
      return res.data;
    } catch (err) {
      setUploadError(err.response?.data?.error || "Parse/Save failed");
      setUploading(false);
      return null;
    }
  };

  // 3. Delete PDF file from server
  const deletePdf = async (filename) => {
    try {
      await axiosInstance.post("/file-upload/delete-pdf", { filename });
    } catch (err) {
      // Optionally handle error
    }
  };

  // Reset state (for discard)
  const reset = () => {
    setUploadedFile(null);
    setUploadError(null);
    setUploading(false);
  };

  return {
    uploading,
    uploadedFile,
    uploadError,
    uploadPdf,
    parseAndSavePdf,
    deletePdf, // make sure this is included
    reset,
  };
}