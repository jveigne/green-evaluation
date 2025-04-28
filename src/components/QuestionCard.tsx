import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Question } from '../types/form';

interface QuestionCardProps {
  question: Question;
  answer: boolean | null;
  onAnswer: (questionId: string, answer: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answer, onAnswer }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium text-gray-800 mb-4">{question.text}</h3>
      
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => onAnswer(question.id, true)}
          className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-200 ${
            answer === true
              ? 'bg-green-100 text-green-700 border-2 border-green-500'
              : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-green-50'
          }`}
        >
          <Check className="mr-2 h-5 w-5" />
          Oui
        </button>
        
        <button
          type="button"
          onClick={() => onAnswer(question.id, false)}
          className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-200 ${
            answer === false
              ? 'bg-red-100 text-red-700 border-2 border-red-500'
              : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-red-50'
          }`}
        >
          <X className="mr-2 h-5 w-5" />
          Non
        </button>
      </div>
    </motion.div>
  );
};

export default QuestionCard;