import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
          <div className="bg-white dark:bg-slate-800 border-2 border-accent-500 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <FaExclamationTriangle className="text-accent-600 text-5xl mx-auto mb-4" />
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              We're sorry for the inconvenience. Please refresh the page or contact support.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

