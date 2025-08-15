// components/StarfieldBackground.js
import React from 'react';
import Particles from 'react-tsparticles';
import { loadStarsPreset } from 'tsparticles-preset-stars';

export default function StarfieldBackground() {
  const particlesInit = async (main) => {
    await loadStarsPreset(main);
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Particles
        id="stars-local"
        init={particlesInit}
        options={{
          preset: 'stars',
          fullScreen: { enable: false }, // ⬅️ Important: prevents global rendering
          background: { color: 'transparent' },
          particles: {
  number: { value: 60 },
  size: { value: 1.5 },
  color: {
    value: ['#ffffff', '#ffd1dc', '#b0e0e6', '#e0c3fc', '#fcb045'],
    animation: {
      enable: true,
      speed: 20,
      sync: false,
    },
  },
  twinkle: {
    particles: {
      enable: true,
      frequency: 0.05,
      opacity: 1,
    },
  },
},

        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </div>
  );
}
