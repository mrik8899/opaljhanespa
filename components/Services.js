// components/Services.js
import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import ServiceDetailModal from './ServiceDetailModal';

// Updated Image Paths
const IMAGE_SIGNATURE_MASSAGES = '/images/signature-massages.jpg';
const IMAGE_SPECIALIZED_MASSAGES = '/images/specialized-massages.jpg';
const IMAGE_WELLNESS = '/images/spa-sauna.jpg';
const IMAGE_BODY_TREATMENTS = '/images/body-treatments.jpg';
const IMAGE_ADDONS = '/images/spa-add-on.jpg';
const IMAGE_PACKAGES = '/images/spa-package.jpg';
const IMAGE_NAIL_CARE = '/images/spa-nail-care.jpg';
const IMAGE_EYELASH_EXTENSIONS = '/images/eyelash-extensions.jpg';

// --- Define individual service details (re-using from previous iteration, ensuring shortDescription exists) ---
const swedishMassage = {
  id: 'swedish-massage',
  title: "Swedish Massage",
  shortDescription: "Classic full-body relaxation for stress relief.",
  longDescription: "Our Swedish Massage utilizes long, flowing strokes, kneading, deep circular movements, vibration, and tapping. It's designed to relax muscles, improve circulation, and promote overall relaxation. Ideal for those seeking stress relief and gentle muscle relaxation.",
  features: ["Relaxing strokes", "Muscle tension relief", "Improved circulation", "Stress reduction"],
  pricingOptions: [{ duration: "60 mins", price: "P 450.00" }, { duration: "90 mins", price: "P 650.00" }, { duration: "120 mins", price: "P 900.00" }],
};

const thaiMassage = {
  id: 'thai-massage',
  title: "Thai Massage",
  shortDescription: "Ancient healing art with acupressure, yoga-like stretches.",
  longDescription: "Traditional Thai massage is a dry massage performed on a mat on the floor, with the client fully clothed. It involves deep stretching, rhythmic pressing, and gentle rocking to relieve tension, improve flexibility, and balance the body’s energy lines.",
  features: ["Acupressure techniques", "Yoga-like stretching", "Improved flexibility", "Energy balance"],
  pricingOptions: [{ duration: "60 mins", price: "P 400.00" }, { duration: "90 mins", price: "P 600.00" }, { duration: "120 mins", price: "P 800.00" }],
};

const footMassage = {
  id: 'foot-massage',
  title: "Foot Massage",
  shortDescription: "Targeted reflexology to soothe tired feet.",
  longDescription: "Our foot massage focuses on reflex points in the feet that correspond to different organs and systems in the body. It's an excellent way to relieve stress, improve circulation, and alleviate pain in the feet and lower legs. A truly rejuvenating experience after a long day.",
  features: ["Reflexology points", "Circulation improvement", "Stress relief", "Foot muscle tension relief"],
  pricingOptions: [{ duration: "60 mins", price: "P 400.00" }, { duration: "90 mins", price: "P 600.00" }, { duration: "120 mins", price: "P 800.00" }],
};

const backMassage = {
  id: 'back-massage',
  title: "Back Massage",
  shortDescription: "Focused relief for back and neck tension.",
  longDescription: "Our back massage is specifically designed to address tension and discomfort in the back, neck, and shoulders. Using various techniques, our therapists will work to release knots, improve posture, and provide deep relaxation to this common problem area.",
  features: ["Targeted back relief", "Neck and shoulder focus", "Tension release", "Posture improvement"],
  pricingOptions: [{ duration: "30 mins", price: "P 200.00" }, { duration: "60 mins", price: "P 400.00" }, { duration: "90 mins", price: "P 600.00" }],
};

const sauna = {
  id: 'sauna',
  title: "Sauna",
  shortDescription: "Detoxify and relax in our private sauna.",
  longDescription: "Sauna use may offer health benefits such as reducing stress, improving heart health, relieving pain, and soothing sore muscles. Our private sauna provides a tranquil environment for you to unwind and detoxify.",
  features: ["Stress reduction", "Improved heart health", "Pain relief", "Muscle soothing"],
  pricingOptions: [{ duration: "Session", price: "P 500.00" }],
};

