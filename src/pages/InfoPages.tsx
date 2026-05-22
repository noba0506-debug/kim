import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Bus, MapPin, CheckCircle2, Navigation, CreditCard, Calculator, Coins, BookOpen, Clock, Settings, FileText, Check, Landmark, Info, Car } from 'lucide-react';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { apiFetch } from '@/src/lib/apiClient';

export function About() {
  const [bgImage, setBgImage] = useState('/hero_academy.jpg');

  useEffect(() => {
    apiFetch('/api/banners')
      .then(res => res.json())
      .then(data => {
        if (data.greetings) setBgImage(data.greetings);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <PageHeader 
        category="Greetings"
        title={<>가장 편안한 마음으로 배울 수 있도록,<br />e편한이 동반자가 되어 드립니다.</>}
        subtitle="쾌적한 시설과 최고의 강사진이 여러분의 안전한 첫 드라이빙을 안내합니다."
        bgImage={bgImage}
        gradient="from-brand-navy/70 to-brand-blue-dark/70"
      />

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 leading-tight">
                평택 최고의 교육 환경,<br />
                e편한자동차운전전문학원을 소개합니다.
              </h2>
              <div className="space-y-6 text-gray-500 leading-relaxed text-lg">
                <p>
                  운전대를 처음 잡는 설렘과 두려움을 누구보다 잘 알기에, 저희 e편한자동차운전전문학원은 모든 수강생이 긴장하지 않고 편안한 환경에서 교육받을 수 있도록 최선을 다하고 있습니다.
                </p>
                <p>
                  쾌적하고 최신화된 시설, 풍부한 베테랑 강사진의 1:1 맞춤 지도, 그리고 연습한 코스 그대로 치러지는 매일 자체 시험 시스템을 통해 여러분의 당당한 첫 드라이빙을 가장 쉽고 안전하게 안내하겠습니다.
                </p>
              </div>
            </div>
            <div className="relative rounded-[3rem] overflow-hidden aspect-square lg:aspect-auto h-full min-h-[400px]">
              <img 
                src="/hero_academy.jpg" 
                className="absolute inset-0 w-full h-full object-cover"
                alt="학원 이미지"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Location */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-8">오시는 길</h2>
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-blue-dark" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">학원 주소</h4>
                    <p className="text-gray-500 text-sm">경기도 평택시 죽백동 123-45 (e편한자동차운전학원)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center shrink-0">
                    <Navigation className="text-brand-blue-dark" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">교통 안내</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      - 자차 이용: 죽백동 정문 사거리에서 우회전 500m<br />
                      - 대중교통: 1-1번, 2번 버스 '죽백동 주민센터' 하차 후 도보 5분
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <a 
                  href="https://www.google.co.kr/maps/place/e%ED%8E%B8%ED%95%9C%EC%9E%90%EB%8F%99%EC%B0%A8%EC%9A%B4%EC%A0%84%EC%A0%84%EB%AC%B8%ED%95%99%EC%9B%90/data=!3m1!4b1!4m6!3m5!1s0x357b312431573573:0xbad1406f5672b010!8m2!3d37.0170595!4d127.1356878!16s%2Fg%2F11shcpf6h6?hl=ko" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-blue-dark text-white px-6 py-3.5 rounded-2xl font-bold transition-all hover:scale-[1.02]"
                >
                  <MapPin size={16} className="text-brand-yellow" />
                  Google 지도에서 크게 보기
                </a>
              </div>
            </div>
            <div className="flex-1 min-h-[400px] bg-brand-gray rounded-[2rem] overflow-hidden relative border border-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.943147814981!2d127.1331128859943!3d37.017059499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b312431573573%3A0xbad1406f5672b010!2zZf2ZgO2VnOybOuPmey9qOyasOyghOybOusuO2VmeybkA!5e0!3m2!1sko!2skr!4v1716262400000!5m2!1sko!2skr"
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: "400px" }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="e편한자동차운전전문학원 지도"
                className="w-full h-full absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function Education() {
  const [bgImage, setBgImage] = useState('/hero_academy_2.jpg');

  useEffect(() => {
    apiFetch('/api/banners')
      .then(res => res.json())
      .then(data => {
        if (data.process) setBgImage(data.process);
      })
      .catch(err => console.error(err));
  }, []);

  const steps = [
    { name: "학과 등록", icon: "📝" },
    { name: "신체검사", icon: "🏥" },
    { name: "학과 교육 및 시험", icon: "✏️" },
    { name: "장내기능 교육 및 시험", icon: "🚗" },
    { name: "연습면허 발급", icon: "🆔" },
    { name: "도로주행 교육 및 시험", icon: "🛣️" },
    { name: "면허증 발급!", icon: "🎉" },
  ];

  return (
    <div>
      <PageHeader 
        category="Process"
        title={<>빠르고 확실한 면허 취득,<br />체계적인 교육 시스템이 뒷받침합니다.</>}
        subtitle="등록부터 발급까지, 모든 과정을 학원에서 자체적으로 진행할 수 있습니다."
        gradient="from-brand-blue-dark/70 to-brand-blue/70"
        bgImage={bgImage}
      />

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold">면허 취득 절차</h2>
            <div className="w-20 h-1.5 bg-brand-yellow mx-auto mt-6 rounded-full" />
          </div>

          <div className="relative flex flex-wrap justify-center gap-8 md:gap-4 lg:gap-8">
             {steps.map((step, idx) => (
               <div key={idx} className="flex flex-col items-center w-32 md:w-36">
                 <div className="w-16 h-16 bg-brand-gray rounded-2xl flex items-center justify-center text-3xl mb-4 relative z-10">
                   {step.icon}
                 </div>
                 <p className="text-xs font-bold text-center leading-tight text-brand-navy">{step.name}</p>
                 {idx < steps.length - 1 && (
                   <div className="hidden lg:block absolute h-[2px] bg-gray-100 top-8 translate-x-[76px] w-[50px] -z-0"></div>
                 )}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Timetable Section */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">교육 시간표</h2>
            <p className="text-gray-500">평일/주말 정상운영 - 직장인과 학생을 위한 맞춤 교육</p>
          </div>

          <div className="bg-white rounded-3xl p-8 overflow-x-auto shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-bottom border-gray-100">
                  <th className="py-6 px-4 font-bold text-brand-navy">구분</th>
                  <th className="py-6 px-4 font-bold text-brand-navy text-center">오전반</th>
                  <th className="py-6 px-4 font-bold text-brand-navy text-center">오후반</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-bottom border-gray-50">
                  <td className="py-6 px-4 font-bold">학과 교육</td>
                  <td className="py-6 px-4 text-center text-gray-500">09:00 - 12:50</td>
                  <td className="py-6 px-4 text-center text-gray-500">14:00 - 17:50</td>
                </tr>
                <tr className="border-bottom border-gray-50">
                  <td className="py-6 px-4 font-bold">기능 교육</td>
                  <td className="py-6 px-4 text-center text-gray-500">09:00 - 12:50</td>
                  <td className="py-6 px-4 text-center text-gray-500">14:00 - 17:50</td>
                </tr>
                <tr>
                  <td className="py-6 px-4 font-bold">도로주행 교육</td>
                  <td className="py-6 px-4 text-center text-gray-500">09:00 - 12:50</td>
                  <td className="py-6 px-4 text-center text-gray-500">14:00 - 17:50</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex items-center gap-4 bg-brand-yellow/20 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-blue-dark">💡</div>
            <p className="text-sm font-medium border-0 m-0">
              주말반은 토요일 및 일요일, 공휴일에도 정상 운영됩니다. 평일에 바쁜 직장인과 학생들도 학원 자체 교육 및 시험이 가능합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Tuition Fees Section */}
      <section id="fees" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-brand-blue-dark font-black tracking-widest text-xs uppercase bg-brand-yellow/30 px-4 py-1.5 rounded-full inline-block mb-3">
              TUITION FEES
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight leading-tight">
              합리적이고 투명한 수강비용 안내
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm font-semibold">
              e편한자동차운전전문학원은 부가세 법령을 준수하며 정부 고시 규정에 맞춰 의무 교육 요금을 100% 투명하게 공개하고 있습니다.
            </p>
          </div>

          {/* Fee Quick Grid Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Class 1 & 2 Regular */}
            <div className="bg-brand-gray/30 rounded-[2.5rem] p-8 border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/15 rounded-bl-[10rem] group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-brand-navy text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">RECOMMENDED</span>
                  <Coins className="text-brand-blue-dark" size={24} />
                </div>
                <h3 className="text-xl font-black text-brand-navy mb-2">1종보통 · 2종보통 신규</h3>
                <p className="text-xs text-gray-400 font-bold mb-6">가장 대중적인 일반 자가용 면허 취득 코스</p>
                
                <div className="space-y-3.5 mb-8">
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>의무 교육 시간</span>
                    <span className="font-bold text-brand-navy">학과 3H + 기능 4H + 도로 6H</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>교육 과정</span>
                    <span className="font-bold text-brand-navy">장내기능 + 도로주행 자체시험</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-4 rounded-2xl border border-gray-50 mb-6">
                  <span className="text-[10px] text-gray-400 font-semibold block">총 수강비용</span>
                  <span className="text-2xl font-black text-brand-blue-dark mt-1 block">719,000원</span>
                </div>
                <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                  * 검정료(60,500원) 및 인지대, 보험료는 별도 청구됩니다.
                </p>
              </div>
            </div>

            {/* Class 1 Large */}
            <div className="bg-brand-gray/30 rounded-[2.5rem] p-8 border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-dark/5 rounded-bl-[10rem] group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-brand-blue-dark text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">SPECIAL</span>
                  <Bus className="text-brand-blue-dark" size={24} />
                </div>
                <h3 className="text-xl font-black text-brand-navy mb-2">1종 대형 보통</h3>
                <p className="text-xs text-gray-400 font-bold mb-6">버스, 덤프트럭, 대형 상용차 전문 취득 코스</p>
                
                <div className="space-y-3.5 mb-8">
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>의무 교육 시간</span>
                    <span className="font-bold text-brand-navy">학과 3H + 기능 10H</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>교육 과정</span>
                    <span className="font-bold text-brand-navy">장내기능 학원 자체시험</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-4 rounded-2xl border border-gray-50 mb-6">
                  <span className="text-[10px] text-gray-400 font-semibold block">총 수강비용</span>
                  <span className="text-2xl font-black text-brand-blue-dark mt-1 block">846,500원</span>
                </div>
                <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                  * 1종 및 2종 주행 면허 소지 1년 경과자에 한해 등록 가능합니다.
                </p>
              </div>
            </div>

            {/* Small Towing (Campers) */}
            <div className="bg-brand-gray/30 rounded-[2.5rem] p-8 border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-[10rem] group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-yellow-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">CAMPING SPECIAL</span>
                  <Navigation className="text-brand-blue-dark" size={24} />
                </div>
                <h3 className="text-xl font-black text-brand-navy mb-2">소형견인차 (캠핑카)</h3>
                <p className="text-xs text-gray-400 font-bold mb-6">피견인차 3톤 미만, 캠핑/트레일러 면허</p>
                
                <div className="space-y-3.5 mb-8">
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>의무 교육 시간</span>
                    <span className="font-bold text-brand-navy">학과 3H + 기능 10H</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>교육 과정</span>
                    <span className="font-bold text-brand-navy">장내기능 학원 자체시험</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-4 rounded-2xl border border-gray-50 mb-6">
                  <span className="text-[10px] text-gray-400 font-semibold block">총 수강비용</span>
                  <span className="text-2xl font-black text-brand-blue-dark mt-1 block">397,000원</span>
                </div>
                <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                  * 피견인차(트레일러, 카라반) 중량 750kg 초과 3,000kg 이하에 해당합니다.
                </p>
              </div>
            </div>

            {/* Class 2 Small (Motorcycles) / Motorbike */}
            <div className="bg-brand-gray/30 rounded-[2.5rem] p-8 border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[10rem] group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">BIKE SPECIAL</span>
                  <svg className="w-6 h-6 text-brand-blue-dark inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-black text-brand-navy mb-2">2종 소형 · 원동기 오토바이</h3>
                <p className="text-xs text-gray-400 font-bold mb-6">미라쥬250 전용 연습 및 고합격 보장</p>
                
                <div className="space-y-3.5 mb-8">
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>의무 교육 시간</span>
                    <span className="font-bold text-brand-navy">학과 3H + 기능 10H (원동기 5/8H)</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>교육 과정</span>
                    <span className="font-bold text-brand-navy">굴절코스 등 학원 자체시험</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-4 rounded-2xl border border-gray-50 mb-6 flex gap-4 justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold block">2종소형 총 수강비용</span>
                    <span className="text-lg font-black text-brand-blue-dark mt-1 block">427,000원</span>
                  </div>
                  <div className="border-l border-gray-100 pl-4">
                    <span className="text-[10px] text-gray-400 font-semibold block">원동기 총 수강비용</span>
                    <span className="text-lg font-black text-brand-blue-dark mt-1 block">347,000원</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                  * 퀵서비스, 바이크 투어링 등 125cc 이상 오토바이 탑승에는 필수인 상급 자격입니다.
                </p>
              </div>
            </div>

            {/* Road Training */}
            <div className="bg-brand-gray/30 rounded-[2.5rem] p-8 border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-[10rem] group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-indigo-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">ROAD EXPERT</span>
                  <Car className="text-brand-blue-dark" size={24} />
                </div>
                <h3 className="text-xl font-black text-brand-navy mb-2">도로 연수 (장롱면허 극복)</h3>
                <p className="text-xs text-gray-400 font-bold mb-6">시내주행, 난이도 높은 골목/주차 완벽 밀착</p>
                
                <div className="space-y-3.5 mb-8">
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>기본 수강 시간</span>
                    <span className="font-bold text-brand-navy">6시간 </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>교육 내용</span>
                    <span className="font-bold text-brand-navy">시내주행, 난코스, 주차 특화 교육</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-4 rounded-2xl border border-gray-50 mb-6 flex gap-3 justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold block">승용차 연수 총액</span>
                    <span className="text-lg font-black text-brand-blue-dark mt-1 block">294000원</span>
                  </div>
                  <div className="border-l border-gray-100 pl-3">
                    <span className="text-[10px] text-gray-400 font-semibold block">8시간 심화 특별교육</span>
                    <span className="text-lg font-black text-brand-blue-dark mt-1 block">392,000원</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                 
                </p>
              </div>
            </div>

            {/* License Revo Reacquisition */}
            <div className="bg-brand-gray/30 rounded-[2.5rem] p-8 border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-[10rem] group-hover:scale-110 transition-transform" />
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-rose-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">FAST TRACK</span>
                  <FileText className="text-brand-blue-dark" size={24} />
                </div>
                <h3 className="text-xl font-black text-brand-navy mb-2">면허 취소자 단기 취득</h3>
                <p className="text-xs text-gray-400 font-bold mb-6">최단 기간 3일 만에 면허 복구 특급 패키지</p>
                
                <div className="space-y-3.5 mb-8">
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>특별 맞춤 교육</span>
                    <span className="font-bold text-brand-navy">학과 1H + 기능 2H + 도로 4H</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 pb-2 border-b border-gray-100">
                    <span>교육 과정</span>
                    <span className="font-bold text-brand-navy">학과 교육 + 기능/도로 주행</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-4 rounded-2xl border border-gray-50 mb-6">
                  <span className="text-[10px] text-gray-400 font-semibold block">총 수강비용</span>
                  <span className="text-2xl font-black text-brand-blue-dark mt-1 block">688000원</span>
                </div>
                <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                  * 과거 면허 종류에 무관하게 즉각 응시 가능하나 취소 안전 특별 교육 수료증이 우선 필요합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Component */}
          <InteractiveTuitionCalculator />

          {/* Guidelines Notes footer */}
          <div className="bg-brand-gray p-8 rounded-[2rem] border border-gray-100 text-xs text-gray-500 space-y-4">
            <h4 className="font-bold text-brand-navy flex items-center gap-1.5"><Info size={14} className="text-brand-yellow" /> 알아두실 추가 비용 및 결제 유의사항</h4>
            <ul className="list-disc pl-5 space-y-2 font-medium leading-relaxed">
              <li>
                <strong className="text-brand-navy">검정 기준 단수:</strong> 자체 기능시험 응시료는 회당 보통 60500원으로 수강비에 불포함되어 있으며 낙방 후 재응시 시 동 가격이 반복 청구됩니다. e편한학원은 고속 합격을 유도하고 있습니다.
              </li>
              <li>
                <strong className="text-brand-navy">행정 인지대:</strong> 경찰청 지정 수수료로 연습면허(4,000원) / 본면허제작비 (일반 국문 10,000원, 영문·모바일 15,000원)는 별도로 학원 방문 현장 등록 시 현찰로 결제 가능합니다.
              </li>
              <li>
                <strong className="text-brand-navy">결제 혜택:</strong> 카드사 무이자 2~3개월 혜택을 제공하며, 평택사랑상품권(지역화폐) 모바일/카드 형식 모두 100% 매칭 수용 가능합니다.
              </li>
              <li>
                <strong className="text-brand-navy">환불 규정:</strong> 본 학원은 공정거래위원회 표준약관 및 도로교통법 제112조에 의거, 교육 진행 후 중도 퇴학 시 남은 의무 기수 교육 시간을 분단위로 역산하여 위약금 청구 없이 전액 반환합니다.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// Interactive Estimator Child Component
function InteractiveTuitionCalculator() {
  const [licenseType, setLicenseType] = useState('regular');
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [includeExtraPractice, setIncludeExtraPractice] = useState(false);
  const [testTries, setTestTries] = useState(1);

  const calculateTotal = () => {
    let baseTuition = 0; // 총 수강료
    let testFee = 0; // 자체 시험비
    let stampFee = 4000; // 기본 인지대
    let insuranceCost = 0;

    if (licenseType === 'regular') {
      baseTuition = 719000;
      testFee = 60500 + 60500; // 기능 + 주행
      insuranceCost = 9500;
    } else if (licenseType === 'large') {
      baseTuition = 781000;
      testFee = 60500; // 기능만
      stampFee = 0;
      insuranceCost = 5000;
  
    } else if (licenseType === 'towing') {
      baseTuition = 332200;
      testFee = 60500; // 기능만
      stampFee = 0;
      insuranceCost = 5000;
    
    } else if (licenseType === 'bike') {
      baseTuition = 393000;
      testFee = 33000;
      stampFee = 0;
      insuranceCost = 1000;
      
    } else if (licenseType === 'training') {
      baseTuition = 448000; // 승용차 기준
      testFee = 0;
      stampFee = 0;
      insuranceCost = 0; // 도로연수 보험 포함
    } else if (licenseType === 'cancel') {
      baseTuition = 567000;
      testFee = 60500 + 60500;
      stampFee = 4000;
      insuranceCost = 9500;
    }

    let extraAmount = 0;
    if (includeExtraPractice) {
      // 추가 집중 교육 2시간 추가
      extraAmount = 100000;
    }

    const calculatedInsurance = includeInsurance ? insuranceCost : 0;
    const finalTestFee = testFee * testTries;

    return {
      tuition: baseTuition,
      test: finalTestFee,
      stamp: stampFee,
      insurance: calculatedInsurance,
      extra: extraAmount,
      total: baseTuition + finalTestFee + stampFee + calculatedInsurance + extraAmount
    };
  };

  const feesObj = calculateTotal();

  return (
    <div className="bg-brand-navy text-white rounded-[3rem] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Left Interactive Options */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Calculator className="text-brand-yellow" size={28} />
            <h3 className="text-xl md:text-2xl font-black">실시간 수강 결제액 간편 계산기</h3>
          </div>
          <p className="text-xs text-brand-blue/30 leading-relaxed max-w-md font-semibold mb-8">
            희망 면허 종류와 옵션을 토대로 실제 학원에서 현장 등록 시 납부하여야 할 총 예상 실 결제 금액을 실시간 계산합니다.
          </p>

          <div className="space-y-6">
            {/* 1. License Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">1. 취득을 원하는 면허 구분</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'regular', label: '1/2종 보통 신규' },
                  { id: 'large', label: '1종 대형 버스' },
                  { id: 'towing', label: '소형견인(캠핑카)' },
                  { id: 'bike', label: '2종소형 바이크' },
                  { id: 'training', label: '시내도로연수 10H' },
                  { id: 'cancel', label: '면허취소 복구반' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setLicenseType(item.id);
                      setTestTries(1);
                    }}
                    className={`py-3 px-4 rounded-xl text-xs font-black transition-all text-center border ${
                      licenseType === item.id
                        ? 'bg-brand-yellow text-brand-navy border-brand-yellow shadow-md'
                        : 'bg-white/5 text-gray-300 border-white/10 hover:border-gray-500'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Checkboxes for insurance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div 
                onClick={() => setIncludeInsurance(!includeInsurance)}
                className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer border select-none transition-colors ${
                  includeInsurance ? 'border-brand-yellow bg-brand-yellow/5' : 'border-white/10 bg-white/5'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${includeInsurance ? 'bg-brand-yellow border-brand-yellow text-brand-navy' : 'border-gray-500'}`}>
                  {includeInsurance && <Check size={12} strokeWidth={3} />}
                </div>
                <div>
                  <span className="text-xs font-bold block">안심 보장 보험 가입</span>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">사고시 면책 / 전액 보상 대응</span>
                </div>
              </div>

              <div 
                onClick={() => setIncludeExtraPractice(!includeExtraPractice)}
                className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer border select-none transition-colors ${
                  includeExtraPractice ? 'border-brand-yellow bg-brand-yellow/5' : 'border-white/10 bg-white/5'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${includeExtraPractice ? 'bg-brand-yellow border-brand-yellow text-brand-navy' : 'border-gray-500'}`}>
                  {includeExtraPractice && <Check size={12} strokeWidth={3} />}
                </div>
                <div>
                  <span className="text-xs font-bold block">예비 보충 2시간 추가</span>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">+110,000원 기능/주행 심화</span>
                </div>
              </div>
            </div>

            {/* 3. Expected Test Attempts */}
            {licenseType !== 'training' && (
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  3. 예상 시험 응시 횟수 (응시료 계산용)
                </label>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-xs font-semibold text-gray-300 grow">자체 자체 시험을 몇 번 만에 합격할 것으로 예약하십니까?</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTestTries(Math.max(1, testTries - 1))}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-sm font-bold antialiased outline-none"
                    >
                      -
                    </button>
                    <span className="text-sm font-black text-brand-yellow w-6 text-center">{testTries}회</span>
                    <button
                      onClick={() => setTestTries(Math.min(5, testTries + 1))}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-sm font-bold antialiased outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Cost Summary Panel */}
        <div className="bg-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-white/10 relative">
          <div className="absolute top-4 right-4 text-white/10">
            <Landmark size={80} />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black tracking-widest text-brand-yellow uppercase border-b border-white/10 pb-4">수강료 청구 상세요약</h4>
            
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>기본 의무 교육 수강료</span>
                <span className="font-bold font-mono">{feesObj.tuition.toLocaleString()} 원</span>
              </div>
              {testTries > 0 && licenseType !== 'training' && (
                <div className="flex justify-between text-gray-300">
                  <span>자체 정규 검정료 수수료 ({testTries}회 기준)</span>
                  <span className="font-bold font-mono">{feesObj.test.toLocaleString()} 원</span>
                </div>
              )}
              {feesObj.extra > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>심화 보충 2시간 추가액</span>
                  <span className="font-bold font-mono">{feesObj.extra.toLocaleString()} 원</span>
                </div>
              )}
              {feesObj.insurance > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>수강생 안전 종합 안심보험</span>
                  <span className="font-bold font-mono">{feesObj.insurance.toLocaleString()} 원</span>
                </div>
              )}
              {feesObj.stamp > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>연습/본면허 공무 행정 인지대</span>
                  <span className="font-bold font-mono">{feesObj.stamp.toLocaleString()} 원</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-white/10">
            <div className="flex justify-between items-baseline mb-6">
              <span className="text-sm font-bold text-gray-300">총 예상 실 결제 금액</span>
              <span className="text-3xl md:text-4xl font-black text-brand-yellow font-mono">
                {feesObj.total.toLocaleString()} <span className="text-lg font-bold">원</span>
              </span>
            </div>
            
            <a 
              href="tel:031-656-2004"
              className="w-full bg-brand-yellow text-brand-navy py-4 rounded-xl font-bold font-black text-center block text-xs hover:scale-[1.02] transition-transform shadow-lg"
            >
              📞 즉시 등록 상담 문의 연결 (031-656-2004)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

