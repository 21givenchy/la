import React from 'react';
import Image from 'next/image';

const ImageWithText: React.FC<{ imageSrc: string; text: string }> = ({ imageSrc, text }) => {
  return (
    <div>
      <Image src={imageSrc} alt={text} />
      <p>{text}</p>
    </div>
  );
};

export default ImageWithText; // Default export
