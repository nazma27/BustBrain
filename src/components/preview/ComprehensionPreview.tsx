import React, { useState, useEffect } from 'react';
import { Question } from '../../types/form';

interface ComprehensionPreviewProps {
  question: Question;
  answer: any;
  onAnswerChange: (answer: any) => void;
}

const ComprehensionPreview: React.FC<ComprehensionPreviewProps> = ({
  question,
  answer,
  onAnswerChange
}) => {
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>(answer || {});

  const passage = question.passage || '';
  const questions = question.questions || [];

  useEffect(() => {
    onAnswerChange(answers);
  }, [answers, onAnswerChange]);

  const updateAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  return (
    <div className="space-y-6">
      {/* Reading Passage */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reading Passage</h3>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{passage}</p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {index + 1}. {q.question}
            </h4>
            <div className="space-y-3">
              {q.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={optionIndex}
                    checked={answers[q.id] === optionIndex}
                    onChange={() => updateAnswer(q.id, optionIndex)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-900">
                    <strong>{String.fromCharCode(65 + optionIndex)}.</strong> {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-600">
        Read the passage carefully and select the best answer for each question.
      </p>
    </div>
  );
};

export default ComprehensionPreview;