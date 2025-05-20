
const SingleOptionSelector = ({ options, selectedValue, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedValue === option.value 
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
          <p className={selectedValue === option.value ? 'font-medium' : ''}>{option.label}</p>
        </button>
      ))}
    </div>
  );
};

const MultiOptionSelector = ({ options, selectedValues = [], onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedValues.includes(option.value)
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
          <p className={selectedValues.includes(option.value) ? 'font-medium' : ''}>{option.label}</p>
        </button>
      ))}
    </div>
  );
};

export { SingleOptionSelector, MultiOptionSelector };
