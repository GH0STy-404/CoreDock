import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ErrorBoundary from './components/ErrorBoundary';
import { Skeleton } from './components/ui/Skeleton';

// Lazy load pages for code splitting
const Home = React.lazy(() => import('./pages/Home'));
const PrinterDetail = React.lazy(() => import('./pages/PrinterDetail'));
const Materials = React.lazy(() => import('./pages/Materials'));
const Applications = React.lazy(() => import('./pages/Applications'));
const Contact = React.lazy(() => import('./pages/Contact'));
const About = React.lazy(() => import('./pages/About'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const RouteLoadingFallback = () => (
  <div className="space-y-6 py-6 min-h-[60vh] flex flex-col justify-center">
    <Skeleton height={40} className="w-1/3" />
    <Skeleton height={200} className="w-full" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Skeleton height={120} />
      <Skeleton height={120} />
      <Skeleton height={120} />
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <RootLayout>
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/specifications" element={<PrinterDetail />} />
              <Route path="/printers/:id" element={<PrinterDetail />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RootLayout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
