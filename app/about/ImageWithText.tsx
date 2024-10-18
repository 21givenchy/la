import React from 'react';

const ImageWithText: React.FC<{ imageSrc: string; text: string }> = ({ imageSrc, text }) => {
  return (
    <div>
      <img src={imageSrc} alt={text} />
      <p>{text}</p>
    </div>
  );
};

export default ImageWithText; // Default export
