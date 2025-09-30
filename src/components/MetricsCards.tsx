import React from 'react';
import { Camera, Edit3, Target, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricsResponse } from '@/lib/api';

interface MetricsCardsProps {
  metrics: MetricsResponse | null;
  isLoading?: boolean;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              No data available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">-</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { total, corrections, accuracy_estimate, avg_latency_ms } = metrics;

  const cards = [
    {
      title: 'Total Images',
      value: total,
      icon: Camera,
      description: 'Images classified',
      color: 'text-blue-500'
    },
    {
      title: 'Corrections',
      value: corrections,
      icon: Edit3,
      description: 'User corrections',
      color: 'text-orange-500'
    },
    {
      title: 'Accuracy',
      value: `${Math.round(accuracy_estimate * 100)}%`,
      icon: Target,
      description: 'Estimated accuracy',
      color: 'text-green-500'
    },
    {
      title: 'Avg Latency',
      value: `${avg_latency_ms.toFixed(0)}ms`,
      icon: Clock,
      description: 'Processing time',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/5 pointer-events-none" />
          </Card>
        );
      })}
    </div>
  );
};
