import React from 'react';

export const Header = () => {
  return (
    <div className="flex border-b border-gray-300 bg-white justify-center">
      <div className="flex justify-between items-center p-4 flex-row w-full max-w-7xl">
        <div>
          <p>Burger menu</p>
        </div>
        <div className="text-2xl">
          <p>NaturalFoods</p>
        </div>
        <div className="text-xs font-normal">
          <div>
            <p>Janine Wilson</p>
          </div>
          <div>
            <p>Janine.wilson@food.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
