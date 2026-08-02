import { StrictMode, Suspense, lazy, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Lazy load AdminApp for performance
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

// Loading fallback for lazy components
const LoadingScreen = () => (
  <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-[#0052FF] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 mt-4 text-sm font-semibold">Cargando...</p>
    </div>
  </div>
);

// Error boundary: cualquier error de render muestra un mensaje en vez de una página en blanco
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || String(error) };
  }

  componentDidCatch(error, info) {
    console.error('Error capturado por ErrorBoundary:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0f1117] border border-red-500/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="text-4xl mb-4">⚠️</div>
            <h1 className="text-lg font-bold text-white mb-2">Algo salió mal</h1>
            <p className="text-xs text-slate-400 mb-4">Ocurrió un error inesperado en la página. Recarga para continuar o vuelve al inicio.</p>
            <div className="text-[10px] font-mono text-red-400/80 bg-black/40 border border-white/10 rounded-lg p-3 mb-5 break-words max-h-24 overflow-y-auto text-left">
              {this.state.message || 'Error desconocido'}
            </div>
            <div className="flex gap-3">
              <button onClick={this.handleReload} className="flex-1 py-2.5 rounded-xl bg-[#0052FF] hover:bg-blue-500 text-white text-sm font-semibold transition-all">
                🔄 Recargar página
              </button>
              <button onClick={this.handleGoHome} className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-medium transition-all">
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route 
            path="/acceso-privado-cp/*" 
            element={
              <Suspense fallback={<LoadingScreen />}>
                <AdminApp />
              </Suspense>
            } 
          />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
