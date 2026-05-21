import { Shield, Target, Heart, CheckCircle2, X, Phone, Calendar, User, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PageHeader } from '@/src/components/layout/PageHeader';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

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
    fetch('/api/banners')
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
      const res = await fetch('/api/consultations', {
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

export function Community() {
  const [bgImage, setBgImage] = useState('/hero_academy_2.jpg');

  useEffect(() => {
    fetch('/api/banners')
      .then(res => res.json())
      .then(data => {
        if (data.community) setBgImage(data.community);
      })
      .catch(err => console.error(err));
  }, []);

  const posts = [
    { tag: "공지", title: "방학 맞이 속성반 선착순 모집 중!", date: "2024.05.20" },
    { tag: "이벤트", title: "2종 소형/원동기 등록 즉시 교육 가능!", date: "2024.05.18" },
    { tag: "안내", title: "무료 셔틀버스 노선 개편 안내 (죽백동 추가)", date: "2024.05.15" },
    { tag: "후기", title: "드디어 면허 땄어요! 친절한 강사님 감사합니다.", date: "2024.05.10" },
  ];

  return (
    <div>
      <PageHeader 
        category="Community"
        title="학원 소식 및 커뮤니티"
        subtitle="e편한자동차운전학원의 최신 공지사항과 생생한 합격후기를 전해드립니다."
        gradient="from-brand-navy/80 to-gray-900/80"
        bgImage={bgImage}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <h2 className="text-3xl font-bold">공지사항 및 소식</h2>
              <div className="w-12 h-1 bg-brand-blue mt-4 rounded-full" />
            </div>
            <div className="flex gap-2">
              <button className="px-8 py-3 bg-brand-navy text-white rounded-xl font-bold text-sm hover:bg-brand-blue-dark transition-colors shadow-lg">글쓰기</button>
            </div>
          </div>

          <div className="bg-white border-y border-gray-100 divide-y divide-gray-50">
            {posts.map((post, idx) => (
              <div key={idx} className="py-6 flex flex-col md:flex-row gap-4 md:items-center justify-between group cursor-pointer hover:bg-brand-gray/50 px-4 transition-colors">
                <div className="flex items-center gap-6">
                  <span className={cn(
                    "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest",
                    post.tag === "공지" ? "bg-red-50 text-red-500" : "bg-brand-blue text-brand-blue-dark"
                  )}>
                    {post.tag}
                  </span>
                  <h3 className="font-bold text-brand-navy group-hover:text-brand-blue-dark transition-colors">{post.title}</h3>
                </div>
                <span className="text-xs text-gray-400 font-medium">{post.date}</span>
              </div>
            ))}
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

      {/* Online Consultation */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">궁금한 점이 있으신가요?</h2>
          <p className="text-gray-500 mb-12">1:1 실시간 상담이나 질문 답변 게시판을 통해 언제든 문의주세요.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="bg-[#FFE812] text-[#3c1e1e] py-6 rounded-3xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform">
              카카오톡 실시간 상담
            </button>
            <button className="bg-white text-brand-navy border border-gray-200 py-6 rounded-3xl font-bold flex items-center justify-center gap-3 hover:shadow-xl transition-all">
              질문 답변 게시판
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
