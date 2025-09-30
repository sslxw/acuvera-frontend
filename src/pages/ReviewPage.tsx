import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Download, Upload, RefreshCw, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSessionStore } from '@/store/useSessionStore';
import { api, PredictionResponse, LabelCorrection } from '@/lib/api';

export const ReviewPage: React.FC = () => {
  const { predictions, setMetrics, isLoading, setLoading, setError } = useSessionStore();
  const [refreshing, setRefreshing] = useState(false);

  const loadMetrics = async () => {
    setLoading(true);
    setError(null);

    try {
      const metricsData = await api.getMetrics();
      setMetrics(metricsData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMetrics();
    setRefreshing(false);
    toast.success('Data refreshed');
  };

  const handleExport = async () => {
    try {
      const exportData = await api.export();
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `acuvera-session-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Session data exported successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Export failed';
      toast.error(errorMessage);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const importData = JSON.parse(content);
        await api.import(importData);
        await loadMetrics();
        toast.success('Session data imported successfully');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Import failed';
        toast.error(errorMessage);
      }
    };
    reader.readAsText(file);
  };

  const handleCorrect = async (prediction: PredictionResponse, correctedLabel: string) => {
    try {
      const correction: LabelCorrection = {
        original_label: prediction.top1.label,
        corrected_label: correctedLabel,
        topk: prediction.topk
      };
      await api.correct(correction);
      await loadMetrics();
      toast.success('Correction submitted');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Correction failed';
      toast.error(errorMessage);
    }
  };


  useEffect(() => {
    loadMetrics();
  }, []);

  const recentPredictions = predictions.slice(-10).reverse();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Review & Export</h1>
            <p className="text-muted-foreground">
              Review recent predictions and manage session data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRefresh}
              disabled={refreshing || isLoading}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={handleExport}
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <label className="cursor-pointer">
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Recent Predictions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Predictions</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                      <div className="h-6 bg-muted rounded w-1/2"></div>
                      <div className="h-4 bg-muted rounded w-1/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : recentPredictions.length > 0 ? (
            <div className="space-y-4">
              {recentPredictions.map((prediction, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            #{recentPredictions.length - index}
                          </span>
                          <span className="font-medium capitalize">
                            {prediction.top1.label.replace(/_/g, ' ')}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({Math.round(prediction.top1.score * 100)}%)
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {prediction.latency_ms.toFixed(0)}ms latency
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => {
                            const correctedLabel = prompt('Enter corrected label:', prediction.top1.label);
                            if (correctedLabel) {
                              handleCorrect(prediction, correctedLabel);
                            }
                          }}
                          variant="outline"
                          size="sm"
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          Correct
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">No predictions yet</h3>
                    <p className="text-muted-foreground">
                      Start classifying images to see them here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Export/Import Info */}
        <Card>
          <CardHeader>
            <CardTitle>Session Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Export Session</h4>
                <p className="text-sm text-muted-foreground">
                  Download all predictions and corrections as JSON for backup or analysis.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Import Session</h4>
                <p className="text-sm text-muted-foreground">
                  Load previously exported session data to continue where you left off.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
