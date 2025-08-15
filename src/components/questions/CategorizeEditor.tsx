import React from 'react';
import { Plus, X } from 'lucide-react';
import { Question } from '../../types/form';

interface CategorizeEditorProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

const CategorizeEditor: React.FC<CategorizeEditorProps> = ({ question, onUpdate }) => {
  const categories = question.categories || [];
  const items = question.items || [];

  const addCategory = () => {
    const newCategories = [...categories, `Category ${categories.length + 1}`];
    onUpdate({ categories: newCategories });
  };

  const updateCategory = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    onUpdate({ categories: newCategories });
  };

  const removeCategory = (index: number) => {
    const newCategories = categories.filter((_, i) => i !== index);
    onUpdate({ categories: newCategories });
  };

  const addItem = () => {
    const newItems = [...items, `Item ${items.length + 1}`];
    onUpdate({ items: newItems });
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onUpdate({ items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdate({ items: newItems });
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-900">Categories</h4>
          <button
            onClick={addCategory}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={category}
                onChange={(e) => updateCategory(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Category ${index + 1}`}
              />
              <button
                onClick={() => removeCategory(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-900">Items to Categorize</h4>
          <button
            onClick={addItem}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Item ${index + 1}`}
              />
              <button
                onClick={() => removeItem(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Preview</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border-2 border-dashed border-gray-300">
                <h5 className="font-medium text-gray-900 text-center">{category}</h5>
                <div className="mt-2 min-h-[60px] flex items-center justify-center text-sm text-gray-500">
                  Drop items here
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg cursor-move select-none"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorizeEditor;