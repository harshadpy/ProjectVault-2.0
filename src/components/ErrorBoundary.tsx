import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  isDark?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${
          this.props.isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className={`max-w-md w-full text-center p-8 rounded-2xl border ${
            this.props.isDark 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
              this.props.isDark ? 'bg-red-900/20' : 'bg-red-100'
            }`}>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className={`text-sm mb-6 ${
              this.props.isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
            
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className={`cursor-pointer text-sm ${
                  this.props.isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Error Details
                </summary>
                <pre className={`mt-2 p-3 rounded text-xs overflow-auto ${
                  this.props.isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;