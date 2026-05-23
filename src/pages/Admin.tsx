import React, { useState, useEffect } from 'react';
import { LogIn, Plus, Trash2, Image as ImageIcon, X, ShieldCheck, Car, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { apiFetch } from '@/src/lib/apiClient';

export function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic Tabs and Banners Management state
  const [activeTab, setActiveTab] = useState<'gallery' | 'banners' | 'consultations'>('consultations');
  const [banners, setBanners] = useState<any>({});
  const [selectedBannerCategory, setSelectedBannerCategory] = useState('greetings');
  const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(null);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [isRefreshingConsultations, setIsRefreshingConsultations] = useState(false);

  const fetchBanners = async () => {
    try {
      const res = await apiFetch(`/api/banners?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setBanners(data);
      }
    } catch (err) {
      console.error('Fetch banners error:', err);
    }
  };

  const fetchConsultations = async () => {
    setIsRefreshingConsultations(true);
    try {
      const res = await apiFetch(`/api/consultations?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setConsultations(data);
      }
    } catch (err) {
      console.error('Fetch consultations error:', err);
    } finally {
      setIsRefreshingConsultations(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchImages();
      fetchBanners();
      fetchConsultations();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await apiFetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('서버가 JSON 형식의 올바른 응답을 제공하지 못했습니다. (배포 서버 환경 점검 필요)');
      }

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', 'admin-token-mock');
        setIsLoggedIn(true);
        fetchImages();
        fetchBanners();
        fetchConsultations();
      } else {
        setError(data.message || '비밀번호가 올바르지 않습니다.');
      }
    } catch (err: any) {
      console.error('Login dynamic catch error:', err);
      setError(err.message || '로그인 서버와 연결할 수 없습니다. 잠시 후 다시 고침하여 시도해 주십시오.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [deletingId, setDeletingId] = useState<any | null>(null);

  const fetchImages = async () => {
    try {
      const res = await apiFetch(`/api/gallery?t=${Date.now()}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error('Fetch images error:', err);
      setMessage({ type: 'error', text: '이미지 목록을 불러오는데 실패했습니다.' });
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !title) return;

    setIsLoading(true);
    setMessage(null);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', selectedFile);

    try {
      const res = await apiFetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setTitle('');
        setSelectedFile(null);
        const fileInput = document.getElementById('gallery-file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        await fetchImages();
        setMessage({ type: 'success', text: '이미지가 성공적으로 등록되었습니다.' });
      } else {
        setMessage({ type: 'error', text: data.message || '이미지 등록에 실패했습니다.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: '서버 통신 오류가 발생했습니다.' });
    }
    setIsLoading(false);
  };

  const handleBannerUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBannerFile) return;

    setIsUploadingBanner(true);
    setMessage(null);
    const formData = new FormData();
    formData.append('image', selectedBannerFile);

    try {
      const res = await apiFetch(`/api/banners/${selectedBannerCategory}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSelectedBannerFile(null);
        const fileInput = document.getElementById('banner-file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        await fetchBanners();
        setMessage({ type: 'success', text: '배너 이미지가 성공적으로 변경되었습니다.' });
      } else {
        setMessage({ type: 'error', text: data.message || '배너 등록에 실패했습니다.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: '서버 통신 오류가 발생했습니다.' });
    }
    setIsUploadingBanner(false);
  };

  const handleDeleteImage = async (id: any) => {
    console.log('Requesting delete for ID:', id);
    setDeletingId(id);
    setMessage(null);
    
    try {
      const res = await apiFetch(`/api/gallery/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (res.ok && data.success) {
        await fetchImages();
        setMessage({ type: 'success', text: '이미지가 삭제되었습니다.' });
      } else {
        const errorMsg = data.message || `삭제 실패 (Status: ${res.status})`;
        setMessage({ type: 'error', text: errorMsg });
      }
    } catch (err) {
      console.error('Delete request failed:', err);
      setMessage({ type: 'error', text: '서버 통신 중 오류가 발생했습니다.' });
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleConsultationStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'pending' ? 'resolved' : 'pending';
    try {
      const res = await apiFetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        await fetchConsultations();
        setMessage({ type: 'success', text: `상담 상태가 ${nextStatus === 'resolved' ? '처리완료' : '대기중'}으로 변경되었습니다.` });
      } else {
        setMessage({ type: 'error', text: '상담 상태 수정에 실패했습니다.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: '서버 통신 중 오류가 발생했습니다.' });
    }
  };

  const handleDeleteConsultation = async (id: string) => {
    if (!window.confirm('이 상담 내역을 삭제하시겠습니까?')) return;
    try {
      const res = await apiFetch(`/api/consultations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchConsultations();
        setMessage({ type: 'success', text: '상담 내역이 삭제되었습니다.' });
      } else {
        setMessage({ type: 'error', text: '상담 내역 삭제에 실패했습니다.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: '서버 통신 중 오류가 발생했습니다.' });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-brand-gray px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-md text-center"
        >
          <div className="w-20 h-20 bg-brand-blue rounded-3xl flex items-center justify-center mx-auto mb-8">
            <LogIn className="text-brand-blue-dark" size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">관리자 로그인</h1>
          <p className="text-gray-400 text-sm mb-8">학원 관리 시스템 접근을 위해 비밀번호를 입력하세요.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder={isLoading ? "인증 확인 중..." : "비밀번호 (2004)"}
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-brand-gray rounded-2xl outline-none focus:ring-2 ring-brand-blue-dark transition-all disabled:opacity-50"
            />
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-navy text-white py-4 rounded-2xl font-bold hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? '인증 처리 중...' : '로그인'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const adminBg = banners.admin || "/hero_academy_3.jpg";

  return (
    <div className="bg-brand-gray min-h-screen">
      <PageHeader 
        category="Admin Console"
        title="학원 통합 관리 시스템"
        subtitle="이미지 갤러리 및 학원 주요 콘텐츠를 직접 관리하세요."
        gradient="from-slate-800/80 to-slate-900/80"
        bgImage={adminBg}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-12 bg-white p-6 rounded-3xl shadow-sm border border-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-gray rounded-xl flex items-center justify-center">
              <Car className="text-brand-navy" />
            </div>
            <div>
              <h2 className="text-xl font-bold">통합 관리 대시보드</h2>
              <p className="text-xs text-gray-400">학원의 배너 배경 및 갤러리를 손쉽게 관리할 수 있습니다.</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-bold transition-colors text-sm px-6 py-3 hover:bg-red-50 rounded-xl"
          >
            <LogOut size={16} /> 로그아웃
          </button>
        </div>

        {/* Dynamic Tabs Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => {
              setActiveTab('consultations');
              setMessage(null);
            }}
            className={cn(
              "px-6 py-3.5 rounded-2xl font-bold transition-all text-sm flex items-center gap-2",
              activeTab === 'consultations' ? "bg-brand-navy text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
            )}
          >
            📞 상담 신청 내역 확인
          </button>
          <button 
            onClick={() => {
              setActiveTab('gallery');
              setMessage(null);
            }}
            className={cn(
              "px-6 py-3.5 rounded-2xl font-bold transition-all text-sm flex items-center gap-2",
              activeTab === 'gallery' ? "bg-brand-navy text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
            )}
          >
            📸 갤러리 이미지 관리
          </button>
          <button 
            onClick={() => {
              setActiveTab('banners');
              setMessage(null);
            }}
            className={cn(
              "px-6 py-3.5 rounded-2xl font-bold transition-all text-sm flex items-center gap-2",
              activeTab === 'banners' ? "bg-brand-navy text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
            )}
          >
            🖼️ 페이지별 배너 배경 설정
          </button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mb-8 p-4 rounded-2xl text-center font-bold text-sm",
              message.type === 'success' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}
          >
            {message.text}
          </motion.div>
        )}

        {activeTab === 'consultations' ? (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b pb-4">
              <div>
                <h3 className="font-bold text-lg text-brand-navy flex items-center gap-2">
                  <span>📞 실시간 신규 상담 신청 내역</span>
                  <span className="text-xs bg-brand-yellow text-brand-navy px-2 py-0.5 rounded-full font-black">
                    {consultations.length}건
                  </span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">홈페이지를 통한 주행연수 및 맞춤 상담 예약 최신 신청 현황을 실시간 관리합니다.</p>
              </div>
              <button 
                onClick={fetchConsultations}
                disabled={isRefreshingConsultations}
                className="bg-brand-gray/80 hover:bg-brand-gray text-gray-600 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                {isRefreshingConsultations ? '새로고침 중...' : '🔄 신청내역 새로고침'}
              </button>
            </div>

            {consultations.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="text-4xl">📭</div>
                <h4 className="font-bold text-gray-500">접수된 상담 신청 내역이 없습니다.</h4>
                <p className="text-xs text-gray-400">새로운 수강생분들이 신청하시면 실시간으로 이곳에 등록됩니다.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {consultations.map((c) => (
                  <div key={c.id} className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-gray-50/50 px-4 rounded-2xl transition-colors">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-base text-brand-navy">{c.name} 수강생님</span>
                        <span className="text-xs font-mono font-bold text-gray-500 bg-brand-gray px-2.5 py-1 rounded-md">{c.phone}</span>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-1 rounded-full",
                          c.status === 'resolved' ? "bg-emerald-50 text-emerald-600" : "bg-brand-yellow/30 text-yellow-800"
                        )}>
                          {c.status === 'resolved' ? '처리 완료' : '답변 대기중'}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {c.createdAt ? (
                            (() => {
                              try {
                                const d = new Date(c.createdAt);
                                return isNaN(d.getTime()) ? '날짜 없음' : d.toLocaleString('ko-KR', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                });
                              } catch {
                                return '날짜 오류';
                              }
                            })()
                          ) : '날짜 없음'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4 text-xs font-semibold text-gray-500 bg-brand-gray/30 p-3 rounded-xl border border-gray-50">
                        <div>
                          <span className="text-gray-400 mr-2">희망 교육:</span>
                          <span className="text-brand-navy">{c.course}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 mr-2">희망 차량:</span>
                          <span className="text-brand-navy">{c.carPreference}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 mr-2">연락 시간:</span>
                          <span className="text-brand-navy">{c.timePreference}</span>
                        </div>
                      </div>
                      {c.message && (
                        <div className="text-xs text-gray-600 bg-yellow-50/50 p-3 rounded-xl border border-yellow-100">
                          <strong className="block text-[10px] text-yellow-800 mb-1">수강생 한마디:</strong>
                          <p className="leading-relaxed">{c.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 self-start lg:self-center">
                      <button
                        onClick={() => handleToggleConsultationStatus(c.id, c.status)}
                        className={cn(
                          "px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm",
                          c.status === 'resolved' 
                            ? "bg-gray-100 text-gray-500 hover:bg-gray-200" 
                            : "bg-emerald-500 text-white hover:bg-emerald-600"
                        )}
                      >
                        {c.status === 'resolved' ? '대기중으로 변경' : '상담 처리 완료'}
                      </button>
                      <button
                        onClick={() => handleDeleteConsultation(c.id)}
                        className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                        title="기록 영구 파기"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'gallery' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Add Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm sticky top-32">
                <h3 className="font-bold flex items-center gap-2 mb-8">
                  <Plus size={20} className="text-brand-blue-dark" /> 이미지 추가
                </h3>
                <form onSubmit={handleAddImage} className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Image Title</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 학원 최신 차량"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-5 py-3 bg-brand-gray rounded-xl outline-none focus:ring-1 ring-brand-blue-dark"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Image File</label>
                    <input
                      id="gallery-file-input"
                      type="file"
                      required
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="w-full px-5 py-3 bg-brand-gray rounded-xl outline-none focus:ring-1 ring-brand-blue-dark file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-blue file:text-brand-blue-dark hover:file:bg-brand-blue/80"
                    />
                  </div>
                  <button 
                    disabled={isLoading}
                    className="w-full bg-brand-blue-dark text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isLoading ? '저장 중...' : '이미지 등록'}
                  </button>
                </form>
              </div>
            </div>

            {/* Image List */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimatePresence>
                  {images.map((img) => (
                    <motion.div
                      key={img.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm group"
                    >
                      <div className="aspect-video relative overflow-hidden bg-gray-100">
                        <img src={img.url} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => handleDeleteImage(img.id)}
                            disabled={deletingId === img.id}
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg",
                              deletingId === img.id ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white hover:scale-110 active:scale-95"
                            )}
                          >
                            {deletingId === img.id ? (
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-sm truncate">{img.title}</h4>
                        <p className="text-[10px] text-gray-400 truncate mt-1">{img.url}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Banner Add/Edit Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm sticky top-32">
                <h3 className="font-bold flex items-center gap-2 mb-8">
                  <ImageIcon size={20} className="text-brand-yellow" /> 배너 변경하기
                </h3>
                <form onSubmit={handleBannerUpload} className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">대상 페이지 카테고리</label>
                    <select
                      value={selectedBannerCategory}
                      onChange={(e) => setSelectedBannerCategory(e.target.value)}
                      className="w-full px-5 py-4 bg-brand-gray rounded-xl outline-none focus:ring-1 ring-brand-blue-dark font-medium text-sm"
                    >
                      <option value="greetings">인사말 (소개)</option>
                      <option value="process">교육절차 (교육 안내)</option>
                      <option value="license">면허종류 (면허 안내)</option>
                      <option value="road">도로연수 (스페셜 솔루션)</option>
                      <option value="community">소식 및 커뮤니티</option>
                      <option value="admin">관리자 콘솔</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block font-sans">새 배너 이미지 파일</label>
                    <input
                      id="banner-file-input"
                      type="file"
                      required
                      accept="image/*"
                      onChange={(e) => setSelectedBannerFile(e.target.files?.[0] || null)}
                      className="w-full px-5 py-3 bg-brand-gray rounded-xl outline-none focus:ring-1 ring-brand-blue-dark file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-blue file:text-brand-blue-dark hover:file:bg-brand-blue/80"
                    />
                  </div>
                  <button 
                    disabled={isUploadingBanner}
                    className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isUploadingBanner ? '배너 업로드 중...' : '배너 변경하기'}
                  </button>
                </form>
              </div>
            </div>

            {/* Banner Live Status */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { id: 'greetings', title: "인사말 (소개 페이지)", url: banners.greetings, defaultUrl: "/hero_academy.jpg" },
                  { id: 'process', title: "교육절차 (교육 안내 페이지)", url: banners.process, defaultUrl: "/hero_academy_2.jpg" },
                  { id: 'license', title: "면허종류 (면허 안내 페이지)", url: banners.license, defaultUrl: "/hero_academy_3.jpg" },
                  { id: 'road', title: "도로연수 (스페셜 솔루션)", url: banners.road, defaultUrl: "/hero_academy_3.jpg" },
                  { id: 'community', title: "소식 및 커뮤니티", url: banners.community, defaultUrl: "/hero_academy_2.jpg" },
                  { id: 'admin', title: "관리자 콘솔", url: banners.admin, defaultUrl: "/hero_academy_3.jpg" },
                ].map((item) => (
                  <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-brand-blue-dark tracking-wider uppercase bg-brand-blue px-3 py-1 rounded-full">{item.id}</span>
                        {item.url && item.url.startsWith('/uploads') && (
                          <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">Customized</span>
                        )}
                      </div>
                      <h4 className="font-bold text-base text-brand-navy mb-4">{item.title}</h4>
                      <div className="aspect-video relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                        <img src={item.url || item.defaultUrl} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedBannerCategory(item.id);
                        const wrapElement = document.getElementById('banner-file-input');
                        if (wrapElement) wrapElement.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-6 text-xs text-brand-blue-dark font-bold hover:underline self-end"
                    >
                      이 배너 변경하기
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
