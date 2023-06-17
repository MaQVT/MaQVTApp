import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex space-x-4">
        <div className="w-4 h-4 bg-[#534F4D] rounded-full animate-bounce" />
        <div className="w-4 h-4 bg-[#534F4D] rounded-full animate-bounce" />
        <div className="w-4 h-4 bg-[#534F4D] rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default Loading;
