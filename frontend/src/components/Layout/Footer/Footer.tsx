import React from 'react';

export const Footer = () => {
  return (
    <div className="p-4 border-t border-gray-300 bg-white text-sm text-gray-600 flex justify-center">
      <div className="max-w-7xl justify-center w-full">
        <div className="flex flex-row justify-between">
          <p>NaturalFoods</p>
          <div className="flex justify-center flex-row gap-4">
            <p>Contact Us</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
        <div className="flex justify-center mt-2 text-xs">
          <p>@2024 NaturalFoods. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
