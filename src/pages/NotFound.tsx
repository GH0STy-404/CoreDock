import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center p-6 space-y-6 relative">
      <div className="absolute inset-0 bg-telemetry-nodes opacity-10 pointer-events-none"></div>
      
      <SEO
        title="404 - Out of Bounds"
        description="The requested routing address does not match any telemetry register."
      />

      <div className="bg-glass border border-brand-primary/20 rounded-lg p-8 max-w-md relative shadow-orange-glow">
        
        <div className="mx-auto w-12 h-12 rounded border border-brand-primary flex items-center justify-center text-brand-primary mb-6 font-outfit text-xl font-bold">
          404
        </div>

        <h1 className="font-outfit text-lg font-bold tracking-wider uppercase text-text-primary mb-2">
          Route Out Of Bounds
        </h1>
        
        <p className="text-text-secondary text-xs mb-6 leading-relaxed">
          The requested coordinate address does not resolve to active framework endpoints. Please verify the URL.
        </p>

        <Link to="/">
          <Button variant="primary" glow className="flex items-center gap-2 mx-auto py-2.5">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
