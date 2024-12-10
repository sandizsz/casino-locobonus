"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from "next/image";
import Link from 'next/link'
import { PortableTextReactComponents } from '@portabletext/react'
import { TypedObject } from '@portabletext/types'
import GaugeComponent from 'react-gauge-component'
import { Wallet, ChevronDown } from 'lucide-react'

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

const revalidate = 0;

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
  orderRank?: number;
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Helper function to get score text based on rating
  const getScoreText = (rating: number) => {
    if (rating >= 9.0) return 'Excellent';
    if (rating >= 4.0) return 'Great';
    if (rating >= 3.5) return 'Very Good';
    if (rating >= 3.0) return 'Good';
    return 'Fair';
  };

  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPaymentDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative group h-full flex-grow">
      <div className="relative bg-[#1E1E1E] rounded-xl overflow-hidden flex flex-col h-full">
        {/* Header with Casino Name and Rating */}
        <div className="flex items-center justify-between p-2 pb-8 bg-[#2B2B2B]">
          <div className="flex items-center gap-2">
            <div className="relative w-16 h-16">
              <Image
                src={casino.imageUrl}
                alt={casino.offerTitle}
                fill
                className="object-cover rounded"
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
              <span className="text-sm font-medium text-[#FF1745]">{getScoreText(casino.rating)}</span>
            </div>
            <div className="w-[80px] h-[50px]">
              <GaugeComponent
                id={`gauge-${casino._id}`}
                type="semicircle"
                arc={{
                  colorArray: ['#FF1745'],
                  subArcs: [{
                    limit: 10,
                    color: '#2B2B2B',
                    showTick: true
                  }],
                  width: 0.2,
                  padding: 0.02,
                  cornerRadius: 1
                }}
                pointer={{
                  type: "arrow",
                  color: '#FFF',
                  length: 10,
                  width: 40,
                  elastic: true
                }}
                value={casino.rating}
                minValue={0}
                maxValue={10}
                labels={{
                  valueLabel: {
                    formatTextValue: value => value.toFixed(1),
                    style: { 
                      fontSize: "80px",
                      fill: "#ffffff",
                   
                    }
                  },
                  tickLabels: {
                    hideMinMax: true,
                  
                    ticks: [],
                    defaultTickValueConfig: {
                      hide: true
                    },
                    defaultTickLineConfig: {
                      hide: true
                    }
                  }
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Position Number */}
        <div className="z-10 absolute -top-px -left-px w-10 h-10 flex items-center justify-center bg-[#FF1745] rounded-tl-lg rounded-br-lg border-r-2 border-b-2 border-[#FF1745] shadow-[4px_4px_20px_rgba(255,23,69,0.3)]">
          <span className="font-['Orbitron'] font-bold text-sm text-white [text-shadow:_0_0_10px_rgba(255,255,255,0.5)]">
            #{casino.orderRank || index + 1}
          </span>
        </div>

        {/* Payment Methods Dropdown */}
        <div className="relative mt-4 px-2" ref={dropdownRef}>
          <button
            onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
            className="w-full px-4 py-2 text-left bg-[#2B2B2B] text-white rounded-lg hover:bg-[#363636] transition-colors duration-200 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Payment Methods
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-200 ${isPaymentDropdownOpen ? 'transform rotate-180' : ''}`}
            />
          </button>
          
          {isPaymentDropdownOpen && (
            <div className="fixed z-50 mt-2 bg-[#2B2B2B] border border-[#FF1745]/10 rounded-lg shadow-lg" style={{ 
              width: dropdownRef.current?.offsetWidth || 'auto',
              left: dropdownRef.current?.getBoundingClientRect().left || 0,
              top: (dropdownRef.current?.getBoundingClientRect().bottom || 0) + 8
            }}>
              <div className="p-2 grid grid-cols-2 gap-2">
                {casino.paymentMethods.map((method) => (
                  <div
                    key={method._id}
                    className="px-3 py-2 text-sm text-white hover:bg-[#363636] cursor-pointer rounded flex items-center gap-2"
                  >
                    {method.image?.asset?.url && (
                      <Image
                        src={method.image.asset.url}
                        alt={method.name}
                        width={20}
                        height={20}
                        className="object-contain flex-shrink-0"
                      />
                    )}
                    <span className="truncate">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Bonus Content */}
        <div className="flex-grow p-4">
          <p className="text-gray-300 text-center">
            {casino.offerDescription}
          </p>
        </div>

        {/* CTA Button and T&Cs */}
        <div className="mt-auto flex flex-col gap-2">
          {casino.termsConditionsUrl && (
            <div className="text-center">
              <a
                href={casino.termsConditionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-[#FF1745] transition-colors"
              >
                T&Cs Apply
              </a>
            </div>
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