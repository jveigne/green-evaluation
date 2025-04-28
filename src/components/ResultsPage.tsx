import React from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw } from 'lucide-react';
import { FormResult } from '../types/form';
import { getScoreColor, getScoreLabel } from '../utils/scoring';
import { generatePDF } from '../utils/pdfGenerator';
import { questions } from '../data/questions';

interface ResultsPageProps {
  result: FormResult;
  onReset: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result, onReset }) => {
  const { formData, score } = result;
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);
  
  const handleDownloadPDF = () => {
    generatePDF(result);
  };
  
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Résultats de l'évaluation</h2>
      
      <div className="mb-8">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-700">
            <span className="font-medium">Entreprise:</span> {formData.companyName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {formData.email}
          </p>
        </div>
        
        <div className="text-center py-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center justify-center p-5 bg-gray-50 rounded-full mb-3"
          >
            <div className={`text-4xl font-bold ${scoreColor}`}>
              {score}/10
            </div>
          </motion.div>
          <h3 className={`text-xl font-semibold ${scoreColor}`}>
            {scoreLabel}
          </h3>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Détail des réponses</h3>
        
        <div className="bg-gray-50 rounded-lg">
          {questions.map((question, index) => (
            <div 
              key={question.id}
              className={`p-4 ${index !== questions.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <p className="text-gray-800 mb-2">{question.text}</p>
              <p className={formData.answers[question.id] ? 'text-green-600' : 'text-red-600'}>
                {formData.answers[question.id] ? 'Oui' : 'Non'}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col space-y-4">
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          <Download className="mr-2 h-5 w-5" />
          Télécharger en PDF
        </button>
        
        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition duration-200"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Recommencer l'évaluation
        </button>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Les données ont été enregistrées avec succès.</p>
        <p>Une copie des résultats a été envoyée à {formData.email}.</p>
      </div>
    </motion.div>
  );
};

export default ResultsPage;