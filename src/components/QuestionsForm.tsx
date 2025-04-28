import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Question } from '../types/form';
import QuestionCard from './QuestionCard';
import FormProgress from './FormProgress';

interface QuestionsFormProps {
  questions: Question[];
  answers: Record<string, boolean>;
  onPrevious: () => void;
  onAnswer: (questionId: string, answer: boolean) => void;
  onSubmit: () => void;
}

const QuestionsForm: React.FC<QuestionsFormProps> = ({
  questions,
  answers,
  onPrevious,
  onAnswer,
  onSubmit
}) => {
  const isAllQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);
  
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Évaluation de l'entreprise</h2>
      <p className="text-gray-600 mb-6">
        Répondez aux questions suivantes pour évaluer votre entreprise.
      </p>
      
      <FormProgress 
        currentStep={2} 
        totalSteps={3} 
      />
      
      <div className="space-y-6">
        {questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            answer={answers[question.id] !== undefined ? answers[question.id] : null}
            onAnswer={onAnswer}
          />
        ))}
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Précédent
        </button>
        
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isAllQuestionsAnswered}
          className={`flex items-center px-6 py-2 rounded-lg transition duration-200 ${
            isAllQuestionsAnswered
              ? 'bg-blue-600 hover:bg-blue-700 text-white hover:translate-y-[-2px]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Voir les résultats
          <ChevronRight className="ml-1 h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default QuestionsForm;