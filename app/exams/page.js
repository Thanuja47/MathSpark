'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';

const QUIZZES = [
  {
    id: 1, grade: 10, title: 'Algebra — Speed Test 01', duration: 600,
    medium: 'Sinhala', badge: 'Monthly Test',
    questions: [
      { q: 'Solve: 2x + 5 = 13. Find x.', options: ['3', '4', '5', '6'], answer: 1, explain: '2x = 13 – 5 = 8, so x = 4' },
      { q: 'Simplify: 3(2x – 4) + 6', options: ['6x – 6', '6x + 6', '6x – 12', '6x – 18'], answer: 0, explain: '3×2x – 3×4 + 6 = 6x – 12 + 6 = 6x – 6' },
      { q: 'If y = 3x – 2 and x = 4, find y.', options: ['10', '12', '14', '8'], answer: 0, explain: 'y = 3(4) – 2 = 12 – 2 = 10' },
      { q: 'Expand: (x + 3)(x – 2)', options: ['x² + x – 6', 'x² – x – 6', 'x² + 5x – 6', 'x² – 5x + 6'], answer: 0, explain: 'x² – 2x + 3x – 6 = x² + x – 6' },
      { q: 'Solve: x² = 49. Find positive x.', options: ['6', '7', '8', '9'], answer: 1, explain: '√49 = 7' },
      { q: 'If 5x = 35, then x = ?', options: ['5', '6', '7', '8'], answer: 2, explain: 'x = 35 ÷ 5 = 7' },
      { q: 'Factor: x² – 9', options: ['(x–3)²', '(x+3)(x–3)', '(x+9)(x–1)', 'Cannot factor'], answer: 1, explain: 'Difference of squares: (x+3)(x–3)' },
      { q: 'Simplify: 4x + 7x – 2x', options: ['7x', '8x', '9x', '11x'], answer: 2, explain: '(4+7–2)x = 9x' },
      { q: 'If 3x – 4 = 2x + 1, find x.', options: ['4', '5', '6', '3'], answer: 1, explain: '3x – 2x = 1 + 4, x = 5' },
      { q: 'What is the gradient of y = 4x + 3?', options: ['3', '4', '7', '12'], answer: 1, explain: 'In y = mx + c, m = 4 is the gradient.' },
    ]
  },
  {
    id: 2, grade: 11, title: 'Geometry — Angles & Triangles Test', duration: 900,
    medium: 'English', badge: 'O/L Prep',
    questions: [
      { q: 'Sum of interior angles of a triangle?', options: ['90°', '180°', '270°', '360°'], answer: 1, explain: 'A triangle\'s interior angles always sum to 180°.' },
      { q: 'An isosceles triangle has two equal sides. Their angles are?', options: ['Equal', 'Complementary', 'Supplementary', 'Adjacent'], answer: 0, explain: 'The base angles of an isosceles triangle are always equal.' },
      { q: 'Exterior angle of a triangle equals?', options: ['Sum of two adjacent angles', 'Sum of two non-adjacent interior angles', 'Half of interior angle', 'None'], answer: 1, explain: 'Exterior angle = sum of two opposite interior angles.' },
      { q: 'A right angle is how many degrees?', options: ['45°', '60°', '90°', '180°'], answer: 2, explain: 'A right angle = 90°.' },
      { q: 'Pythagoras theorem: c² = ?', options: ['a² – b²', 'a² + b²', '2ab', 'a² × b²'], answer: 1, explain: 'For right-angled triangle: c² = a² + b².' },
      { q: 'If two angles of a triangle are 60° and 80°, the third is?', options: ['30°', '40°', '50°', '60°'], answer: 1, explain: '180 – 60 – 80 = 40°.' },
      { q: 'A triangle with all sides equal is called?', options: ['Scalene', 'Isosceles', 'Equilateral', 'Right-angled'], answer: 2, explain: 'All three sides equal = Equilateral.' },
      { q: 'Hypotenuse is the side opposite to?', options: ['30° angle', '60° angle', '90° angle', '45° angle'], answer: 2, explain: 'Hypotenuse is always opposite the right angle (90°).' },
      { q: 'Angles on a straight line sum to?', options: ['90°', '180°', '270°', '360°'], answer: 1, explain: 'Angles on a straight line = 180° (supplementary).' },
      { q: 'Alternate angles are?', options: ['Equal', 'Supplementary', 'Complementary', 'Adjacent'], answer: 0, explain: 'Alternate interior/exterior angles are always equal (parallel lines).' },
    ]
  },
  {
    id: 3, grade: 9, title: 'Number Systems — Quick Fire Round', duration: 480,
    medium: 'Sinhala', badge: 'Speed Test',
    questions: [
      { q: 'What is LCM of 4 and 6?', options: ['8', '12', '18', '24'], answer: 1, explain: 'Multiples of 4: 4,8,12… Multiples of 6: 6,12… LCM = 12.' },
      { q: 'What is HCF of 12 and 18?', options: ['3', '4', '6', '9'], answer: 2, explain: 'Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. HCF = 6.' },
      { q: '25% of 200 = ?', options: ['25', '40', '50', '75'], answer: 2, explain: '25/100 × 200 = 50.' },
      { q: 'Which is a prime number?', options: ['9', '15', '17', '21'], answer: 2, explain: '17 is only divisible by 1 and itself.' },
      { q: '√144 = ?', options: ['11', '12', '13', '14'], answer: 1, explain: '12 × 12 = 144.' },
      { q: '0.75 as a fraction = ?', options: ['3/4', '7/10', '3/5', '7/8'], answer: 0, explain: '0.75 = 75/100 = 3/4.' },
      { q: '(-5) × (-3) = ?', options: ['-15', '15', '-8', '8'], answer: 1, explain: 'Negative × Negative = Positive. 5×3 = 15.' },
      { q: '2³ = ?', options: ['5', '6', '8', '9'], answer: 2, explain: '2³ = 2×2×2 = 8.' },
      { q: 'Express 0.3̄ as a fraction.', options: ['1/3', '3/9', 'Both A and B', '3/10'], answer: 2, explain: '0.3̄ = 3/9 = 1/3.' },
      { q: 'Smallest prime number is?', options: ['0', '1', '2', '3'], answer: 2, explain: '2 is the smallest prime number (also the only even prime).' },
    ]
  }
];

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

