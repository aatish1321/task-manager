import React from 'react'

const CustomTooltip = ({active, payload}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 shadow-md rounded-lg p-2 border border-gray-600">
        <p className="text-xs font-semibold text-blue-400 mb-1">{payload[0].name}</p>
        <p className="text-sm text-gray-300">
          Count: <span className="text-sm font-medium text-white">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
}

export default CustomTooltip