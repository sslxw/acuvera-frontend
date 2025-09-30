import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricsResponse } from '@/lib/api';

interface ChartsProps {
  metrics: MetricsResponse | null;
  isLoading?: boolean;
}

export const Charts: React.FC<ChartsProps> = ({ metrics, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-1/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>No data available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Start classifying images to see charts
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { per_class, last_n } = metrics;

  // Prepare class distribution data
  const classData = Object.entries(per_class)
    .map(([label, count]) => ({
      label: label.replace(/_/g, ' ').toUpperCase(),
      count,
      percentage: Math.round((count / metrics.total) * 100)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 classes

  // Prepare confidence trend data
  const confidenceData = last_n.map((pred, index) => ({
    index: index + 1,
    confidence: Math.round(pred.top1.score * 100),
    latency: Math.round(pred.latency_ms)
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Class Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Class Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="label" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis fontSize={12} />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  name === 'count' ? `${value} images` : `${value}%`,
                  name === 'count' ? 'Count' : 'Percentage'
                ]}
                labelFormatter={(label) => `Class: ${label}`}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Confidence & Latency Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={confidenceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="index" 
                fontSize={12}
                label={{ value: 'Recent Predictions', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                yAxisId="confidence"
                orientation="left"
                fontSize={12}
                label={{ value: 'Confidence %', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="latency"
                orientation="right"
                fontSize={12}
                label={{ value: 'Latency (ms)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  name === 'confidence' ? `${value}%` : `${value}ms`,
                  name === 'confidence' ? 'Confidence' : 'Latency'
                ]}
                labelFormatter={(index) => `Prediction #${index}`}
              />
              <Line 
                yAxisId="confidence"
                type="monotone" 
                dataKey="confidence" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="latency"
                type="monotone" 
                dataKey="latency" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
