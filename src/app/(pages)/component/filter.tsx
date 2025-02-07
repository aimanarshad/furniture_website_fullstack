import { useState } from "react";

interface PriceFilterProps {
  onFilterChange: (minPrice: number, maxPrice: number) => void;
}

const PriceFilter = ({ onFilterChange }: PriceFilterProps) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
  };

  const applyFilter = () => {
    onFilterChange(minPrice, maxPrice);
  };

  return (
    <div className=" absolute top-[800px] left-0  h-full w-64 bg-[#e7ceac] shadow-xl p-6 border-r border-gray-300 z-10 transform transition-all duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filter by Price</h2>

      {/* Min Price Slider */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-600 mb-2 ">Min Price: ${minPrice}</label>
        <input
          type="range"
          min={0}
          max={1000}
          value={minPrice}
          onChange={handleMinPriceChange}
          className="w-full h-2 bg-[#7e594e] rounded-lg appearance-none cursor-pointer transition-all duration-300"
        />
      </div>

      {/* Max Price Slider */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-black mb-2">Max Price: ${maxPrice}</label>
        <input
          type="range"
          min={0}
          max={1000}
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="w-full h-2 bg-[#7e594e]  rounded-lg appearance-none cursor-pointer transition-all duration-300"
        />
      </div>

      {/* Apply Filter Button */}
      <button
        onClick={applyFilter}
        className="w-full bg-[#cc942b] text-white py-2 px-4 rounded-lg hover:bg-[#cac6bd] transition duration-300"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default PriceFilter;
