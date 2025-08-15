// components/icons/Star.js
import React from 'react';

const Star = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.42c1.104.085 1.571 1.405.675 2.109l-4.162 3.422 1.334 5.353c.201.805-.451 1.53-1.255 1.53-.354 0-.702-.097-1.02-.272L12 18.354 7.373 21.18c-.318.175-.666.272-1.02.272-.804 0-1.456-.725-1.255-1.53l1.334-5.353-4.162-3.422c-.896-.704-.429-2.024.675-2.109l5.404-.42 2.082-5.007Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Star;