import React, { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { CameraCapture } from '@/components/CameraCapture';
import { UploadBox } from '@/components/UploadBox';
import { PredictionCard } from '@/components/PredictionCard';
import { CorrectionSheet } from '@/components/CorrectionSheet';
import { useSessionStore } from '@/store/useSessionStore';
import { api, LabelCorrection } from '@/lib/api';

export const ClassifyPage: React.FC = () => {
  const [showCorrectionSheet, setShowCorrectionSheet] = useState(false);
  const { 
    lastPrediction, 
    isLoading, 
    setLoading, 
    setError, 
    addPrediction 
  } = useSessionStore();

  const handleFileSelect = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const result = await api.classify(file);
      addPrediction(result);
      toast.success('Image classified successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Classification failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, addPrediction]);

  const handleCorrect = useCallback(() => {
    setShowCorrectionSheet(true);
  }, []);

  const handleCorrectionSubmit = useCallback(async (correction: LabelCorrection) => {
    setLoading(true);
    setError(null);

    try {
      const result = await api.correct(correction);
      addPrediction(result);
      toast.success('Correction submitted successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit correction';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, addPrediction]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Waste Classification</h1>
          <p className="text-muted-foreground">
            Use your camera or upload an image to classify waste materials
          </p>
        </div>

        {/* Input Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera Capture */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Camera Capture</h2>
            <CameraCapture 
              onCapture={handleFileSelect}
              disabled={isLoading}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">File Upload</h2>
            <UploadBox 
              onFileSelect={handleFileSelect}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Classifying image...</p>
            </div>
          </div>
        )}

        {/* Prediction Result */}
        {lastPrediction && !isLoading && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Classification Result</h2>
            <PredictionCard
              prediction={lastPrediction}
              onCorrect={handleCorrect}
              showCorrectButton={true}
            />
          </div>
        )}

        {/* Correction Sheet */}
        <CorrectionSheet
          isOpen={showCorrectionSheet}
          onClose={() => setShowCorrectionSheet(false)}
          prediction={lastPrediction}
          onCorrect={handleCorrectionSubmit}
        />
      </div>
    </div>
  );
};
