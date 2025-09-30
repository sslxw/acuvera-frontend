import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MetricsCards } from '@/components/MetricsCards';
import { Charts } from '@/components/Charts';
import { useSessionStore } from '@/store/useSessionStore';
import { api } from '@/lib/api';

export const DashboardPage: React.FC = () => {
  const { metrics, setMetrics, isLoading, setLoading, setError } = useSessionStore();
  const [refreshing, setRefreshing] = useState(false);

  const loadMetrics = async () => {
    setLoading(true);
    setError(null);

    try {
      const metricsData = await api.getMetrics();
      setMetrics(metricsData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load metrics';
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
    toast.success('Metrics refreshed');
  };


  useEffect(() => {
    loadMetrics();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Session statistics and performance metrics
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={refreshing || isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <MetricsCards metrics={metrics} isLoading={isLoading} />
        </div>

        {/* Charts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Visualizations</h2>
          <Charts metrics={metrics} isLoading={isLoading} />
        </div>

        {/* Empty State */}
        {metrics && metrics.total === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="space-y-4">
              <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <RefreshCw className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No data yet</h3>
                <p className="text-muted-foreground">
                  Start classifying images to see analytics and metrics
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
