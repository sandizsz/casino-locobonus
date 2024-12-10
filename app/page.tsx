import { Card, CardContent } from "./components/ui/card";
import { Headphones, Shield, Gamepad2, ArrowRight, Sparkles } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { client } from "../sanity/lib/client";
import { Casino } from "./utils/interface";
import CasinoComponent from "./components/CasinoComponent";
import AnimatedSection from "./components/AnimatedSection";
import { blackjackData } from "./data/pages/blackjack";
import { rouletteData } from "./data/pages/roulette";
import { baccaratData } from "./data/pages/baccarat";
import { casinoGuidesData } from "./data/pages/guides";
import TopPicksComponent from "./components/TopPicksComponent";

async function getPosts() {
  const query = `*[_type == "casino"] | order(orderRank)[0...15] {
    _id,
    offerTitle,
    offerUrl,
    offerDescription,
    offerText,
    rating,
    "imageUrl": casinoImage.asset->url,
    termsConditionsUrl,
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
  const casinos: Casino[] = (await getPosts()).slice(0, 15);

  const features = [
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Customer Support",
      description: "Last but not least the customer service should have long opening hours, be friendly and always put the player in the driver seat."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform and Trustworthy Owners",
      description: "The most important is to play at a platform with great security and that the owners have a good reputation so you know that your personal information and financials are treated with respect."
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Quality Games",
      description: "To get the best gaming experience it is also crucial with a wide variety of quality games. You should be able to play all popular types of games from a wide range of providers."
    }
  ];

  const guides = [
    blackjackData,
    rouletteData,
    baccaratData
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
            <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-20"></div>
          </div>

          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF1745]/10 border border-[#FF1745]/20">
                  <Sparkles className="w-4 h-4 text-[#FF1745]" />
                  <span className="text-sm font-medium text-[#FF1745]">Top Casino Comparisons 2024</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <div>Top Casino</div>
                  <div>
                    Comparisons
                    <div className="relative inline-block ml-2">
                      <span className="text-[#FF1745]">2024</span>
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#FF1745]/30 rounded-full"></div>
                    </div>
                  </div>
                </h1>

                <p className="text-xl max-w-2xl mx-auto lg:mx-0 text-gray-400 leading-relaxed">
                  Discover top-rated online casinos with exclusive bonuses and trusted reviews. 
                  Your journey to responsible gaming starts here.
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
              Most exciting offers picked by <span className="text-[#FF1745]">GAMBLESTRIKE</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {casinos?.length > 0 && casinos.map((casino, index) => (
                <CasinoComponent key={casino._id} casino={casino} index={index} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Features */}
        <AnimatedSection className="w-full py-20 bg-[#1A1A1A]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <AnimatedSection key={feature.title} delay={index * 0.2} className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FF1745]/20 flex items-center justify-center mx-auto text-[#FF1745]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </AnimatedSection>
              ))}
            </div>
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
                {guides.map((guide, index) => (
                  <AnimatedSection key={guide.title} delay={index * 0.2}>
                    <Link href={`/${guide.slug}`}>
                      <Card className="h-full border border-[#FF1745] bg-[#1A1A1A]/50 hover:bg-[#1A1A1A] transition-all duration-300">
                        <CardContent className="p-6 flex flex-col h-full space-y-4">
                          <div className="relative w-full h-[200px]">
                            <Image
                              src={guide.image}
                              alt={guide.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <h3 className="text-xl font-bold text-[#FF1745]">{guide.title}</h3>
                          <p className="text-gray-400 flex-grow">{guide.description}</p>
                        </CardContent>
                      </Card>
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
      </main>
    </div>
  );
}