import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#090909] text-white flex flex-col justify-center items-center p-6 text-center cad-grid">
          <div className="absolute inset-0 bg-telemetry-nodes opacity-10 pointer-events-none"></div>
          
          <div className="bg-glass border border-brand-primary/20 rounded-lg p-8 max-w-lg relative">
            {/* Warning Icon indicator */}
            <div className="mx-auto w-12 h-12 rounded border border-red-500/30 flex items-center justify-center text-red-500 mb-6 font-orbitron text-xl font-bold shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              ⚠️
            </div>

            <h1 className="font-orbitron text-xl font-bold tracking-wider uppercase mb-2">
              System Telemetry Alert
            </h1>
            
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              A runtime rendering collision has occurred. Core execution threads have been paused to protect workspace settings.
            </p>

            {this.state.error && (
              <div className="bg-[#121212] border border-border-primary rounded p-4 mb-6 text-left overflow-x-auto max-h-40">
                <code className="text-xs text-red-400 font-mono">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                Retry Frame
              </Button>
              <Button variant="primary" size="sm" onClick={this.handleReset}>
                Reset Interface
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
