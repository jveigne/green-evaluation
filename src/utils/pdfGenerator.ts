import { jsPDF } from 'jspdf';
import { FormData, FormResult } from '../types/form';
import { questions } from '../data/questions';
import { getScoreLabel } from './scoring';

export const generatePDF = (result: FormResult): void => {
  const { formData, score } = result;
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 139);
  doc.text('Évaluation d\'Entreprise', 105, 20, { align: 'center' });
  
  // Company info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Entreprise: ${formData.companyName}`, 20, 40);
  doc.text(`Email: ${formData.email}`, 20, 50);
  doc.text(`Date d'évaluation: ${new Date().toLocaleDateString()}`, 20, 60);
  
  // Score
  doc.setFontSize(16);
  doc.setTextColor(0, 102, 204);
  doc.text(`Score Global: ${score}/10 - ${getScoreLabel(score)}`, 20, 80);
  
  // Responses
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Détail des Réponses:', 20, 100);
  
  let yPosition = 110;
  questions.forEach((question, index) => {
    const answer = formData.answers[question.id] ? 'Oui' : 'Non';
    const answerColor = formData.answers[question.id] ? [0, 128, 0] : [220, 0, 0];
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Handle long questions by wrapping text
    const splitText = doc.splitTextToSize(question.text, 170);
    doc.text(splitText, 20, yPosition);
    
    yPosition += (splitText.length * 7);
    
    doc.setTextColor(answerColor[0], answerColor[1], answerColor[2]);
    doc.text(`Réponse: ${answer}`, 20, yPosition);
    
    yPosition += 10;
    
    // Add page if needed
    if (yPosition > 270 && index < questions.length - 1) {
      doc.addPage();
      yPosition = 20;
    }
  });
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} sur ${pageCount}`, 105, 290, { align: 'center' });
  }
  
  // Save the PDF
  doc.save(`evaluation_${formData.companyName.replace(/\s+/g, '_')}.pdf`);
};