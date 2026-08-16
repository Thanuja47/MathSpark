import DedicatedGradePage, { generateMetadata as getMeta } from '../grade-[grade]-maths/page';

export async function generateMetadata() {
  return getMeta({ params: { grade: '6' } });
}

export default function Grade6Page() {
  return <DedicatedGradePage params={{ grade: '6' }} />;
}
