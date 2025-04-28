export interface FormData {
  companyName: string;
  email: string;
  answers: Record<string, boolean>;
}

export interface Question {
  id: string;
  text: string;
  weight: number;
}

export interface FormResult {
  formData: FormData;
  score: number;
  timestamp: Date;
}