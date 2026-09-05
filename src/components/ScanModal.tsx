import { AlertCircleIcon, CameraIcon, CheckIcon, UploadIcon, UserIcon, XIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cameraService } from '../Module/cameraService';
import { geminiService, REQUIRED_EQUIPMENT } from '../Module/geminiService';
import { scanDatabase, ScanSession } from '../Module/scanDatabase';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (session: ScanSession) => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({ isOpen, onClose, onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setError(null);
      const { stream, video } = await cameraService.requestCameraAccess();
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await video.play();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start camera');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    setCurrentImage(imageData);
    setIsScanning(false);
  };

  const analyzeImage = async () => {
    if (!currentImage) return;

    setIsAnalyzing(true);
    setError(null);
    setScanProgress(0);

    try {
      const results = await geminiService.analyzeAllEquipment(currentImage);
      
      // Update progress as each equipment is analyzed
      results.forEach((_, index) => {
        setTimeout(() => {
          setScanProgress(((index + 1) / results.length) * 100);
        }, index * 500);
      });

      setScanResults(results);

      // Create scan session
      const overallPassed = results.every(result => result.isPresent);
      const session: ScanSession = {
        id: `session_${Date.now()}`,
        timestamp: new Date(),
        results,
        overallPassed,
        imageData: currentImage,
      };

      await scanDatabase.saveScanSession(session);
      onScanComplete(session);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageData = await cameraService.captureFromFile(file);
      setCurrentImage(imageData);
      setIsScanning(false);
    } catch (err) {
      setError('Failed to load image file');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl bg-[#2c2c2c] border-none text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Full Body Equipment Safety Scan
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-[#393939]"
          >
            <XIcon className="h-6 w-6" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg">
              {error}
            </div>
          )}

          {!currentImage && !isAnalyzing && (
            <div className="space-y-4">
              <div className="relative bg-[#393939] rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-96 object-cover"
                  autoPlay
                  muted
                  playsInline
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Full Body Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-2 border-[#ff6b00] border-dashed rounded-lg p-8 m-4">
                    <div className="flex flex-col items-center text-center">
                      <UserIcon className="w-16 h-16 text-[#ff6b00] mb-2" />
                      <p className="text-white font-medium text-lg">Position yourself here</p>
                      <p className="text-gray-300 text-sm mt-1">Ensure your full body is visible</p>
                    </div>
                  </div>
                </div>
                
                {isScanning && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#ff6b00] mx-auto mb-4"></div>
                      <p className="text-white font-medium text-lg">Recording...</p>
                      <p className="text-gray-300 text-sm mt-1">Stay still for best results</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Equipment Guide */}
              <div className="bg-[#393939] rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Equipment to Verify:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {REQUIRED_EQUIPMENT.map((equipment, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#ff6b00] rounded-full"></div>
                      <span className="text-gray-300">{equipment.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  * System will detect everyday items as safety equipment equivalents
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setIsScanning(true)}
                  disabled={isScanning}
                  className="flex-1 bg-[#ff6b00] hover:bg-[#e66000] h-12"
                >
                  <CameraIcon className="w-5 h-5 mr-2" />
                  {isScanning ? 'Recording...' : 'Start Recording'}
                </Button>
                
                <Button
                  onClick={captureImage}
                  disabled={!isScanning}
                  className="flex-1 bg-green-600 hover:bg-green-700 h-12"
                >
                  Capture Full Body Photo
                </Button>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button
                    variant="outline"
                    className="flex-1 bg-[#393939] hover:bg-[#444444] border-gray-600 h-12"
                  >
                    <UploadIcon className="w-5 h-5 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentImage && !isAnalyzing && (
            <div className="space-y-4">
              <div className="bg-[#393939] rounded-lg p-4">
                <img
                  src={currentImage}
                  alt="Captured"
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={() => setCurrentImage(null)}
                  variant="outline"
                  className="flex-1 bg-[#393939] hover:bg-[#444444] border-gray-600"
                >
                  Retake Photo
                </Button>
                
                <Button
                  onClick={analyzeImage}
                  className="flex-1 bg-[#ff6b00] hover:bg-[#e66000]"
                >
                  Analyze Equipment
                </Button>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="space-y-4">
              <div className="bg-[#393939] rounded-lg p-6 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#ff6b00] mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Analyzing Equipment...</h3>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#ff6b00] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Checking {REQUIRED_EQUIPMENT.length} safety items...
                </p>
              </div>
            </div>
          )}

          {scanResults.length > 0 && !isAnalyzing && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Scan Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scanResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-center justify-between ${
                      result.isPresent ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'
                    }`}
                  >
                    <span className="font-medium">{result.equipmentName}</span>
                    {result.isPresent ? (
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircleIcon className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className={`p-4 rounded-lg text-center ${
                scanResults.every(r => r.isPresent) 
                  ? 'bg-green-500/20 border border-green-500' 
                  : 'bg-red-500/20 border border-red-500'
              }`}>
                <h4 className="font-semibold text-lg">
                  {scanResults.every(r => r.isPresent) ? '✅ All Equipment Present' : '❌ Missing Equipment'}
                </h4>
                <p className="text-sm text-gray-400 mt-1">
                  Scan completed successfully
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 