const bodyScrub = {
  id: 'body-scrub',
  title: "Body Scrub",
  shortDescription: "Exfoliating treatment for radiant, smooth skin.",
  longDescription: "By removing dead skin cells, body scrubs help to improve the skin's texture and promote cell renewal, resulting in a radiant and youthful appearance. Experience soft, smooth, and revitalized skin.",
  features: ["Removes dead skin cells", "Improves skin texture", "Promotes cell renewal", "Radiant and youthful appearance"],
  pricingOptions: [{ duration: "Session", price: "P 550.00" }],
};

const footScrub = {
  id: 'foot-scrub',
  title: "Foot Scrub",
  shortDescription: "Revitalize tired feet with deep exfoliation.",
  longDescription: "A foot scrub is a treatment in which the feet are exfoliated with soap and rocks. The purpose of this process is to remove dead skin cells, reduce calluses, improve circulation, relieve muscle tension from standing or walking all day long, and soothe tired muscles. A perfect complement to a foot massage.",
  features: ["Exfoliates dead skin", "Reduces calluses", "Improves circulation", "Relieves muscle tension"],
  pricingOptions: [{ duration: "Session", price: "P 550.00" }],
};

const ventosa = {
  id: 'ventosa',
  title: "Ventosa (Cupping)",
  shortDescription: "Traditional cupping for muscle relaxation and pain relief.",
  longDescription: "Ventosa, or cupping therapy, involves placing cups on the skin to create suction, which helps to increase blood flow, reduce muscle tension, and alleviate pain. It's an excellent add-on to enhance the therapeutic benefits of any massage.",
  features: ["Reduces muscle tension", "Improves blood circulation", "Aids pain relief", "Complements massage"],
  pricingOptions: [{ duration: "10 mins", price: "P 150.00" }],
};

const hotStoneAddon = {
  id: 'hotstone-addon',
  title: "Hot Stone Add-on",
  shortDescription: "Add warm stones for deeper relaxation and soothing.",
  longDescription: "Smooth, heated stones are placed on specific points of your body or used by the therapist as an extension of their hands. The warmth penetrates muscles, promoting deeper relaxation and easing stiffness. A perfect enhancement for Swedish or Thai massages.",
  features: ["Deeper muscle relaxation", "Alleviates stiffness", "Enhances blood flow", "Soothing warmth"],
  pricingOptions: [{ duration: "10 mins", price: "P 150.00" }],
};

const earCandling = {
  id: 'ear-candling',
  title: "Ear Candling",
  shortDescription: "Gentle therapy for earwax removal and relaxation.",
  longDescription: "Ear candling is a holistic therapy used to remove earwax and debris from the ear canal. It involves placing a hollow, tapered candle into the ear and lighting the other end. The gentle warmth and suction created help draw out impurities, promoting a sense of clarity and relaxation.",
  features: ["Non-invasive ear cleaning", "Promotes relaxation", "May relieve sinus pressure", "Gentle warming sensation"],
  pricingOptions: [{ duration: "Session", price: "P 250.00" }],
};

const headShoulderAddon = {
  id: 'head-shoulder-massage-addon',
  title: "Head & Shoulder Add-on",
  shortDescription: "Focused relief for head, neck, and shoulder tension.",
  longDescription: "This add-on provides targeted relief for tension built up in the scalp, neck, and shoulder areas. Ideal for those who spend long hours at a desk or experience frequent headaches, this massage helps to release knots and promote profound relaxation.",
  features: ["Reduces head and neck tension", "Alleviates headaches", "Promotes mental clarity", "Quick stress relief"],
  pricingOptions: [{ duration: "Session", price: "P 200.00" }],
};

