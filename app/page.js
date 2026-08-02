import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import RedesignedHomepage from '@/components/home/RedesignedHomepage';

export const metadata = {
  title: 'MathSpark – Master Mathematics | Ishan Maduranga Online Tuition',
  description: "Sri Lanka's most result-oriented online Mathematics platform for Grades 6–11 and A/L.",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <RedesignedHomepage />
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}

