import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import PopularCourses from '@/components/home/PopularCourses';
import WhyMatSpark from '@/components/home/WhyMatSpark';
import GradesSection from '@/components/home/GradesSection';
import AboutSection from '@/components/home/AboutSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export const metadata = {
  title: 'MathSpark – Ignite Your Math Skills | Online Maths Tutoring Sri Lanka',
  description: "Sri Lanka's most result-oriented online Mathematics platform for Grades 6–11. Live classes, full recordings, WhatsApp support in Sinhala & English medium.",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <PopularCourses />
        <WhyMatSpark />
        <GradesSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
