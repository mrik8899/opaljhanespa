// components/FogLayer.js
import React from 'react';

export default function FogLayer() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Layer 1 - slow drifting fog */}
      <div
        className="absolute top-0 left-0 w-[200%] h-full opacity-10 bg-[url('/textures/fog1.png')] bg-repeat-x blur-sm"
        style={{
          animation: 'fogDrift1 60s linear infinite',
        }}
      />

      {/* Layer 2 - deeper mist, more blur */}
      <div
        className="absolute top-0 left-0 w-[200%] h-full opacity-08 bg-[url('/textures/fog2.png')] bg-repeat-x blur-md"
        style={{
          animation: 'fogDrift2 120s linear infinite',
        }}
      />

      {/* Layer 3 - slow back mist */}
      <div
        className="absolute top-0 left-0 w-[200%] h-full opacity-06 bg-[url('/textures/fog3.png')] bg-repeat-x blur-lg"
        style={{
          animation: 'fogDrift3 180s linear infinite',
        }}
      />
    </div>
  );
}
