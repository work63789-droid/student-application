import React from 'react'

export const ChnageNumber = ({updatedNumber}) => {
  return (
    <div className="counter-buttons">
        <button
        className="counter-btn add"
        onClick={() => {
          updatedNumber(1);
        }}
      >
        Add 1
      </button>
      <button
        className="counter-btn subtract"
        onClick={() => {
          updatedNumber(-1);
        }}
      >
        Subract 1
      </button>
    </div>
  )
}
