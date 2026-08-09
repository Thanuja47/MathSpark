import { GRADES } from '@/lib/data';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://math-spark-tau.vercel.app');

  const staticRoutes = [
    '',
    '/courses',
    '/timetable',
    '/exams',
    '/store',
    '/results',
    '/contact',
    '/instructors',
    '/tracking',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const gradeRoutes = GRADES.map((grade) => ({
    url: `${baseUrl}/grades/${grade.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...gradeRoutes];
}
