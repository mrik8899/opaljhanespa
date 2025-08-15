// components/FogParticles.js
import React from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export default function FogParticles() {
  const particlesInit = async (main) => {
    await loadSlim(main); // loads only necessary plugins
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Particles
        id="fog-effect"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: 'transparent' },
          particles: {
            number: {
              value: 25,
              density: { enable: true, area: 1200 },
            },
            color: { value: '#ffffff' },
            opacity: {
              value: 0.06,
              random: true,
              animation: {
                enable: true,
                speed: 0.2,
                minimumValue: 0.02,
                sync: false,
              },
            },
            size: {
              value: { min: 60, max: 140 },
              animation: {
                enable: true,
                speed: 6,
                minimumValue: 50,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 0.1,
              direction: 'top',
              outModes: { default: 'out' },
            },
            shape: { type: 'circle' },
          },
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
