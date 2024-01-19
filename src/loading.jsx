import React from 'react';
import { Bars } from 'react-loader-spinner';

const LoadingBars = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300 bg-opacity-50">
      <Bars
        height={80}
        width={80}
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingBars;
