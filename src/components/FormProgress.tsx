import React from 'react';
import { motion } from 'framer-motion';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">
          Étape {currentStep} sur {totalSteps}
        </span>
        <span className="text-sm font-medium text-blue-600">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default FormProgress;