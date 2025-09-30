import React, { useRef, useState, useCallback } from 'react';
import { Camera, CameraOff, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  disabled?: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, disabled = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      // Check if we're on HTTPS or localhost
      const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
      if (!isSecure) {
        throw new Error('Camera requires HTTPS or localhost. Please use https:// or localhost');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      setIsActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      let errorMessage = 'Unable to access camera. ';
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          errorMessage += 'Please allow camera permissions and refresh the page.';
        } else if (err.name === 'NotFoundError') {
          errorMessage += 'No camera found. Please connect a camera.';
        } else if (err.name === 'NotSupportedError') {
          errorMessage += 'Camera not supported in this browser.';
        } else {
          errorMessage += err.message;
        }
      }
      
      setError(errorMessage);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsActive(false);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
        onCapture(file);
      }
    }, 'image/jpeg', 0.92);
  }, [onCapture]);

  // Effect to connect stream to video element
  React.useEffect(() => {
    if (stream && videoRef.current) {
      console.log('Connecting stream to video element', stream);
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        console.log('Video metadata loaded, starting playback');
        videoRef.current?.play().catch(console.error);
      };
      videoRef.current.oncanplay = () => {
        console.log('Video can play');
      };
      videoRef.current.onerror = (e) => {
        console.error('Video error:', e);
      };
    }
  }, [stream]);

  // Cleanup effect
  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            {isActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <Camera className="h-12 w-12" />
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            {!isActive ? (
              <Button
                onClick={startCamera}
                disabled={disabled}
                className="flex-1"
                size="lg"
              >
                <Camera className="h-4 w-4 mr-2" />
                Start Camera
              </Button>
            ) : (
              <>
                <Button
                  onClick={capturePhoto}
                  disabled={disabled}
                  className="flex-1"
                  size="lg"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Capture
                </Button>
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  size="lg"
                >
                  <CameraOff className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
