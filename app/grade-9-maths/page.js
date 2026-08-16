import DedicatedGradePage, { generateMetadata as getMeta } from '../grade-[grade]-maths/page';

export async function generateMetadata() {
  return getMeta({ params: { grade: '9' } });
}

export default function Grade9Page() {
  return <DedicatedGradePage params={{ grade: '9' }} />;
}
