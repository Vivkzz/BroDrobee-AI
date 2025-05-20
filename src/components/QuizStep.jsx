
import { useState } from 'react';

const QuizStep = ({ step, value, onSingleSelect, onMultiSelect, onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload({ target: { files: [e.dataTransfer.files[0]] } });
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{step.title}</h2>
      
      {step.type === 'single' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {step.options.map(option => (
            <button
              key={option.value}
              onClick={() => onSingleSelect(option.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                value === option.value 
                  ? 'border-fashion-purple bg-fashion-purple bg-opacity-10' 
                  : 'border-gray-200 hover:border-fashion-purple'
              }`}
            >
              {option.color && (
                <div 
                  className="w-8 h-8 mx-auto rounded-full mb-2 border border-gray-300" 
                  style={{ backgroundColor: option.color }}
                ></div>
              )}
              <p className={value === option.value ? 'font-medium' : ''}>{option.label}</p>
            </button>
          ))}
        </div>
      )}
      
      {step.type === 'multi' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {step.options.map(option => (
            <button
              key={option.value}
              onClick={() => onMultiSelect(option.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                value?.includes(option.value)
                  ? 'border-fashion-purple bg-fashion-purple bg-opacity-10' 
                  : 'border-gray-200 hover:border-fashion-purple'
              }`}
            >
              {option.color && (
                <div 
                  className="w-8 h-8 mx-auto rounded-full mb-2 border border-gray-300" 
                  style={{ backgroundColor: option.color }}
                ></div>
              )}
              <p className={value?.includes(option.value) ? 'font-medium' : ''}>{option.label}</p>
            </button>
          ))}
        </div>
      )}
      
      {step.type === 'file' && (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-fashion-purple bg-fashion-purple bg-opacity-5' 
              : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          {value ? (
            <div className="space-y-4">
              <div className="w-48 h-48 mx-auto overflow-hidden rounded-full border-4 border-fashion-purple">
                <img 
                  src={value} 
                  alt="Your selfie" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={() => onFileUpload({ target: { files: [] } })}
                className="text-fashion-purple hover:underline"
              >
                Remove and upload a different photo
              </button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Drag and drop your selfie here, or click to browse</p>
              <label className="fashion-button inline-block cursor-pointer">
                Upload Photo
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={onFileUpload}
                />
              </label>
              <p className="text-sm text-gray-500 mt-4">This helps our AI better understand your coloring</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizStep;