const manicure = {
  id: 'manicure',
  title: "Manicure",
  shortDescription: "Professional nail care for healthy, beautiful hands.",
  longDescription: "Our manicure service includes nail shaping, cuticle care, buffing, and a relaxing hand massage, finished with your choice of polish. Keep your hands looking their best.",
  features: ["Nail shaping", "Cuticle care", "Hand massage", "Choice of polish"],
  pricingOptions: [{ duration: "Session", price: "P 180.00" }],
};

const pedicure = {
  id: 'pedicure',
  title: "Pedicure",
  shortDescription: "Rejuvenating foot and nail care for soft, pampered feet.",
  longDescription: "Indulge in our pedicure service which includes a soothing foot soak, nail shaping, cuticle care, callus removal, exfoliation, and a relaxing foot massage, finished with your choice of polish. Treat your feet to the care they deserve.",
  features: ["Foot soak", "Nail shaping", "Callus removal", "Foot massage", "Choice of polish"],
  pricingOptions: [{ duration: "Session", price: "P 200.00" }],
};

const footSpa = {
  id: 'foot-spa',
  title: "Foot Spa",
  shortDescription: "Luxurious deep cleansing and hydration for your feet.",
  longDescription: "Our foot spa goes beyond a typical pedicure, offering deeper cleansing, exfoliation, and hydration for your feet. It's a truly indulgent experience that leaves your feet feeling incredibly soft, refreshed, and invigorated.",
  features: ["Deep foot cleansing", "Exfoliation", "Hydration treatment", "Ultimate relaxation"],
  pricingOptions: [{ duration: "Session", price: "P 400.00" }],
};

const eyelashNatural = {
  id: 'eyelash-natural',
  title: "Eyelash Extension: Natural",
  shortDescription: "Subtle, elegant lash extensions for everyday beauty.",
  longDescription: "Achieve a naturally fuller and longer lash look that enhances your eyes without being overly dramatic. Perfect for daily wear or for those new to extensions.",
  features: ["Subtle enhancement", "Natural look", "Adds length and volume", "Perfect for everyday"],
  pricingOptions: [{ duration: "Full Set", price: "P 350.00" }],
};

const eyelashVolume = {
  id: 'eyelash-volume',
  title: "Eyelash Extension: Volume",
  shortDescription: "Dramatic volume for striking, fuller eyes.",
  longDescription: "Volume lash extensions create a fuller, more dramatic look by applying multiple thinner lashes to each natural lash. Ideal for special occasions or for those who desire a bolder eye statement.",
  features: ["Dramatic volume", "Fuller lash line", "Ideal for special events", "Customizable fullness"],
  pricingOptions: [{ duration: "Full Set", price: "P 600.00" }],
};

const eyelashCatEye = {
  id: 'eyelash-cat-eye',
  title: "Eyelash Extension: Cat Eye",
  shortDescription: "Elongate eyes with a classic, fanned-out style.",
  longDescription: "The Cat Eye style emphasizes the outer corners of your eyes, creating an elongated and lifted appearance. This classic look is perfect for a sophisticated and alluring gaze.",
  features: ["Elongated eye shape", "Lifted appearance", "Classic, alluring look", "Customizable length"],
  pricingOptions: [{ duration: "Full Set", price: "P 700.00" }],
};

const eyelashWispy = {
  id: 'eyelash-wispy',
  title: "Eyelash Extension: Wispy",
  shortDescription: "Textured, feathery look with varied lash lengths.",
  longDescription: "Wispy lash extensions create a soft, feathery, and textured look by mixing different lengths and curls of lashes. This style is highly customizable and offers a beautiful, effortless appeal.",
  features: ["Textured, feathery look", "Soft and natural yet full", "Highly customizable", "Effortless beauty"],
  pricingOptions: [{ duration: "Full Set", price: "P 700.00" }],
};

