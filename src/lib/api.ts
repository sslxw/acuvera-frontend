const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:8000';

export interface Score {
  label: string;
  score: number;
}

export interface PredictionResponse {
  top1: Score;
  topk: Score[];
  latency_ms: number;
  reasoning?: string;
}

export interface LabelCorrection {
  original_label: string;
  corrected_label: string;
  topk: Score[];
}

export interface MetricsResponse {
  total: number;
  per_class: Record<string, number>;
  corrections: number;
  accuracy_estimate: number;
  avg_latency_ms: number;
  last_n: PredictionResponse[];
}

export interface ExportBlob {
  data: Record<string, any>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async health(): Promise<{ status: string }> {
    return this.request('/api/health');
  }

  async getModelInfo(): Promise<{ model: string; task: string; top_k: number }> {
    return this.request('/api/model-info');
  }

  async classify(file: File): Promise<PredictionResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/api/classify`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Classification Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async correct(correction: LabelCorrection): Promise<PredictionResponse> {
    return this.request('/api/correct', {
      method: 'POST',
      body: JSON.stringify(correction),
    });
  }

  async getMetrics(): Promise<MetricsResponse> {
    return this.request('/api/metrics');
  }

  async export(): Promise<ExportBlob> {
    return this.request('/api/export', {
      method: 'POST',
    });
  }

  async import(blob: ExportBlob): Promise<{ ok: boolean }> {
    return this.request('/api/import', {
      method: 'POST',
      body: JSON.stringify(blob),
    });
  }

  async populateMock(): Promise<{ ok: boolean; message: string }> {
    return this.request('/api/populate-mock', {
      method: 'POST',
    });
  }

  async validatePassword(password: string): Promise<{ valid: boolean; message: string }> {
    return this.request(`/api/validate-password?password=${encodeURIComponent(password)}`, {
      method: 'POST',
    });
  }
}

export const api = new ApiClient(API_BASE);
