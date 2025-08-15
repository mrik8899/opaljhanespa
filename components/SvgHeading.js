// components/SvgHeading.js
import React from 'react';
import BlobBackground from './BlobBackground';
import StarfieldBackground from './StarfieldBackground';

export default function SvgHeading({
  text1 = "Discover",
  text2 = "Pure",
  text3 = "Tranquility",
  textureVideo = "/videos/text-video.mp4"
}) {
  return (
    <div
      className="relative w-full flex items-center justify-center overflow-visible"
      style={{
        minHeight: '600px',
        height: '660px',
        minWidth: '320px',
      }}
    >
      {/* ✅ Stars behind text only  */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <StarfieldBackground />
      </div> 

      {/* ✅ Animated Blobs behind text */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BlobBackground />
      </div>

      {/* === Desktop SVG === */}
      <div className="hidden sm:block w-full max-w-[1400px] h-full z-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="videoTextMaskDesktop">
              <rect width="100%" height="100%" fill="black" />
              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontFamily="'Anton', sans-serif"
                fontWeight="900"
                fontSize="clamp(50px, 6.5vw, 100px)"
                letterSpacing="1"
              >
                <tspan x="50%" dy="-0.6em">{text1} {text2}</tspan>
                <tspan x="50%" dy="1.1em">{text3}</tspan>
              </text>
            </mask>
          </defs>

          <foreignObject width="100%" height="100%" mask="url(#videoTextMaskDesktop)">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src={textureVideo}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </foreignObject>
        </svg>
      </div>

      {/* === Mobile SVG === */}
      <div className="block sm:hidden w-full h-full relative z-10" style={{ marginTop: '-90px' }}>
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="videoTextMaskMobile">
              <rect width="100%" height="100%" fill="black" />
              <text
                x="50%"
                y="20%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontFamily="'Anton', sans-serif"
                fontWeight="900"
                fontSize="clamp(200px, 36vw, 340px)"
                letterSpacing="0.5"
              >
                <tspan x="50%" dy="0em">{text1}</tspan>
                <tspan x="50%" dy="1em">{text2}</tspan>
                <tspan x="50%" dy="1em">{text3}</tspan>
              </text>
            </mask>
          </defs>

          <foreignObject width="100%" height="100%" mask="url(#videoTextMaskMobile)">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src={textureVideo}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}