const eyelashMegaVolume = {
  id: 'eyelash-mega-volume',
  title: "Eyelash Extension: Mega Volume",
  shortDescription: "The ultimate dramatic lash look for maximum fullness.",
  longDescription: "Mega Volume lashes deliver the most dramatic and dense look possible, using ultra-fine lashes to create incredibly full fans. Perfect for those who want to make a bold statement with their eyes.",
  features: ["Maximum fullness", "Bold, dramatic impact", "Ultra-fine lashes for density", "Exceptional eye enhancement"],
  pricingOptions: [{ duration: "Full Set", price: "P 900.00" }],
};

// --- Define the new, specific group cards ---

const signatureMassagesGroup = {
  id: 'group-signature-massages',
  category: "Massages",
  title: "Signature Massages",
  description: "Experience the ultimate in relaxation and therapeutic relief with our classic Signature Massages, designed to soothe your body and mind.",
  image: IMAGE_SIGNATURE_MASSAGES,
  status: "Popular",
  type: "group",
  nestedServices: [swedishMassage, thaiMassage],
};

const specializedMassagesGroup = {
  id: 'group-specialized-massages',
  category: "Massages",
  title: "Specialized Massages",
  description: "Targeted relief for specific needs, our Specialized Massages offer focused therapy for areas like your feet and back.",
  image: IMAGE_SPECIALIZED_MASSAGES,
  type: "group",
  nestedServices: [footMassage, backMassage],
};

const wellnessGroup = {
  id: 'group-wellness',
  category: "Wellness",
  title: "Wellness Services",
  description: "Purify and relax your body with our detoxifying sauna sessions, designed to promote overall well-being.",
  image: IMAGE_WELLNESS,
  type: "group",
  nestedServices: [sauna],
};

const bodyTreatmentGroup = {
  id: 'group-body-treatments',
  category: "Body Treatments",
  title: "Body Treatments",
  description: "Renew your skin and revitalize your body with our exfoliating body and foot scrubs, leaving you feeling smooth and refreshed.",
  image: IMAGE_BODY_TREATMENTS,
  type: "group",
  nestedServices: [bodyScrub, footScrub],
};

const treatmentAddonsGroup = {
  id: 'group-addons',
  category: "Enhancements",
  title: "Treatment Add-ons",
  description: "Enhance any spa session with our specialized add-ons, from pain relief with Ventosa to soothing Hot Stones and clarifying Ear Candling.",
  image: IMAGE_ADDONS,
  type: "group",
  nestedServices: [ventosa, hotStoneAddon, earCandling, headShoulderAddon],
};

const packagesGroup = {
  id: 'group-packages',
  category: "Bundles",
  title: "Exclusive Spa Packages",
  description: "Discover our curated spa packages combining multiple services for an extended and comprehensive relaxation experience at special prices.",
  image: IMAGE_PACKAGES,
  type: "group",
  // Nested services for packages (just placeholder for structure, actual package details are in previous data)
  nestedServices: [
    { id: 'package-1', title: "Thai Bliss Combo", shortDescription: "Thai Massage + Ventosa/Hot Stone." },
    { id: 'package-2', title: "Serenity & Clarity", shortDescription: "Swedish Massage + Hot Stone + Ear Candling." },
    { id: 'package-3', title: "Enhanced Thai Relief", shortDescription: "Thai Massage + Hot Stone/Ventosa." },
    { id: 'package-4', title: "Swedish & Ear Candling", shortDescription: "Ear Candling + Swedish Massage." },
    { id: 'package-5', title: "Ultimate Body & Foot (Thai)", shortDescription: "Thai + Foot Massage + Add-on." },
    { id: 'package-6', title: "Ultimate Body & Foot (Swedish)", shortDescription: "Swedish + Foot Massage + Add-on." },
    { id: 'package-7', title: "Foot & Head Relief", shortDescription: "Foot Massage + Head Massage." },
    { id: 'package-8', title: "Head & Swedish Rejuvenation", shortDescription: "Head Massage + Swedish Massage." }
  ],
};

