// D:\opal-spa-website\components\SvgTextMask.js
import React from 'react';

export default function SvgTextMask() {
  return (
    <svg viewBox="0 0 950 300" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <defs>
        {/* Image Pattern (for the texture background around text) */}
        <pattern id="imageFill" x="0" y="0" width="100%" height="100%" patternUnits="objectBoundingBox">
          <image href="/images/texture-background.jpg" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
        </pattern>

        {/* Text Mask Definition - Text is transparent, area around is opaque */}
        <mask id="text-mask" x="0" y="0" width="100%" height="100%">
          {/* Mask background is WHITE (makes areas opaque for the main element, showing imageFill) */}
          <rect x="0" y="0" width="100%" height="100%" fill="white" /> 
          
          {/* Text is BLACK (makes areas transparent for the main element, showing video behind) */}
          <text 
            x="50%" 
            y="50%" /* Centered baseline for the overall text block */
            textAnchor="middle" 
            style={{
              fontSize: 'clamp(40px, 12vw, 70px)' /* Further reduced max font size */, 
              fontWeight: '700', 
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif', 
              fill: 'black',  // Masking color for text
              stroke: 'black', // Stroke color for text mask
              strokeWidth: 'clamp(2px, 0.5vw, 5px)',   
              strokeLinejoin: 'round', 
            }}
          >
            {/* Text: Relax, Renew, Restore */}
            <tspan x="50%" dy="-1em">Relax</tspan>
            <tspan x="50%" dy="1.2em">Renew</tspan>
            <tspan x="50%" dy="1.2em">Restore</tspan>
          </text>
        </mask>
      </defs>
      
      {/* The main ellipse filled with the texture pattern and masked by the text */}
      <ellipse 
        cx="475" 
        cy="150" 
        rx="475" 
        ry="150"   
        fill="url(#imageFill)" 
        mask="url(#text-mask)" 
      />
    </svg>
  );
};