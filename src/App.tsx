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
  type: "photography" | "video" | "audio";
  title: string;
  category: string;
  src: string;
  videoUrl?: string;
  audioUrl?: string;
  description: string;
  location: string;
  gallery?: string[]; // For multi-image or multi-video themes
  galleryDescriptions?: string[];
  aspectRatio?: "horizontal" | "vertical";
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
  },
  {
    id: 5,
    type: "video",
    title: "Social Media Video",
    category: "Short-form",
    src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    description: "Creative short-form content designed for social platforms, merging rapid editing with impactful storytelling. (Content pending)",
    location: "Social Platforms",
    gallery: [
      "https://www.youtube.com/embed/s_1usyFyXnw", 
      "https://www.youtube.com/embed/EJWc4EKILx4"
    ],
    galleryDescriptions: [
      "Social Media Video Part 1: Exploring creative transitions and digital rhythm.",
      "Social Media Video Part 2: Impactful storytelling for the mobile generation."
    ]
  },
  {
    id: 6,
    type: "photography",
    title: "Photo Story: The Man Mo Temple Antique Sellers",
    category: "Narrative",
    src: "https://i.imgur.com/C4qoCsR.jpeg",
    description: "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
    location: "Man Mo Temple, HK",
    gallery: [
      "https://i.imgur.com/C4qoCsR.jpeg",
      "https://i.imgur.com/vynFTu0.jpeg",
      "https://i.imgur.com/HVXt6gg.jpeg",
      "https://i.imgur.com/UQkYiU1.jpeg",
      "https://i.imgur.com/ae36g6c.jpeg",
      "https://i.imgur.com/UlKTcNS.jpeg",
      "https://i.imgur.com/wX6HIz6.jpeg",
      "https://i.imgur.com/brlv1Uh.jpeg",
      "https://i.imgur.com/8m3OhNm.jpeg",
      "https://i.imgur.com/E295wsV.jpeg"
    ],
    galleryDescriptions: [
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall.",
      "Here is an elderly couple selling small antique trinkets in front of the main entrance to Man Mo Temple. I took photographs from half past nine until midday, capturing the entire process of them setting up and running their stall."
    ]
  },
  {
    id: 7,
    type: "audio",
    title: "Gen Z Podcast",
    category: "Digital Media",
    src: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    audioUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2310519812&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    description: "A compelling audio report capturing campus life and social observations. Produced, written, and edited by Zheng Shiyi.",
    location: "Digital Space"
  },
  {
    id: 8,
    type: "video",
    title: "Google Earth Studio Animation",
    category: "Geospatial",
    src: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/G7xkPBWcxqo",
    description: "A bird’s-eye view of the HKBU campus—the very place where my journey as a journalist began. Geospatial storytelling is more than just a technical showcase; it provides a vital macro-dimension to complex narratives. Within the coordinates of data and reality, I strive to capture not just locations, but the warmth and truth that reside within them.",
    location: "Earth Virtual"
  },
  {
    id: 9,
    type: "video",
    title: "5-shot Sequence Video",
    category: "Cinematography",
    src: "https://i.imgur.com/DmHdWKt.jpeg",
    videoUrl: "https://www.youtube.com/embed/-YNb3stVqDM",
    aspectRatio: "vertical",
    description: "A demonstration of cinematic grammar through the classic 5-shot sequence technique. This sequence is presented in its intended vertical format.",
    location: "Studio"
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
          <a href="mailto:24263524@life.hkbu.edu.hk" className="hover:text-[#8FA998] transition-colors font-serif italic normal-case text-sm tracking-normal">Contact</a>
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
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-steelblue-950 mb-12">
              "I am Zheng Shiyi, a journalism student at HKBU, focused on the intersection of data-driven insights and human-centric storytelling."
            </h2>
            <div className="space-y-10 text-lg md:text-xl font-light leading-relaxed text-[#1A1A1A]/70">
              <p>
                While I use tools like <span className="text-steelblue-900 font-medium">Python and ECharts</span> to analyze complex social trends, I believe the true core of every report is the human experience.
              </p>
              
              <div className="pt-10 border-t border-steelblue-100">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-steelblue-500 mb-6">Creative Identity</h4>
                <p className="leading-relaxed">
                  My avatar is a <span className="text-steelblue-900 font-medium whitespace-nowrap">hand-drawn self-portrait</span>, reflecting my long-standing interest in illustration. It represents the balance between my analytical eye as a journalist and my creative spirit as an artist.
                </p>
              </div>

              <div className="pt-10 border-t border-steelblue-100">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-steelblue-500 mb-6">Contact Information</h4>
                <div className="space-y-4">
                  <p className="flex items-center gap-4">
                    <span className="font-bold text-[10px] uppercase tracking-widest text-steelblue-300 w-16">Phone</span>
                    <span className="text-steelblue-900 font-medium">+852 52958274</span>
                  </p>
                  <p className="flex items-center gap-4">
                    <span className="font-bold text-[10px] uppercase tracking-widest text-steelblue-300 w-16">Email</span>
                    <a href="mailto:24263524@life.hkbu.edu.hk" className="text-steelblue-600 hover:text-steelblue-800 transition-colors underline decoration-steelblue-100 underline-offset-4">24263524@life.hkbu.edu.hk</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-6 pt-6">
                <motion.a 
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, backgroundColor: "#f8fafc" }}
                  className="p-5 rounded-full border border-steelblue-100 transition-all shadow-sm hover:shadow-md"
                >
                  <Instagram className="w-5 h-5 text-steelblue-600" />
                </motion.a>
                <motion.a 
                  href="mailto:24263524@life.hkbu.edu.hk" 
                  whileHover={{ y: -4, backgroundColor: "#f8fafc" }}
                  className="p-5 rounded-full border border-steelblue-100 transition-all shadow-sm hover:shadow-md"
                >
                  <Mail className="w-5 h-5 text-steelblue-600" />
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
                    {work.type === "video" ? (
                      <Video className="w-5 h-5 text-[#8FA998]" />
                    ) : work.type === "audio" ? (
                      <svg className="w-5 h-5 text-[#8FA998]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                    ) : (
                      <Camera className="w-5 h-5 text-[#8FA998]" />
                    )}
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

            <div className={`max-w-[1800px] w-full h-full grid grid-cols-1 ${selectedWork.aspectRatio === "vertical" ? "lg:grid-cols-12 gap-16 lg:gap-32" : "lg:grid-cols-12 gap-24 lg:gap-40"} items-center`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`${selectedWork.aspectRatio === "vertical" ? "lg:col-span-5 aspect-[9/16] max-h-[85vh] justify-self-center" : "lg:col-span-8 aspect-[16/10]"} h-auto rounded-none overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] bg-black`}
              >
                {selectedWork.type === "video" ? (
                  <div className="relative w-full h-full group/gallery">
                    <AnimatePresence mode="wait">
                      <motion.iframe 
                        key={galleryIndex}
                        src={`${(selectedWork.gallery && selectedWork.gallery.length > 0) ? selectedWork.gallery[galleryIndex] : selectedWork.videoUrl}?autoplay=1`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        title={selectedWork.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    </AnimatePresence>
                    {(selectedWork.gallery && selectedWork.gallery.length > 1) && (
                      <>
                        <button 
                          onClick={handlePrev}
                          className="absolute left-6 top-1/2 -translate-y-1/2 p-5 glass rounded-full shadow-lg opacity-0 group-hover/gallery:opacity-100 transition-all transform hover:scale-110 active:scale-95 hover:bg-white/80 z-10"
                        >
                          <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
                        </button>
                        <button 
                          onClick={handleNext}
                          className="absolute right-6 top-1/2 -translate-y-1/2 p-5 glass rounded-full shadow-lg opacity-0 group-hover/gallery:opacity-100 transition-all transform hover:scale-110 active:scale-95 hover:bg-white/80 z-10"
                        >
                          <ChevronRight className="w-6 h-6 text-[#1A1A1A]" />
                        </button>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {selectedWork.gallery.map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-1.5 h-1.5 rounded-full transition-all ${i === galleryIndex ? "bg-steelblue-400 w-6" : "bg-white/40"}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : selectedWork.type === "audio" ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8 md:p-16 space-y-10">
                    <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-2xl border border-steelblue-100/50">
                      <img src={selectedWork.src} className="w-full h-full object-cover" alt="Podcast Cover" />
                      <div className="absolute inset-0 bg-steelblue-900/5 backdrop-blur-[2px] flex items-center justify-center">
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} 
                          transition={{ duration: 3, repeat: Infinity }}
                          className="w-16 h-16 rounded-full border-2 border-white/80"
                        />
                      </div>
                    </div>
                    
                    <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-lg border border-steelblue-50 bg-white">
                      <iframe 
                        width="100%" 
                        height="300" 
                        scrolling="no" 
                        frameBorder="no" 
                        allow="autoplay" 
                        src={selectedWork.audioUrl}
                      />
                    </div>
                    
                    <div className="text-center space-y-2 opacity-40">
                       <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-steelblue-600">Produced by Zheng Shiyi</p>
                       <p className="text-[9px] font-medium tracking-widest uppercase">Digital Archive — 2024</p>
                    </div>
                  </div>
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
                className={`${selectedWork.aspectRatio === "vertical" ? "lg:col-span-7 pl-4" : "lg:col-span-4"} space-y-16`}
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
