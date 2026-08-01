export const courseService = {
  async getAllCourses() {
    try {
      const res = await fetch('/api/courses', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch courses');
      return await res.json();
    } catch (err) {
      console.error('[courseService.getAllCourses]', err);
      return [];
    }
  }
};
