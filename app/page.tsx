import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Services from '@/components/home/Services';
import HowItWorks from '@/components/home/HowItWorks';
import ImpactBanner from '@/components/home/ImpactBanner';
import Testimonials from '@/components/home/Testimonials';

/**
 * Home Page (Landing Page)
 *
 * This is the main entry point of the HouseConnect application.
 * It combines several sections: a Hero area, Statistics, Services list,
 * an Impact Banner, a "How It Works" guide, and Testimonials.
 */
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
