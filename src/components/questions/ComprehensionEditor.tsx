import React from 'react';
import { Plus, X } from 'lucide-react';
import { Question, ComprehensionQuestion } from '../../types/form';

interface ComprehensionEditorProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

const ComprehensionEditor: React.FC<ComprehensionEditorProps> = ({ question, onUpdate }) => {
  const passage = question.passage || '';
  const questions = question.questions || [];

  const updatePassage = (newPassage: string) => {
    onUpdate({ passage: newPassage });
  };

  const addQuestion = () => {
    const newQuestion: ComprehensionQuestion = {
      id: Date.now().toString(),
      question: '',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0
    };
    onUpdate({ questions: [...questions, newQuestion] });
  };

  const updateQuestion = (index: number, updates: Partial<ComprehensionQuestion>) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], ...updates };
    onUpdate({ questions: newQuestions });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    onUpdate({ questions: newQuestions });
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    onUpdate({ questions: newQuestions });
  };

  return (
    <div className="space-y-6">
      {/* Passage */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Reading Passage
        </label>
        <textarea
          value={passage}
          onChange={(e) => updatePassage(e.target.value)}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter the reading passage here..."
        />
      </div>

      {/* Questions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-900">Comprehension Questions</h4>
          <button
            onClick={addQuestion}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>

        <div className="space-y-4">
          {questions.map((q, questionIndex) => (
            <div key={q.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <h5 className="text-sm font-medium text-gray-900">
                  Question {questionIndex + 1}
                </h5>
                <button
                  onClick={() => removeQuestion(questionIndex)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => updateQuestion(questionIndex, { question: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter question"
                />

                <div className="space-y-2">
                  {q.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${questionIndex}-correct`}
                        checked={q.correctAnswer === optionIndex}
                        onChange={() => updateQuestion(questionIndex, { correctAnswer: optionIndex })}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Preview</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          {passage ? (
            <div className="space-y-4">
              <div className="bg-white rounded p-4 border">
                <h5 className="font-medium text-gray-900 mb-2">Reading Passage</h5>
                <p className="text-gray-700 leading-relaxed">{passage}</p>
              </div>
              
              {questions.map((q, index) => (
                <div key={q.id} className="bg-white rounded p-4 border">
                  <h6 className="font-medium text-gray-900 mb-2">
                    {index + 1}. {q.question}
                  </h6>
                  <div className="space-y-1">
                    {q.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`preview-${index}`}
                          disabled
                          className="text-purple-600"
                        />
                        <span className="text-gray-700">
                          {String.fromCharCode(65 + optionIndex)}. {option}
                        </span>
                        {q.correctAnswer === optionIndex && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Correct
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              Enter a reading passage to see preview
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComprehensionEditor;