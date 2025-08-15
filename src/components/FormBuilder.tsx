import React from 'react';
import { Plus, Image, Type, List, FileText } from 'lucide-react';
import { FormData, Question } from '../types/form';
import QuestionEditor from './QuestionEditor';
import ImageUpload from './ImageUpload';

interface FormBuilderProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  addQuestion: (type: Question['type']) => void;
  updateQuestion: (questionId: string, updates: Partial<Question>) => void;
  deleteQuestion: (questionId: string) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  formData,
  updateFormData,
  addQuestion,
  updateQuestion,
  deleteQuestion
}) => {
  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Add Questions</h2>
        
        <div className="space-y-3">
          <button
            onClick={() => addQuestion('categorize')}
            className="w-full flex items-center gap-3 p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <List className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Categorize</h3>
              <p className="text-sm text-gray-500">Drag items into categories</p>
            </div>
          </button>

          <button
            onClick={() => addQuestion('cloze')}
            className="w-full flex items-center gap-3 p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <Type className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Cloze</h3>
              <p className="text-sm text-gray-500">Fill in the blanks</p>
            </div>
          </button>

          <button
            onClick={() => addQuestion('comprehension')}
            className="w-full flex items-center gap-3 p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Comprehension</h3>
              <p className="text-sm text-gray-500">Reading comprehension</p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 space-y-6">
        {/* Form Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter form title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a description for your form"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Header Image (Optional)
              </label>
              <ImageUpload
                currentImage={formData.headerImage}
                onImageChange={(image) => updateFormData({ headerImage: image })}
                className="w-full h-32"
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        {formData.questions.map((question, index) => (
          <QuestionEditor
            key={question.id}
            question={question}
            index={index}
            onUpdate={(updates) => updateQuestion(question.id, updates)}
            onDelete={() => deleteQuestion(question.id)}
          />
        ))}

        {/* Empty State */}
        {formData.questions.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
              <p className="text-gray-500 mb-6">
                Start building your form by adding questions from the sidebar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;