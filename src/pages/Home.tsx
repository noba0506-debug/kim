import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ShieldCheck, Car, Bus, MapPin, Clock, CreditCard } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useState, useEffect } from 'react';

// --- Hero Section ---
const SLIDES = [
  {
    title: "안전한 운전의 시작,\n이름처럼 편안하게",
    desc: "1/2종 보통·대형면허·오토바이·도로연수까지\n베테랑 강사진이 1:1로 지도합니다.",
    tag: "COMFORTABLE & TRUSTWORTHY",
    bg: "bg-brand-blue",
    img: "/hero_academy.jpg"
  },
  {
    title: "연습하던 차량과 코스 그대로,\n자체 시험으로 한 번에 합격!",
    desc: "매일 진행되는 자체 시험 시스템으로\n높은 합격률을 자랑합니다.",
    tag: "SELF TESTING SYSTEM",
    bg: "bg-brand-gray",
    img: "/hero_academy_2.jpg"
  },
  {
    title: "평택 전 지역,\n집 앞까지 찾아가는 셔틀버스",
    desc: "무료 셔틀버스로 이동 시간까지 편안하게.\n스마트 예약으로 기다림 없는 픽업 서비스를 경험하세요.",
    tag: "FREE SHUTTLE SERVICE",
    bg: "bg-blue-50",
    img: "/hero_academy_3.jpg"
  }
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden pt-20">
      <AnimatePresence mode="wait">
        {SLIDES.map((slide, idx) => idx === current && (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Background Image without Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={slide.img} 
                alt={slide.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-12 flex items-center">
              <div className="max-w-2xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                <motion.span 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.2em] text-brand-yellow mb-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/10"
                >
                  {slide.tag}
                </motion.span>
                <motion.h1 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl sm:text-6xl font-bold leading-[1.1] mb-6 whitespace-pre-line"
                >
                  {slide.title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-white/90 mb-8 whitespace-pre-line leading-relaxed text-lg"
                >
                  {slide.desc}
                </motion.p>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap gap-4"
                >
                  <NavLink to="/training?contact=true">
                    <button className="bg-brand-yellow text-brand-navy px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                      상담 신청하기 <ChevronRight size={18} />
                    </button>
                  </NavLink>
                  <NavLink to="/about">
                    <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-colors">
                      자세히 보기
                    </button>
                  </NavLink>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              current === idx ? "w-8 bg-brand-navy" : "bg-gray-300"
            )}
          />
        ))}
      </div>
    </section>
  );
}

