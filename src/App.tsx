/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Camera, 
  Video, 
  Mail, 
  X,
  Instagram,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDown
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface GalleryItem {
  id: number;
  type: "photography" | "video";
  title: string;
  category: string;
  src: string;
  videoUrl?: string;
  description: string;
  location: string;
  gallery?: string[]; // For multi-image themes
  galleryDescriptions?: string[];
}

const WORKS: GalleryItem[] = [
  {
    id: 1,
    type: "video",
    title: "The Last Red Romance: How Wing Kei’s Flower Plaques Define Hong Kong’s Streets",
    category: "Cinematography",
    src: "https://i.imgur.com/3wbzd5s.jpeg",
    videoUrl: "https://www.youtube.com/embed/62J3gRfRZtA",
    description: "This documentary captures the essence of Hong Kong’s intangible cultural heritage—the Flower Plaques. Through an intimate interview with Mr. Choi Kee, the second-generation craftsman of Wing Kei, the film explores how traditional craftsmanship survives amidst modern economic pressures and rising costs. It is more than a record of a craft; it is a heartfelt tribute to the enduring spirit of Hong Kong’s artisans and their dedication to heritage.",
    location: "Global"
  },
  {
    id: 2,
    type: "photography",
    title: "Lunar New Year in HK",
    category: "Culture",
    src: "https://i.imgur.com/oEA3ZvH.jpeg",
    description: "The vibrant atmosphere of Hong Kong streets during the New Year, where tradition meets modernity.",
    location: "Hong Kong, CN",
    gallery: [
      "https://i.imgur.com/oEA3ZvH.jpeg",
      "https://i.imgur.com/fCBS7WB.jpeg",
      "https://i.imgur.com/kiSnAOx.jpeg",
      "https://i.imgur.com/K7VaDCt.jpeg",
      "https://i.imgur.com/g6nOqnM.jpeg",
      "https://i.imgur.com/3r6r97s.jpeg",
      "https://i.imgur.com/62gU8jS.jpeg",
      "https://i.imgur.com/f54hcYP.jpeg",
      "https://i.imgur.com/pgEQMBi.jpeg"
    ],
    galleryDescriptions: [
      "On a small street in Central, a group of foreigners were enjoying the Chinese New Year in a very convivial atmosphere.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "In a bakery in Tsim Sha Tsui, two young people were catching up; I couldn’t resist capturing this lovely moment.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "An elderly gentleman writing Spring Festival couplets whom I met in Causeway Bay; he donates all his earnings to charity. The couplets he wrote, ‘National Prosperity and People’s Peace’ and ‘World Peace’, left a lasting impression.",
      "An elderly gentleman writing Spring Festival couplets whom I met in Causeway Bay; he donates all his earnings to charity. The couplets he wrote, ‘National Prosperity and People’s Peace’ and ‘World Peace’, left a lasting impression.",
      "An elderly gentleman writing Spring Festival couplets whom I met in Causeway Bay; he donates all his earnings to charity. The couplets he wrote, ‘National Prosperity and People’s Peace’ and ‘World Peace’, left a lasting impression."
    ]
  },
  {
    id: 3,
    type: "photography",
    title: "Da Tie Hua: Molten Iron Splashing",
    category: "Heritage",
    src: "https://i.imgur.com/nLZg73X.jpeg",
    description: "The iron flower show held at Happy Valley in Chongqing, China, was truly spectacular.",
    location: "Chongqing, China",
    gallery: [
      "https://i.imgur.com/nLZg73X.jpeg",
      "https://i.imgur.com/42jmnVQ.jpeg",
      "https://i.imgur.com/wvrdmpC.jpeg",
      "https://i.imgur.com/5vc6Y1V.jpeg",
      "https://i.imgur.com/mk4bkFE.jpeg",
      "https://i.imgur.com/3ivF5MO.jpeg"
    ],
    galleryDescriptions: [
      "The iron flower show held at Happy Valley in Chongqing, China, was truly spectacular.",
      "The iron flower show held at Happy Valley in Chongqing, China, was truly spectacular.",
      "The iron flower show held at Happy Valley in Chongqing, China, was truly spectacular.",
      "The iron flower show held at Happy Valley in Chongqing, China, was truly spectacular.",
      "The iron flower show held at Happy Valley in Chongqing, China, was truly spectacular.",
      "The iron flower show held at Happy Valley in Chongqing, China, was truly spectacular."
    ]
  },
  {
    id: 4,
    type: "photography",
    title: "Mainland New Year",
    category: "Lifestyle",
    src: "https://i.imgur.com/e65li5K.jpeg",
    description: "Recording the New Year customs and bustling atmosphere in different corners of mainland China.",
    location: "Mainland China",
    gallery: [
      "https://i.imgur.com/e65li5K.jpeg",
      "https://i.imgur.com/H8v73cX.jpeg",
      "https://i.imgur.com/9cmaj02.jpeg",
      "https://i.imgur.com/QlemGOp.jpeg",
      "https://i.imgur.com/m11TlY9.jpeg",
      "https://i.imgur.com/lhpB8pd.jpeg"
    ],
    galleryDescriptions: [
      "This photo was taken at a temple in Ciqikou, Chongqing. At the start of the New Year, everyone goes there to burn incense and pray for good fortune.",
      "These are the birds kept at the temple; the monks there feed them regularly.",
      "On the first day of the Lunar New Year, the temple serves tangyuan to visitors who come to pray for blessings.",
      "In China, there is a custom of lighting lanterns to pray for blessings.",
      "In Ciqikou, children are intently watching a Peking Opera performance on stage.",
      "In Ciqikou, my adorable niece is intently watching a theatrical performance on stage."
    ]
  }
];

