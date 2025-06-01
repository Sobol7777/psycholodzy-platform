'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error} 
          reset={() => this.setState({ hasError: false, error: undefined })}
        />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-slate-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-slate-200 max-w-md">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-medium text-slate-800 mb-2">
          Wystąpił błąd
        </h2>
        <p className="text-slate-600 mb-4">
          Przepraszamy, coś poszło nie tak. Spróbuj odświeżyć stronę.
        </p>
        {error && process.env.NODE_ENV === 'development' && (
          <details className="text-left mb-4 p-3 bg-red-50 rounded text-sm text-red-700">
            <summary className="cursor-pointer font-medium">Szczegóły błędu</summary>
            <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
          </details>
        )}
        <button
          onClick={reset}
          className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={16} />
          Spróbuj ponownie
        </button>
      </div>
    </div>
  );
}

export default ErrorBoundary; 