// --- Quick Links ---
function QuickMenu() {
  const menus = [
    { title: "수강료 안내", desc: "투명하고 합리적인 교육 수강료", icon: <CreditCard className="text-blue-500" />, href: "/education#fees" },
    { title: "교육 시간표", desc: "평일과 주말반 맞춤 시간표", icon: <Clock className="text-yellow-600" />, href: "/education" },
    { title: "갤러리 바로가기", desc: "생생한 학원 현장을 확인하세요", icon: <Car className="text-brand-navy" />, href: "/#gallery" },
    { title: "셔틀버스 노선", desc: "평택 전 지역 안전한 픽업 서비스", icon: <Bus className="text-green-500" />, href: "/about" },
    { title: "오시는 길", desc: "죽백동 학원 위치 및 지도 확인", icon: <MapPin className="text-red-500" />, href: "/about" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {menus.map((menu, idx) => (
            <NavLink
              key={idx}
              to={menu.href}
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-brand-gray p-8 rounded-[2rem] group cursor-pointer border border-transparent hover:border-brand-blue-dark/20 hover:bg-white hover:shadow-xl transition-all h-full"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-blue transition-colors">
                  {menu.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{menu.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{menu.desc}</p>
              </motion.div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- License Categories ---
function LicenseCategories() {
  const categories = [
    { 
      id: 'normal', 
      title: "1종 / 2종 보통", 
      desc: "기초부터 도로주행까지 완벽 마스터", 
      detail: "자체 시험 코스 영상 연동으로 이미지 트레이닝",
      img: "/academy_trucks.jpg"
    },
    { 
      id: 'large', 
      title: "1종 대형", 
      desc: "취업 / 공무원 가산점 필수 코스", 
      detail: "넓은 대형 전용 연습장 보유, 쉽고 빠른 취득",
      img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600"
    },
    { 
      id: 'moto', 
      title: "2종 소형 / 원동기", 
      desc: "오토바이 면허 등록 즉시 교육 가능", 
      detail: "최신 코스 완비! 합격 노하우를 전수합니다",
      img: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?q=80&w=600"
    },
    { 
      id: 'tow', 
      title: "소형 견인 (캠핑카)", 
      desc: "레저의 시작, 빠르고 쉬운 공식 전수", 
      detail: "여행을 좋아하는 당신을 위한 특별 코스",
      img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=600"
    },
  ];

  const [active, setActive] = useState(categories[0].id);

  return (
    <section className="py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-blue-dark font-bold text-xs tracking-widest uppercase">Categories</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4">면허 종류별 원클릭 안내</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "px-8 py-3 rounded-full font-bold text-sm transition-all",
                active === cat.id 
                  ? "bg-brand-navy text-white shadow-lg" 
                  : "bg-white text-gray-500 hover:bg-gray-100"
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] p-4 sm:p-12 shadow-sm min-h-[400px] flex items-center">
          <AnimatePresence mode="wait">
            {categories.map(cat => cat.id === active && (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">{cat.title}</h3>
                  <p className="text-brand-blue-dark font-bold mb-6">{cat.desc}</p>
                  <p className="text-gray-500 leading-relaxed mb-8">{cat.detail}</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <ShieldCheck className="text-brand-yellow" /> 연습하던 차량 그대로 자체 시험
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <ShieldCheck className="text-brand-yellow" /> 합리적인 수강료 & 친절한 강사진
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video rounded-[2rem] overflow-hidden">
                  <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// --- Media & Gallery ---
function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`/api/gallery?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.error('Gallery fetch error:', err));
  }, []);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <span className="text-brand-blue-dark font-bold text-xs tracking-widest uppercase">Gallery & Video</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">생생한 학원 현장</h2>
          </div>
          <NavLink to="/community" className="text-sm font-bold text-gray-400 hover:text-brand-navy flex items-center gap-2">
            더 보기 <ChevronRight size={16} />
          </NavLink>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[1, 2].map((i) => (
             <div key={i} className="group relative aspect-video rounded-[2rem] overflow-hidden bg-brand-gray cursor-pointer">
               <img src={`https://images.unsplash.com/photo-1453491920231-a8ef9113d216?q=80&w=800`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center pl-1 shadow-2xl">
                   <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-brand-navy border-b-8 border-b-transparent"></div>
                 </div>
               </div>
               <div className="absolute bottom-6 left-6 text-white">
                 <p className="text-xs font-bold opacity-70 mb-1">YouTube Course Guide</p>
                 <h4 className="font-bold">도로주행 {i === 1 ? 'A, B' : 'C, D'} 코스 가이드</h4>
               </div>
             </div>
          ))}
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img: any) => (
            <motion.div
              layoutId={`img-${img.id}`}
              key={img.id}
              className="aspect-square rounded-2xl overflow-hidden group cursor-pointer relative"
            >
              <img 
                src={img.url} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-bold">{img.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      
      {/* Academy Introduction Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden aspect-video lg:aspect-square shadow-2xl"
            >
              <img 
                src="/hero_academy.jpg" 
                className="absolute inset-0 w-full h-full object-cover"
                alt="e편한자동차운전전문학원 전경"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-blue-dark font-bold text-xs tracking-widest uppercase">About Academy</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-8 leading-tight">
                가장 편안한 마음으로 배우는<br />
                최신 시설의 운전 전문 학원
              </h2>
              <div className="space-y-6 text-gray-500 leading-relaxed mb-10">
                <p>
                  운전대를 처음 잡는 설렘과 두려움을 잘 알기에, e편한자동차운전전문학원은 모든 수강생이 긴장하지 않고 쾌적한 환경에서 교육받을 수 있도록 최선을 다하고 있습니다.
                </p>
                <p>
                  쾌적화된 최신형 연습 차량 보유, 베테랑 강사진의 1:1 맞춤 지도, 그리고 매일 진행되는 자체 시험 시스템을 통해 여러분의 면허 취득을 가장 빠르고 안전하게 도와드립니다.
                </p>
              </div>
              <NavLink to="/about" className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-4 rounded-full font-bold hover:bg-brand-blue-dark transition-colors">
                학원 더 알아보기 <ChevronRight size={18} />
              </NavLink>
            </motion.div>
          </div>
        </div>
      </section>

      <QuickMenu />
      <LicenseCategories />
      <Gallery />
      
      {/* Call to Action */}
      <section className="py-24 bg-brand-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">지금 바로 편안한 운전을 시작하세요</h2>
          <p className="text-gray-400 mb-12">전화 상담, 카카오톡 상담, 온라인 예약 등 원하시는 방법으로 언제든 연락주세요.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <NavLink to="/training?contact=true">
              <button className="bg-brand-yellow text-brand-navy px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                무료 상담 시작하기
              </button>
            </NavLink>
            <NavLink to="/education#fees">
              <button className="bg-white/10 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-colors">
                수강료 확인하기
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
