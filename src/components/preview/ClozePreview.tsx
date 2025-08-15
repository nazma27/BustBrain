import React, { useState, useEffect } from 'react';
import { Question } from '../../types/form';

interface ClozePreviewProps {
  question: Question;
  answer: any;
  onAnswerChange: (answer: any) => void;
}

const ClozePreview: React.FC<ClozePreviewProps> = ({
  question,
  answer,
  onAnswerChange
}) => {
  const [answers, setAnswers] = useState<string[]>(answer || []);
  const text = question.text || '';
  const blanks = question.blanks || [];

  useEffect(() => {
    // Initialize answers array if empty
    if (answers.length !== blanks.length) {
      const newAnswers = Array(blanks.length).fill('');
      setAnswers(newAnswers);
      onAnswerChange(newAnswers);
    }
  }, [blanks.length]);

  useEffect(() => {
    onAnswerChange(answers);
  }, [answers, onAnswerChange]);

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const renderTextWithBlanks = () => {
    const parts = text.split('___');
    let blankIndex = 0;
    
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && (
          <input
            type="text"
            value={answers[blankIndex] || ''}
            onChange={(e) => updateAnswer(blankIndex, e.target.value)}
            className="mx-1 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[100px] inline-block"
            placeholder={`Blank ${++blankIndex}`}
          />
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="text-lg leading-relaxed text-gray-900">
          {renderTextWithBlanks()}
        </div>
      </div>
      
      <p className="text-sm text-gray-600">
        Fill in the blanks with appropriate words or phrases.
      </p>
    </div>
  );
};

export default ClozePreview;