'use client'
import { Button } from "./ui/button"
import Link from "next/link"

interface ClaimButtonProps {
  offerUrl: string;
  offerTitle: string;
  categorySlug?: string;
  categoryUrls?: Array<{
    categoryId: string;
    categorySlug: string;
    url: string;
  }>;
}

export default function ClaimButton({ offerUrl, offerTitle, categorySlug, categoryUrls }: ClaimButtonProps) {
  const friendlyUrl = `/${offerTitle.toLowerCase().replace(/\s+/g, '')}-offer`;
  
  const getUrl = () => {
    if (categorySlug && categoryUrls?.length) {
      const categoryUrl = categoryUrls.find(
        cu => cu.categorySlug === categorySlug
      )?.url;
      if (categoryUrl) return categoryUrl;
    }
    return offerUrl;
  };

  // Get the specific URL for the current category if it exists
  const currentCategoryUrl = categorySlug && categoryUrls?.length 
    ? categoryUrls.find(cu => cu.categorySlug === categorySlug)?.url 
    : null;

  // Use category URL if we're in a category and have a specific URL, otherwise use friendly URL
  const linkHref = currentCategoryUrl || friendlyUrl;

  return (
    <Link 
      href={linkHref}
      onClick={(e) => {
        e.preventDefault();
        window.open(getUrl(), '_blank');
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