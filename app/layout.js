import './globals.css';

export const metadata = {
  title: {
    default: 'MathSpark – Ignite Your Math Skills | Online Maths Tutoring Sri Lanka',
    template: '%s | MathSpark',
  },
  description: "Sri Lanka's most result-oriented online Mathematics platform for Grades 6–11. Live classes, full recordings, WhatsApp support. Sinhala & English medium.",
  keywords: ['online maths tuition Sri Lanka', 'grade 6 to 11 maths', 'O/L maths class', 'MathSpark', 'Sinhala medium maths'],
  openGraph: {
    title: 'MathSpark – Ignite Your Math Skills',
    description: "Sri Lanka's #1 online Mathematics tutoring platform. Grades 6–11.",
    url: 'https://mathspark.lk',
    siteName: 'MathSpark',
    locale: 'en_LK',
    type: 'website',
  },
  robots: { index: true, follow: true },
  themeColor: '#0052FF',
};

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
