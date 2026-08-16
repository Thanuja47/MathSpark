import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import Link from 'next/link';
import { SITE, COURSES } from '@/lib/data';

const gradeConfigs = {
  6: {
    gradeNum: 6,
    title: 'Grade 6 Mathematics Online Class Sri Lanka | Ishan Maduranga',
    description: 'Build a strong foundation in Grade 6 Maths with Ishan Maduranga. Interactive online lessons covering number systems, fractions, basic algebra, and shapes in Sinhala & English medium.',
    h1: 'Grade 6 Mathematics Online Class',
    topics: ['Number Systems', 'Fractions & Decimals', 'Basic Algebra Intro', 'Shapes & Angles', 'Perimeter & Area'],
    outcomes: 'Students gain confidence in fundamental mathematical operations, basic geometric concepts, and problem-solving habits for secondary school.'
  },
  7: {
    gradeNum: 7,
    title: 'Grade 7 Mathematics Online Class Sri Lanka | Ishan Maduranga',
    description: 'Step-by-step Grade 7 Maths online tuition in Sri Lanka. Clear explanations for integers, ratios, equations, and geometry in Sinhala & English medium.',
    h1: 'Grade 7 Mathematics Online Class',
    topics: ['Integers & Direct Numbers', 'Ratios & Percentages', 'Algebraic Expressions', 'Triangles & Angles', 'Data Handling'],
    outcomes: 'Students master multi-step equations, proportional reasoning, and basic statistical interpretation.'
  },
  8: {
    gradeNum: 8,
    title: 'Grade 8 Mathematics Online Class Sri Lanka | Ishan Maduranga',
    description: 'Master Grade 8 Maths new syllabus topics with Ishan Maduranga. Linear equations, quadrilaterals, percentage applications, and statistics.',
    h1: 'Grade 8 Mathematics Online Class',
    topics: ['Linear Equations', 'Quadrilaterals & Polygons', 'Percentage Applications', 'Probability & Statistics', 'Sets'],
    outcomes: 'Prepares students for analytical reasoning, algebraic manipulation, and geometric proofs.'
  },
  9: {
    gradeNum: 9,
    title: 'Grade 9 Mathematics Online Class Sri Lanka | Ishan Maduranga',
    description: 'Comprehensive Grade 9 Maths class bridging junior maths to O/L preparation. Surds, matrices, introduction to trigonometry, and quadratic equations.',
    h1: 'Grade 9 Mathematics Online Class',
    topics: ['Surds & Indices', 'Matrices', 'Intro to Trigonometry', 'Quadratic Equations', 'Pythagoras Theorem'],
    outcomes: 'Establishes high-level mathematical readiness required for Grade 10 & 11 Ordinary Level topics.'
  },
  10: {
    gradeNum: 10,
    title: 'Grade 10 Mathematics Online Class Sri Lanka | Ishan Maduranga',
    description: 'Grade 10 Maths O/L foundation online class in Sri Lanka by Ishan Maduranga. Logarithms, geometry theorems, statistics, and trigonometry in Sinhala & English medium.',
    h1: 'Grade 10 Mathematics Online Class',
    topics: ['Logarithms', 'Simultaneous Equations', 'Circle Geometry Theorems', 'Trigonometric Ratios', 'Probability'],
    outcomes: 'Covers 50% of the G.C.E. O/L syllabus with thorough exam-style question practice.'
  },
  11: {
    gradeNum: 11,
    title: 'Grade 11 Mathematics & O/L Revision Class | Ishan Maduranga',
    description: 'Grade 11 Maths & G.C.E. O/L past paper revision class in Sri Lanka. Quadratic functions, progressions, mensuration, and past paper model papers.',
    h1: 'Grade 11 Mathematics & O/L Revision Class',
    topics: ['Quadratic Functions & Graphs', 'Arithmetic & Geometric Progressions', 'Mensuration (3D Solids)', 'Past Paper Discussions (Part I & II)', 'Target Model Papers'],
    outcomes: 'Complete O/L examination readiness with past paper techniques, time management, and model paper practice.'
  }
};

export async function generateMetadata({ params }) {
  const gradeNum = parseInt(params.grade);
  const config = gradeConfigs[gradeNum] || gradeConfigs[10];
  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: `https://ishanmaduranga.lk/grade-${gradeNum}-maths`,
    },
  };
}

export default function DedicatedGradePage({ params }) {
  const gradeNum = parseInt(params.grade) || 10;
  const config = gradeConfigs[gradeNum] || gradeConfigs[10];
  const relatedCourses = COURSES.filter(c => c.grade === gradeNum);

  const jsonLdCourse = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': config.h1,
    'description': config.description,
    'provider': {
      '@type': 'Person',
      'name': 'Ishan Maduranga',
      'url': 'https://ishanmaduranga.lk/about'
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCourse) }} />
      <Header />
      <main style={{ background: 'var(--bg-dark)', color: '#fff', minHeight: '80vh', padding: '120px 0 60px' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ background: 'rgba(37,99,235,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)', padding: '6px 16px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '700' }}>
              GRADE {gradeNum} MATHEMATICS
            </span>
            <h1 style={{ fontSize: '2.4rem', fontWeight: '900', margin: '16px 0', background: 'linear-gradient(135deg, #fff 30%, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {config.h1}
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
              {config.description}
            </p>
          </div>

          {/* Syllabus & Outcomes Box */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '50px' }}>
            <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#3b82f6', marginBottom: '16px' }}>📚 Key Topics Covered</h3>
              <ul style={{ color: '#cbd5e1', paddingLeft: '20px', lineHeight: '1.8', margin: 0 }}>
                {config.topics.map((t, idx) => <li key={idx}><strong>{t}</strong></li>)}
              </ul>
            </div>
            <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#10b981', marginBottom: '16px' }}>🎯 Learning Outcomes</h3>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.95rem' }}>{config.outcomes}</p>
              <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', color: '#6ee7b7', fontSize: '0.88rem' }}>
                💡 <strong>Class Format:</strong> Live Zoom sessions with full HD recordings & PDF tutes provided.
              </div>
            </div>
          </div>

          {/* Courses List */}
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '20px' }}>Available Grade {gradeNum} Batches</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '50px' }}>
            {relatedCourses.map(c => (
              <div key={c.id} style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '24px' }}>
                <span style={{ background: c.medium === 'sinhala' ? '#00C896' : '#2563eb', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>
                  {c.medium} Medium
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '12px 0 8px', color: '#fff' }}>{c.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '16px' }}>{c.description}</p>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '4px 0' }}>📅 {c.schedule}</p>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '4px 0 16px' }}>💰 LKR {c.price.toLocaleString()} / month</p>
                <Link href={`/courses/${c.id}`} className="btn btn-primary btn-sm" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                  View Details & Register
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation to Other Grades */}
          <div style={{ background: 'rgba(30,41,59,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
            <h4 style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>Explore Other Grade Classes</h4>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {[6, 7, 8, 9, 10, 11].map(g => (
                <Link key={g} href={`/grade-${g}-maths`} style={{ background: g === gradeNum ? '#2563eb' : 'rgba(255,255,255,0.08)', color: '#fff', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.88rem' }}>
                  Grade {g}
                </Link>
              ))}
              <Link href="/ol-maths" style={{ background: '#eab308', color: '#000', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '0.88rem' }}>
                O/L Revision
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
