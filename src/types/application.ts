export interface Application {
  id: string;
  title: string;
  industry: 'Aerospace' | 'Automotive' | 'Medical' | 'Engineering' | 'Manufacturing' | 'Robotics';
  description: string;
  partDetails: {
    materialUsed: string;
    printerUsed: string;
    dimensions: string;
    strengthRating?: string;
  };
  metrics: {
    leadTimeReduction: string;
    costReduction: string;
    weightSavings?: string;
  };
  image: string;
  keyChallenge: string;
  solutionOutcome: string;
}
