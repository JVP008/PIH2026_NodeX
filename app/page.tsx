import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Services from '@/components/home/Services';
import HowItWorks from '@/components/home/HowItWorks';
import ImpactBanner from '@/components/home/ImpactBanner';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <ImpactBanner />
      <HowItWorks />
      <Testimonials />
    </main>
  );
}

