// components/ServiceCard.js
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Tag, Dot } from 'lucide-react'; // Added Dot icon

export default function ServiceCard({ treatment, index, onViewDetails }) {
  const getStartingPrice = (group) => {
    if (group.nestedServices && group.nestedServices.length > 0) {
      const allPrices = group.nestedServices.flatMap(service =>
        service.pricingOptions ? service.pricingOptions.map(opt => parseFloat(opt.price.replace('P ', '').replace(',', ''))) : []
      ).filter(price => !isNaN(price));

      if (allPrices.length > 0) {
        const minPrice = Math.min(...allPrices);
        return `From P ${minPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    }
    return 'View Prices';
  };

  const displayPrice = getStartingPrice(treatment);

  // Get up to 4 key services for display on the card
  const keyServices = treatment.nestedServices ? treatment.nestedServices.slice(0, 4) : [];

  return (
    <motion.div
      className="glass-card rounded-2xl relative overflow-hidden group hover:shadow-glow transition-all duration-300 flex flex-col cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => onViewDetails(treatment)}
    >
      {treatment.status && (
        <span className="absolute top-4 right-4 bg-[#BEFD73] text-[#3C1F76] text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
          {treatment.status}
        </span>
      )}

      <div className="relative w-full h-48 rounded-t-xl overflow-hidden mb-5">
        <Image
          src={treatment.image}
          alt={treatment.title}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3C1F76]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xl font-bold">{treatment.title}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-3 min-h-[60px] flex items-center">
          {treatment.title}
        </h3>
        <p className="text-white/80 text-sm mb-4 flex-grow">{treatment.description}</p>

        {/* Section for key services - Displays shortDescription from nestedServices */}
        {keyServices.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold text-white/90 text-md mb-2">Highlights:</p>
            <ul className="space-y-1 text-white/70">
              {keyServices.map((service, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Dot size={18} className="text-[#BEFD73] flex-shrink-0" />
                  <span>{service.shortDescription || service.title}</span> {/* Use shortDescription or full title */}
                </li>
              ))}
              {treatment.nestedServices.length > 4 && (
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <Dot size={18} className="text-[#BEFD73] flex-shrink-0" />
                  <span>And {treatment.nestedServices.length - 4} more...</span> {/* Concise text */}
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <span className="text-xl font-bold bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent">
            {displayPrice}
          </span>
          <button
            className="px-4 py-2 bg-gradient-to-r from-[#39AD48] to-[#AFDCEC] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity duration-300"
            onClick={(e) => { e.stopPropagation(); onViewDetails(treatment); }}
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}