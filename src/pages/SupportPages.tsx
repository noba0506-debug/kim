import { Shield, Target, Heart, CheckCircle2, X, Phone, Calendar, User, Sparkles, AlertCircle, MessageSquare, Edit3, Eye, Search, ArrowLeft, Send, Check, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PageHeader } from '@/src/components/layout/PageHeader';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { apiFetch } from '@/src/lib/apiClient';

export function RoadTraining() {
  const [bgImage, setBgImage] = useState('/hero_academy_3.jpg');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '장롱면허 극복 패키지 (10시간)',
    carPreference: '학원 SUV 차량',
    timePreference: '평일 오전 (09:00 ~ 13:00)',
    message: '',
    agreed: true
  });

  useEffect(() => {
    apiFetch('/api/banners')
      .then(res => res.json())
      .then(data => {
        if (data.road) setBgImage(data.road);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (location.search.includes('contact=true')) {
      setIsModalOpen(true);
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("이름과 연락처를 입력해주세요.");
      return;
    }
    if (!formData.agreed) {
      alert("개인정보 수집 및 이용 동의가 필요합니다.");
      return;
    }
    
    try {
      const res = await apiFetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const errData = await res.json();
        alert(errData.message || "상담 신청 중 서버에 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error("Consultation submit error:", err);
      alert("서버와 통신하는 중 오류가 발생했습니다.");
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      course: '장롱면허 극복 패키지 (10시간)',
      carPreference: '학원 SUV 차량',
      timePreference: '평일 오전 (09:00 ~ 13:00)',
      message: '',
      agreed: true
    });
  };

  const cards = [
    { 
      title: "안전성 최고", 
      desc: "안전장치가 완비된 학원 전용 연수 차량 이용 (SUV 차량 완비로 높은 시야 확보).", 
      icon: <Shield className="text-blue-500" /> 
    },
    { 
      title: "맞춤형 코스", 
      desc: "수강생이 자주 다니는 출퇴근길, 마트 가는 길, 주차 취약점 집중 마스터.", 
      icon: <Target className="text-brand-blue-dark" /> 
    },
    { 
      title: "친절 보장", 
      desc: "강압적인 교육 탈피, 칭찬 and 격려 중심의 친절한 연수.", 
      icon: <Heart className="text-red-500" /> 
    },
  ];

  return (
    <div>
      <PageHeader 
        category="Special Solution"
        title={<>면허는 있지만 도로가 무서운 분들을 위한<br />e편한의 특급 솔루션!</>}
        subtitle="장롱면허 탈출부터 복잡한 시내 주행까지, 베테랑 강사가 옆에서 든든하게 잡아드립니다."
        gradient="from-brand-blue-dark/80 to-brand-navy/80"
        bgImage={bgImage}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-3xl font-bold mb-6">운전... 두려움이 아닌 즐거움이 됩니다</h2>
            <div className="w-16 h-1 bg-brand-blue mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, idx) => (
              <div key={idx} className="bg-brand-gray p-10 rounded-[2.5rem] hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-brand-blue/50">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">안전하게, 빠르게 실력을 키우세요</h2>
            <div className="space-y-6">
              {[
                "평택 시내권 및 안성 공도 등 인근 지역 방문 연수 가능",
                "수강생 본인 차량으로 연수 가능 (안전 장치 장착)",
                "기초 주행부터 고속도로, 가속 주행 완벽 마스터",
                "T자 주차, 평행 주차 등 주차 기술 집중 지도"
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <CheckCircle2 className="text-brand-yellow shrink-0" />
                  <span className="text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-video bg-white/5 rounded-[2rem] overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
              alt="도로연수"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-brand-navy px-8 py-4 rounded-full font-bold shadow-xl hover:bg-brand-yellow hover:text-brand-navy hover:scale-105 transition-all text-sm outline-none"
              >
                연수 상담 예약하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetModal}
              className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col border border-gray-100"
            >
              {/* Header */}
              <div className="p-6 md:p-8 bg-brand-navy text-white relative">
                <button 
                  onClick={resetModal}
                  className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors outline-none"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-2 text-brand-yellow text-xs font-bold uppercase tracking-widest mb-2">
                  <Sparkles size={14} />
                  <span>Special Counseling Service</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black">맞춤 연수 상담 예약</h3>
                <p className="text-xs text-brand-blue/30 mt-1">상세내역을 남겨주시면 담당 베테랑 강사님이 친절히 상담을 준비합니다.</p>
              </div>

              {/* Inner content container */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5">
                        <User size={14} className="text-brand-navy" /> 성함
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="홍길동"
                        className="w-full px-4 py-3.5 bg-brand-gray/50 border border-gray-100 rounded-xl font-semibold text-sm focus:border-brand-blue focus:bg-white transition-colors outline-none"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5">
                        <Phone size={14} className="text-brand-navy" /> 연락처
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="010-1234-5678"
                        className="w-full px-4 py-3.5 bg-brand-gray/50 border border-gray-100 rounded-xl font-semibold text-sm focus:border-brand-blue focus:bg-white transition-colors outline-none"
                        required
                      />
                    </div>

                    {/* Course selection */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5">
                        <Calendar size={14} className="text-brand-navy" /> 희망 연수 과정
                      </label>
                      <select 
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-brand-gray/50 border border-gray-100 rounded-xl font-semibold text-sm text-gray-700 focus:border-brand-blue focus:bg-white transition-colors outline-none cursor-pointer"
                      >
                        <option value="장롱면허 극복 패키지 (10시간)">장롱면허 극복 패키지 (10시간)</option>
                        <option value="1종보통, 1종자동, 2종자동 신규 취득">1종보통, 1종자동, 2종자동 신규 취득</option>
                        <option value="1종대형 면허 취득">1종대형 면허 취득</option>
                        <option value="2종소형, 원동기면허 취득">2종소형, 원동기면허 취득</option>
                      </select>
                    </div>

                    {/* Car selection */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-brand-navy inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M21 16V13a4 4 0 00-3-3.85V6a1 1 0 00-1-1h-4"></path>
                        </svg> 희망 차량 종류
                      </label>
                      <select 
                        name="carPreference"
                        value={formData.carPreference}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-brand-gray/50 border border-gray-100 rounded-xl font-semibold text-sm text-gray-700 focus:border-brand-blue focus:bg-white transition-colors outline-none cursor-pointer"
                      >
                        <option value="학원 SUV 차량">학원 SUV 차량 (최고 시야 보장)</option>
                        <option value="학원 준중형 세단 차량">학원 준중형 세단 차량</option>
                        <option value="자기 차량 연수">자기 차량 (안전장치 장착 후 연수)</option>
                      </select>
                    </div>

                    {/* Time selection */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-brand-navy inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg> 희망 연락/교육 시간대
                      </label>
                      <select 
                        name="timePreference"
                        value={formData.timePreference}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-brand-gray/50 border border-gray-100 rounded-xl font-semibold text-sm text-gray-700 focus:border-brand-blue focus:bg-white transition-colors outline-none cursor-pointer"
                      >
                        <option value="평일 오전 (09:00 ~ 13:00)">평일 오전 (09:00 ~ 13:00)</option>
                        <option value="평일 오후 (14:00 ~ 18:00)">평일 오후 (14:00 ~ 18:00)</option>
                        <option value="주말 스페셜 집중반 (토/일 전일)">주말 스페셜 집중반 (토/일 전일)</option>
                      </select>
                    </div>

                    {/* Agreement */}
                    <div className="flex items-start gap-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="agreed"
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleCheckboxChange}
                        className="mt-1 cursor-pointer scale-110"
                        required
                      />
                      <label htmlFor="agreed" className="text-xs text-gray-400 font-semibold leading-relaxed cursor-pointer select-none">
                        (필수) 개인정보 수집 및 연수 약정 이용 약식에 동의합니다. 기재하신 연락처는 전문상담 연결 목적으로만 30일 보관 후 영구 파기됩니다.
                      </label>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-brand-yellow text-brand-navy py-4 rounded-xl font-bold font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 outline-none"
                    >
                      <CheckCircle2 size={16} /> 예약 및 무료 전문 상담 신청 완료
                    </button>
                  </form>
                ) : (
                  /* Success State */
                  <div className="text-center py-8 space-y-6">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 200 }}
                      >
                        <CheckCircle2 size={48} />
                      </motion.div>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-brand-navy">상담 예약이 접수되었습니다!</h4>
                      <p className="text-xs font-semibold text-gray-400 mt-2">
                        성공적으로 예약 기록을 저장해 두었습니다.<br />지정하신 시간대내에 저희 담당 베테랑 강사님이 직접 기입하신 휴대폰 번호로 신속하고 친절하게 전화를 안내해 드리겠습니다.
                      </p>
                    </div>

                    <div className="bg-brand-gray/50 p-6 rounded-2xl text-left border border-gray-100 text-xs text-gray-500 space-y-2">
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-bold text-gray-400">예약 신청자</span>
                        <span className="font-bold text-gray-700">{formData.name} 님</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-bold text-gray-400">신청 연락처</span>
                        <span className="font-bold text-gray-700">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-bold text-gray-400">선택한 연수</span>
                        <span className="font-bold text-gray-700">{formData.course}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-400">희망 차량/시간대</span>
                        <span className="font-bold text-gray-700">{formData.carPreference} / {formData.timePreference.split(' (')[0]}</span>
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-gray-400 flex items-center justify-center gap-1">
                      <AlertCircle size={12} className="text-brand-blue-dark shrink-0" /> 더 시급한 문의는 학원 고객센터 <strong className="text-brand-navy">031-656-2004</strong> 로 언제든지 환영합니다.
                    </div>

                    <button 
                      onClick={resetModal}
                      className="w-full bg-brand-navy text-white hover:bg-brand-blue-dark py-3.5 rounded-xl font-bold font-semibold text-xs transition-colors outline-none"
                    >
                      창 닫기
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DEFAULT_POSTS = [
  { 
    id: "post-1", 
    tag: "공지", 
    title: "방학 맞이 속성반 선착순 모집 중!", 
    content: "안녕하세요. e편한운전전문학원입니다.\n\n다가오는 여름 방학을 맞이하여 전 과정 단기 합격을 위한 '여름방학 특별 속성반'을 특별 개편해 선착순 수강생을 모집하고 있습니다.\n\n■ 모집 대상: 단기 취득을 희망하시는 대학생, 직장인, 일반인\n■ 특별 혜택: 수강료 즉시 할인 적용 + 무료 모바일 학과 교재 제공 + 평택/안성 등 무료 전역 셔틀버스 연동 매칭!\n■ 특징: 학내 자체 시험을 통해 수강생 개개인 맞춤형 밀착 훈련 지도로 높은 원패스 합격을 보장합니다.\n\n편안하게 무료 전화 상담(031-656-2004) 또는 실시간 카카오톡으로 질문 주시면 신속하게 조율해 드리겠습니다.",
    author: "관리자", 
    date: "2026.05.20", 
    views: 142 
  },
  { 
    id: "post-2", 
    tag: "이벤트", 
    title: "2종 소형/원동기 등록 즉시 오토바이 탑승 교육!", 
    content: "안녕하세요. e편한입니다!\n\n최상의 기동성과 재미를 선사하는 2종 소형/원동기 바이크 면허 훈련생을 상시 모집합니다.\n\n저희 학원은 대기 기간 일절 없이 당일 즉시 교육이 가능한 원스톱 훈련 연습차량 융통을 실시 중입니다. 혼다 CBR250 등 최신 차종으로 초보자분들도 굴절, S자 코스 등을 완벽 마스터하도록 전문 강사진이 안전 가이드를 제공합니다.\n\n■ 당일 즉시 승차 훈련 기능 진행\n■ 전용 기능 훈련 자체 시험장 완비\n\n지금 바로 준비하셔서 안전하고 근사한 라이더 라이프를 시작해 보세요!",
    author: "관리자", 
    date: "2026.05.18", 
    views: 95 
  },
  { 
    id: "post-3", 
    tag: "안내", 
    title: "무료 셔틀버스 노선 개편 안내 (죽백동 추가)", 
    content: "학원을 오고 가시는 수강생 여러분의 더 쾌적하고 편안한 이동 셔틀을 조율하기 위해 무료 통학 차량 셔틀버스를 신규 노선 전면 투입 개편합니다.\n\n■ 적용 개편일: 2026년 6월 1일부터 전면 시행\n■ 추가 노선: 죽백동 동부고속화도로 부근 입주 단지 노선 신설 추가\n■ 기존 활수지:\n  - 평택역/평택터미널/동삭동/소사벌지구 일대 수시 운영\n  - 안성 공도 및 평택 남부권 노선 집중\n\n수업 전후 시간대에 맞춰 탑승을 원하시는 분들은 최소 1시간 전에 셔틀 담당 부장님 또는 고객 원무과(031-656-2004)에 신청하시면 기사님께서 수강생님의 인접 대기지에서 안전하게 탑승하실 수 있도록 도와드립니다.",
    author: "관리자", 
    date: "2026.05.15", 
    views: 78 
  },
  { 
    id: "post-4", 
    tag: "후기", 
    title: "드디어 1종 보통 한 번에 합격했어요! 강사님 최고!", 
    content: "운전면허 따려고 평택이랑 안성 주변 학원들 엄청 알아보다가 친절하다는 후기 보고 e편한 등록했습니다.\n\n처음에 클러치 밟고 변속할 때 시동 정말 10번은 꺼트린 것 같아서 울고 싶었는데, 담당 강사님께서 화 한 번 안 내시고 '괜찮아요, 다들 처음엔 그래요' 하고 웃어주셔서 안심하고 연습할 수 있었어요.\n\n기능도 감점 없이 바로 통과하고 도로주행 코스도 설명해 주신 포인트들 머리에 그리면서 주행했더니 높은 점수로 한 번에 합격했습니다! \n\n고민하시는 분들 여기 베테랑 강사님들 믿고 등록하세요. e편한 최고입니다!",
    author: "정현우", 
    date: "2026.05.10", 
    views: 231 
  }
];

export function Community() {
  const [bgImage, setBgImage] = useState('/hero_academy_2.jpg');
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals status
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [activePost, setActivePost] = useState<any | null>(null);
  
  // Write Form layout
  const [newPost, setNewPost] = useState({
    tag: "질문",
    title: "",
    author: "",
    content: "",
  });

  useEffect(() => {
    apiFetch('/api/banners')
      .then(res => res.json())
      .then(data => {
        if (data.community) setBgImage(data.community);
      })
      .catch(err => console.error(err));
  }, []);

  // Initialize posts from localStorage or default
  useEffect(() => {
    const stored = localStorage.getItem('ephyeon_community_posts');
    if (stored) {
      try {
        setPosts(JSON.parse(stored));
      } catch (e) {
        setPosts(DEFAULT_POSTS);
        localStorage.setItem('ephyeon_community_posts', JSON.stringify(DEFAULT_POSTS));
      }
    } else {
      localStorage.setItem('ephyeon_community_posts', JSON.stringify(DEFAULT_POSTS));
      setPosts(DEFAULT_POSTS);
    }
  }, []);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    // 1. Tab filter
    let matchesTab = true;
    if (selectedTab === "공지/안내") {
      matchesTab = ["공지", "이벤트", "안내"].includes(post.tag);
    } else if (selectedTab === "질문답변 (Q&A)") {
      matchesTab = post.tag === "질문";
    } else if (selectedTab === "합격후기") {
      matchesTab = post.tag === "후기";
    }

    // 2. Search filter
    const matchesSearch = searchQuery.trim() === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handlePostClick = (post: any) => {
    // Increment view count dynamically
    const updated = posts.map(p => {
      if (p.id === post.id) {
        return { ...p, views: (p.views || 0) + 1 };
      }
      return p;
    });
    setPosts(updated);
    localStorage.setItem('ephyeon_community_posts', JSON.stringify(updated));
    setActivePost({ ...post, views: (post.views || 0) + 1 });
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.author.trim() || !newPost.content.trim()) {
      alert("모든 필드를 기입해 주세요.");
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    
    const newId = `post-${Date.now()}`;
    const newlyCreated = {
      id: newId,
      tag: newPost.tag,
      title: newPost.title,
      content: newPost.content,
      author: newPost.author,
      date: formattedDate,
      views: 0
    };

    const updated = [newlyCreated, ...posts];
    setPosts(updated);
    localStorage.setItem('ephyeon_community_posts', JSON.stringify(updated));

    // Reset writing form & close
    setWriteModalOpen(false);
    const savedTag = newPost.tag;
    setNewPost({
      tag: "질문",
      title: "",
      author: "",
      content: "",
    });

    // Simulate auto-reply from Administrator if tag is "질문"
    if (savedTag === "질문") {
      setTimeout(() => {
        const storedList = JSON.parse(localStorage.getItem('ephyeon_community_posts') || '[]');
        const targetIdx = storedList.findIndex((p: any) => p.id === newId);
        if (targetIdx !== -1) {
          storedList[targetIdx].answer = `수강생님 안녕하십니까! e편한자동차운전전문학원 대표 실시간 소통 메신저입니다. 소중한 상담 질문을 남겨 주셔서 진심으로 감사드립니다.\n\n문의하신 해당 면허 취득 과정의 세부 일정 편성과 특별 할인 등록 패키지에 관한 맞춤 일정 상담은 저희 전문적인 전산 실시간 매칭 팀이 상주하는 안내 매칭 센터(☎ 031-656-2004)로 전화 한 통 주시거나 하단 노란색 '카카오톡 실시간 상담' 링크를 통해 문자 남겨주시면, 담당 행정 주임님께서 연락처 대기를 조회하여 당일 등록 가용반 및 셔틀버스 통학 연동 개설까지 신중하고 시원하게 원플랜 조율 안내해 드리겠습니다.\n\n수강생님의 편안하고 빠른 합격을 위해 언제나 성심을 다하겠습니다. 감사합니다!`;
          localStorage.setItem('ephyeon_community_posts', JSON.stringify(storedList));
          
          setPosts(storedList);
          
          // If user currently has this newly created post open in detail, push response
          setActivePost((current: any) => {
            if (current && current.id === newId) {
              return { ...current, answer: storedList[targetIdx].answer };
            }
            return current;
          });
        }
      }, 1500);
    }
  };

  const handleGoToQna = () => {
    setSelectedTab("질문답변 (Q&A)");
    const section = document.getElementById("community-board-section");
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const TABS = ["전체", "공지/안내", "질문답변 (Q&A)", "합격후기"];

  return (
    <div>
      <PageHeader 
        category="Community"
        title="학원 소식 및 커뮤니티"
        subtitle="e편한자동차운전학원의 최신 공지사항과 생생한 합격후기를 전해드립니다."
        gradient="from-brand-navy/80 to-gray-900/80"
        bgImage={bgImage}
      />

      <section id="community-board-section" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold">소통 및 질문 답변</h2>
              <div className="w-12 h-1 bg-brand-blue mt-4 rounded-full" />
            </div>
            
            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-grow md:flex-grow-0 md:w-72">
                <input 
                  type="text" 
                  placeholder="제목, 내용, 작성자 검색..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-brand-gray/50 border border-gray-100 rounded-2xl text-xs font-semibold focus:border-brand-blue focus:bg-white outline-none transition-all placeholder:text-gray-400"
                />
                <Search size={14} className="absolute left-3.5 top-4 text-gray-400" />
              </div>

              {/* Write Button */}
              <button 
                onClick={() => setWriteModalOpen(true)}
                className="px-6 py-3 bg-brand-navy text-white rounded-2xl font-bold text-xs hover:bg-brand-blue-dark transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus size={14} />
                <span>글쓰기</span>
              </button>
            </div>
          </div>

          {/* Navigation Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={cn(
                  "px-6 py-3 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer",
                  selectedTab === tab 
                    ? "bg-brand-navy text-white shadow-lg" 
                    : "bg-brand-gray text-gray-400 hover:bg-gray-100"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm divide-y divide-gray-50">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div 
                  key={post.id} 
                  onClick={() => handlePostClick(post)}
                  className="p-6 flex flex-col md:flex-row gap-4 md:items-center justify-between group cursor-pointer hover:bg-brand-gray/40 transition-colors"
                >
                  <div className="flex items-start md:items-center gap-4 flex-1">
                    <span className={cn(
                      "text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shrink-0 text-center min-w-[54px]",
                      post.tag === "공지" && "bg-red-50 text-red-500",
                      post.tag === "이벤트" && "bg-amber-50 text-amber-600",
                      post.tag === "안내" && "bg-indigo-50 text-indigo-500",
                      post.tag === "후기" && "bg-emerald-50 text-emerald-600",
                      post.tag === "질문" && "bg-blue-50 text-blue-500"
                    )}>
                      {post.tag}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-bold text-brand-navy group-hover:text-brand-blue-dark transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                        <span>{post.author}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> {post.views || 0}
                        </span>
                        {post.tag === "질문" && (
                          <>
                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                            <span className={cn(
                              "font-bold",
                              post.answer ? "text-emerald-500" : "text-gray-300"
                            )}>
                              {post.answer ? "답변완료" : "답변대기"}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-semibold md:shrink-0">{post.date}</span>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4">
                <MessageSquare size={32} className="text-gray-200 mx-auto" />
                <p className="text-sm font-semibold text-gray-400">검색 조건에 맞는 게시글이 없습니다.</p>
              </div>
            )}
          </div>

          <div className="mt-12 flex justify-center gap-2">
             {[1, 2, 3].map(p => (
               <button key={p} className={cn(
                 "w-10 h-10 rounded-xl font-bold text-sm transition-all",
                 p === 1 ? "bg-brand-navy text-white" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
               )}>
                 {p}
               </button>
             ))}
          </div>
        </div>
      </section>

      {/* Write Post Modal Dialogue (AnimatePresence) */}
      <AnimatePresence>
        {writeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWriteModalOpen(false)}
              className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col border border-gray-100"
            >
              <div className="p-6 md:p-8 bg-brand-navy text-white relative">
                <button 
                  onClick={() => setWriteModalOpen(false)}
                  className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors outline-none cursor-pointer"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-2 text-brand-yellow text-xs font-bold uppercase tracking-widest mb-2">
                  <Sparkles size={14} />
                  <span>Interactive board module</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black">소통 및 질문 글쓰기</h3>
                <p className="text-xs text-white/60 mt-1">이곳에 궁금하신 점이나 합격 경험을 다같이 소통 가능하도록 기재해 주세요.</p>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-1">
                <form onSubmit={handleCreatePost} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2">카테고리</label>
                      <select 
                        value={newPost.tag}
                        onChange={(e) => setNewPost({...newPost, tag: e.target.value})}
                        className="w-full px-4 py-3 bg-brand-gray/50 border border-gray-100 rounded-xl font-semibold text-xs focus:border-brand-blue focus:bg-white outline-none cursor-pointer"
                      >
                        <option value="질문">질문 답변 (Q&A)</option>
                        <option value="후기">합격후기 (Review)</option>
                        <option value="안내">자유게시판</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2">성함 / 닉네임</label>
                      <input 
                        type="text" 
                        placeholder="작성자 명"
                        value={newPost.author}
                        onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                        className="w-full px-4 py-3 bg-brand-gray/50 border border-gray-100 rounded-xl font-semibold text-xs focus:border-brand-blue focus:bg-white outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">게시글 제목</label>
                    <input 
                      type="text" 
                      placeholder="제목을 명확하게 입력해 주세요."
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="w-full px-4 py-3 bg-brand-gray/50 border border-gray-100 rounded-xl font-semibold text-xs focus:border-brand-blue focus:bg-white outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">상세 대본 기재</label>
                    <textarea 
                      rows={5}
                      placeholder="질문이나 후기의 내용을 성의껏 기고하여 주십시오. e편한 강사단이 친절하게 코칭을 준비해 드립니다."
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="w-full px-4 py-3 bg-brand-gray/50 border border-gray-100 rounded-xl font-semibold text-xs focus:border-brand-blue focus:bg-white outline-none resize-none"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-yellow text-brand-navy py-4 rounded-xl font-bold text-xs hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer outline-none"
                  >
                    <CheckCircle2 size={15} /> 작성 마무리 및 등록 완료
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Post Detail Dialog (AnimatePresence) */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col border border-gray-100"
            >
              {/* Header Container */}
              <div className="p-6 md:p-8 bg-brand-navy text-white relative">
                <button 
                  onClick={() => setActivePost(null)}
                  className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors outline-none cursor-pointer"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[8px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shrink-0",
                    activePost.tag === "공지" && "bg-red-500 text-white",
                    activePost.tag === "이벤트" && "bg-amber-500 text-white",
                    activePost.tag === "안내" && "bg-indigo-500 text-white",
                    activePost.tag === "후기" && "bg-emerald-500 text-white",
                    activePost.tag === "질문" && "bg-blue-500 text-white"
                  )}>
                    {activePost.tag}
                  </span>
                  <span className="text-xs text-white/40">{activePost.date}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black mt-3 leading-tight">{activePost.title}</h3>
                
                <div className="flex items-center gap-3 text-xs text-white/60 mt-4 font-semibold">
                  <span>작성자: {activePost.author}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>조회 {activePost.views}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
                
                {/* Content text */}
                <div className="text-sm text-gray-700 leading-relaxed font-semibold whitespace-pre-wrap">
                  {activePost.content}
                </div>

                {/* Question & Answer (Official) */}
                {activePost.tag === "질문" && (
                  <div className="border-t border-gray-50 pt-6">
                    {activePost.answer ? (
                      <div className="bg-brand-gray/60 border border-gray-100 p-6 rounded-[2rem] space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-brand-navy rounded-lg flex items-center justify-center text-white shrink-0">
                            <Sparkles size={12} fill="#fff" />
                          </div>
                          <span className="text-xs font-black text-brand-navy">학원 공식 안내 답변</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-500 leading-relaxed whitespace-pre-wrap">
                          {activePost.answer}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-blue-50/50 border border-blue-100/50 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-2">
                        <div className="w-10 h-10 bg-blue-100/50 text-blue-500 rounded-2xl flex items-center justify-center">
                          <MessageSquare size={18} />
                        </div>
                        <h4 className="text-xs font-bold text-blue-600">친절 답변을 준비하고 있습니다</h4>
                        <p className="text-[11px] font-semibold text-blue-400 max-w-sm leading-relaxed">
                          수강생님의 질문이 원활히 접수되어 관리 전담 전산원이 신중하게 조율 중에 있습니다. 영업시간 내외로 신속하게 안내 답안이 하단에 기재될 예정입니다.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Close Button at bottom */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActivePost(null)}
                    className="px-6 py-2.5 bg-brand-navy text-white hover:bg-brand-blue-dark rounded-xl font-bold text-xs cursor-pointer transition-colors"
                  >
                    목록으로 돌아가기
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Online Consultation */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">궁금한 점이 있으신가요?</h2>
          <p className="text-gray-500 mb-12">1:1 실시간 상담이나 질문 답변 게시판을 통해 언제든 문의주세요.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href="https://pf.kakao.com/_zbsaxj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FFE812] text-[#3c1e1e] py-6 rounded-3xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform"
            >
              카카오톡 실시간 상담
            </a>
            <button 
              onClick={handleGoToQna}
              className="bg-white text-brand-navy border border-gray-200 py-6 rounded-3xl font-bold flex items-center justify-center gap-3 hover:shadow-xl transition-all cursor-pointer"
            >
              질문 답변 게시판
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
