import DedicatedGradePage, { generateMetadata as getMeta } from '../grade-[grade]-maths/page';

export async function generateMetadata() {
  return getMeta({ params: { grade: '11' } });
}

export default function Grade11Page() {
  return <DedicatedGradePage params={{ grade: '11' }} />;
}
