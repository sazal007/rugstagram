"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

type CornerPosition = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface CollectionImage {
  src: string;
  position: CornerPosition;
  title: string;
}

interface Collection {
  name: string;
  slug: string;
  image: string;
  images: CollectionImage[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const collections: Collection[] = [
  {
    name: "Modern Collection",
    slug: "modern",
    image: "/collections/modern-collection.png",
    images: [
      {
        src: "/collections/modern-collection.png",
        position: "topLeft",
        title: "Modern Perspective 1",
      },
      {
        src: "/collections/modern-collection.png",
        position: "topRight",
        title: "Modern Perspective 2",
      },
      {
        src: "/collections/modern-collection.png",
        position: "bottomLeft",
        title: "Modern Perspective 3",
      },
      {
        src: "/collections/modern-collection.png",
        position: "bottomRight",
        title: "Modern Perspective 4",
      },
    ],
  },
  {
    name: "Artwork Collection",
    slug: "artwork",
    image: "/collections/artwork-collection.png",
    images: [
      {
        src: "/collections/artwork-collection.png",
        position: "topLeft",
        title: "Artwork Perspective 1",
      },
      {
        src: "/collections/artwork-collection.png",
        position: "topRight",
        title: "Artwork Perspective 2",
      },
      {
        src: "/collections/artwork-collection.png",
        position: "bottomLeft",
        title: "Artwork Perspective 3",
      },
      {
        src: "/collections/artwork-collection.png",
        position: "bottomRight",
        title: "Artwork Perspective 4",
      },
    ],
  },
  {
    name: "Ombre Collection",
    slug: "ombre",
    image: "/collections/ombre-collection.png",
    images: [
      {
        src: "/collections/ombre-collection.png",
        position: "topLeft",
        title: "Ombre Perspective 1",
      },
      {
        src: "/collections/ombre-collection.png",
        position: "topRight",
        title: "Ombre Perspective 2",
      },
      {
        src: "/collections/ombre-collection.png",
        position: "bottomLeft",
        title: "Ombre Perspective 3",
      },
      {
        src: "/collections/ombre-collection.png",
        position: "bottomRight",
        title: "Ombre Perspective 4",
      },
    ],
  },
  {
    name: "Traditional Collection",
    slug: "traditional",
    image: "/collections/traditional-collection.png",
    images: [
      {
        src: "/collections/traditional-collection.png",
        position: "topLeft",
        title: "Traditional Perspective 1",
      },
      {
        src: "/collections/traditional-collection.png",
        position: "topRight",
        title: "Traditional Perspective 2",
      },
      {
        src: "/collections/traditional-collection.png",
        position: "bottomLeft",
        title: "Traditional Perspective 3",
      },
      {
        src: "/collections/traditional-collection.png",
        position: "bottomRight",
        title: "Traditional Perspective 4",
      },
    ],
  },
];

interface RevealCardProps {
  collection: Collection;
  onNavigate: (slug: string) => void;
}

const RevealCard: React.FC<RevealCardProps> = ({ collection, onNavigate }) => {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        const first = next.shift()!;
        next.push(first);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="group relative w-full h-[320px] sm:h-[400px] md:h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onNavigate(collection.slug)}
    >
      {/* 1. COLLAPSED STACK VIEW (Main Card) */}
      <div className="relative w-full h-full cursor-pointer flex items-center justify-center transition-all duration-1000 group-hover:opacity-40">
        <div className="relative w-[240px] h-[300px] sm:w-64 sm:h-80 md:w-72 md:h-96">
          {collection.images.map((img, idx) => {
            const stackIndex = order.indexOf(idx);
            const isTop = stackIndex === 3;
            const isBottom = stackIndex === 0;

            const offsets = {
              topLeft:
                "-translate-x-3 -translate-y-4 sm:-translate-x-4 sm:-translate-y-6 md:-translate-x-6 md:-translate-y-8 rotate-[-6deg]",
              topRight:
                "translate-x-4 -translate-y-2 sm:translate-x-6 sm:-translate-y-3 md:translate-x-8 md:-translate-y-4 rotate-[5deg]",
              bottomLeft:
                "-translate-x-5 translate-y-3 sm:-translate-x-8 sm:translate-y-5 md:-translate-x-10 md:translate-y-6 rotate-[-3deg]",
              bottomRight:
                "translate-x-2 translate-y-5 sm:translate-x-3 sm:translate-y-8 md:translate-x-4 md:translate-y-10 rotate-[7deg]",
            };

            return (
              <div
                key={img.position}
                className={`absolute inset-0 bg-surface border border-border shadow-2xl overflow-hidden transition-all duration-700 ease-in-out
                  ${offsets[img.position]}
                  ${
                    isTop
                      ? "opacity-100 scale-105 z-30"
                      : "opacity-60 scale-100"
                  }
                  ${isBottom ? "opacity-0 scale-95" : ""}
                `}
                style={{ zIndex: stackIndex }}
              >
                <Image
                  src={img.src}
                  fill
                  className="object-cover"
                  alt={img.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div
                  className={`absolute inset-0 bg-foreground transition-opacity duration-700 ${
                    isTop ? "opacity-0" : "opacity-20"
                  }`}
                ></div>
              </div>
            );
          })}

          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
            <div className="bg-background/90 backdrop-blur-xl px-3 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 border border-border shadow-2xl">
              <span className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.4em] sm:tracking-[0.6em] md:tracking-[0.8em] uppercase text-foreground font-bold whitespace-nowrap">
                {collection.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LOCAL REVEAL POP-UP (Appears directly over/above the card) */}
      <div
        className={`
        absolute inset-0 z-50 pointer-events-none 
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${
          isHovered
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 translate-y-4"
        }
      `}
      >
        {/* Background of the pop-up */}
        <div className="absolute inset-[-10px] sm:inset-[-15px] md:inset-[-20px] bg-surface shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-border overflow-hidden cursor-pointer">
          {/* 4 Quadrants Container */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5 sm:gap-1 p-1 sm:p-1.5 md:p-2">
            {collection.images.map((img, idx) => (
              <div
                key={img.position}
                className={`relative w-full h-full overflow-hidden transition-all ease-out 
                  ${
                    isHovered ? "scale-100 opacity-100" : "scale-125 opacity-0"
                  }`}
                style={{
                  transitionDuration: "1200ms",
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                <Image
                  src={img.src}
                  fill
                  className="object-cover  hover:grayscale-0 transition-all duration-700"
                  alt={img.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-foreground/10"></div>
              </div>
            ))}
          </div>

          {/* Center Title Space */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`
              bg-background/90 backdrop-blur-xl px-4 py-3 sm:px-8 sm:py-5 md:px-10 md:py-6 border border-border 
              transition-all duration-700 delay-300 transform
              ${
                isHovered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
            >
              <div className="flex flex-col items-center">
                <span className="text-[7px] sm:text-[7px] md:text-[8px] uppercase tracking-[0.6em] sm:tracking-[0.8em] md:tracking-[1em] text-muted mb-1 sm:mb-1.5 md:mb-2">
                  Collection
                </span>
                <h3 className="text-xs sm:text-sm md:text-base font-serif tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-foreground uppercase whitespace-nowrap">
                  {collection.name}
                </h3>
                <div className="w-8 sm:w-10 md:w-12 h-px bg-accent/30 mt-2 sm:mt-3 md:mt-4"></div>
              </div>
            </div>
          </div>

          {/* Ambient Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedCollections: React.FC = () => {
  const router = useRouter();

  const handleNavigate = (slug: string) => {
    router.push(`/collections/${slug}`);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-16 pt-12 sm:pt-16 md:pt-24 pb-12 sm:pb-16 md:pb-20"
    >
      <motion.div
        variants={fadeInUp}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 md:mb-20 lg:mb-28 gap-3 sm:gap-4"
      >
        <div>
          <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.8em] sm:tracking-[1em] md:tracking-[1.2em] text-muted font-bold block mb-3 sm:mb-4 md:mb-6">
            Curated // Collections
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif tracking-tighter leading-[0.9] text-foreground">
            Featured <br />
            <span className="text-muted italic">Collections</span>
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs sm:text-sm uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors"
        >
          View All{" "}
          <ArrowRight className="inline-block w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-12 sm:gap-y-20 md:gap-x-16 md:gap-y-32 lg:gap-x-20 lg:gap-y-40 pb-12 sm:pb-16 md:pb-20">
        {collections.map((collection) => (
          <motion.div key={collection.slug} variants={fadeInUp}>
            <RevealCard collection={collection} onNavigate={handleNavigate} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
