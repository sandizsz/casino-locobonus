'use client'
import { Button } from "./ui/button"
import Link from "next/link"

interface ClaimButtonProps {
  offerUrl: string;
  offerTitle: string;
}

export default function ClaimButton({ offerUrl, offerTitle }: ClaimButtonProps) {
  const friendlyUrl = `/${offerTitle.toLowerCase().replace(/\s+/g, '')}-offer`;

  return (
    <Link 
      href={friendlyUrl}
      onClick={(e) => {
        e.preventDefault();
        window.open(offerUrl, '_blank');
      }}
    >
      <Button
        className="w-full bg-gradient-to-r from-[#D90429] to-[#FF1745] hover:from-[#FF1745] hover:to-[#D90429] text-white font-bold text-lg px-8 py-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(217,4,41,0.3)] relative overflow-hidden group"
      >
        <span className="relative z-10">Claim Bonus</span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </Button>
    </Link>
  );
}