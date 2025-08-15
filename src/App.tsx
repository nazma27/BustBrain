import React, { useState } from 'react';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';
import { FormData, Question } from './types/form';

function App() {
  const [activeView, setActiveView] = useState<'builder' | 'preview'>('builder');
  const [formData, setFormData] = useState<FormData>({
    id: '',
    title: 'Untitled Form',
    description: '',
    headerImage: '',
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }));
  };

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      title: 'New Question',
      description: '',
      image: '',
      required: false,
      points: 1,
      ...getDefaultQuestionData(type)
    };

    updateFormData({
      questions: [...formData.questions, newQuestion]
    });
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    updateFormData({
      questions: formData.questions.map(q => 
        q.id === questionId ? { ...q, ...updates } : q
      )
    });
  };

  const deleteQuestion = (questionId: string) => {
    updateFormData({
      questions: formData.questions.filter(q => q.id !== questionId)
    });
  };

  const getDefaultQuestionData = (type: Question['type']) => {
    switch (type) {
      case 'categorize':
        return {
          categories: ['Category A', 'Category B'],
          items: ['Item 1', 'Item 2', 'Item 3'],
          answers: {}
        };
      case 'cloze':
        return {
          text: 'The quick brown ___ jumps over the lazy ___.',
          blanks: ['fox', 'dog']
        };
      case 'comprehension':
        return {
          passage: 'Enter your comprehension passage here...',
          questions: [
            { id: '1', question: 'Sample question?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 0 }
          ]
        };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">FormCraft</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveView('builder')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'builder'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Builder
                </button>
                <button
                  onClick={() => setActiveView('preview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'preview'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Preview
                </button>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Save Form
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'builder' ? (
          <FormBuilder
            formData={formData}
            updateFormData={updateFormData}
            addQuestion={addQuestion}
            updateQuestion={updateQuestion}
            deleteQuestion={deleteQuestion}
          />
        ) : (
          <FormPreview formData={formData} />
        )}
      </main>
    </div>
  );
}

export default App;