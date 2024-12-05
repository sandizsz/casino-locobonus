import { client } from "@/sanity/lib/client";
import CasinoComponent from "@/app/components/CasinoComponent";
import AnimatedSection from "@/app/components/AnimatedSection";
import { Casino } from '@/app/utils/interface';

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCasinosByCategory(slug: string) {
  const query = `*[_type == "casino" && references(*[_type == "category" && slug.current == "${slug}"]._id)] | order(orderRank) {
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
      title,
      slug
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
  return data as Casino[];
}

async function getCategory(slug: string) {
  const query = `*[_type == "category" && slug.current == "${slug}"][0] {
    _id,
    title,
    description,
    slug
  }`;

  const data = await client.fetch(query);
  return data as Category;
}

export const revalidate = 60;

export default async function CategoryPage({ params }: PageProps) {
  const parameters = await params;
  const slug = parameters.slug;
  
  const category = await getCategory(slug);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <p className="text-white">Category not found</p>
      </div>
    );
  }

  const casinos: Casino[] = await getCasinosByCategory(slug);

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <AnimatedSection className="w-full py-20 bg-gradient-to-b from-[#1E2A44] to-[#0D1117] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-['Orbitron'] font-bold text-center text-[#FFDD00] [text-shadow:_0_0_30px_#FFDD00] mb-12">
            {category.title}
          </h1>

          {category.description && (
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-[#C0C0C0] text-lg text-center font-['Rajdhani'] leading-relaxed">
                {category.description}
              </p>
            </div>
          )}
          
          <div className="space-y-6">
            {casinos?.map((casino, index) => (
              <AnimatedSection key={casino._id}>
                <CasinoComponent casino={casino} index={index} />
              </AnimatedSection>
            ))}

            {(!casinos || casinos.length === 0) && (
              <div className="text-center p-12 bg-[#1E2A44]/50 rounded-lg border border-[#00A3FF] shadow-[0_0_20px_rgba(0,163,255,0.3)]">
                <p className="text-xl font-['Rajdhani'] text-[#C0C0C0]">
                  No casinos found in this category yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