export default function App() {
  const [selectedWork, setSelectedWork] = useState<typeof WORKS[0] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    if (selectedWork) {
      document.body.style.overflow = "hidden";
      setGalleryIndex(0);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedWork]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedWork?.gallery) return;
    setGalleryIndex((prev) => (prev === 0 ? selectedWork.gallery!.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedWork?.gallery) return;
    setGalleryIndex((prev) => (prev === selectedWork.gallery!.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans selection:bg-[#A8E6CF] selection:text-[#1A1A1A] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/30 backdrop-blur-xl px-12 py-8 flex justify-between items-center mix-blend-difference invert">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-bold tracking-[0.3em] uppercase"
        >
          ZHENG.<span className="text-steelblue-600">SHIYI</span>
        </motion.div>
        <div className="flex space-x-12 text-[10px] font-bold uppercase tracking-[0.2em]">
          <a href="#works" className="hover:text-[#8FA998] transition-colors">Portfolio</a>
          <a href="#about" className="hover:text-[#8FA998] transition-colors">About</a>
          <a href="mailto:hello@example.com" className="hover:text-[#8FA998] transition-colors font-serif italic normal-case text-sm tracking-normal">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Data Backdrop (Watermark) */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.06] -z-10 bg-grid-[#1A1A1A]/[0.05]">
          <div className="absolute top-[15%] left-[10%] font-mono text-[10px] leading-relaxed text-left whitespace-pre">
            {`import pandas as pd
import numpy as np
import networkx as nx

def analyze_narrative(data):
    G = nx.Graph()
    # Bridging the whispers
    # From complex numbers to human stories
    return G.degree_centrality()`}
          </div>
          <div className="absolute bottom-[20%] right-[15%] font-mono text-[10px] leading-relaxed text-right whitespace-pre">
            {`# Data Storytelling Visualization
# Visual Archive 2024
# HKBU Journalism
[0.82, 0.45, 0.91, 0.33, 0.67]`}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
             <svg className="w-full h-full" viewBox="0 0 1000 1000">
               <circle cx="200" cy="300" r="1.5" fill="currentColor" />
               <circle cx="800" cy="700" r="1.5" fill="currentColor" />
               <path d="M200 300 Q 500 500 800 700" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="4 4" />
             </svg>
          </div>
        </div>

        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-tr from-steelblue-200 via-transparent to-transparent rounded-full blur-[120px] -z-10" 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] font-bold uppercase mb-6 tracking-[0.6em] text-steelblue-500"
        >
          Journalism Student | Data Storyteller | Documentary Maker
        </motion.div>
        
        <div className="relative mb-12">
          <h1 className="font-serif text-[12vw] sm:text-[10vw] md:text-[9vw] leading-[0.85] tracking-tight flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              BRIDGING THE
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="italic font-light text-steelblue-900 drop-shadow-sm"
            >
              WHISPERS.
            </motion.span>
          </h1>
          
          {/* Subtle Data point animation */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 overflow-hidden">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.4 
                }}
                className="w-1 h-1 bg-steelblue-400 rounded-full"
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="max-w-2xl text-base md:text-lg font-light leading-loose text-[#1A1A1A]/50 mb-16 px-6"
        >
          A HKBU Journalism student crafting human narratives from complex numbers. Fusing analytical rigor with artistic vision—from Python code to the documentary lens.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-16 flex flex-col items-center gap-4 text-[10px] font-bold tracking-[0.4em] uppercase text-steelblue-300"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-steelblue-400" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Main Content Grid */}
      <main id="works" className="max-w-[1600px] mx-auto px-12 py-32 space-y-64">
        {/* About Hook */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-48 items-center">
          <div className="relative group perspective-1000">
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               whileHover={{ 
                 rotateY: 8, 
                 rotateX: -5,
                 scale: 1.02
               }}
               transition={{ 
                 type: "spring", 
                 stiffness: 80,
                 duration: 1
               }}
               className="relative rounded-[60px_20px_60px_20px] overflow-hidden aspect-[4/5] bg-[#E5E7EB] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
             >
               <img 
                 src="https://i.imgur.com/9tftovA.jpeg" 
                 alt="Profile Photo" 
                 className="w-full h-full object-cover grayscale-0 brightness-105 contrast-110 hover:scale-105 transition-all duration-1000"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-[#A8E6CF]/10 mix-blend-overlay group-hover:bg-[#A8E6CF]/0 transition-colors" />
             </motion.div>
             <motion.div 
               animate={{ 
                 scale: [1, 1.1, 1],
                 opacity: [0.3, 0.5, 0.3] 
               }}
               transition={{ duration: 5, repeat: Infinity }}
               className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#A8E6CF] rounded-full blur-[100px] -z-10" 
             />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            <h2 className="font-serif text-6xl italic tracking-tight leading-[0.9]">"Visual storytelling is a bridge ensuring the human element stay at the center."</h2>
            <div className="space-y-6 text-lg font-light leading-relaxed text-[#1A1A1A]/60">
              <p>
                Hello! I’m <span className="text-[#1A1A1A] font-medium">Zheng Shiyi</span>. Currently studying Journalism at HKBU, I find my inspiration at the crossroads of data and human stories. My toolkit includes Python for data visualization, but my heart lies in uncovering the warmth within every news report.
              </p>
              <p>
                To me, visual storytelling is a bridge. Whether through structured data or a candid lens, my mission is to ensure that the human element remains at the center of every narrative.
              </p>
              <div className="pt-8 border-t border-[#1A1A1A]/5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8FA998] mb-4">The Origin of This Portrait</h4>
                <p className="text-base">
                  This avatar is a self-portrait hand-drawn by me. It’s a tribute to my long-standing love for shoujo manga and illustration. Created during my exploration of digital media, this drawing captures the duality of my world: the keen, analytical eye of a journalist and the whimsical, creative spirit of an artist.
                </p>
              </div>
              <div className="flex gap-8 pt-8">
                <motion.a 
                  href="#" 
                  whileHover={{ y: -5, color: "#8FA998" }}
                  className="p-5 rounded-full border border-[#1A1A1A]/10 transition-all shadow-sm hover:shadow-lg"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="mailto:hello@example.com" 
                  whileHover={{ y: -5, color: "#8FA998" }}
                  className="p-5 rounded-full border border-[#1A1A1A]/10 transition-all shadow-sm hover:shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section className="space-y-48">
          <header className="flex justify-between items-end border-b border-[#1A1A1A]/5 pb-16">
            <h2 className="font-serif text-6xl md:text-7xl tracking-tighter">VISUAL ARCHIVE</h2>
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#1A1A1A]/20">Collections 2024</span>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-64">
            {WORKS.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -20, rotate: index % 2 === 0 ? 1 : -1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedWork(work)}
                className={`group cursor-pointer space-y-8 ${index % 2 !== 0 ? "md:mt-32" : ""}`}
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-[80px_20px_80px_20px] shadow-2xl transition-all duration-700 group-hover:rounded-[20px_80px_20px_80px] group-hover:shadow-[#A8E6CF]/20">
                  <motion.img 
                    src={work.src} 
                    alt={work.title}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#A8E6CF]/0 group-hover:bg-[#A8E6CF]/10 transition-all duration-700 backdrop-grayscale-[0.5] group-hover:backdrop-grayscale-0" />
                  <div className="absolute top-10 right-10 p-4 rounded-full glass opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    {work.type === "video" ? <Video className="w-5 h-5 text-[#8FA998]" /> : <Camera className="w-5 h-5 text-[#8FA998]" />}
                  </div>
                </div>
                <div className="flex justify-between items-start px-4">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8FA998] mb-2 block">{work.category} / {work.location}</span>
                    <h3 className="font-serif text-4xl tracking-tight leading-none group-hover:text-[#8FA998] transition-colors">{work.title}</h3>
                  </motion.div>
                  <ArrowUpRight className="w-6 h-6 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 p-6 md:p-24 flex items-center justify-center bg-[#FAF9F6]/95 backdrop-blur-2xl"
          >
            <button 
              onClick={() => setSelectedWork(null)}
              className="absolute top-12 right-12 p-4 glass rounded-full hover:bg-[#1A1A1A] hover:text-white transition-all transform hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-[1800px] w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-40 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="lg:col-span-8 h-auto aspect-[16/10] rounded-none overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] bg-black"
              >
                {selectedWork.type === "video" ? (
                  <iframe 
                    src={`${selectedWork.videoUrl}?autoplay=1`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    title={selectedWork.title}
                  />
                ) : (selectedWork.gallery && selectedWork.gallery.length > 0) ? (
                  <div className="relative w-full h-full group/gallery">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={galleryIndex}
                        src={selectedWork.gallery[galleryIndex]} 
                        alt={`${selectedWork.title} ${galleryIndex}`} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-full h-full object-cover shadow-inner" 
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                    
                    {selectedWork.gallery.length > 1 && (
                      <>
                        <button 
                          onClick={handlePrev}
                          className="absolute left-6 top-1/2 -translate-y-1/2 p-5 glass rounded-full shadow-lg opacity-0 group-hover/gallery:opacity-100 transition-all transform hover:scale-110 active:scale-95 hover:bg-white/80"
                        >
                          <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
                        </button>
                        <button 
                          onClick={handleNext}
                          className="absolute right-6 top-1/2 -translate-y-1/2 p-5 glass rounded-full shadow-lg opacity-0 group-hover/gallery:opacity-100 transition-all transform hover:scale-110 active:scale-95 hover:bg-white/80"
                        >
                          <ChevronRight className="w-6 h-6 text-[#1A1A1A]" />
                        </button>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedWork.gallery.map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-1.5 h-1.5 rounded-full transition-all ${i === galleryIndex ? "bg-[#8FA998] w-6" : "bg-[#1A1A1A]/20"}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <img src={selectedWork.src} alt={selectedWork.title} className="w-full h-full object-cover shadow-inner" referrerPolicy="no-referrer" />
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-4 space-y-16"
              >
                <div className="space-y-6">
                  <span className="text-xs font-bold uppercase tracking-[0.6em] text-steelblue-500">
                    {selectedWork.category} — {selectedWork.location}
                    {selectedWork.gallery && ` (${galleryIndex + 1} / ${selectedWork.gallery.length})`}
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={selectedWork.gallery ? galleryIndex : 'static'}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="text-3xl font-light leading-relaxed text-[#1A1A1A]/80"
                  >
                    {selectedWork.gallery && selectedWork.galleryDescriptions && selectedWork.galleryDescriptions[galleryIndex] 
                      ? selectedWork.galleryDescriptions[galleryIndex] 
                      : selectedWork.description}
                  </motion.p>
                </AnimatePresence>
                

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-24 px-12 text-center">
        <motion.div
           whileHover={{ scale: 1.05 }}
           className="relative inline-block px-12 py-6 border border-[#1A1A1A]/10 rounded-full cursor-pointer overflow-hidden group mb-12"
        >
          <span className="relative z-10 font-bold uppercase tracking-[0.4em] text-xs">Let's Collaborate</span>
          <div className="absolute inset-0 bg-[#A8E6CF] transition-transform duration-500 translate-y-full group-hover:translate-y-0" />
        </motion.div>
        <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#1A1A1A]/20">© 2026 Zheng Shiyi. Exploring Data & Narrative.</p>
      </footer>
    </div>
  );
}