export default function ExamsPage() {
  const [view, setView] = useState('list'); // list | quiz | result
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showExplain, setShowExplain] = useState(false);
  const [gradeFilter, setGradeFilter] = useState('all');

  const endQuiz = useCallback(() => setView('result'), []);

  useEffect(() => {
    if (view !== 'quiz') return;
    if (timeLeft <= 0) { endQuiz(); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [view, timeLeft, endQuiz]);

  const startQuiz = (quiz) => {
    setSelected(quiz);
    setCurrent(0);
    setAnswers([]);
    setTimeLeft(quiz.duration);
    setShowExplain(false);
    setView('quiz');
  };

  const handleAnswer = (idx) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    setShowExplain(true);
    setTimeout(() => {
      setShowExplain(false);
      if (current + 1 < selected.questions.length) {
        setCurrent(c => c + 1);
      } else {
        setView('result');
      }
    }, 1800);
  };

  const score = selected ? answers.filter((a, i) => a === selected.questions[i]?.answer).length : 0;
  const pct = selected ? Math.round((score / selected.questions.length) * 100) : 0;
  const filtered = gradeFilter === 'all' ? QUIZZES : QUIZZES.filter(q => q.grade === parseInt(gradeFilter));

  return (
    <>
      <Header />
      <main>
        {view === 'list' && (
          <>
            <section className="page-hero">
              <div className="container">
                <div className="section-tag page-hero-tag">🎯 Online Tests</div>
                <h1 className="page-hero-title">MCQ Exam <span className="theme-gradient">Practice</span></h1>
                <p className="page-hero-desc">Speed tests, monthly papers & O/L prep — with instant marks and step-by-step explanations.</p>
              </div>
            </section>

            <section className="section" style={{ background: 'var(--dark)' }}>
              <div className="container">
                <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
                  {['all', '6', '7', '8', '9', '10', '11'].map(g => (
                    <button key={g} className={`filter-tag ${gradeFilter === g ? 'active' : ''}`}
                      onClick={() => setGradeFilter(g)}>
                      {g === 'all' ? 'All Grades' : `Grade ${g}`}
                    </button>
                  ))}
                </div>

                <div className="grid grid-3">
                  {filtered.map(quiz => (
                    <div key={quiz.id} className="quiz-card">
                      <div className="quiz-card-top">
                        <span className="badge badge-accent">{quiz.badge}</span>
                        <span className="badge badge-primary">Grade {quiz.grade}</span>
                      </div>
                      <h3 className="quiz-card-title">{quiz.title}</h3>
                      <div className="quiz-meta">
                        <span>📝 {quiz.questions.length} Questions</span>
                        <span>⏱️ {Math.floor(quiz.duration / 60)} min</span>
                        <span>🌐 {quiz.medium}</span>
                      </div>
                      <button className="btn btn-primary" style={{ width: '100%', marginTop: 20 }}
                        onClick={() => startQuiz(quiz)}>
                        Start Test →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'quiz' && selected && (
          <section style={{ background: 'var(--dark)', minHeight: '90vh', padding: '60px 0' }}>
            <div className="container">
              <div className="quiz-wrapper">
                {/* Timer Bar */}
                <div className="quiz-header">
                  <div className="quiz-progress-info">
                    <span>Question {current + 1} of {selected.questions.length}</span>
                    <span style={{ fontWeight: 700 }}>{selected.title}</span>
                  </div>
                  <div className={`quiz-timer ${timeLeft < 60 ? 'danger' : ''}`}>
                    ⏱️ {formatTime(timeLeft)}
                  </div>
                </div>
                <div className="quiz-progress-bar">
                  <div className="quiz-progress-fill" style={{ width: `${((current) / selected.questions.length) * 100}%` }} />
                </div>

                {/* Question */}
                <div className="quiz-body">
                  <div className="quiz-question">{selected.questions[current].q}</div>
                  <div className="quiz-options">
                    {selected.questions[current].options.map((opt, idx) => {
                      let cls = 'quiz-option';
                      if (showExplain) {
                        if (idx === selected.questions[current].answer) cls += ' correct';
                        else if (idx === answers[current]) cls += ' wrong';
                      }
                      return (
                        <button key={idx} className={cls}
                          onClick={() => !showExplain && handleAnswer(idx)}
                          disabled={showExplain}>
                          <span className="quiz-option-letter">{String.fromCharCode(65 + idx)}</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showExplain && (
                    <div className="quiz-explain">
                      <span style={{ fontWeight: 700 }}>
                        {answers[current] === selected.questions[current].answer ? '✅ Correct!' : '❌ Wrong!'}
                      </span>
                      &nbsp; {selected.questions[current].explain}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'result' && selected && (
          <section style={{ background: 'var(--dark)', minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '60px 0' }}>
            <div className="container">
              <div className="quiz-result-card">
                <div className="result-emoji">
                  {pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}
                </div>
                <h2 style={{ marginBottom: 8 }}>
                  {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : 'Keep Practising!'}
                </h2>
                <div className="result-score">{score}/{selected.questions.length}</div>
                <div className="result-pct" style={{ color: pct >= 80 ? '#00C896' : pct >= 60 ? '#FFB800' : '#FF6B6B' }}>
                  {pct}%
                </div>

                {/* Answer Review */}
                <div className="result-review">
                  {selected.questions.map((q, i) => (
                    <div key={i} className={`review-item ${answers[i] === q.answer ? 'correct' : 'wrong'}`}>
                      <div className="review-q">Q{i + 1}. {q.q}</div>
                      <div className="review-answer">
                        <span>Your answer: <strong>{q.options[answers[i]] || 'Skipped'}</strong></span>
                        {answers[i] !== q.answer && <span style={{ color: '#00C896' }}> | Correct: <strong>{q.options[q.answer]}</strong></span>}
                      </div>
                      <div className="review-explain">💡 {q.explain}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
                  <button className="btn btn-primary btn-lg" onClick={() => startQuiz(selected)}>Retry Test 🔄</button>
                  <button className="btn btn-outline btn-lg" onClick={() => setView('list')}>← All Tests</button>
                  <Link href="/courses" className="btn btn-accent btn-lg">Enroll in Class →</Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .quiz-card {
          background: var(--dark-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          transition: var(--transition);
        }
        .quiz-card:hover { transform: translateY(-6px); border-color: rgba(0,82,255,0.3); box-shadow: 0 24px 60px rgba(0,0,0,0.5); }
        .quiz-card-top { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
        .quiz-card-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 14px; line-height: 1.4; }
        .quiz-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 0.8rem; color: var(--text-muted); }

        .quiz-wrapper { max-width: 720px; margin: 0 auto; }
        .quiz-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .quiz-progress-info { font-size: 0.85rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 2px; }
        .quiz-timer {
          font-family: var(--font-heading); font-size: 1.5rem; font-weight: 900;
          color: var(--primary-light); background: rgba(0,82,255,0.1);
          border: 1px solid rgba(0,82,255,0.2); border-radius: var(--radius-md);
          padding: 8px 20px;
        }
        .quiz-timer.danger { color: #FF6B6B; background: rgba(255,60,60,0.1); border-color: rgba(255,60,60,0.2); animation: pulse-glow 0.8s infinite; }
        .quiz-progress-bar { height: 6px; background: var(--dark-3); border-radius: 3px; margin-bottom: 32px; overflow: hidden; }
        .quiz-progress-fill { height: 100%; background: var(--gradient-blue); border-radius: 3px; transition: width 0.4s ease; }

        .quiz-body { background: var(--dark-2); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 36px; }
        .quiz-question { font-size: 1.2rem; font-weight: 700; line-height: 1.5; margin-bottom: 28px; }
        .quiz-options { display: flex; flex-direction: column; gap: 12px; }
        .quiz-option {
          display: flex; align-items: center; gap: 16px;
          background: var(--dark-3); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 14px 20px;
          font-size: 1rem; font-weight: 500; color: var(--text-primary);
          text-align: left; cursor: pointer; transition: var(--transition);
        }
        .quiz-option:hover:not(:disabled) { background: rgba(0,82,255,0.1); border-color: var(--primary); }
        .quiz-option.correct { background: rgba(0,200,150,0.15); border-color: #00C896; color: #00C896; }
        .quiz-option.wrong { background: rgba(255,60,60,0.12); border-color: #FF6B6B; color: #FF6B6B; }
        .quiz-option-letter {
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--border); display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 700; flex-shrink: 0;
        }
        .quiz-explain {
          margin-top: 20px; padding: 14px 18px;
          background: rgba(0,82,255,0.08); border: 1px solid rgba(0,82,255,0.2);
          border-radius: var(--radius-md); font-size: 0.9rem; color: var(--text-secondary);
        }

        .quiz-result-card {
          max-width: 680px; margin: 0 auto;
          background: var(--dark-2); border: 1px solid var(--border);
          border-radius: var(--radius-xl); padding: 48px 40px; text-align: center;
        }
        .result-emoji { font-size: 3.5rem; margin-bottom: 12px; }
        .result-score { font-family: var(--font-heading); font-size: 3.5rem; font-weight: 900; line-height: 1; margin: 16px 0 4px; }
        .result-pct { font-size: 1.5rem; font-weight: 700; margin-bottom: 32px; }
        .result-review { text-align: left; display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto; padding-right: 4px; }
        .review-item { background: var(--dark-3); border-radius: var(--radius-md); padding: 14px 16px; border-left: 3px solid transparent; }
        .review-item.correct { border-left-color: #00C896; }
        .review-item.wrong { border-left-color: #FF6B6B; }
        .review-q { font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; }
        .review-answer { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }
        .review-explain { font-size: 0.78rem; color: var(--primary-light); }

        @media (max-width: 640px) {
          .quiz-result-card { padding: 28px 20px; }
          .quiz-body { padding: 24px; }
        }
      `}</style>
    </>
  );
}
