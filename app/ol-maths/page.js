import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import Link from 'next/link';
import { SITE, COURSES } from '@/lib/data';

export const metadata = {
  title: 'O/L Mathematics Class & Past Paper Revision Sri Lanka | Ishan Maduranga',
  description: 'Join Ishan Maduranga\'s online G.C.E. O/L Mathematics revision & past paper class in Sri Lanka. Sinhala & English medium. Model papers, speed methods, full recordings.',
  keywords: [
    'O/L mathematics class Sri Lanka',
    'O/L maths revision class',
    'Grade 11 maths past papers',
    'සාමාන්‍ය පෙළ ගණිත පන්තිය',
    'O/L maths past paper discussion',
    'Ishan Maduranga O/L maths'
  ],
  alternates: {
    canonical: 'https://ishanmaduranga.lk/ol-maths',
  },
};

export default function OLMathsPage() {
  const olCourses = COURSES.filter(c => c.grade === 10 || c.grade === 11);

  const jsonLdCourse = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'G.C.E. O/L Mathematics Revision & Masterclass',
    'description': 'Comprehensive G.C.E. Ordinary Level Mathematics examination preparation, syllabus completion, past paper discussions, and target model papers.',
    'provider': {
      '@type': 'Person',
      'name': 'Ishan Maduranga',
      'url': 'https://ishanmaduranga.lk/about'
    },
    'educationalCredentialAwarded': 'O/L Mathematics Exam Readiness'
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What medium are the O/L Maths classes conducted in?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Classes are conducted in both Sinhala Medium and English Medium with separate dedicated groups.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Are live recordings provided if a student misses a session?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, full HD video recordings of every live session are made available on the student dashboard within 24 hours.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How are past papers and model papers discussed?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We discuss 10+ years of G.C.E. O/L past papers along with target model paper discussions, time management strategies, and marking scheme guidelines.'
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCourse) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Header />
      <main style={{ background: 'var(--bg-dark)', color: '#fff', minHeight: '80vh', padding: '120px 0 60px' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Hero Banner */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ background: 'rgba(234,179,8,0.15)', color: '#eab308', border: '1px solid rgba(234,179,8,0.3)', padding: '6px 16px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em' }}>
              🎯 G.C.E. O/L EXAM SPECIALIST
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '16px 0', background: 'linear-gradient(135deg, #fff 30%, #e2e8f0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              O/L Mathematics Masterclass & Revision
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
              Master the G.C.E. O/L Maths syllabus with Ishan Maduranga. Intensive past paper analysis, speed problem-solving techniques, and complete syllabus coverage for Grade 10 & 11.
            </p>
          </div>

          {/* Key Features Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '50px' }}>
            <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📝</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>Past Paper & Model Discussions</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6' }}>Step-by-step breakdown of past O/L exam papers with marking scheme insights and shortcut methods.</p>
            </div>
            <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⏱</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>Time Management & Exam Tips</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6' }}>Learn how to manage your 3 hours in Part I & Part II effectively to maximize your score.</p>
            </div>
            <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎥</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>Live Classes + Full Recordings</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6' }}>Never miss a lesson. Access clear HD recordings, PDF tutes, and direct teacher support on WhatsApp.</p>
            </div>
          </div>

          {/* O/L Course Cards */}
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', marginBottom: '24px', textAlign: 'center' }}>
            Available O/L Grade Courses
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            {olCourses.map(c => (
              <div key={c.id} style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ background: c.medium === 'sinhala' ? '#00C896' : '#2563eb', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>
                    {c.medium} Medium
                  </span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '14px 0 8px', color: '#fff' }}>{c.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '16px' }}>{c.description}</p>
                  <p style={{ color: '#e2e8f0', fontSize: '0.88rem', margin: '4px 0' }}>📅 <strong>Schedule:</strong> {c.schedule}</p>
                  <p style={{ color: '#e2e8f0', fontSize: '0.88rem', margin: '4px 0 16px' }}>💰 <strong>Fee:</strong> LKR {c.price.toLocaleString()} / month</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link href={`/courses/${c.id}`} className="btn btn-primary btn-sm" style={{ textDecoration: 'none', flex: 1, textAlign: 'center' }}>
                    View Syllabus & Enroll
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div style={{ background: 'rgba(30,41,59,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '20px' }}>Frequently Asked Questions (O/L Maths)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h4 style={{ color: '#3b82f6', fontSize: '1.05rem', fontWeight: '700', marginBottom: '6px' }}>What medium are the O/L Maths classes conducted in?</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', margin: 0 }}>Classes are conducted in both Sinhala Medium and English Medium in separate live sessions.</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                <h4 style={{ color: '#3b82f6', fontSize: '1.05rem', fontWeight: '700', marginBottom: '6px' }}>Are recordings provided if I miss a live class?</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', margin: 0 }}>Yes, every registered student gets full 24/7 access to recorded video lessons and PDF tutes on the student portal.</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                <h4 style={{ color: '#3b82f6', fontSize: '1.05rem', fontWeight: '700', marginBottom: '6px' }}>How do I register for Ishan Sir's O/L class?</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', margin: 0 }}>You can register online through our portal or contact Ishan Sir directly on WhatsApp (+94 72 929 8096) for instant enrollment guidance.</p>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', borderRadius: '20px', padding: '36px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', marginBottom: '12px' }}>Ready to Boost Your O/L Maths Results?</h2>
            <p style={{ color: '#dbeafe', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 24px' }}>Join online today and get instant access to live interactive classes, full recordings, and step-by-step model papers.</p>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="btn" style={{ background: '#25D366', color: '#fff', fontWeight: '800', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', display: 'inline-block' }}>
              💬 Chat with Ishan Sir on WhatsApp
            </a>
          </div>

        </div>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
