import React from 'react';
import './App.css';
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i} style={{fontSize:'30px',color:'gold'}}>&#9733;</span>);
    } else {
      stars.push(<span key={i} style={{fontSize:'30px',color:'grey'}}>&#9734;</span>);
    }
  }
  return <div>{stars}</div>;
};

export default StarRating;
