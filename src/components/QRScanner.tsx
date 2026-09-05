import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface QRScannerProps {
  onScan: (data: any) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose, isOpen }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  let animationFrameId: number;

  useEffect(() => {
    if (isOpen) {
      startVideo();
    } else {
      stopVideo();
    }
    return () => {
      stopVideo();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isScanning && videoRef.current) {
      scanFrame();
    } else {
      cancelAnimationFrame(animationFrameId);
    }
  }, [isScanning]);

  const startVideo = async () => {
    try {
      setError(null);
      setIsScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions.');
      setIsScanning(false);
    }
  };

  const stopVideo = () => {
    cancelAnimationFrame(animationFrameId);
    setIsScanning(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const scanFrame = () => {
    if (!isScanning || !videoRef.current || !videoRef.current.videoWidth) {
      return;
    }
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code) {
      try {
        const parsedData = JSON.parse(code.data);
        onScan(parsedData);
      } catch (e) {
        setError("Invalid QR code format.");
      }
      stopVideo();
    } else {
      animationFrameId = requestAnimationFrame(scanFrame);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;
        
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        
        const imageData = context.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          try {
            const parsedData = JSON.parse(code.data);
            onScan(parsedData);
          } catch(e) {
            setError("Invalid QR code format in image.");
          }
        } else {
          setError("No QR code found in the uploaded image.");
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    // Reset file input
    event.target.value = '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <Card className="bg-[#2c2c2c] border border-gray-700 p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Scan QR Code</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="relative mb-4">
            <div className="w-full h-64 bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                onCanPlay={() => setIsScanning(true)}
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-2 border-[#ff6b00] rounded-lg relative">
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white"></div>
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white"></div>
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white"></div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white"></div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-[#3c3c3c]"
            >
              Upload Image
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-[#3c3c3c]"
            >
              Cancel
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Badge className="bg-[#ff6b00] bg-opacity-20 text-[#ff6b00] border border-[#ff6b00]">
              Point camera at QR code or upload an image
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}; 