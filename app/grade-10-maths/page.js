import DedicatedGradePage, { generateMetadata as getMeta } from '../grade-[grade]-maths/page';

export async function generateMetadata() {
  return getMeta({ params: { grade: '10' } });
}

export default function Grade10Page() {
  return <DedicatedGradePage params={{ grade: '10' }} />;
}