const nailCareGroup = {
  id: 'group-nail-care',
  category: "Beauty Services",
  title: "Nail Care",
  description: "Pamper your hands and feet with our professional manicures, pedicures, and indulgent foot spa treatments.",
  image: IMAGE_NAIL_CARE,
  type: "group",
  nestedServices: [manicure, pedicure, footSpa],
};

const eyelashExtensionsGroup = {
  id: 'group-eyelash-extensions',
  category: "Beauty Services",
  title: "Eyelash Extensions",
  description: "Enhance your natural beauty with our range of eyelash extension styles, from subtle natural looks to dramatic volume.",
  image: IMAGE_EYELASH_EXTENSIONS,
  type: "group",
  nestedServices: [eyelashNatural, eyelashVolume, eyelashCatEye, eyelashWispy, eyelashMegaVolume],
};

// --- Main Services Component ---
export default function Services() {
  const [selectedTreatmentGroup, setSelectedTreatmentGroup] = useState(null);

  const onViewDetails = (treatmentGroup) => {
    setSelectedTreatmentGroup(treatmentGroup);
  };

  const onCloseDetails = () => {
    setSelectedTreatmentGroup(null);
  };

  return (
    <section
        id="services"
        // REMOVED: bg-gradient-to-b from-[#3C1F76]/18 to-[#3C1F76]/23
        // The section itself should now only handle positioning and padding
        className="py-12 md:py-16 relative z-10 overflow-hidden"
    >
       {/* Background overlay div, now with solid transparent color */}
        <div className="absolute inset-0 z-0"
            style={{
                // Change to a solid transparent color overlay
                background: `linear-gradient(to bottom,
                    rgba(60, 31, 118, 0.18) 0%,  /* Starts matching EnhancedBentoGrid's end (0.18) */
                    rgba(60, 31, 118, 0.20) 100% /* Continues the fade to 0.20 */
                     )`
            }}
        />

      {/* Ensure your content is above the new background div by adding z-index if needed.
            The section's z-10 should propagate, but explicit z-index on content wrapper is safer. */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-16">
                Our <span className="bg-gradient-to-r from-[#39AD48] via-[#BEFD73] to-[#AFDCEC] bg-clip-text text-transparent">Services</span>
            </h2>


        {/* Signature & Specialized Massages (Row 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <ServiceCard
            key={signatureMassagesGroup.id}
            treatment={signatureMassagesGroup}
            index={0}
            onViewDetails={onViewDetails}
          />
          <ServiceCard
            key={specializedMassagesGroup.id}
            treatment={specializedMassagesGroup}
            index={1}
            onViewDetails={onViewDetails}
          />
        </div>

        {/* Wellness, Body Treatment, Add-ons (Row 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          <ServiceCard
            key={wellnessGroup.id}
            treatment={wellnessGroup}
            index={2}
            onViewDetails={onViewDetails}
          />
          <ServiceCard
            key={bodyTreatmentGroup.id}
            treatment={bodyTreatmentGroup}
            index={3}
            onViewDetails={onViewDetails}
          />
          <ServiceCard
            key={treatmentAddonsGroup.id}
            treatment={treatmentAddonsGroup}
            index={4}
            onViewDetails={onViewDetails}
          />
        </div>

        {/* Exclusive SPA Packages (Row 3 - FULL WIDTH) */}
        <div className="mb-10">
          <ServiceCard
            key={packagesGroup.id}
            treatment={packagesGroup}
            index={5}
            onViewDetails={onViewDetails}
          />
        </div>

        {/* Nails & Eyelashes (Row 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ServiceCard
            key={nailCareGroup.id}
            treatment={nailCareGroup}
            index={6}
            onViewDetails={onViewDetails}
          />
          <ServiceCard
            key={eyelashExtensionsGroup.id}
            treatment={eyelashExtensionsGroup}
            index={7}
            onViewDetails={onViewDetails}
          />
        </div>

      </div>

      {selectedTreatmentGroup && (
        <ServiceDetailModal
          treatment={selectedTreatmentGroup}
          onClose={onCloseDetails}
        />
      )}
    </section>
  );
}