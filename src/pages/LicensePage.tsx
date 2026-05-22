import { motion } from 'motion/react';
import { useState, useEffect, ReactNode } from 'react';
import { Car, Truck, Bike, Compass, CheckCircle2, Award, Clock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { apiFetch } from '@/src/lib/apiClient';

interface LicenseDetail {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  eligibility: string[];
  vehicles: string[];
  hours: {
    academic: string;
    skill: string;
    road?: string;
  };
  examInfo: {
    type: string;
    points: string;
    items: string[];
  };
}

export default function LicensePage() {
  const [bgImage, setBgImage] = useState('/hero_academy_3.jpg');
  const [activeTab, setActiveTab] = useState<string>('ordinary');

  useEffect(() => {
    apiFetch('/api/banners')
      .then(res => res.json())
      .then(data => {
        if (data.license) setBgImage(data.license);
      })
      .catch(err => console.error(err));
  }, []);

  const licenses: LicenseDetail[] = [
    {
      id: 'ordinary',
      title: '1종 · 2종 보통 면허',
      subtitle: '가장 대중적이고 활용도가 높은 일반 차량용 면허',
      icon: <Car className="w-8 h-8 text-brand-navy" />,
      eligibility: [
        '만 18세 이상 누구나 응시 가능',
        '붉은색, 녹색, 황색의 색채 구별이 가능한 자',
        '한눈의 시력 0.5 이상 및 양안 시력 0.7 이상 (안경 포함)'
      ],
      hours: {
        academic: '3시간 (학원 학과 교육)',
        skill: '4시간 (장내 코스 연습)',
        road: '6시간 (상세 도로 주행 연습)'
      },
      vehicles: [
        '1종보통: 승용자동차, 15인 이하 승합자동차, 12톤 미만 화물자동차, 3톤 미만 지게차',
        '2종보통: 승용자동차, 10인 이하 승합자동차, 4톤 이하 화물자동차, 원동기장치자전거(125cc 이하)',
      ],
      examInfo: {
        type: '학과시험 ➡️ 장내기능시험 ➡️ 도로주행시험',
        points: '학과: 1종 70점 / 2종 60점 이상 합격. 기능: 80점 이상. 주행: 70점 이상 합격.',
        items: [
          '학과시험: 전국 운전면허시험장에서 객관식 치뤄짐',
          '장내기능: 학원 자체 시험장에서 진행 (기계조작, 경사로, 직각주차, 가속구간)',
          '도로주행: 학원 공식 지정 주행 코스(A, B, C, D) 중 무작위 1개 지정 주행'
        ]
      }
    },
    {
      id: 'large',
      title: '1종 대형 면허',
      subtitle: '대형 모빌리티, 버스 및 건설기계 운전을 위한 커리어 필수 면허',
      icon: <Truck className="w-8 h-8 text-semibold text-brand-navy" />,
      eligibility: [
        '만 19세 이상인 자',
        '1종 보통 또는 2종 보통면허 취득 후 1년 이상 경과한 자 (경력 증명 필요)',
        '청력 및 신체 기능이 대형 차량 조종에 무리가 없는 자'
      ],
      hours: {
        academic: '3시간 (이론 및 안전 보강)',
        skill: '10시간 (단독 기능 정밀 집중 교육)',
      },
      vehicles: [
        '승용자동차, 승합자동차(버스 등 제한 없음)',
        '화물자동차, 건설기계(덤프트럭, 콘크리트믹서트럭, 아스팔트살포기, 노상안정기, 3톤 미만 지게차)',
        '특수자동차 (트레일러, 레커 등 견인자동차 제외)'
      ],
      examInfo: {
        type: '학과 및 도로주행 면제 ➡️ 장내기능시험 단독 진행',
        points: '기능 시험 80점 이상 합격 (학원 자체 시험장에서 친숙한 차량으로 매주 시험 진행)',
        items: [
          '굴절 코스 통과 능력 및 곡선(S자) 주행 능력 검증',
          '방향전환 코스(T자 주차형 변형) 정밀 테스트',
          '평행주차 및 횡단보도, 기어변속 구간 점검',
          '돌발 상황 시 신속 반응 속도 채점'
        ]
      }
    },
    {
      id: 'motorcycle',
      title: '2종 소형 · 원동기 면허',
      subtitle: '할리데이비슨, 혼다 바이크부터 고배기량 모터사이클까지 완벽 커버',
      icon: <Bike className="w-8 h-8 text-brand-navy" />,
      eligibility: [
        '2종 소형: 만 18세 이상',
        '원동기 장치자전거: 만 16세 이상',
        '이륜차의 무게 균형을 무리 없이 잡을 수 있는 체력을 가진 자'
      ],
      hours: {
        academic: '학과 교육 3시간 (타 면허 소지 시 면제 또는 감면)',
        skill: '기능 이륜 오토바이 실습 10시간',
      },
      vehicles: [
        '2종 소형: 125cc 초과의 모든 모터사이클(오토바이), 125cc 이하 이륜자동차 포함',
        '원동기 장치자전거: 125cc 이하의 바이크, 스쿠터 및 배기량 대비 전동 휠'
      ],
      examInfo: {
        type: '장내 코스 시험 전용 진행 (굴절, 곡선, 좁은길, 연속진로전환)',
        points: '90점 이상 득점 시 합격 (감점 요인이 다른 면허보다 엄격하므로 완벽 연습 필수)',
        items: [
          '굴절 코스: 앞바퀴가 라인을 밟지않고 직각 회전하는 테크닉',
          '곡선 코스 (S자): 무릎 홀딩 및 원만한 시선 처리를 통한 곡선 탈출',
          '좁은 길 코스: 일정한 속력을 유지하며 일직선 균형 잡기',
          '연속진로전환: 일정한 러버콘 사이를 지그재그로 안정감 있게 회전'
        ]
      }
    },
    {
      id: 'towing',
      title: '소형 견인차 면허 (캠핑카)',
      subtitle: '레저의 끝판왕, 카라반 및 보트 캐리어 트레일러 견인 면허',
      icon: <Compass className="w-8 h-8 text-brand-navy" />,
      eligibility: [
        '만 19세 이상인 자',
        '1종 보통 또는 2종 보통면허 취득 후 1년 이상 경과한 자',
        '레저 활동, 캠핑카나 개인 소형 요트 트레일러 운반을 계획하고 있는 분'
      ],
      hours: {
        academic: '학과 교육 3시간 (이론 중심)',
        skill: '기능 종합 트레일러 교육 4시간',
      },
      vehicles: [
        '총중량 750kg 초과 3,000kg 이하인 견인형 특수자동차',
        '주요 캠핑트레일러, 카라반, 소형 평판 트레일러, 보트 캐리어 결합 운전'
      ],
      examInfo: {
        type: '도로주행 없으며 굴절, 곡선, 방향전환(T자 후진 연결) 기능 시험',
        points: '90점 이상 득점 시 즉시 라이센스 획득 (매우 빠르고 높은 취득 성공률)',
        items: [
          '굴절 코스 견인 운행 능력 점검',
          '곡선 코스에서의 트레일러 오버스티어 대응 및 안쪽 라인 탈출 숙지',
          '방향전환 코스: 후진 연동을 통해 직각 주차 면에 카라반을 일치시키는 주차 핵심 과정'
        ]
      }
    }
  ];

  const currentLicense = licenses.find(l => l.id === activeTab) || licenses[0];

  return (
    <div className="bg-brand-gray/30 pb-24">
      <PageHeader 
        category="License"
        title="나에게 가장 알맞은 운전 면허 종류를 알아보세요."
        subtitle="1종/2종 보통부터 대형, 2종소형 오토바이, 캠핑카 연결 소형견인 면허까지 e편한에서 단번에 취득할 수 있습니다."
        gradient="from-brand-navy/70 to-brand-blue-dark/70"
        bgImage={bgImage}
      />

      <section className="pt-20 max-w-7xl mx-auto px-4">
        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16">
          {licenses.map((lic) => {
            const isSelected = lic.id === activeTab;
            return (
              <button
                key={lic.id}
                onClick={() => setActiveTab(lic.id)}
                className={`w-full md:w-auto min-w-[200px] flex items-center justify-between gap-4 px-6 py-5 rounded-3xl font-bold transition-all border outline-none
                  ${isSelected
                    ? "bg-brand-navy text-white border-brand-navy shadow-xl scale-102"
                    : "bg-white text-gray-600 border-gray-100 hover:bg-gray-50 hover:border-gray-200"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-2xl ${isSelected ? 'bg-white/20' : 'bg-brand-gray'}`}>
                    {lic.id === 'ordinary' && <Car size={20} className={isSelected ? 'text-white' : 'text-brand-navy'} />}
                    {lic.id === 'large' && <Truck size={20} className={isSelected ? 'text-white' : 'text-brand-navy'} />}
                    {lic.id === 'motorcycle' && <Bike size={20} className={isSelected ? 'text-white' : 'text-brand-navy'} />}
                    {lic.id === 'towing' && <Compass size={20} className={isSelected ? 'text-white' : 'text-brand-navy'} />}
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-extrabold">{lic.title}</span>
                    <span className="block text-[10px] text-gray-400 font-normal leading-none mt-1">
                      {lic.id === 'ordinary' ? '1·2종 보통' : lic.id === 'large' ? '대형 버스' : lic.id === 'motorcycle' ? '오토바이' : '캠핑/카라반'}
                    </span>
                  </div>
                </div>
                <ArrowRight size={14} className={isSelected ? 'text-brand-yellow' : 'text-gray-300'} />
              </button>
            );
          })}
        </div>

        {/* Outer Grid Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel - Card Summary */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              key={`${activeTab}-summary`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-brand-navy text-white rounded-[2.5rem] p-8 shadow-lg relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-x-12 -translate-y-12 shrink-0 pointer-events-none" />
              
              <div className="relative z-10">
                <span className="text-[10px] tracking-widest uppercase font-extrabold bg-brand-yellow text-brand-navy px-3.5 py-1.5 rounded-full inline-block mb-6">
                  E-PYEONHAN SELECT
                </span>
                <h3 className="text-2xl font-black mb-3 text-white leading-tight">
                  {currentLicense.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed font-medium mb-8">
                  {currentLicense.subtitle}
                </p>

                <div className="border-t border-white/10 pt-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-brand-yellow shrink-0" />
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">법정 의무교육</span>
                      <span className="text-sm font-extrabold">최단 {currentLicense.hours.road ? '3일 완성' : '2일 완성'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-brand-yellow shrink-0" />
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">학원 자체 시험</span>
                      <span className="text-sm font-extrabold">매일 연습하고 그 코스 그대로 매주 시험 실시</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Consultation Promo */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-base mb-2 text-brand-navy">궁금한 점이 있으신가요?</h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  수강 가격, 주말반 과정, 빠른 면허 취득 코스 등 친절하고 상세하게 안내해 드립니다.
                </p>
              </div>
              <a 
                href="tel:031-656-2004"
                className="w-full bg-brand-yellow text-brand-navy py-4 rounded-xl font-bold hover:shadow-md transition-shadow text-center block text-sm"
              >
                📞 실시간 수강 문의 : 031-656-2004
              </a>
            </div>
          </div>

          {/* Right panel - Deep Specifications */}
          <div className="lg:col-span-8">
            <motion.div
              key={`${activeTab}-details`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Category 1: Eligibility */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-brand-navy mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-gray flex items-center justify-center text-xs font-bold text-brand-navy">01</span>
                  면허 응시 제한 및 대상
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentLicense.eligibility.map((elig, idx) => (
                    <div key={idx} className="flex gap-3 bg-brand-gray/30 p-5 rounded-2xl border border-gray-50">
                      <CheckCircle2 size={18} className="text-brand-navy shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-gray-700 leading-relaxed">{elig}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Required Hours */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-brand-navy mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-gray flex items-center justify-center text-xs font-bold text-brand-navy">02</span>
                  의무 교육 이수 시간
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-brand-gray/30 p-6 rounded-2xl text-center flex flex-col justify-between min-h-[140px] border border-gray-50">
                    <span className="text-[10px] font-bold text-gray-400 tracking-wider">이론 / 안전 교육</span>
                    <span className="text-xl font-black text-brand-navy block mt-2">학과 교육</span>
                    <span className="text-xs text-brand-navy font-bold mt-4 block bg-white px-3 py-1 rounded-full">{currentLicense.hours.academic}</span>
                  </div>
                  <div className="bg-brand-gray/30 p-6 rounded-2xl text-center flex flex-col justify-between min-h-[140px] border border-gray-50">
                    <span className="text-[10px] font-bold text-gray-400 tracking-wider">기초 주행 / 코스 실습</span>
                    <span className="text-xl font-black text-brand-navy block mt-2">장내 기능</span>
                    <span className="text-xs text-brand-navy font-bold mt-4 block bg-white px-3 py-1 rounded-full">{currentLicense.hours.skill}</span>
                  </div>
                  <div className={`bg-brand-gray/30 p-6 rounded-2xl text-center flex flex-col justify-between min-h-[140px] border border-gray-50 ${!currentLicense.hours.road ? 'opacity-40' : ''}`}>
                    <span className="text-[10px] font-bold text-gray-400 tracking-wider">실제 공도 / 시내 주행</span>
                    <span className="text-xl font-black text-brand-navy block mt-2">도로 주행</span>
                    <span className="text-xs text-brand-navy font-bold mt-4 block bg-white px-3 py-1 rounded-full">
                      {currentLicense.hours.road || '해당 시험 없음'}
                    </span>
                  </div>
                </div>
                {!currentLicense.hours.road && (
                  <p className="text-[11px] text-gray-400 mt-4 flex items-center gap-1.5 font-medium ml-2">
                    <AlertCircle size={12} className="text-brand-blue-dark" /> 본 면허 종류는 경찰청 기준 도로주행 의무가 없으며, 장내기능시험 합격 시 바로 최종 면허가 발급됩니다.
                  </p>
                )}
              </div>

              {/* Category 3: Driving Eligible Vehicles */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-brand-navy mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-gray flex items-center justify-center text-xs font-bold text-brand-navy">03</span>
                  취득 시 운전 가능 차량 범위
                </h3>
                <ul className="space-y-4">
                  {currentLicense.vehicles.map((veh, idx) => (
                    <li key={idx} className="flex gap-3 items-start border-bottom border-gray-50 pb-3 last:border-0 last:pb-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow shrink-0 mt-2.5" />
                      <p className="text-sm font-semibold text-gray-600 leading-relaxed">{veh}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category 4: Exam details & standards */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-brand-navy mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-gray flex items-center justify-center text-xs font-bold text-brand-navy">04</span>
                  자체 시험 및 합격 기준
                </h3>
                
                <div className="mb-6 p-5 bg-brand-navy/5 border border-brand-navy/10 rounded-2xl">
                  <span className="text-[10px] font-bold text-brand-blue-dark block mb-1">시험 프로세스</span>
                  <span className="font-extrabold text-sm text-brand-navy">{currentLicense.examInfo.type}</span>
                </div>

                <div className="mb-6 p-5 bg-brand-yellow/10 border border-brand-yellow/30 rounded-2xl">
                  <span className="text-[10px] font-bold text-amber-700 block mb-1">합격 커트라인</span>
                  <span className="font-extrabold text-sm text-brand-navy">{currentLicense.examInfo.points}</span>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">상세 평가 항목</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentLicense.examInfo.items.map((item, idx) => (
                      <div key={idx} className="bg-brand-gray/20 p-4 rounded-xl border border-gray-100 text-xs font-semibold leading-relaxed text-gray-600">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}
