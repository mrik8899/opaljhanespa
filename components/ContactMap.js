// components/ContactMap.js - Fixed version
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function ContactMap() {
  const mapContainerRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mapboxgl, setMapboxgl] = useState(null);
  
  useEffect(() => {
    // Load the Mapbox GL JS library dynamically
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
    script.async = true;
    script.onload = () => {
      // Set the mapboxgl object after it's loaded
      setMapboxgl(window.mapboxgl);
    };
    document.body.appendChild(script);
    
    // Add the Mapbox CSS
    const link = document.createElement('link');
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);
  
  // Initialize map when mapboxgl is available
  useEffect(() => {
    if (!mapboxgl || !mapContainerRef.current) return;
    
    // Replace with your actual Mapbox token
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [125.604, 7.085], // Davao City coordinates
      zoom: 15,
      pitch: 60, // 3D view
      bearing: -30,
      antialias: true
    });
    
    map.on('load', () => {
      // Add 3D building layer
      map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 14,
        'paint': {
          'fill-extrusion-color': [
            'interpolate',
            ['linear'],
            ['get', 'height'],
            0, '#AFDCEC',
            50, '#39AD48',
            100, '#3C1F76',
            200, '#B784A7'
          ],
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.7
        }
      });
      
      // Add custom marker for spa location
      const marker = new mapboxgl.Marker({
        color: '#39AD48',
        scale: 1.2
      })
        .setLngLat([125.604, 7.085])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3 class="font-bold">Opal Jhane Spa</h3><p>Luxury & Wellness</p>')
        )
        .addTo(map);
      
      setIsMapLoaded(true);
      
      // Add interactive animations
      map.on('mousemove', () => {
        if (!isHovered) {
          setIsHovered(true);
        }
      });
      
      map.on('mouseout', () => {
        setIsHovered(false);
      });
    });
    
    // Clean up on unmount
    return () => map.remove();
  }, [mapboxgl, isHovered]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 rounded-2xl overflow-hidden shadow-2xl h-[400px] glass-card p-1 relative"
    >
      {/* Map container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-xl"
        style={{ 
          transition: 'all 0.5s ease',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)'
        }}
      />
      
      {/* Loading overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#3C1F76]/80 rounded-xl">
          <div className="text-center">
            <MapPin size={40} className="text-[#39AD48] mx-auto animate-bounce" />
            <p className="text-white mt-4">Loading interactive map...</p>
          </div>
        </div>
      )}
      
      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button 
          className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors text-white"
          aria-label="Zoom in"
          onClick={() => mapboxgl && mapContainerRef.current && mapboxgl.getMap(mapContainerRef.current).zoomIn()}
        >
          +
        </button>
        <button 
          className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors text-white"
          aria-label="Zoom out"
          onClick={() => mapboxgl && mapContainerRef.current && mapboxgl.getMap(mapContainerRef.current).zoomOut()}
        >
          -
        </button>
      </div>
    </motion.div>
  );
}