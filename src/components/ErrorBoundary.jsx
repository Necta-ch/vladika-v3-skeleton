import React from 'react';

/**
 * Global Error Boundary — catches any React render error and shows
 * a graceful fallback instead of a white screen.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-serif text-gray-900 mb-3">
              {this.props.title || 'Дошло је до грешке'}
            </h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              {this.props.message || 'Нешто је пошло наопако. Молимо Вас покушајте поново.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-8 py-3 bg-[#6b151b] text-white font-bold uppercase tracking-widest rounded-lg hover:bg-[#8B0000] transition-all shadow-lg text-sm"
            >
              Поново учитај
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
