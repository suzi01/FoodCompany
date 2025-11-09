import React from 'react';

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-white">
      <div>Burger menu</div>
      <div className="text-2xl">NaturalFoods</div>
      <div className="text-xs font-normal">
        <div>Janine Wilson</div>
        <div>Janine.wilson@food.com</div>
      </div>
    </div>
  );
};
