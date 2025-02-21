import React from 'react';

interface CardProps {
  title: string;
  value: number;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 rounded-lg bg-[#14191F50] border border-[#31373F66] cursor-pointer hover:bg-gradient-to-br from-purple-600 via-purple-700 to-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
      <div className="w-full flex items-center justify-between">
        {/* Placeholder for icons */}
        {/* <Image width={20} height={20} src="yuff.svg" alt="icon" /> */}
        {/* <Image width={20} height={20} src="yuff.svg" alt="threeDots" /> */}
      </div>
      <div className="text-white flex flex-col items-center justify-center text-center h-full">
        <p className="text-2xl font-semibold mb-2">{title}</p>
        <p className="text-4xl font-bold text-purple-400">{value}</p>
      </div>
    </div>
  );
};

export default Card;