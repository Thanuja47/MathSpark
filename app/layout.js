import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ishanmaduranga.lk';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ishan Maduranga Mathematics | Grade 6–11 & O/L Online Maths Class Sri Lanka',
    template: '%s | Ishan Maduranga Mathematics',
  },
  description: "Sri Lanka's leading online Mathematics academy by Ishan Maduranga for Grades 6–11 & O/L. Live interactive classes, recordings, Sinhala & English medium.",
  keywords: [
    'Ishan Maduranga',
    'Ishan Maduranga maths',
    'Ishan Maduranga mathematics class',
    'O/L maths class Sri Lanka',
    'online maths class Sri Lanka',
    'Grade 6 maths class Sri Lanka',
    'Grade 7 maths class Sri Lanka',
    'Grade 8 maths class Sri Lanka',
    'Grade 9 maths class Sri Lanka',
    'Grade 10 maths class Sri Lanka',
    'Grade 11 maths class Sri Lanka',
    'සාමාන්‍ය පෙළ ගණිත පන්තිය',
    'ඔන්ලයින් ගණිත පන්තිය',
    'ගණිත උපකාරක පන්තිය',
  ],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Ishan Maduranga Mathematics | Online Maths Class Sri Lanka',
    description: "Online Mathematics learning platform for Grades 6 to 11 & O/L by Ishan Maduranga.",
    url: baseUrl,
    siteName: 'Ishan Maduranga Mathematics',
    locale: 'en_LK',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    'name': 'Ishan Maduranga Mathematics (MathSpark)',
    'alternateName': ['MathSpark', 'Ishan Maduranga Online Maths Class'],
    'url': baseUrl,
    'logo': `${baseUrl}/mathspark_logo.png`,
    'description': "Online Mathematics Academy for Grades 6–11 and O/L students in Sri Lanka.",
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

  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Ishan Maduranga',
    'jobTitle': 'Mathematics Educator',
    'worksFor': {
      '@type': 'EducationalOrganization',
      'name': 'Ishan Maduranga Mathematics'
    },
    'url': `${baseUrl}/about`,
    'sameAs': [
      'https://youtube.com/@ishanmaduranga333',
      'https://www.facebook.com/share/14gEfzCSjuS/?mibextid=wwXIfr'
    ]
  };

  return (
    <html lang="en-LK">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
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
