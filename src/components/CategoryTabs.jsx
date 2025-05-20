
const CategoryTabs = ({ categories, activeCategory, onCategoryChange, itemCounts }) => {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex space-x-4 min-w-max p-1">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === category.id
                ? 'bg-fashion-purple text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {category.label} ({itemCounts[category.id] || 0})
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
