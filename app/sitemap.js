import { GRADES } from '@/lib/data';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ishanmaduranga.lk';

  const staticRoutes = [
    '',
    '/about',
    '/classes',
    '/ol-maths',
    '/courses',
    '/timetable',
    '/exams',
    '/store',
    '/results',
    '/contact',
    '/instructors',
    '/faq',
    '/blog',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route === '/ol-maths' || route === '/about' ? 0.9 : 0.8,
  }));

  const gradeCanonicalRoutes = [6, 7, 8, 9, 10, 11].map((g) => ({
    url: `${baseUrl}/grade-${g}-maths`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const gradeRoutes = GRADES.map((grade) => ({
    url: `${baseUrl}/grades/${grade.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...gradeCanonicalRoutes, ...gradeRoutes];
}
