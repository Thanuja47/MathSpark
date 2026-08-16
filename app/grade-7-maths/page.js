import DedicatedGradePage, { generateMetadata as getMeta } from '../grade-[grade]-maths/page';

export async function generateMetadata() {
  return getMeta({ params: { grade: '7' } });
}

export default function Grade7Page() {
  return <DedicatedGradePage params={{ grade: '7' }} />;
}
