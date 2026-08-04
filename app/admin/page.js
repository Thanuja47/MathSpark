'use client';
import { useState, useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { uploadImage } from '@/utils/uploadImage';
import { useLanguage } from '@/context/LanguageContext';

/* ─── tiny helpers ─────────────────────────────────── */
const apiFetch = (url, opts) => fetch(url, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts?.headers || {}) } });

export default function AdminPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('courses');

  /* ════════════════════════════════════════════════════
     COURSES STATE
  ════════════════════════════════════════════════════ */
  const [coursesList, setCoursesList]       = useState([]);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse]   = useState(null);
  const [courseTitle, setCourseTitle]       = useState('');
  const [courseGrade, setCourseGrade]       = useState('10');
  const [courseMedium, setCourseMedium]     = useState('sinhala');
  const [coursePrice, setCoursePrice]       = useState('');
  const [courseBadge, setCourseBadge]       = useState('');
  const [courseDesc, setCourseDesc]         = useState('');
  const [courseImageFile, setCourseImageFile]   = useState(null);
  const [courseImagePreview, setCourseImagePreview] = useState('');
  const [courseUploading, setCourseUploading] = useState(false);
  const [courseMsg, setCourseMsg]           = useState('');

  /* ════════════════════════════════════════════════════
     TIMETABLE STATE
  ════════════════════════════════════════════════════ */
  const [ttList, setTtList]           = useState([]);
  const [showTtForm, setShowTtForm]   = useState(false);
  const [editingTt, setEditingTt]     = useState(null);
  const [ttDay, setTtDay]             = useState('Monday');
  const [ttTime, setTtTime]           = useState('');
  const [ttSubject, setTtSubject]     = useState('');
  const [ttGrade, setTtGrade]         = useState('10');
  const [ttLink, setTtLink]           = useState('');
  const [ttMsg, setTtMsg]             = useState('');

  /* ════════════════════════════════════════════════════
     MCQ EXAMS STATE
  ════════════════════════════════════════════════════ */
  const [examList, setExamList]         = useState([]);
  const [showExamForm, setShowExamForm] = useState(false);
  const [editingExam, setEditingExam]   = useState(null);
  const [examTitle, setExamTitle]       = useState('');
  const [examGrade, setExamGrade]       = useState('10');
  const [examDuration, setExamDuration] = useState('60');
  const [examQuestions, setExamQuestions] = useState('[]');
  const [examMsg, setExamMsg]           = useState('');

  /* ════════════════════════════════════════════════════
     STORE STATE
  ════════════════════════════════════════════════════ */
  const [storeList, setStoreList]         = useState([]);
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [editingStore, setEditingStore]   = useState(null);
  const [storeName, setStoreName]         = useState('');
  const [storeDesc, setStoreDesc]         = useState('');
  const [storePrice, setStorePrice]       = useState('');
  const [storeStock, setStoreStock]       = useState('100');
  const [storeImageFile, setStoreImageFile]     = useState(null);
  const [storeImagePreview, setStoreImagePreview] = useState('');
  const [storeUploading, setStoreUploading] = useState(false);
  const [storeMsg, setStoreMsg]           = useState('');

  /* ════════════════════════════════════════════════════
     RESULTS STATE
  ════════════════════════════════════════════════════ */
  const [resultsList, setResultsList]         = useState([]);
  const [showResultForm, setShowResultForm]   = useState(false);
  const [editingResult, setEditingResult]     = useState(null);
  const [resultStudent, setResultStudent]     = useState('');
  const [resultGrade, setResultGrade]         = useState('10');
  const [resultSubject, setResultSubject]     = useState('');
  const [resultScore, setResultScore]         = useState('');
  const [resultYear, setResultYear]           = useState(String(new Date().getFullYear()));
  const [resultImageFile, setResultImageFile]     = useState(null);
  const [resultImagePreview, setResultImagePreview] = useState('');
  const [resultUploading, setResultUploading] = useState(false);
  const [resultMsg, setResultMsg]             = useState('');

  /* ════════════════════════════════════════════════════
     GRADES STATE
  ════════════════════════════════════════════════════ */
  const [gradesList, setGradesList]         = useState([]);
  const [showGradeForm, setShowGradeForm]   = useState(false);
  const [editingGrade, setEditingGrade]     = useState(null);
  const [gradeName, setGradeName]           = useState('');
  const [gradeDescription, setGradeDescription] = useState('');
  const [gradeMsg, setGradeMsg]             = useState('');

  /* ════════════════════════════════════════════════════
     ORDERS STATE
  ════════════════════════════════════════════════════ */
  const [ordersList, setOrdersList] = useState([]);
  const [orderMsg, setOrderMsg]     = useState('');

  /* ════════════════════════════════════════════════════
     STUDENTS STATE
  ════════════════════════════════════════════════════ */
  const [studentsList, setStudentsList]     = useState([]);
  const [studentSearch, setStudentSearch]   = useState('');
  const [managingStudent, setManagingStudent] = useState(null);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [studentMsg, setStudentMsg]         = useState('');
  const [savingGrades, setSavingGrades]     = useState(false);

  /* ════════════════════════════════════════════════════
     COURSE LESSONS STATE
  ════════════════════════════════════════════════════ */
  const [managingCourseLessons, setManagingCourseLessons] = useState(null);
  const [courseLessonsList, setCourseLessonsList]         = useState([]);
  const [showCourseLessonForm, setShowCourseLessonForm]   = useState(false);
  const [editingCourseLesson, setEditingCourseLesson]     = useState(null);
  const [cLessonTitle, setCLessonTitle]                   = useState('');
  const [cLessonOrder, setCLessonOrder]                   = useState('1');
  const [cLessonDesc, setCLessonDesc]                     = useState('');
  const [cLessonPdfFile, setCLessonPdfFile]               = useState(null);
  const [cLessonPdfUrl, setCLessonPdfUrl]                 = useState('');
  const [cLessonVideoUrl, setCLessonVideoUrl]             = useState('');
  const [cLessonUploading, setCLessonUploading]           = useState(false);
  const [cLessonMsg, setCLessonMsg]                       = useState('');

  /* ════════════════════════════════════════════════════
     INITIAL DATA LOAD
  ════════════════════════════════════════════════════ */
  useEffect(() => {
    fetch('/api/admin/courses').then(r => r.json()).then(d => Array.isArray(d) && setCoursesList(d)).catch(() => {});
    fetch('/api/admin/timetable').then(r => r.json()).then(d => Array.isArray(d) && setTtList(d)).catch(() => {});
    fetch('/api/admin/exams').then(r => r.json()).then(d => Array.isArray(d) && setExamList(d)).catch(() => {});
    fetch('/api/admin/store').then(r => r.json()).then(d => Array.isArray(d) && setStoreList(d)).catch(() => {});
    fetch('/api/admin/results').then(r => r.json()).then(d => Array.isArray(d) && setResultsList(d)).catch(() => {});
    fetch('/api/admin/grades').then(r => r.json()).then(d => Array.isArray(d) && setGradesList(d)).catch(() => {});
    fetch('/api/admin/orders').then(r => r.json()).then(d => d?.orders && Array.isArray(d.orders) && setOrdersList(d.orders)).catch(() => {});
    fetch('/api/admin/students').then(r => r.json()).then(d => d?.students && Array.isArray(d.students) && setStudentsList(d.students)).catch(() => {});
  }, []);


  /* ════════════════════════════════════════════════════
     COURSES CRUD
  ════════════════════════════════════════════════════ */
  const resetCourseForm = () => {
    setEditingCourse(null); setCourseTitle(''); setCourseGrade('10');
    setCourseMedium('sinhala'); setCoursePrice(''); setCourseBadge('');
    setCourseDesc(''); setCourseImageFile(null); setCourseImagePreview('');
    setShowCourseForm(false); setCourseMsg('');
  };

  const editCourse = (c) => {
    setEditingCourse(c.id); setCourseTitle(c.title); setCourseGrade(String(c.grade));
    setCourseMedium(c.medium); setCoursePrice(String(c.price)); setCourseBadge(c.badge || '');
    setCourseDesc(c.description || ''); setCourseImagePreview(c.imageUrl || '');
    setCourseImageFile(null); setShowCourseForm(true); setCourseMsg('');
  };

  const submitCourse = async (e) => {
    e.preventDefault(); setCourseUploading(true);
    try {
      let finalImageUrl = courseImagePreview;
      if (courseImageFile) finalImageUrl = await uploadImage(courseImageFile);
      const payload = { title: courseTitle, grade: courseGrade, medium: courseMedium, price: coursePrice, badge: courseBadge, description: courseDesc, imageUrl: finalImageUrl || null };
      const res = editingCourse
        ? await apiFetch(`/api/admin/courses/${editingCourse}`, { method: 'PUT', body: JSON.stringify(payload) })
        : await apiFetch('/api/admin/courses', { method: 'POST', body: JSON.stringify(payload) });
      const saved = await res.json();
      if (!res.ok) throw new Error(saved.error || 'Failed');
      const refreshed = await fetch('/api/admin/courses').then(r => r.json());
      if (Array.isArray(refreshed)) setCoursesList(refreshed);
      setCourseMsg(editingCourse ? '✅ Course updated!' : '✅ Course created!');
      setTimeout(resetCourseForm, 1200);
    } catch (err) { setCourseMsg(`❌ ${err.message}`); }
    finally { setCourseUploading(false); }
  };

  const deleteCourse = async (id) => {
    if (!confirm('Delete this course?')) return;
    await apiFetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
    setCoursesList(p => p.filter(c => c.id !== id));
  };

  /* ════════════════════════════════════════════════════
     TIMETABLE CRUD
  ════════════════════════════════════════════════════ */
  const resetTtForm = () => {
    setEditingTt(null); setTtDay('Monday'); setTtTime(''); setTtSubject('');
    setTtGrade('10'); setTtLink(''); setShowTtForm(false); setTtMsg('');
  };

  const editTt = (t) => {
    setEditingTt(t.id); setTtDay(t.day); setTtTime(t.time);
    setTtSubject(t.subject); setTtGrade(String(t.grade)); setTtLink(t.liveLink || '');
    setShowTtForm(true); setTtMsg('');
  };

  const submitTt = async (e) => {
    e.preventDefault();
    try {
      const payload = { day: ttDay, time: ttTime, subject: ttSubject, grade: ttGrade, liveLink: ttLink || null };
      const res = editingTt
        ? await apiFetch(`/api/admin/timetable/${editingTt}`, { method: 'PUT', body: JSON.stringify(payload) })
        : await apiFetch('/api/admin/timetable', { method: 'POST', body: JSON.stringify(payload) });
      const saved = await res.json();
      if (!res.ok) throw new Error(saved.error || 'Failed');
      const refreshed = await fetch('/api/admin/timetable').then(r => r.json());
      if (Array.isArray(refreshed)) setTtList(refreshed);
      setTtMsg(editingTt ? '✅ Updated!' : '✅ Added!');
      setTimeout(resetTtForm, 1200);
    } catch (err) { setTtMsg(`❌ ${err.message}`); }
  };

  const deleteTt = async (id) => {
    if (!confirm('Delete this timetable entry?')) return;
    await apiFetch(`/api/admin/timetable/${id}`, { method: 'DELETE' });
    setTtList(p => p.filter(t => t.id !== id));
  };

  /* ════════════════════════════════════════════════════
     EXAMS CRUD
  ════════════════════════════════════════════════════ */
  const resetExamForm = () => {
    setEditingExam(null); setExamTitle(''); setExamGrade('10');
    setExamDuration('60'); setExamQuestions('[]'); setShowExamForm(false); setExamMsg('');
  };

  const editExam = (ex) => {
    setEditingExam(ex.id); setExamTitle(ex.title); setExamGrade(String(ex.grade));
    setExamDuration(String(ex.duration)); setExamQuestions(ex.questions || '[]');
    setShowExamForm(true); setExamMsg('');
  };

  const submitExam = async (e) => {
    e.preventDefault();
    try {
      JSON.parse(examQuestions); // validate JSON
    } catch { setExamMsg('❌ Questions must be valid JSON'); return; }
    try {
      const payload = { title: examTitle, grade: examGrade, duration: examDuration, questions: examQuestions };
      const res = editingExam
        ? await apiFetch(`/api/admin/exams/${editingExam}`, { method: 'PUT', body: JSON.stringify(payload) })
        : await apiFetch('/api/admin/exams', { method: 'POST', body: JSON.stringify(payload) });
      const saved = await res.json();
      if (!res.ok) throw new Error(saved.error || 'Failed');
      const refreshed = await fetch('/api/admin/exams').then(r => r.json());
      if (Array.isArray(refreshed)) setExamList(refreshed);
      setExamMsg(editingExam ? '✅ Updated!' : '✅ Created!');
      setTimeout(resetExamForm, 1200);
    } catch (err) { setExamMsg(`❌ ${err.message}`); }
  };

  const deleteExam = async (id) => {
    if (!confirm('Delete this exam?')) return;
    await apiFetch(`/api/admin/exams/${id}`, { method: 'DELETE' });
    setExamList(p => p.filter(ex => ex.id !== id));
  };

  /* ════════════════════════════════════════════════════
     STORE CRUD
  ════════════════════════════════════════════════════ */
  const resetStoreForm = () => {
    setEditingStore(null); setStoreName(''); setStoreDesc(''); setStorePrice('');
    setStoreStock('100'); setStoreImageFile(null); setStoreImagePreview('');
    setShowStoreForm(false); setStoreMsg('');
  };

  const editStore = (s) => {
    setEditingStore(s.id); setStoreName(s.name); setStoreDesc(s.description || '');
    setStorePrice(String(s.price)); setStoreStock(String(s.stock));
    setStoreImagePreview(s.imageUrl || ''); setStoreImageFile(null);
    setShowStoreForm(true); setStoreMsg('');
  };

  const submitStore = async (e) => {
    e.preventDefault(); setStoreUploading(true);
    try {
      let finalImageUrl = storeImagePreview;
      if (storeImageFile) finalImageUrl = await uploadImage(storeImageFile);
      const payload = { name: storeName, description: storeDesc, price: storePrice, stock: storeStock, imageUrl: finalImageUrl || null };
      const res = editingStore
        ? await apiFetch(`/api/admin/store/${editingStore}`, { method: 'PUT', body: JSON.stringify(payload) })
        : await apiFetch('/api/admin/store', { method: 'POST', body: JSON.stringify(payload) });
      const saved = await res.json();
      if (!res.ok) throw new Error(saved.error || 'Failed');
      const refreshed = await fetch('/api/admin/store').then(r => r.json());
      if (Array.isArray(refreshed)) setStoreList(refreshed);
      setStoreMsg(editingStore ? '✅ Updated!' : '✅ Created!');
      setTimeout(resetStoreForm, 1200);
    } catch (err) { setStoreMsg(`❌ ${err.message}`); }
    finally { setStoreUploading(false); }
  };

  const deleteStore = async (id) => {
    if (!confirm('Delete this item?')) return;
    await apiFetch(`/api/admin/store/${id}`, { method: 'DELETE' });
    setStoreList(p => p.filter(s => s.id !== id));
  };

  /* ════════════════════════════════════════════════════
     RESULTS CRUD
  ════════════════════════════════════════════════════ */
  const resetResultForm = () => {
    setEditingResult(null); setResultStudent(''); setResultGrade('10');
    setResultSubject(''); setResultScore(''); setResultYear(String(new Date().getFullYear()));
    setResultImageFile(null); setResultImagePreview(''); setShowResultForm(false); setResultMsg('');
  };

  const editResult = (r) => {
    setEditingResult(r.id); setResultStudent(r.studentName); setResultGrade(String(r.grade));
    setResultSubject(r.subject); setResultScore(String(r.score)); setResultYear(String(r.year));
    setResultImagePreview(r.imageUrl || ''); setResultImageFile(null);
    setShowResultForm(true); setResultMsg('');
  };

  const submitResult = async (e) => {
    e.preventDefault(); setResultUploading(true);
    try {
      let finalImageUrl = resultImagePreview;
      if (resultImageFile) finalImageUrl = await uploadImage(resultImageFile);
      const payload = { studentName: resultStudent, grade: resultGrade, subject: resultSubject, score: resultScore, year: resultYear, imageUrl: finalImageUrl || null };
      const res = editingResult
        ? await apiFetch(`/api/admin/results/${editingResult}`, { method: 'PUT', body: JSON.stringify(payload) })
        : await apiFetch('/api/admin/results', { method: 'POST', body: JSON.stringify(payload) });
      const saved = await res.json();
      if (!res.ok) throw new Error(saved.error || 'Failed');
      const refreshed = await fetch('/api/admin/results').then(r => r.json());
      if (Array.isArray(refreshed)) setResultsList(refreshed);
      setResultMsg(editingResult ? '✅ Updated!' : '✅ Created!');
      setTimeout(resetResultForm, 1200);
    } catch (err) { setResultMsg(`❌ ${err.message}`); }
    finally { setResultUploading(false); }
  };

  const deleteResult = async (id) => {
    if (!confirm('Delete this result?')) return;
    await apiFetch(`/api/admin/results/${id}`, { method: 'DELETE' });
    setResultsList(p => p.filter(r => r.id !== id));
  };

  /* ════════════════════════════════════════════════════
     GRADES CRUD
  ════════════════════════════════════════════════════ */
  const resetGradeForm = () => {
    setEditingGrade(null); setGradeName(''); setGradeDescription('');
    setShowGradeForm(false); setGradeMsg('');
  };

  const editGrade = (g) => {
    setEditingGrade(g.id); setGradeName(g.name); setGradeDescription(g.description || '');
    setShowGradeForm(true); setGradeMsg('');
  };

  const submitGrade = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: gradeName, description: gradeDescription };
      const res = editingGrade
        ? await apiFetch(`/api/admin/grades/${editingGrade}`, { method: 'PUT', body: JSON.stringify(payload) })
        : await apiFetch('/api/admin/grades', { method: 'POST', body: JSON.stringify(payload) });
      const saved = await res.json();
      if (!res.ok) throw new Error(saved.error || 'Failed');
      const refreshed = await fetch('/api/admin/grades').then(r => r.json());
      if (Array.isArray(refreshed)) setGradesList(refreshed);
      setGradeMsg(editingGrade ? '✅ Updated!' : '✅ Created!');
      setTimeout(resetGradeForm, 1200);
    } catch (err) { setGradeMsg(`❌ ${err.message}`); }
  };

  const deleteGrade = async (id) => {
    if (!confirm('Delete this grade?')) return;
    await apiFetch(`/api/admin/grades/${id}`, { method: 'DELETE' });
    setGradesList(p => p.filter(g => g.id !== id));
  };

  /* ════════════════════════════════════════════════════
     ORDERS CRUD
  ════════════════════════════════════════════════════ */
  const updateOrderStatus = async (id, newStatus) => {
    try {
      const res = await apiFetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setOrdersList(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      setOrderMsg('✅ Order status updated!');
      setTimeout(() => setOrderMsg(''), 2000);
    } catch (err) {
      setOrderMsg(`❌ ${err.message}`);
    }
  };

  const deleteOrder = async (id) => {
    if (!confirm('Delete this order record?')) return;
    await apiFetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
    setOrdersList(prev => prev.filter(o => o.id !== id));
  };

  /* ════════════════════════════════════════════════════
     STUDENTS MANAGING
  ════════════════════════════════════════════════════ */
  const openStudentModal = (student) => {
    setManagingStudent(student);
    setSelectedGrades(student.approvedGrades || []);
    setStudentMsg('');
  };

  const toggleGradeSelection = (g) => {
    const numG = Number(g);
    setSelectedGrades(prev =>
      prev.includes(numG) ? prev.filter(x => x !== numG) : [...prev, numG]
    );
  };

  const saveStudentGrades = async () => {
    if (!managingStudent) return;
    setSavingGrades(true);
    setStudentMsg('');
    try {
      const res = await apiFetch(`/api/admin/students/${managingStudent.id}/grades`, {
        method: 'PUT',
        body: JSON.stringify({ gradeIds: selectedGrades }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update access');
      
      setStudentsList(prev => prev.map(s => s.id === managingStudent.id ? { ...s, approvedGrades: data.approvedGrades } : s));
      setStudentMsg('✅ Grade access updated successfully!');
      setTimeout(() => {
        setManagingStudent(null);
        setStudentMsg('');
      }, 1000);
    } catch (err) {
      setStudentMsg(`❌ ${err.message}`);
    } finally {
      setSavingGrades(false);
    }
  };

  const filteredStudents = studentsList.filter(s => {
    const q = studentSearch.toLowerCase().trim();
    if (!q) return true;
    return s.name.toLowerCase().includes(q) || s.phone.includes(q);
  });

  /* ════════════════════════════════════════════════════
     COURSE LESSONS MANAGING
  ════════════════════════════════════════════════════ */
  const openCourseLessonsModal = async (course) => {
    setManagingCourseLessons(course);
    resetCourseLessonForm();
    try {
      const res = await fetch(`/api/admin/courses/${course.id}/lessons`);
      const data = await res.json();
      if (data.success && Array.isArray(data.lessons)) {
        setCourseLessonsList(data.lessons);
        setCLessonOrder(String(data.lessons.length + 1));
      }
    } catch (err) {
      console.error('Failed to load course lessons', err);
    }
  };

  const resetCourseLessonForm = () => {
    setEditingCourseLesson(null);
    setCLessonTitle('');
    setCLessonOrder('1');
    setCLessonDesc('');
    setCLessonPdfFile(null);
    setCLessonPdfUrl('');
    setCLessonVideoUrl('');
    setShowCourseLessonForm(false);
    setCLessonMsg('');
  };

  const editCourseLesson = (les) => {
    setEditingCourseLesson(les.id);
    setCLessonTitle(les.title);
    setCLessonOrder(String(les.order || 1));
    setCLessonDesc(les.description || '');
    setCLessonPdfUrl(les.pdfUrl || '');
    setCLessonVideoUrl(les.videoUrl || '');
    setCLessonPdfFile(null);
    setShowCourseLessonForm(true);
    setCLessonMsg('');
  };

  const submitCourseLesson = async (e) => {
    e.preventDefault();
    if (!managingCourseLessons) return;
    setCLessonUploading(true);
    try {
      let finalPdfUrl = cLessonPdfUrl;
      if (cLessonPdfFile) {
        finalPdfUrl = await uploadImage(cLessonPdfFile);
      }
      const payload = {
        title: cLessonTitle,
        order: Number(cLessonOrder || 0),
        description: cLessonDesc || null,
        pdfUrl: finalPdfUrl || null,
        videoUrl: cLessonVideoUrl || null,
      };

      const res = editingCourseLesson
        ? await apiFetch(`/api/admin/courses/${managingCourseLessons.id}/lessons/${editingCourseLesson}`, { method: 'PUT', body: JSON.stringify(payload) })
        : await apiFetch(`/api/admin/courses/${managingCourseLessons.id}/lessons`, { method: 'POST', body: JSON.stringify(payload) });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      const refreshed = await fetch(`/api/admin/courses/${managingCourseLessons.id}/lessons`).then(r => r.json());
      if (refreshed.success && Array.isArray(refreshed.lessons)) {
        setCourseLessonsList(refreshed.lessons);
      }
      setCLessonMsg(editingCourseLesson ? '✅ Lesson updated!' : '✅ Lesson added!');
      setTimeout(resetCourseLessonForm, 1000);
    } catch (err) {
      setCLessonMsg(`❌ ${err.message}`);
    } finally {
      setCLessonUploading(false);
    }
  };

  const deleteCourseLesson = async (lessonId) => {
    if (!confirm('Delete this lesson?')) return;
    try {
      await apiFetch(`/api/admin/courses/${managingCourseLessons.id}/lessons/${lessonId}`, { method: 'DELETE' });
      setCourseLessonsList(prev => prev.filter(l => l.id !== lessonId));
    } catch (err) {
      alert(`Failed to delete lesson: ${err.message}`);
    }
  };

  /* ════════════════════════════════════════════════════
     NAV TABS CONFIG
  ════════════════════════════════════════════════════ */
  const tabs = [
    { key: 'students',  label: `👥 ${t('admin.tabStudents')}`,   count: studentsList.length },
    { key: 'courses',   label: `📚 ${t('admin.tabCourses')}`,    count: coursesList.length },
    { key: 'timetable', label: `📅 ${t('admin.tabTimetable')}`,  count: ttList.length },
    { key: 'exams',     label: `📝 ${t('admin.tabExams')}`,      count: examList.length },
    { key: 'store',     label: `🛒 ${t('admin.tabStore')}`,      count: storeList.length },
    { key: 'orders',    label: `📦 ${t('admin.tabOrders')}`,     count: ordersList.length },
    { key: 'results',   label: `🏆 ${t('admin.tabResults')}`,    count: resultsList.length },
    { key: 'grades',    label: `🎓 ${t('admin.tabGrades')}`,     count: gradesList.length },
  ];


  /* ════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════ */
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="page-hero" style={{ padding: '40px 0 30px', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <span className="badge badge-accent" style={{ marginBottom: 8 }}>ADMIN CONTROL PANEL</span>
            <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', marginBottom: 8 }}>MathSpark Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage all content — Courses, Timetable, MCQ Tests, Store, Results & Grades</p>
          </div>
        </section>

        {/* Main Grid */}
        <section className="section-sm">
          <div className="container">
            <div className="admin-grid">

              {/* Sidebar Nav */}
              <div className="admin-sidebar">
                {tabs.map(t => (
                  <button key={t.key}
                    className={`admin-nav-item ${activeTab === t.key ? 'active' : ''}`}
                    onClick={() => setActiveTab(t.key)}
                  >
                    {t.label} <span className="admin-nav-count">{t.count}</span>
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="admin-content">

                {/* ── STUDENTS TAB ── */}
                {activeTab === 'students' && (
                  <div>
                    <div className="tab-header" style={{ marginBottom: 20 }}>
                      <div>
                        <h3 style={{ margin: 0 }}>Student Grade Access</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                          Search students and manage which Grade contents (G6–G11) they are authorized to access.
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="🔍 Search students by name or phone number..."
                        value={studentSearch}
                        onChange={e => setStudentSearch(e.target.value)}
                        style={{ maxWidth: 400 }}
                      />
                    </div>

                    {filteredStudents.length === 0 ? (
                      <div className="admin-empty-box">No students found matching your query.</div>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Student Name</th>
                            <th>Phone</th>
                            <th>Reg. Date</th>
                            <th>Approved Grade Access</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredStudents.map(student => (
                            <tr key={student.id}>
                              <td style={{ fontWeight: 600 }}>{student.name}</td>
                              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{student.phone}</td>
                              <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {new Date(student.createdAt).toLocaleDateString()}
                              </td>
                              <td>
                                {(!student.approvedGrades || student.approvedGrades.length === 0) ? (
                                  <span className="badge badge-accent" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                                    No Access Granted
                                  </span>
                                ) : (
                                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    {student.approvedGrades.sort((a,b)=>a-b).map(g => (
                                      <span key={g} className="badge badge-green" style={{ fontSize: '0.75rem' }}>
                                        Grade {g}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </td>
                              <td>
                                <button
                                  className="btn btn-outline btn-sm"
                                  onClick={() => openStudentModal(student)}
                                >
                                  ⚙️ Manage Access
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* ── COURSES TAB ── */}
                {activeTab === 'courses' && (
                  <div>
                    <div className="tab-header">
                      <h3>Course Management</h3>
                      <button className="btn btn-primary btn-sm" onClick={() => showCourseForm ? resetCourseForm() : setShowCourseForm(true)}>
                        {showCourseForm ? 'Cancel' : '+ Add Course'}
                      </button>
                    </div>
                    {showCourseForm && (
                      <form onSubmit={submitCourse} className="admin-form-box">
                        <h4>{editingCourse ? 'Edit Course' : 'New Course'}</h4>
                        {courseMsg && <p className="form-msg">{courseMsg}</p>}
                        <div className="form-group"><label className="form-label">Title</label>
                          <input className="form-input" value={courseTitle} onChange={e => setCourseTitle(e.target.value)} placeholder="e.g. Grade 10 Maths Revision" required />
                        </div>
                        <div className="form-row-3">
                          <div className="form-group"><label className="form-label">Grade</label>
                            <select className="form-input" value={courseGrade} onChange={e => setCourseGrade(e.target.value)}>
                              {[6,7,8,9,10,11,12,13].map(g => <option key={g}>{g}</option>)}
                            </select>
                          </div>
                          <div className="form-group"><label className="form-label">Medium</label>
                            <select className="form-input" value={courseMedium} onChange={e => setCourseMedium(e.target.value)}>
                              <option value="sinhala">Sinhala</option>
                              <option value="english">English</option>
                              <option value="tamil">Tamil</option>
                            </select>
                          </div>
                          <div className="form-group"><label className="form-label">Price (LKR)</label>
                            <input className="form-input" type="number" value={coursePrice} onChange={e => setCoursePrice(e.target.value)} placeholder="2500" required />
                          </div>
                        </div>
                        <div className="form-group"><label className="form-label">Badge (optional)</label>
                          <input className="form-input" value={courseBadge} onChange={e => setCourseBadge(e.target.value)} placeholder="e.g. NEW · POPULAR" />
                        </div>
                        <div className="form-group"><label className="form-label">Description</label>
                          <textarea className="form-input" rows={3} value={courseDesc} onChange={e => setCourseDesc(e.target.value)} />
                        </div>
                        <div className="form-group"><label className="form-label">Course Image</label>
                          <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if (f) { setCourseImageFile(f); setCourseImagePreview(URL.createObjectURL(f)); } }} />
                          {courseImagePreview && <img src={courseImagePreview} alt="preview" className="img-preview" />}
                        </div>
                        <button className="btn btn-primary" type="submit" disabled={courseUploading}>
                          {courseUploading ? 'Uploading…' : editingCourse ? 'Update Course' : 'Create Course'}
                        </button>
                      </form>
                    )}
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead><tr><th>Image</th><th>Title</th><th>Grade</th><th>Medium</th><th>Price</th><th>Actions</th></tr></thead>
                        <tbody>
                          {coursesList.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No courses yet. Add one above.</td></tr>}
                          {coursesList.map(c => (
                            <tr key={c.id}>
                              <td>{c.imageUrl ? <img src={c.imageUrl} alt={c.title} style={{ width: 50, height: 40, objectFit: 'cover', borderRadius: 6 }} /> : '—'}</td>
                              <td><strong>{c.title}</strong>{c.badge && <span className="badge badge-sm" style={{ marginLeft: 6 }}>{c.badge}</span>}</td>
                              <td>Grade {c.grade}</td>
                              <td style={{ textTransform: 'capitalize' }}>{c.medium}</td>
                              <td>LKR {Number(c.price).toLocaleString()}</td>
                              <td>
                                <button className="btn btn-sm btn-outline" style={{ marginRight: 6 }} onClick={() => openCourseLessonsModal(c)}>📖 Manage Lessons</button>
                                <button className="btn btn-sm btn-outline" style={{ marginRight: 6 }} onClick={() => editCourse(c)}>Edit</button>
                                <button className="btn btn-sm" style={{ background: '#ef4444', color: '#fff' }} onClick={() => deleteCourse(c.id)}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── TIMETABLE TAB ── */}
                {activeTab === 'timetable' && (
                  <div>
                    <div className="tab-header">
                      <h3>Timetable Management</h3>
                      <button className="btn btn-primary btn-sm" onClick={() => showTtForm ? resetTtForm() : setShowTtForm(true)}>
                        {showTtForm ? 'Cancel' : '+ Add Entry'}
                      </button>
                    </div>
                    {showTtForm && (
                      <form onSubmit={submitTt} className="admin-form-box">
                        <h4>{editingTt ? 'Edit Timetable Entry' : 'New Timetable Entry'}</h4>
                        {ttMsg && <p className="form-msg">{ttMsg}</p>}
                        <div className="form-row-3">
                          <div className="form-group"><label className="form-label">Day</label>
                            <select className="form-input" value={ttDay} onChange={e => setTtDay(e.target.value)}>
                              {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => <option key={d}>{d}</option>)}
                            </select>
                          </div>
                          <div className="form-group"><label className="form-label">Time</label>
                            <input className="form-input" value={ttTime} onChange={e => setTtTime(e.target.value)} placeholder="e.g. 4:00 PM" required />
                          </div>
                          <div className="form-group"><label className="form-label">Grade</label>
                            <select className="form-input" value={ttGrade} onChange={e => setTtGrade(e.target.value)}>
                              {[6,7,8,9,10,11,12,13].map(g => <option key={g}>{g}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="form-group"><label className="form-label">Subject</label>
                          <input className="form-input" value={ttSubject} onChange={e => setTtSubject(e.target.value)} placeholder="e.g. Mathematics" required />
                        </div>
                        <div className="form-group"><label className="form-label">Live Link (optional)</label>
                          <input className="form-input" value={ttLink} onChange={e => setTtLink(e.target.value)} placeholder="https://zoom.us/..." />
                        </div>
                        <button className="btn btn-primary" type="submit">{editingTt ? 'Update Entry' : 'Add Entry'}</button>
                      </form>
                    )}
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead><tr><th>Day</th><th>Time</th><th>Subject</th><th>Grade</th><th>Live Link</th><th>Actions</th></tr></thead>
                        <tbody>
                          {ttList.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No timetable entries yet.</td></tr>}
                          {ttList.map(t => (
                            <tr key={t.id}>
                              <td>{t.day}</td><td>{t.time}</td><td>{t.subject}</td><td>Grade {t.grade}</td>
                              <td>{t.liveLink ? <a href={t.liveLink} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>Join</a> : '—'}</td>
                              <td>
                                <button className="btn btn-sm btn-outline" style={{ marginRight: 6 }} onClick={() => editTt(t)}>Edit</button>
                                <button className="btn btn-sm" style={{ background: '#ef4444', color: '#fff' }} onClick={() => deleteTt(t.id)}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── MCQ EXAMS TAB ── */}
                {activeTab === 'exams' && (
                  <div>
                    <div className="tab-header">
                      <h3>MCQ Test Management</h3>
                      <button className="btn btn-primary btn-sm" onClick={() => showExamForm ? resetExamForm() : setShowExamForm(true)}>
                        {showExamForm ? 'Cancel' : '+ Add Test'}
                      </button>
                    </div>
                    {showExamForm && (
                      <form onSubmit={submitExam} className="admin-form-box">
                        <h4>{editingExam ? 'Edit MCQ Test' : 'New MCQ Test'}</h4>
                        {examMsg && <p className="form-msg">{examMsg}</p>}
                        <div className="form-group"><label className="form-label">Test Title</label>
                          <input className="form-input" value={examTitle} onChange={e => setExamTitle(e.target.value)} placeholder="e.g. Grade 10 Mid-Year MCQ 2025" required />
                        </div>
                        <div className="form-row-3">
                          <div className="form-group"><label className="form-label">Grade</label>
                            <select className="form-input" value={examGrade} onChange={e => setExamGrade(e.target.value)}>
                              {[6,7,8,9,10,11,12,13].map(g => <option key={g}>{g}</option>)}
                            </select>
                          </div>
                          <div className="form-group"><label className="form-label">Duration (min)</label>
                            <input className="form-input" type="number" value={examDuration} onChange={e => setExamDuration(e.target.value)} required />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Questions (JSON array)</label>
                          <textarea className="form-input" rows={6} value={examQuestions} onChange={e => setExamQuestions(e.target.value)}
                            placeholder={'[\n  { "q": "What is 2+2?", "options": ["3","4","5","6"], "answer": 1 }\n]'} style={{ fontFamily: 'monospace', fontSize: 12 }} />
                          <small style={{ color: 'var(--text-muted)' }}>Format: Array of {"{ q, options[], answer (0-indexed) }"}</small>
                        </div>
                        <button className="btn btn-primary" type="submit">{editingExam ? 'Update Test' : 'Create Test'}</button>
                      </form>
                    )}
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead><tr><th>Title</th><th>Grade</th><th>Duration</th><th>Questions</th><th>Actions</th></tr></thead>
                        <tbody>
                          {examList.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No MCQ tests yet.</td></tr>}
                          {examList.map(ex => {
                            let qCount = 0;
                            try { qCount = JSON.parse(ex.questions || '[]').length; } catch {}
                            return (
                              <tr key={ex.id}>
                                <td><strong>{ex.title}</strong></td>
                                <td>Grade {ex.grade}</td>
                                <td>{ex.duration} min</td>
                                <td>{qCount} questions</td>
                                <td>
                                  <button className="btn btn-sm btn-outline" style={{ marginRight: 6 }} onClick={() => editExam(ex)}>Edit</button>
                                  <button className="btn btn-sm" style={{ background: '#ef4444', color: '#fff' }} onClick={() => deleteExam(ex.id)}>Delete</button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── STORE TAB ── */}
                {activeTab === 'store' && (
                  <div>
                    <div className="tab-header">
                      <h3>Store Item Management</h3>
                      <button className="btn btn-primary btn-sm" onClick={() => showStoreForm ? resetStoreForm() : setShowStoreForm(true)}>
                        {showStoreForm ? 'Cancel' : '+ Add Item'}
                      </button>
                    </div>
                    {showStoreForm && (
                      <form onSubmit={submitStore} className="admin-form-box">
                        <h4>{editingStore ? 'Edit Store Item' : 'New Store Item'}</h4>
                        {storeMsg && <p className="form-msg">{storeMsg}</p>}
                        <div className="form-group"><label className="form-label">Item Name</label>
                          <input className="form-input" value={storeName} onChange={e => setStoreName(e.target.value)} placeholder="e.g. Grade 10 Revision Guide" required />
                        </div>
                        <div className="form-group"><label className="form-label">Description</label>
                          <textarea className="form-input" rows={2} value={storeDesc} onChange={e => setStoreDesc(e.target.value)} />
                        </div>
                        <div className="form-row-3">
                          <div className="form-group"><label className="form-label">Price (LKR)</label>
                            <input className="form-input" type="number" value={storePrice} onChange={e => setStorePrice(e.target.value)} required />
                          </div>
                          <div className="form-group"><label className="form-label">Stock</label>
                            <input className="form-input" type="number" value={storeStock} onChange={e => setStoreStock(e.target.value)} required />
                          </div>
                        </div>
                        <div className="form-group"><label className="form-label">Item Image</label>
                          <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if (f) { setStoreImageFile(f); setStoreImagePreview(URL.createObjectURL(f)); } }} />
                          {storeImagePreview && <img src={storeImagePreview} alt="preview" className="img-preview" />}
                        </div>
                        <button className="btn btn-primary" type="submit" disabled={storeUploading}>
                          {storeUploading ? 'Uploading…' : editingStore ? 'Update Item' : 'Create Item'}
                        </button>
                      </form>
                    )}
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
                        <tbody>
                          {storeList.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No store items yet.</td></tr>}
                          {storeList.map(s => (
                            <tr key={s.id}>
                              <td>{s.imageUrl ? <img src={s.imageUrl} alt={s.name} style={{ width: 50, height: 40, objectFit: 'cover', borderRadius: 6 }} /> : '—'}</td>
                              <td><strong>{s.name}</strong><br /><small style={{ color: 'var(--text-muted)' }}>{s.description?.slice(0,50)}</small></td>
                              <td>LKR {Number(s.price).toLocaleString()}</td>
                              <td>{s.stock}</td>
                              <td>
                                <button className="btn btn-sm btn-outline" style={{ marginRight: 6 }} onClick={() => editStore(s)}>Edit</button>
                                <button className="btn btn-sm" style={{ background: '#ef4444', color: '#fff' }} onClick={() => deleteStore(s.id)}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── ORDERS TAB ── */}
                {activeTab === 'orders' && (
                  <div>
                    <div className="tab-header">
                      <h3>Store Orders Management</h3>
                    </div>
                    {orderMsg && <p className="form-msg" style={{ marginBottom: 16 }}>{orderMsg}</p>}
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Student Name</th>
                            <th>Phone</th>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordersList.length === 0 && (
                            <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No orders placed yet.</td></tr>
                          )}
                          {ordersList.map(o => {
                            const cleanPhone = o.phone ? o.phone.replace(/[^0-9]/g, '') : '';
                            const formattedPhone = cleanPhone.startsWith('0') ? '94' + cleanPhone.slice(1) : cleanPhone;
                            const waText = encodeURIComponent(`Hi ${o.studentName}, thanks for ordering ${o.itemName} (LKR ${Number(o.totalPrice).toLocaleString()}) from MathSpark! Please transfer to [Bank Details: Commercial Bank 123456789] and reply with your payment slip to confirm.`);
                            const waUrl = `https://wa.me/${formattedPhone}?text=${waText}`;

                            return (
                              <tr key={o.id}>
                                <td><strong>{o.studentName}</strong></td>
                                <td><a href={`tel:${o.phone}`} style={{ color: 'var(--cobalt-light)' }}>{o.phone}</a></td>
                                <td>{o.itemName}</td>
                                <td>{o.quantity}</td>
                                <td><strong>LKR {Number(o.totalPrice).toLocaleString()}</strong></td>
                                <td>
                                  <select
                                    className="form-input"
                                    style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto' }}
                                    value={o.status}
                                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Delivered">Delivered</option>
                                  </select>
                                </td>
                                <td><small style={{ color: 'var(--text-muted)' }}>{new Date(o.createdAt).toLocaleDateString()}</small></td>
                                <td>
                                  <div style={{ display: 'flex', gap: 6 }}>
                                    <a
                                      href={waUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="btn btn-sm"
                                      style={{ background: '#10B981', color: '#fff', fontSize: '0.75rem', textDecoration: 'none' }}
                                    >
                                      Contact on WhatsApp 💬
                                    </a>
                                    <button
                                      className="btn btn-sm"
                                      style={{ background: '#ef4444', color: '#fff' }}
                                      onClick={() => deleteOrder(o.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── RESULTS TAB ── */}

                {activeTab === 'results' && (
                  <div>
                    <div className="tab-header">
                      <h3>Results Management</h3>
                      <button className="btn btn-primary btn-sm" onClick={() => showResultForm ? resetResultForm() : setShowResultForm(true)}>
                        {showResultForm ? 'Cancel' : '+ Add Result'}
                      </button>
                    </div>
                    {showResultForm && (
                      <form onSubmit={submitResult} className="admin-form-box">
                        <h4>{editingResult ? 'Edit Result' : 'New Result'}</h4>
                        {resultMsg && <p className="form-msg">{resultMsg}</p>}
                        <div className="form-group"><label className="form-label">Student Name</label>
                          <input className="form-input" value={resultStudent} onChange={e => setResultStudent(e.target.value)} placeholder="e.g. Kasun Perera" required />
                        </div>
                        <div className="form-row-3">
                          <div className="form-group"><label className="form-label">Grade</label>
                            <select className="form-input" value={resultGrade} onChange={e => setResultGrade(e.target.value)}>
                              {[6,7,8,9,10,11,12,13].map(g => <option key={g}>{g}</option>)}
                            </select>
                          </div>
                          <div className="form-group"><label className="form-label">Subject</label>
                            <input className="form-input" value={resultSubject} onChange={e => setResultSubject(e.target.value)} placeholder="Mathematics" required />
                          </div>
                          <div className="form-group"><label className="form-label">Score (%)</label>
                            <input className="form-input" type="number" min="0" max="100" value={resultScore} onChange={e => setResultScore(e.target.value)} required />
                          </div>
                        </div>
                        <div className="form-group"><label className="form-label">Year</label>
                          <input className="form-input" type="number" value={resultYear} onChange={e => setResultYear(e.target.value)} required />
                        </div>
                        <div className="form-group"><label className="form-label">Result Image (optional)</label>
                          <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if (f) { setResultImageFile(f); setResultImagePreview(URL.createObjectURL(f)); } }} />
                          {resultImagePreview && <img src={resultImagePreview} alt="preview" className="img-preview" />}
                        </div>
                        <button className="btn btn-primary" type="submit" disabled={resultUploading}>
                          {resultUploading ? 'Uploading…' : editingResult ? 'Update Result' : 'Add Result'}
                        </button>
                      </form>
                    )}
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead><tr><th>Image</th><th>Student</th><th>Grade</th><th>Subject</th><th>Score</th><th>Year</th><th>Actions</th></tr></thead>
                        <tbody>
                          {resultsList.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No results yet.</td></tr>}
                          {resultsList.map(r => (
                            <tr key={r.id}>
                              <td>{r.imageUrl ? <img src={r.imageUrl} alt={r.studentName} style={{ width: 50, height: 40, objectFit: 'cover', borderRadius: 6 }} /> : '—'}</td>
                              <td><strong>{r.studentName}</strong></td>
                              <td>Grade {r.grade}</td>
                              <td>{r.subject}</td>
                              <td><span className={`badge ${r.score >= 75 ? 'badge-success' : r.score >= 50 ? 'badge-warning' : 'badge-danger'}`}>{r.score}%</span></td>
                              <td>{r.year}</td>
                              <td>
                                <button className="btn btn-sm btn-outline" style={{ marginRight: 6 }} onClick={() => editResult(r)}>Edit</button>
                                <button className="btn btn-sm" style={{ background: '#ef4444', color: '#fff' }} onClick={() => deleteResult(r.id)}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── GRADES TAB ── */}
                {activeTab === 'grades' && (
                  <div>
                    <div className="tab-header">
                      <h3>Grade Management</h3>
                      <button className="btn btn-primary btn-sm" onClick={() => showGradeForm ? resetGradeForm() : setShowGradeForm(true)}>
                        {showGradeForm ? 'Cancel' : '+ Add Grade'}
                      </button>
                    </div>
                    {showGradeForm && (
                      <form onSubmit={submitGrade} className="admin-form-box">
                        <h4>{editingGrade ? 'Edit Grade' : 'New Grade'}</h4>
                        {gradeMsg && <p className="form-msg">{gradeMsg}</p>}
                        <div className="form-group"><label className="form-label">Grade Name</label>
                          <input className="form-input" value={gradeName} onChange={e => setGradeName(e.target.value)} placeholder="e.g. Grade 10" required />
                        </div>
                        <div className="form-group"><label className="form-label">Description (optional)</label>
                          <textarea className="form-input" rows={2} value={gradeDescription} onChange={e => setGradeDescription(e.target.value)} placeholder="e.g. O/L level students" />
                        </div>
                        <button className="btn btn-primary" type="submit">{editingGrade ? 'Update Grade' : 'Create Grade'}</button>
                      </form>
                    )}
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead><tr><th>Grade Name</th><th>Description</th><th>Actions</th></tr></thead>
                        <tbody>
                          {gradesList.length === 0 && <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No grades yet. Add one above.</td></tr>}
                          {gradesList.map(g => (
                            <tr key={g.id}>
                              <td><strong>{g.name}</strong></td>
                              <td style={{ color: 'var(--text-muted)' }}>{g.description || '—'}</td>
                              <td>
                                <button className="btn btn-sm btn-outline" style={{ marginRight: 6 }} onClick={() => editGrade(g)}>Edit</button>
                                <button className="btn btn-sm" style={{ background: '#ef4444', color: '#fff' }} onClick={() => deleteGrade(g.id)}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>{/* /admin-content */}
            </div>{/* /admin-grid */}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      {/* ── Manage Student Grade Access Modal ── */}
      {managingStudent && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setManagingStudent(null)}
        >
          <div
            style={{
              background: '#181a20',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16,
              padding: '28px 24px',
              maxWidth: 480,
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>Manage Grade Access</h3>
              <button
                onClick={() => setManagingStudent(null)}
                style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: 20, padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{managingStudent.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phone: {managingStudent.phone}</div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', marginBottom: 14 }}>
              Select which grades this student is approved to access:
            </p>

            {studentMsg && (
              <div style={{ marginBottom: 16, padding: '8px 12px', borderRadius: 6, fontSize: '0.85rem', background: studentMsg.startsWith('✅') ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: studentMsg.startsWith('✅') ? '#4ade80' : '#f87171' }}>
                {studentMsg}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
              {[6, 7, 8, 9, 10, 11].map(gradeNum => {
                const checked = selectedGrades.includes(gradeNum);
                return (
                  <label
                    key={gradeNum}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: checked ? '1px solid var(--cobalt)' : '1px solid rgba(255,255,255,0.08)',
                      background: checked ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255,255,255,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleGradeSelection(gradeNum)}
                      style={{ width: 16, height: 16, accentColor: 'var(--cobalt)', cursor: 'pointer' }}
                    />
                    <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>
                      Grade {gradeNum}
                    </span>
                  </label>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                className="btn btn-outline"
                onClick={() => setManagingStudent(null)}
                disabled={savingGrades}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={saveStudentGrades}
                disabled={savingGrades}
              >
                {savingGrades ? 'Saving...' : '💾 Save Access'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Manage Course Lessons Modal ── */}
      {managingCourseLessons && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setManagingCourseLessons(null)}
        >
          <div
            style={{
              background: '#181a20',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16,
              padding: '28px 24px',
              maxWidth: 680,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>Course Lessons</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {managingCourseLessons.title} (Grade {managingCourseLessons.grade})
                </p>
              </div>
              <button
                onClick={() => setManagingCourseLessons(null)}
                style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => showCourseLessonForm ? resetCourseLessonForm() : setShowCourseLessonForm(true)}
              >
                {showCourseLessonForm ? 'Cancel' : '+ Add Lesson Module'}
              </button>
            </div>

            {showCourseLessonForm && (
              <form onSubmit={submitCourseLesson} className="admin-form-box" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h4 style={{ color: '#fff', margin: '0 0 12px' }}>{editingCourseLesson ? 'Edit Lesson Module' : 'New Lesson Module'}</h4>
                {cLessonMsg && <p className="form-msg">{cLessonMsg}</p>}

                <div className="form-row-3" style={{ gridTemplateColumns: '80px 1fr' }}>
                  <div className="form-group">
                    <label className="form-label">Order #</label>
                    <input
                      className="form-input"
                      type="number"
                      value={cLessonOrder}
                      onChange={e => setCLessonOrder(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                      className="form-input"
                      value={cLessonTitle}
                      onChange={e => setCLessonTitle(e.target.value)}
                      placeholder="e.g. 01 Number Systems & Operations"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description (optional)</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    value={cLessonDesc}
                    onChange={e => setCLessonDesc(e.target.value)}
                    placeholder="Key concepts covered in this lesson..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Upload PDF Document (optional)</label>
                  <input
                    className="form-input"
                    type="file"
                    accept=".pdf"
                    onChange={e => setCLessonPdfFile(e.target.files[0])}
                  />
                  {cLessonPdfUrl && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                      Existing PDF: <a href={cLessonPdfUrl} target="_blank" rel="noreferrer" style={{ color: '#60a5fa' }}>View File</a>
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Video URL (optional — YouTube/Vimeo/Recording link)</label>
                  <input
                    className="form-input"
                    value={cLessonVideoUrl}
                    onChange={e => setCLessonVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  <button className="btn btn-primary btn-sm" type="submit" disabled={cLessonUploading}>
                    {cLessonUploading ? 'Saving...' : editingCourseLesson ? 'Update Lesson' : 'Add Lesson'}
                  </button>
                  <button className="btn btn-outline btn-sm" type="button" onClick={resetCourseLessonForm}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {courseLessonsList.length === 0 ? (
              <div className="admin-empty-box">No lesson modules added for this course yet.</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Lesson Title</th>
                      <th>PDF</th>
                      <th>Video</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseLessonsList.map(les => (
                      <tr key={les.id}>
                        <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          {String(les.order).padStart(2, '0')}
                        </td>
                        <td>
                          <strong>{les.title}</strong>
                          {les.description && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              {les.description.slice(0, 60)}...
                            </div>
                          )}
                        </td>
                        <td>
                          {les.pdfUrl ? (
                            <a href={les.pdfUrl} target="_blank" rel="noreferrer" style={{ color: '#60a5fa', textDecoration: 'underline', fontSize: '0.8rem' }}>📄 PDF</a>
                          ) : '—'}
                        </td>
                        <td>
                          {les.videoUrl ? (
                            <a href={les.videoUrl} target="_blank" rel="noreferrer" style={{ color: '#a855f7', textDecoration: 'underline', fontSize: '0.8rem' }}>📹 Video</a>
                          ) : '—'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button className="btn btn-outline btn-sm" onClick={() => editCourseLesson(les)}>Edit</button>
                            <button className="btn btn-outline btn-sm" style={{ color: '#ef4444' }} onClick={() => deleteCourseLesson(les.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .admin-grid {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .admin-grid { grid-template-columns: 1fr; }
        }
        .admin-sidebar {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px;
          position: sticky;
          top: 80px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .admin-nav-item {
          width: 100%;
          text-align: left;
          padding: 10px 14px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.88rem;
          font-weight: 500;
          transition: all .2s;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .admin-nav-item:hover { background: var(--border); color: var(--text); }
        .admin-nav-item.active { background: var(--primary); color: #fff; }
        .admin-nav-count {
          background: rgba(255,255,255,.2);
          border-radius: 99px;
          padding: 1px 7px;
          font-size: 0.75rem;
          min-width: 22px;
          text-align: center;
        }
        .admin-nav-item:not(.active) .admin-nav-count {
          background: var(--border);
          color: var(--text-muted);
        }
        .admin-content {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
        }
        @media (max-width: 900px) {
          .admin-grid { grid-template-columns: 1fr; }
          .admin-sidebar { display: flex; flex-direction: row; overflow-x: auto; padding-bottom: 8px; white-space: nowrap; gap: 6px; }
          .admin-nav-item { flex-shrink: 0; padding: 8px 14px; }
        }
        .tab-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .tab-header h3 { margin: 0; }
        .admin-form-box {
          background: var(--surface);
          border: 1px solid var(--rule);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-bottom: 24px;
        }
        .admin-form-box h4 { margin: 0 0 16px; font-size: 1rem; }
        .form-row-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 12px;
        }
        @media (max-width: 600px) { .form-row-3 { grid-template-columns: 1fr; } }
        .form-group { margin-bottom: 12px; }
        .form-msg { padding: 8px 12px; border-radius: 6px; background: var(--border); margin-bottom: 12px; font-size: .88rem; }
        .img-preview {
          display: block;
          margin-top: 8px;
          max-width: 160px;
          max-height: 100px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid var(--border);
        }
        .admin-table-wrap { overflow-x: auto; }
        .admin-table { width: 100%; border-collapse: collapse; font-size: .88rem; }
        .admin-table th, .admin-table td { padding: 10px 12px; border-bottom: 1px solid var(--border); text-align: left; vertical-align: middle; }
        .admin-table th { font-weight: 600; color: var(--text-muted); font-size: .8rem; text-transform: uppercase; letter-spacing: .04em; }
        .admin-table tr:last-child td { border-bottom: none; }
        .admin-table tr:hover td { background: var(--bg); }
        .badge-sm { font-size: .7rem; padding: 2px 6px; }
        .badge-success { background: #14532d; color: #4ade80; }
        .badge-warning { background: #78350f; color: #fbbf24; }
        .badge-danger  { background: #7f1d1d; color: #f87171; }
        .btn-outline {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
        }
        .btn-outline:hover { background: var(--border); }
      `}</style>
    </>
  );
}
