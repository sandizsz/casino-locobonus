

import React from 'react'
import Image from "next/image";
import Link from 'next/link'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { TypedObject } from '@portabletext/types'

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

interface PaymentMethod {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
}

interface Casino {
  _id: string;
  offerTitle: string;
  offerUrl: string;
  offerDescription: string;
  offerText: TypedObject[];
  rating: number;
  imageUrl: string;
  termsConditionsUrl: string;
  categories: Category[];
  paymentMethods: PaymentMethod[];
}

interface CasinoProps {
  casino: Casino;
  index: number;
}

const portableTextComponents = {
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 space-y-2">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-white">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[#FFDD00]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
  },
} satisfies Partial<PortableTextReactComponents>;

const CasinoComponent: React.FC<CasinoProps> = ({ casino, index }) => {

  // Helper function to get score text based on rating
  const getScoreText = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Great';
    if (rating >= 3.5) return 'Very Good';
    if (rating >= 3.0) return 'Good';
    return 'Fair';
  };

  // Calculate the rating arc path
  const getRatingPath = (rating: number) => {
    const radius = 30;
    const circumference = Math.PI * radius;
    const progressLength = (rating / 5) * circumference;
    
    return {
      background: `M 5 35 A ${radius} ${radius} 0 0 1 65 35`,
      progress: `M 5 35 A ${radius} ${radius} 0 0 1 65 35`,
      dashArray: `${progressLength} ${circumference}`
    };
  };

  const paths = getRatingPath(casino.rating);

  return (
    <div className="relative group h-full">
      <div className="relative bg-[#1E1E1E] rounded-xl overflow-hidden flex flex-col h-full">
        {/* Header with Casino Name and Rating */}
        <div className="flex items-center justify-between p-3 bg-[#2B2B2B]">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src={casino.imageUrl}
                alt={casino.offerTitle}
                fill
                className="object-contain rounded"
              />
            </div>
            <h3 className="text-base font-semibold text-white">
              {casino.offerTitle.split(' ')[0]}
            </h3>
          </div>
          
          {/* Rating Display */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-sm text-gray-400">Score:</span>
              <span className="text-sm font-medium text-white">{getScoreText(casino.rating)}</span>
            </div>
            <div className="relative w-[70px] h-[40px]">
              <svg viewBox="0 0 70 40" className="w-full h-full">
                {/* Background arc */}
                <path
                  d={paths.background}
                  stroke="#2B2B2B"
                  strokeWidth="4"
                  fill="none"
                />
                {/* Progress arc */}
                <path
                  d={paths.progress}
                  stroke="#FF1745"
                  strokeWidth="4"
                  strokeDasharray={paths.dashArray}
                  fill="none"
                />
                {/* Pointer */}
                <circle
                  cx="35"
                  cy="35"
                  r="4"
                  fill="#FF1745"
                />
              </svg>
              {/* Rating number */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-0.5">
                <span className="text-[#FF1745] font-bold text-sm">{casino.rating}</span>
                <span className="text-xs text-gray-400">/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Bonus Content */}
        <div className="p-4 flex-grow">
          <h4 className="text-xl font-bold text-white mb-3">
            {casino.offerDescription}
          </h4>
        </div>

        {/* CTA Button */}
        <div className="relative mt-auto">
          {casino.termsConditionsUrl && (
            <a
              href={casino.termsConditionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -top-6 right-3 text-xs text-gray-400 hover:text-[#FF1745] transition-colors"
            >
              T&Cs Apply
            </a>
          )}
          <Link 
            href={casino.offerUrl}
            className="block bg-[#FF1745] hover:bg-[#D90429] text-white font-bold text-lg py-3 text-center transition-all duration-300"
          >
            Play
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CasinoComponent;