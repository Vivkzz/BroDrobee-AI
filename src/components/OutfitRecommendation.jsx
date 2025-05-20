
const OutfitRecommendation = ({ outfit }) => {
  return (
    <div className="fashion-card overflow-hidden">
      <div className="bg-fashion-purple text-white p-4">
        <h3 className="font-medium">{outfit.occasion}</h3>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {outfit.items.map((item, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-800 text-sm rounded-full px-3 py-1 flex items-center"
            >
              <span className="mr-1 font-medium">{item.type}:</span> {item.name}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span>From your personal wardrobe</span>
          </div>
          
          <div className="flex space-x-2">
            <button className="fashion-button-outline text-sm py-1 px-3">
              Save
            </button>
            <button className="fashion-button text-sm py-1 px-3">
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitRecommendation;
