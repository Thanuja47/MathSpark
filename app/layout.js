import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://math-spark-tau.vercel.app');

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'MathSpark – Ignite Your Math Skills | Online Maths Tutoring Sri Lanka',
    template: '%s | MathSpark',
  },
  description: "Sri Lanka's most result-oriented online Mathematics platform for Grades 6–11. Live classes, full recordings, WhatsApp support. Sinhala & English medium.",
  keywords: ['online maths tuition Sri Lanka', 'grade 6 to 11 maths', 'O/L maths class', 'MathSpark', 'Sinhala medium maths', 'Ishan Maduranga Maths'],
  openGraph: {
    title: 'MathSpark – Ignite Your Math Skills',
    description: "Sri Lanka's #1 online Mathematics tutoring platform. Grades 6–11.",
    url: baseUrl,
    siteName: 'MathSpark',
    locale: 'en_LK',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    'name': 'MathSpark',
    'alternateName': 'MathSpark Online Mathematics Academy',
    'url': baseUrl,
    'logo': `${baseUrl}/mathspark_logo.png`,
    'description': "Sri Lanka's most result-oriented online mathematics learning platform for Grades 6 to 11.",
    'telephone': '+94 72 929 8096',
    'sameAs': [
      'https://www.facebook.com/share/14gEfzCSjuS/?mibextid=wwXIfr',
      'https://youtube.com/@ishanmaduranga333'
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'LK'
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
