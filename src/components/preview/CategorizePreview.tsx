import React, { useState, useEffect } from 'react';
import { Question } from '../../types/form';

interface CategorizePreviewProps {
  question: Question;
  answer: any;
  onAnswerChange: (answer: any) => void;
}

const CategorizePreview: React.FC<CategorizePreviewProps> = ({
  question,
  answer,
  onAnswerChange
}) => {
  const [categorization, setCategorization] = useState<{ [itemId: string]: string }>(answer || {});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const categories = question.categories || [];
  const items = question.items || [];

  useEffect(() => {
    onAnswerChange(categorization);
  }, [categorization, onAnswerChange]);

  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault();
    if (draggedItem) {
      setCategorization(prev => ({
        ...prev,
        [draggedItem]: category
      }));
      setDraggedItem(null);
    }
  };

  const handleRemoveFromCategory = (item: string) => {
    setCategorization(prev => {
      const newCategorization = { ...prev };
      delete newCategorization[item];
      return newCategorization;
    });
  };

  const getItemsInCategory = (category: string) => {
    return Object.entries(categorization)
      .filter(([_, cat]) => cat === category)
      .map(([item, _]) => item);
  };

  const getUnassignedItems = () => {
    return items.filter(item => !categorization[item]);
  };

  return (
    <div className="space-y-4">
      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 min-h-[120px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category)}
          >
            <h3 className="font-medium text-gray-900 mb-3 text-center">{category}</h3>
            <div className="space-y-2">
              {getItemsInCategory(category).map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg cursor-move flex items-center justify-between"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveFromCategory(item)}
                    className="text-blue-600 hover:text-blue-800 ml-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Unassigned Items */}
      <div className="bg-white border border-gray-300 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Items to Categorize</h3>
        <div className="flex flex-wrap gap-2">
          {getUnassignedItems().map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg cursor-move transition-colors"
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
            >
              {item}
            </div>
          ))}
        </div>
        {getUnassignedItems().length === 0 && (
          <p className="text-gray-500 text-center py-4">All items have been categorized!</p>
        )}
      </div>

      <p className="text-sm text-gray-600">
        Drag and drop items into their appropriate categories.
      </p>
    </div>
  );
};

export default CategorizePreview;