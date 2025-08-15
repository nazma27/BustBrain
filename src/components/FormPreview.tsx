import React, { useState } from 'react';
import { FormData } from '../types/form';
import CategorizePreview from './preview/CategorizePreview';
import ClozePreview from './preview/ClozePreview';
import ComprehensionPreview from './preview/ComprehensionPreview';

interface FormPreviewProps {
  formData: FormData;
}

const FormPreview: React.FC<FormPreviewProps> = ({ formData }) => {
  const [responses, setResponses] = useState<{ [questionId: string]: any }>({});

  const updateResponse = (questionId: string, answer: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    console.log('Form responses:', responses);
    alert('Form submitted successfully! (Check console for response data)');
  };

  const renderQuestion = (question: any, index: number) => {
    switch (question.type) {
      case 'categorize':
        return (
          <CategorizePreview
            key={question.id}
            question={question}
            answer={responses[question.id]}
            onAnswerChange={(answer) => updateResponse(question.id, answer)}
          />
        );
      case 'cloze':
        return (
          <ClozePreview
            key={question.id}
            question={question}
            answer={responses[question.id]}
            onAnswerChange={(answer) => updateResponse(question.id, answer)}
          />
        );
      case 'comprehension':
        return (
          <ComprehensionPreview
            key={question.id}
            question={question}
            answer={responses[question.id]}
            onAnswerChange={(answer) => updateResponse(question.id, answer)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        {formData.headerImage && (
          <div className="w-full h-48 bg-gray-200">
            <img
              src={formData.headerImage}
              alt="Form header"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8">
          {/* Form Title and Description */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title}</h1>
            {formData.description && (
              <p className="text-lg text-gray-600 leading-relaxed">{formData.description}</p>
            )}
          </div>

          {/* Questions */}
          {formData.questions.length > 0 ? (
            <div className="space-y-8">
              {formData.questions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
                  <div className="mb-4">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                          {question.title}
                          {question.required && <span className="text-red-500 ml-1">*</span>}
                        </h2>
                        {question.description && (
                          <p className="text-gray-600">{question.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-gray-500">
                            Type: {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                          </span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{question.points} points</span>
                        </div>
                      </div>
                    </div>

                    {question.image && (
                      <div className="mt-4 rounded-lg overflow-hidden">
                        <img
                          src={question.image}
                          alt="Question"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {renderQuestion(question, index)}
                </div>
              ))}

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit Form
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No questions have been added to this form yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPreview;