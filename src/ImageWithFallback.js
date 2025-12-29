import React, { useState } from 'react';

function ImageWithFallback({ src, sources = [], alt, fallback = '/logo512.png', style, className, ...rest }) {
  const initial = src || (sources.length > 0 ? sources[0] : fallback);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ordered = [initial, ...sources.filter(s => s && s !== initial), fallback];

  const handleError = () => {
    if (currentIndex < ordered.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <img
      src={ordered[currentIndex]}
      alt={alt}
      style={style}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
}

export default ImageWithFallback;


