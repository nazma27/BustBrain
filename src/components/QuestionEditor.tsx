import React, { useState } from 'react';
import { Trash2, Settings, Image, GripVertical } from 'lucide-react';
import { Question } from '../types/form';
import ImageUpload from './ImageUpload';
import CategorizeEditor from './questions/CategorizeEditor';
import ClozeEditor from './questions/ClozeEditor';
import ComprehensionEditor from './questions/ComprehensionEditor';

interface QuestionEditorProps {
  question: Question;
  index: number;
  onUpdate: (updates: Partial<Question>) => void;
  onDelete: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  index,
  onUpdate,
  onDelete
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'categorize':
        return 'bg-blue-100 text-blue-800';
      case 'cloze':
        return 'bg-green-100 text-green-800';
      case 'comprehension':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderQuestionEditor = () => {
    switch (question.type) {
      case 'categorize':
        return <CategorizeEditor question={question} onUpdate={onUpdate} />;
      case 'cloze':
        return <ClozeEditor question={question} onUpdate={onUpdate} />;
      case 'comprehension':
        return <ComprehensionEditor question={question} onUpdate={onUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Question Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1 hover:bg-gray-200 rounded cursor-move">
              <GripVertical className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQuestionTypeColor(question.type)}`}>
              {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Basic Question Settings */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Title
            </label>
            <input
              type="text"
              value={question.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter question title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={question.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add additional context or instructions"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Image (Optional)
            </label>
            <ImageUpload
              currentImage={question.image}
              onImageChange={(image) => onUpdate({ image })}
              className="w-full h-32"
            />
          </div>
        </div>

        {/* Advanced Settings */}
        {showSettings && (
          <div className="border-t border-gray-200 pt-4 mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Advanced Settings</h4>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => onUpdate({ required: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Required</span>
              </label>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Points:</label>
                <input
                  type="number"
                  min="1"
                  value={question.points}
                  onChange={(e) => onUpdate({ points: parseInt(e.target.value) || 1 })}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Question-specific Editor */}
        {renderQuestionEditor()}
      </div>
    </div>
  );
};

export default QuestionEditor;