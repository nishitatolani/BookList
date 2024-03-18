// RatingContext.js
import React, { createContext, useState, useContext } from 'react';

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState({});

  const updateRating = (bookKey, rating) => {
    setRatings(prevState => ({ ...prevState, [bookKey]: rating }));
  };

  const getRating = (bookKey) => {
    return ratings[bookKey] || 0;
  };

  return (
    <RatingContext.Provider value={{ ratings, updateRating, getRating }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => useContext(RatingContext);
