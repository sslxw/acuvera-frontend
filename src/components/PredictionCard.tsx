import React from 'react';
import { CheckCircle, AlertCircle, Clock, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PredictionResponse } from '@/lib/api';
import { cn } from '@/lib/utils';

interface PredictionCardProps {
  prediction: PredictionResponse;
  onCorrect?: () => void;
  showCorrectButton?: boolean;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({
  prediction,
  onCorrect,
  showCorrectButton = true
}) => {
  const { top1, topk, latency_ms, reasoning } = prediction;
  const confidence = Math.round(top1.score * 100);

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-500';
    if (score >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConfidenceIcon = (score: number) => {
    if (score >= 0.8) return <CheckCircle className="h-4 w-4" />;
    if (score >= 0.6) return <AlertCircle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Classification Result</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {latency_ms.toFixed(0)}ms
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Top Prediction */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Top Prediction</span>
            <div className={cn(
              "flex items-center gap-2 text-sm font-medium",
              getConfidenceColor(top1.score)
            )}>
              {getConfidenceIcon(top1.score)}
              {confidence}%
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border">
            <div className="text-lg font-semibold capitalize">
              {top1.label.replace(/_/g, ' ')}
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  top1.score >= 0.8 ? "bg-green-500" :
                  top1.score >= 0.6 ? "bg-yellow-500" : "bg-red-500"
                )}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </div>

        {/* Top 5 Predictions */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-muted-foreground">All Predictions</span>
          <div className="space-y-2">
            {topk.map((item, index) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-6">
                    #{index + 1}
                  </span>
                  <span className="text-sm capitalize">
                    {item.label.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-muted rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-primary"
                      style={{ width: `${Math.round(item.score * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">
                    {Math.round(item.score * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reasoning */}
        {reasoning && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">AI Reasoning</span>
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              {reasoning}
            </div>
          </div>
        )}

        {/* Action Button */}
        {showCorrectButton && onCorrect && (
          <Button
            onClick={onCorrect}
            variant="outline"
            className="w-full"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Correct Prediction
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
