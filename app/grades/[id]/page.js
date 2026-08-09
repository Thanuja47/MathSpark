import { GRADES } from '@/lib/data';
import GradeFilteredClient from './GradeFilteredClient';

export async function generateMetadata({ params }) {
  const gradeId = parseInt(params.id, 10);
  const gradeObj = GRADES.find((g) => g.id === gradeId) || { label: `Grade ${gradeId}` };
  
  return {
    title: `${gradeObj.label} Mathematics Tuition | Sinhala & English Medium`,
    description: `Enroll in MathSpark ${gradeObj.label} Mathematics online tuition class. Comprehensive coverage of National syllabus, live interactive sessions, recordings, and tutes by Ishan Maduranga.`,
    openGraph: {
      title: `${gradeObj.label} Maths Online Class | MathSpark`,
      description: `Complete ${gradeObj.label} Mathematics course covering all units with exam past papers and dedicated WhatsApp support.`,
    },
  };
}

export default function GradeFilteredPage({ params }) {
  const gradeId = parseInt(params.id, 10);
  return <GradeFilteredClient gradeId={gradeId} />;
}
