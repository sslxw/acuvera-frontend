import React, { useState, useCallback } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PredictionResponse, LabelCorrection } from '@/lib/api';

interface CorrectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  prediction: PredictionResponse | null;
  onCorrect: (correction: LabelCorrection) => void;
}

const WASTE_CATEGORIES = [
  'plastic',
  'paper',
  'cardboard',
  'glass',
  'metal',
  'organic',
  'fabric',
  'rubber',
  'wood',
  'ceramic',
  'electronic',
  'hazardous',
  'other'
];

export const CorrectionSheet: React.FC<CorrectionSheetProps> = ({
  isOpen,
  onClose,
  prediction,
  onCorrect
}) => {
  const [correctedLabel, setCorrectedLabel] = useState('');
  const [customLabel, setCustomLabel] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!prediction) return;

    const finalLabel = useCustom ? customLabel.trim() : correctedLabel;
    if (!finalLabel) return;

    const correction: LabelCorrection = {
      original_label: prediction.top1.label,
      corrected_label: finalLabel,
      topk: prediction.topk
    };

    onCorrect(correction);
    onClose();
    
    // Reset form
    setCorrectedLabel('');
    setCustomLabel('');
    setUseCustom(false);
  }, [prediction, correctedLabel, customLabel, useCustom, onCorrect, onClose]);

  const handleClose = useCallback(() => {
    onClose();
    setCorrectedLabel('');
    setCustomLabel('');
    setUseCustom(false);
  }, [onClose]);

  if (!prediction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Correct Prediction</DialogTitle>
          <DialogDescription>
            The model predicted "{prediction.top1.label.replace(/_/g, ' ')}" with {Math.round(prediction.top1.score * 100)}% confidence.
            What should it be?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Common Labels */}
          {!useCustom && (
            <div className="space-y-2">
              <Label>Select from common labels:</Label>
              <div className="grid grid-cols-2 gap-2">
                {WASTE_CATEGORIES.map((label) => (
                  <Button
                    key={label}
                    variant={correctedLabel === label ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCorrectedLabel(label)}
                    className="justify-start"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Label Input */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="useCustom"
                checked={useCustom}
                onChange={(e) => setUseCustom(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="useCustom">Use custom label</Label>
            </div>
            
            {useCustom && (
              <Input
                placeholder="Enter custom label..."
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!correctedLabel && !customLabel.trim()}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-2" />
              Submit Correction
            </Button>
            <Button
              onClick={handleClose}
              variant="outline"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
