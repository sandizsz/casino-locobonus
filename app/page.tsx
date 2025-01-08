import { ArrowRight, Sparkles } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { client } from "../sanity/lib/client";
import { Casino } from "./utils/interface";
import CasinoComponent from "./components/CasinoComponent";
import AnimatedSection from "./components/AnimatedSection";
import { blackjackData } from "./data/pages/blackjack";
import { sicboData } from "./data/pages/sicbo";
import { kenoData } from "./data/pages/keno";
import { crapsData } from "./data/pages/craps";
import { slotsData } from "./data/pages/onlineslots";
import { rouletteData } from "./data/pages/roulette";
import { baccaratData } from "./data/pages/baccarat";
import { casinoGuidesData } from "./data/pages/guides";
import TopPicksComponent from "./components/TopPicksComponent";
import CasinoFeatures from './components/CasinoFeatures';
import PaymentMethods from './components/PaymentMethods';


async function getPosts() {
  const query = `*[_type == "casino"] | order(orderRank)[0...50] {
    _id,
    offerTitle,
    offerUrl,
    offerDescription,
    offerText,
    rating,
    "imageUrl": casinoImage.asset->url,
    termsConditionsUrl,
    "categoryUrls": categoryUrls[] {
      "categoryId": category->_id,
      "categorySlug": category->slug.current,
      "categoryTitle": category->title,
      url,
      urlNumber
    },
    tags[]-> {
      _id,
      title,
      slug {
        current
      }
    },
    categories[]-> {
      _id,
      slug,
      title
    },
    paymentMethods[]-> {
      _id,
      name,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      }
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function Home() {

  // 4 first casinos removed
  const casinos: Casino[] = (await getPosts()).slice(0, 16);

  // Get unique payment methods from all casinos
  const uniquePaymentMethods = Array.from(
    new Map(
      casinos.flatMap(casino => casino.paymentMethods || [])
        .map(method => [method._id, method])
    ).values()
  );



  const guides = [
    blackjackData,
    rouletteData,
    baccaratData,
    crapsData,
    kenoData,
    sicboData,
    slotsData
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <main className="relative">
        {/* Hero Section */}
        <AnimatedSection className="w-full min-h-[80vh] py-20 bg-gradient-to-b from-[#1A1A1A] via-[#0D0D0D] to-[#0D0D0D] relative overflow-hidden flex items-center">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute w-[500px] h-[500px] rounded-full bg-[#FF1745] blur-[150px] -top-48 -left-24 animate-pulse"></div>
              <div className="absolute w-[400px] h-[400px] rounded-full bg-[#FF1745] blur-[150px] -bottom-32 -right-16 animate-pulse delay-700"></div>
            </div>
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 20% 35%, rgba(255, 23, 69, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 75% 44%, rgba(255, 23, 69, 0.1) 0%, transparent 50%)
              `
            }}></div>
           
          </div>

          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF1745]/10 border border-[#FF1745]/20 ">
                  <Sparkles className="w-4 h-4 text-[#FF1745]" />
                  <span className="text-sm font-medium text-[#FF1745]"> First class online casino experience and bonuses offered by leading industry professionals</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <div>Compare Online </div>
                  <div>
                  Casino Sites in
                    <div className="relative inline-block ml-2">
                      <span className="text-[#FF1745]">2025</span>
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FF1745]/30 rounded-full"></div>
                    </div>
                  </div>
                </h1>

                <p className="text-xl max-w-2xl mx-auto lg:mx-0 text-gray-400 leading-relaxed">
                LocoBonus is your go-to site for finding the best online casinos. We rate and offer as many of the best, trustworthy and popular gambling sites out there to help you make better gambling choices. 
                </p>

                <div className="flex flex-wrap gap-6 items-center justify-center lg:justify-start">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#FF1745]">
                        500+
                      </div>
                      <div className="text-sm text-gray-400">Casino Reviews</div>
                    </div>
                    <div className="h-12 w-[1px] bg-gray-800"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#FF1745]">
                        98%
                      </div>
                      <div className="text-sm text-gray-400">Trusted Ratings</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                  {/* Outer spinning ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF1745]/20 to-transparent rounded-full spin-slow"></div>
                  {/* Inner spinning ring */}
                  <div className="absolute inset-4 bg-gradient-to-br from-[#FF1745]/10 to-transparent rounded-full spin-slow-delayed"></div>
                  {/* Logo container */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/images/loco-bonus.png"
                      alt="Casino Illustration"
                      width={300}
                      height={300}
                      className="object-contain pulsate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Top Picks Section */}
        <section className="relative  bg-[#0D0D0D]">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(45deg, #FF1745 1px, transparent 1px), linear-gradient(-45deg, #FF1745 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          <TopPicksComponent casinos={casinos} />
        </section>

        {/* New Informational Section */}
        <AnimatedSection className="w-full py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/dice.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-4xl font-bold text-center mb-6 text-white drop-shadow-lg">
              Discover the Best Online Casinos
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed text-center mb-12">
              As legal gambling activities become increasingly popular in the world, the best online casinos entice players with many attractive features. They will let you play casino games for real money and claim deposit bonuses, including a lucrative welcome bonus for new players. Read our Game Guides and Gambling Advice so you are fully equipped with knowledge when jumping into the world of online casinos!
            </p>
            <div className="flex justify-center">
              <Link href="/guides" className="inline-flex items-center px-6 py-3 rounded-lg bg-[#FF1745] hover:bg-[#D90429] text-white font-semibold transition-colors duration-300">
                Explore Our Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Casino Offers */}
        <AnimatedSection className="w-full py-20 bg-[#0D0D0D]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Most exciting offers picked by <span className="text-[#FF1745]">LOCOBONUS</span>
            </h2>


            {/* First 4 Casinos Removed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

           
              {casinos?.length > 0 && casinos.slice(4, 50).map((casino, index) => (
                <CasinoComponent key={casino._id} casino={casino} index={index} />
              ))}
            </div>

            <div className="flex justify-center mt-12">
                <Link href={`/category/all-bonuses`} className="inline-flex items-center px-6 py-3 rounded-lg bg-[#FF1745] hover:bg-[#D90429] text-white font-semibold transition-colors duration-300">
                  View All Bonuses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
          </div>
        </AnimatedSection>

        {/* Features */}
        <AnimatedSection className="w-full py-20 bg-[#1A1A1A]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       
             {/* Features Section */}
         <CasinoFeatures />
            
          </div>
        </AnimatedSection>

        {/* Casino Guides */}
        <AnimatedSection className="w-full py-20 bg-[#0D0D0D]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-white">
                Various casino guides to
                <span className="text-[#FF1745]"> increase your winnings</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We care about you and your experience in the casinos we are providing, that&apos;s why we have
                prepared complete guides of most popular casino games
              </p>
            </div>
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
              {guides.slice(0, 3).map((guide, index) => (
                  <AnimatedSection key={guide.title} delay={index * 0.2}>
                    <Link href={`/${guide.slug}`}>
                      <div className="bg-[#1A1F2C] border border-[#FF1745]/20 rounded-2xl p-8 hover:border-[#FF1745]/40 transition-colors h-full">
                        <p className="text-md uppercase tracking-wider text-gray-400 game-guide-label">Game guides</p>
                        <h2 className="text-2xl font-bold mb-4">{guide.title}</h2>
                        <div className="w-24 h-1 bg-[#FF1745] mb-6"></div>
                        <p className="text-gray-300 mb-4">{guide.description}</p>
                       
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
              <div className="flex justify-center">
                <Link href={`/${casinoGuidesData.slug}`} className="inline-flex items-center px-6 py-3 rounded-lg bg-[#FF1745] hover:bg-[#D90429] text-white font-semibold transition-colors duration-300">
                  Read More Guides
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

       

       

        {/* Payment Methods */}
        <PaymentMethods paymentMethods={uniquePaymentMethods} />

      </main>
    </div>
  );
}