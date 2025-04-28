import React, { useState } from 'react';
import CompanyInfoForm from './components/CompanyInfoForm';
import QuestionsForm from './components/QuestionsForm';
import ResultsPage from './components/ResultsPage';
import { FormData, FormResult } from './types/form';
import { questions } from './data/questions';
import { calculateScore } from './utils/scoring';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';

// Placeholder function for Firebase integration
const saveToFirebase = async (result: FormResult): Promise<void> => {
  console.log('Saving to Firebase:', result);
  // In a real application, this would save to Firebase
  return Promise.resolve();
};

function App() {
  const [step, setStep] = useState<'info' | 'questions' | 'results'>('info');
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    email: '',
    answers: {},
  });
  const [result, setResult] = useState<FormResult | null>(null);

  const handleCompanyInfoSubmit = (data: { companyName: string; email: string }) => {
    setFormData(prev => ({
      ...prev,
      companyName: data.companyName,
      email: data.email,
    }));
    setStep('questions');
  };

  const handleQuestionAnswer = (questionId: string, answer: boolean) => {
    setFormData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  };

  const handlePrevious = () => {
    setStep('info');
  };

  const handleSubmitQuestions = async () => {
    const score = calculateScore(formData);
    const newResult: FormResult = {
      formData,
      score,
      timestamp: new Date(),
    };
    
    setResult(newResult);
    
    // Save to Firebase (placeholder)
    try {
      await saveToFirebase(newResult);
    } catch (error) {
      console.error('Error saving to Firebase:', error);
    }
    
    setStep('results');
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      email: '',
      answers: {},
    });
    setResult(null);
    setStep('info');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <ClipboardCheck className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-xl font-semibold text-gray-900">Évaluation d'Entreprise</h1>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {step === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CompanyInfoForm
                    companyName={formData.companyName}
                    email={formData.email}
                    onSubmit={handleCompanyInfoSubmit}
                  />
                </motion.div>
              )}
              
              {step === 'questions' && (
                <motion.div
                  key="questions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <QuestionsForm
                    questions={questions}
                    answers={formData.answers}
                    onPrevious={handlePrevious}
                    onAnswer={handleQuestionAnswer}
                    onSubmit={handleSubmitQuestions}
                  />
                </motion.div>
              )}
              
              {step === 'results' && result && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ResultsPage
                    result={result}
                    onReset={handleReset}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Évaluation d'Entreprise | Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;