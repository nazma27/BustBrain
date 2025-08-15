import React from 'react';
import { Question } from '../../types/form';

interface ClozeEditorProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

const ClozeEditor: React.FC<ClozeEditorProps> = ({ question, onUpdate }) => {
  const text = question.text || '';
  const blanks = question.blanks || [];

  const updateText = (newText: string) => {
    onUpdate({ text: newText });
    
    // Extract blanks from underscores
    const blankPattern = /___/g;
    const blankCount = (newText.match(blankPattern) || []).length;
    
    // Update blanks array to match the number of blanks in text
    const newBlanks = [...blanks];
    while (newBlanks.length < blankCount) {
      newBlanks.push('');
    }
    while (newBlanks.length > blankCount) {
      newBlanks.pop();
    }
    
    onUpdate({ blanks: newBlanks });
  };

  const updateBlank = (index: number, value: string) => {
    const newBlanks = [...blanks];
    newBlanks[index] = value;
    onUpdate({ blanks: newBlanks });
  };

  const renderPreviewText = () => {
    let previewText = text;
    let blankIndex = 0;
    
    return previewText.split('___').reduce((acc, part, index) => {
      if (index === 0) return part;
      
      const blank = blanks[blankIndex] || 'blank';
      blankIndex++;
      
      return acc + `[${blank}]` + part;
    }, '');
  };

  return (
    <div className="space-y-6">
      {/* Text Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Cloze Text
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Use three underscores (___) to create blanks that students will fill in.
        </p>
        <textarea
          value={text}
          onChange={(e) => updateText(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your text with ___ for blanks. Example: The quick brown ___ jumps over the lazy ___."
        />
      </div>

      {/* Blank Answers */}
      {blanks.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Correct Answers for Blanks
          </label>
          <div className="space-y-3">
            {blanks.map((blank, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600 w-16">
                  Blank {index + 1}:
                </span>
                <input
                  type="text"
                  value={blank}
                  onChange={(e) => updateBlank(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter correct answer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Preview</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          {text ? (
            <div className="space-y-3">
              <p className="text-gray-900 leading-relaxed">
                {text.split('___').reduce((acc, part, index) => {
                  if (index === 0) return part;
                  
                  return (
                    <>
                      {acc}
                      <input
                        type="text"
                        className="mx-1 px-2 py-1 border border-gray-300 rounded bg-white min-w-[100px]"
                        placeholder={`Blank ${index}`}
                        disabled
                      />
                      {part}
                    </>
                  );
                }, '')}
              </p>
              {blanks.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-300">
                  <p className="text-sm text-gray-600">
                    <strong>Expected answers:</strong> {renderPreviewText()}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              Enter text with blanks (___) to see preview
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClozeEditor;