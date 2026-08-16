import DedicatedGradePage, { generateMetadata as getMeta } from '../grade-[grade]-maths/page';

export async function generateMetadata() {
  return getMeta({ params: { grade: '8' } });
}

export default function Grade8Page() {
  return <DedicatedGradePage params={{ grade: '8' }} />;
}
