import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CameraTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');

  const testCamera = async () => {
    try {
      setTestResult('Testing camera access...');
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setTestResult('❌ Camera not supported in this browser');
        return;
      }

      // Check if we're on HTTPS or localhost
      const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
      if (!isSecure) {
        setTestResult('❌ Camera requires HTTPS or localhost. Current: ' + location.protocol + '//' + location.hostname);
        return;
      }

      // Try to access camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setTestResult('✅ Camera access successful! Stream tracks: ' + stream.getTracks().length);
      
      // Stop the stream
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Camera test error:', error);
      setTestResult('❌ Camera error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Camera Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testCamera} className="w-full">
          Test Camera Access
        </Button>
        {testResult && (
          <div className="p-3 bg-muted rounded-lg">
            <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          <p>Current URL: {window.location.href}</p>
          <p>Protocol: {location.protocol}</p>
          <p>Hostname: {location.hostname}</p>
        </div>
      </CardContent>
    </Card>
  );
};
