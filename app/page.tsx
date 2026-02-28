import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import ValueProp from "@/components/home/ValueProp";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import ImpactBanner from "@/components/home/ImpactBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <ImpactBanner />
      <ValueProp />
      <HowItWorks />
      <Testimonials />
    </main>
  );
}
