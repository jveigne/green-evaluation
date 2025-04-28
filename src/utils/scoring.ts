import { FormData, Question } from '../types/form';
import { questions } from '../data/questions';

export const calculateScore = (formData: FormData): number => {
  let totalScore = 0;
  const maxPossibleScore = questions.reduce((acc, q) => acc + q.weight, 0);
  
  questions.forEach((question) => {
    const answer = formData.answers[question.id];
    if (answer) {
      totalScore += question.weight;
    }
  });
  
  // Normalize to a score out of 10
  return Math.round((totalScore / maxPossibleScore) * 10 * 10) / 10;
};

export const getScoreColor = (score: number): string => {
  if (score < 3) return 'text-red-600';
  if (score < 7) return 'text-orange-500';
  return 'text-green-600';
};

export const getScoreLabel = (score: number): string => {
  if (score < 3) return 'Débutant';
  if (score < 5) return 'En développement';
  if (score < 7) return 'Intermédiaire';
  if (score < 9) return 'Avancé';
  return 'Expert';
};