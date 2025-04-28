import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Building2, Mail } from 'lucide-react';

interface CompanyInfoProps {
  companyName: string;
  email: string;
  onSubmit: (data: { companyName: string; email: string }) => void;
}

const CompanyInfoForm: React.FC<CompanyInfoProps> = ({ 
  companyName, 
  email, 
  onSubmit 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      companyName,
      email
    }
  });

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Information de l'entreprise</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom de l'entreprise
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="companyName"
              type="text"
              className={`pl-10 w-full px-4 py-2 border ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Nom de votre société"
              {...register('companyName', { required: 'Ce champ est requis' })}
            />
          </div>
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              className={`pl-10 w-full px-4 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              placeholder="email@entreprise.com"
              {...register('email', { 
                required: 'Ce champ est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Adresse email invalide'
                }
              })}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:translate-y-[-2px]"
          >
            Continuer
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CompanyInfoForm;