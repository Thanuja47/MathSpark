'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export default function SampleVideoModal({ isOpen, onClose, course }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const rawVideoUrl = course.sampleVideoUrl || '';
  const isPlaceholder = !rawVideoUrl || rawVideoUrl.includes('VIDEO_ID');

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
    } else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1] || '');
      videoId = urlParams.get('v');
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  const videoUrl = getEmbedUrl(rawVideoUrl);
  const waText = encodeURIComponent(`Hi Ishan Sir, I want to watch a free sample lesson for ${course.title || 'Grade Maths'} on MathSpark. Can you share the preview link?`);

  return (
    <div className="sample-modal-overlay" onClick={onClose}>
      <div className="sample-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sample-modal-header">
          <div className="sample-badge">
            <span className="sample-dot" />
            FREE SAMPLE LESSON PREVIEW
          </div>
          <button className="sample-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Title */}
        <h3 className="sample-modal-title">
          {course.title}
        </h3>
        <p className="sample-modal-subtitle">
          Watch a free sample lesson to experience Ishan Sir&apos;s step-by-step teaching method before enrolling!
        </p>

        {/* Video Player or Coming Soon */}
        {isPlaceholder ? (
          <div className="video-coming-soon">
            <div className="coming-soon-icon">🎬</div>
            <h4>Sample Video Coming Soon!</h4>
            <p>
              The free preview video for <strong>{course.title}</strong> will be uploaded shortly.
              Contact Ishan Sir on WhatsApp to get early access!
            </p>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-md"
              style={{ marginTop: 16, display: 'inline-flex' }}
            >
              💬 Ask for Sample Video on WhatsApp
            </a>
          </div>
        ) : (
          <div className="video-responsive-wrapper">
            <iframe
              src={videoUrl}
              title={`Free Sample Lesson - ${course.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}

        {/* CTA Box */}
        <div className="sample-cta-box">
          <div className="sample-cta-text">
            <h4>Ready to get an A-Pass in Maths? 🏆</h4>
            <p>Enroll now to unlock all {course.lessons || '300+'} video lessons, weekly live Zoom classes, printable tutes, and model paper discussions.</p>
          </div>
          <div className="sample-cta-buttons">
            <Link href={`/courses/${course.id}`} className="btn btn-primary btn-md" onClick={onClose}>
              🚀 Enroll in Full Course ({course.currency || 'LKR'} {Number(course.price || 2000).toLocaleString()}/mo)
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-md"
            >
              💬 Contact on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sample-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(5, 7, 14, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.25s ease;
        }

        .sample-modal-container {
          background: #141720;
          border: 1px solid #252a3a;
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 28px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(37, 99, 235, 0.2);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sample-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .sample-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #3b82f6;
          background: rgba(37, 99, 235, 0.12);
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 5px 14px;
          border-radius: 999px;
        }

        .sample-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
          animation: pulse 1.5s infinite;
        }

        .sample-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #c8cdd8;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sample-close-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.4);
        }

        .sample-modal-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #eff2ff;
          margin-bottom: 6px;
        }

        .sample-modal-subtitle {
          font-size: 0.9rem;
          color: #8d96a7;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .video-coming-soon {
          background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1));
          border: 1.5px dashed rgba(59,130,246,0.4);
          border-radius: 14px;
          padding: 40px 24px;
          text-align: center;
          margin-bottom: 24px;
        }
        .coming-soon-icon {
          font-size: 3rem;
          margin-bottom: 12px;
        }
        .video-coming-soon h4 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #eff2ff;
          margin-bottom: 8px;
        }
        .video-coming-soon p {
          font-size: 0.87rem;
          color: #8d96a7;
          line-height: 1.5;
          margin: 0;
        }
        .video-responsive-wrapper {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          border-radius: 14px;
          overflow: hidden;
          background: #0d0f14;
          border: 1px solid #252a3a;
          margin-bottom: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .video-responsive-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .sample-cta-box {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
          border: 1.5px solid rgba(37, 99, 235, 0.25);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sample-cta-text h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #eff2ff;
          margin-bottom: 4px;
        }

        .sample-cta-text p {
          font-size: 0.85rem;
          color: #c8cdd8;
          line-height: 1.5;
          margin: 0;
        }

        .sample-cta-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-whatsapp {
          background: #10b981;
          color: #ffffff;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 12px;
        }

        .btn-whatsapp:hover {
          background: #059669;
          color: #ffffff;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 640px) {
          .sample-modal-container { padding: 18px; }
          .sample-cta-buttons { flex-direction: column; }
          .sample-cta-buttons .btn { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}
