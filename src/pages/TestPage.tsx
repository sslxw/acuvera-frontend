import React from 'react';
import { CameraTest } from '@/components/CameraTest';
import { CameraCapture } from '@/components/CameraCapture';
import { SimpleCamera } from '@/components/SimpleCamera';

export const TestPage: React.FC = () => {
  const handleCapture = (file: File) => {
    console.log('File captured:', file.name, file.size);
    alert(`File captured: ${file.name} (${file.size} bytes)`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Camera Debug Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Camera Test</h2>
            <CameraTest />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Simple Camera</h2>
            <SimpleCamera onCapture={handleCapture} />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Original Camera Component</h2>
          <CameraCapture onCapture={handleCapture} />
        </div>
        
        <div className="text-center text-muted-foreground">
          <p>If you see this page, the React app is working.</p>
          <p>Check the browser console (F12) for any errors.</p>
        </div>
      </div>
    </div>
  );
};
