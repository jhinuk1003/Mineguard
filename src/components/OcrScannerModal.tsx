import { CameraIcon, FileTextIcon, Loader2, UploadIcon, XIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cameraService } from '../Module/cameraService';
import { geminiService } from '../Module/geminiService';
import { logbookDatabase } from '../Module/logbookDatabase';
import { ocrDatabase, OcrScan } from '../Module/ocrDatabase';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface OcrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (scan: OcrScan) => void;
}

// Dummy user for demo; replace with prop/context if needed
const currentUser = { name: "James", avatar: "/image-8.png" };

export const OcrScannerModal: React.FC<OcrScannerModalProps> = ({ isOpen, onClose, onScanComplete }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [note, setNote] = useState('');
  const [noteTouched, setNoteTouched] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentImage(null);
      setExtractedText('');
      setError(null);
      setIsAnalyzing(false);
      setShowSuccess(false);
      setFilename(`scan_${new Date().toISOString().split('T')[0]}`);
      setNote('');
      setNoteTouched(false);
      startCamera();
    } else {
      stopCamera();
    }
  }, [isOpen]);

  const startCamera = async () => {
    if (!cameraService.isCameraSupported()) {
      setError('Camera not supported on this device.');
      return;
    }
    try {
      const { stream, video } = await cameraService.requestCameraAccess();
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start camera');
    }
  };

  const stopCamera = () => {
    cameraService.stopCamera();
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    const imageData = cameraService.captureImage(videoRef.current);
    setCurrentImage(imageData);
    stopCamera();
  };
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageData = await cameraService.captureFromFile(file);
      setCurrentImage(imageData);
      setFilename(file.name.replace(/\.[^/.]+$/, ""));
      stopCamera();
    } catch (err) {
      setError('Failed to load image file');
    }
  };

  const analyzeImage = async () => {
    if (!currentImage) return;
    if (!note.trim()) {
      setNoteTouched(true);
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    setExtractedText('');

    try {
      const text = await geminiService.performOcr(currentImage);
      setExtractedText(text);
      // Save to OCR database
      const scanData: OcrScan = {
        id: `ocr_${Date.now()}`,
        filename: filename,
        timestamp: new Date(),
        extractedText: text,
        imageData: currentImage ?? undefined,
        note: note,
      };
      await ocrDatabase.saveOcrScan(scanData);
      // Save to logbook database as a log entry
      await logbookDatabase.saveLogEntry({
        id: `log_${Date.now()}`,
        type: "OCR Document",
        date: new Date(),
        operator: currentUser.name,
        filename: filename,
        note: note + (text ? `\nExtracted: ${text.slice(0, 100)}${text.length > 100 ? '...' : ''}` : ''),
      });
      setShowSuccess(true);
      onScanComplete(scanData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OCR analysis failed.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderContent = () => {
    if (showSuccess) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="bg-green-600/20 rounded-full p-6 mb-2">
            <FileTextIcon className="w-10 h-10 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-green-300">Document scanned and added to Logbook!</h3>
          <Button className="mt-4 bg-[#6c47ff] hover:bg-[#5838d1]" onClick={onClose}>Close</Button>
        </div>
      );
    }
    if (extractedText) {
      return (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-300">Extracted Text</h3>
          <textarea
            readOnly
            value={extractedText}
            className="w-full h-64 bg-[#393939] p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6c47ff] text-gray-200"
          />
          <div className="bg-[#232323] p-3 rounded-lg">
            <div className="mb-1 text-gray-300 font-medium">Your Note:</div>
            <div className="text-gray-200 whitespace-pre-line">{note}</div>
          </div>
        </div>
      );
    }
    if (currentImage) {
      return (
        <div className="space-y-4">
          <img src={currentImage} alt="Document Preview" className="rounded-lg max-h-96 mx-auto border-2 border-gray-700" />
          <div>
            <label className="block text-gray-300 font-medium mb-1">Add a note for this document <span className="text-red-400">*</span></label>
            <textarea
              value={note}
              onChange={e => { setNote(e.target.value); setNoteTouched(true); }}
              className="w-full h-20 bg-[#393939] p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6c47ff] text-gray-200"
              placeholder="e.g. Maintenance log, safety checklist, etc."
              required
            />
            {noteTouched && !note.trim() && (
              <div className="text-red-400 text-xs mt-1">Note is required.</div>
            )}
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => { setCurrentImage(null); startCamera(); }} className="flex-1 h-12 text-base bg-[#393939] hover:bg-[#4a4a4a] border-gray-600">
              Retake / Upload
            </Button>
            <Button onClick={analyzeImage} disabled={isAnalyzing} className="flex-1 bg-[#6c47ff] hover:bg-[#5838d1] h-12 text-base">
              {isAnalyzing ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...</> : "Extract Text & Add to Logbook"}
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <div className="relative bg-black rounded-lg h-96 flex items-center justify-center">
          <video ref={videoRef} className="w-full h-full object-contain" />
          <div className="absolute inset-4 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <FileTextIcon className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-gray-500 mt-2">Position document in frame</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button onClick={captureImage} className="flex-1 h-12 text-base">
            <CameraIcon className="mr-2 h-5 w-5" /> Capture
          </Button>
          <Button asChild variant="outline" className="flex-1 h-12 text-base bg-[#393939] hover:bg-[#4a4a4a] border-gray-600">
            <label className="flex items-center justify-center cursor-pointer">
              <UploadIcon className="mr-2 h-5 w-5" /> Upload
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </Button>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl bg-[#2c2c2c] border-none text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">OCR Document Scanner</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-700 rounded-full"><XIcon /></Button>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg mb-4 text-center">{error}</div>}
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}; 