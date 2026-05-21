import { NavLink } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, Lock } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Logo } from '../Logo';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: '학원소개', path: '/about' },
    { name: '교육안내', path: '/education' },
    { name: '면허종류', path: '/license' },
    { name: '갤러리', path: '/#gallery' },
    { name: '도로연수', path: '/training' },
    { name: '커뮤니티', path: '/community' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <NavLink to="/">
          <Logo size={36} textClassName="hidden sm:flex" />
        </NavLink>

        {/* Desktop GNB */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-brand-blue-dark",
                  isActive ? "text-brand-blue-dark font-bold" : "text-brand-navy"
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink 
            to="/admin" 
            className="p-2 text-gray-300 hover:text-brand-blue-dark transition-colors"
            title="관리자 페이지"
          >
            <Lock size={18} />
          </NavLink>
          <NavLink to="/training?contact=true">
            <button className="hidden sm:flex items-center gap-2 bg-brand-yellow px-5 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              간편 상담 신청
            </button>
          </NavLink>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-brand-navy"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-white border-bottom border-gray-100 shadow-xl md:hidden"
          >
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-4 border-bottom border-gray-50 font-medium text-brand-navy"
                >
                  {item.name}
                </NavLink>
              ))}
              <NavLink to="/training?contact=true" onClick={() => setIsMenuOpen(false)} className="block w-full">
                <button className="mt-4 bg-brand-yellow w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                  <Phone size={18} /> 간편 상담 신청
                </button>
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-gray pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-bottom border-gray-200 pb-12">
          <div className="lg:col-span-2">
            <Logo size={36} showSubtitle={true} className="mb-6 items-start" />
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              평택 죽백동에 위치한 경찰청 지정 제 13-403호 운전전문학원입니다.<br />
              처음 핸들을 잡는 그 설렘과 긴장을 가장 잘 알기에,<br />
              이름처럼 편안하고 즐거운 교육 환경을 약속드립니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-brand-blue-dark transition-colors border border-gray-200">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-brand-blue-dark transition-colors border border-gray-200">
                <Phone size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-gray-400">Quick Menu</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><NavLink to="/about" className="hover:text-brand-blue-dark">학원소개</NavLink></li>
              <li><NavLink to="/education" className="hover:text-brand-blue-dark">교육안내</NavLink></li>
              <li><NavLink to="/license" className="hover:text-brand-blue-dark">면허종류</NavLink></li>
              <li><NavLink to="/training" className="hover:text-brand-blue-dark">도로연수</NavLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-gray-400">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <p className="flex items-start gap-2">
                <span className="font-bold min-w-[60px]">Address</span>
                <span className="text-gray-500">평택시 죽백동 123-45<br />(죽백동 정문 앞)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold min-w-[60px]">Tel</span>
                <span className="text-gray-500">031-656-2004</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold min-w-[60px]">Hours</span>
                <span className="text-gray-500">평일 09:00 - 19:00<br />주말 09:00 - 19:00</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest">
           <p>© 2024 E-PYEONHAN DRIVING SCHOOL. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-6">
             <a href="#" className="hover:text-gray-600">이용약관</a>
             <a href="#" className="hover:text-gray-600 font-bold">개인정보처리방침</a>
             <NavLink to="/admin" className="hover:text-gray-600">Admin</NavLink>
           </div>
        </div>
      </div>
      
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
        <a 
          href="https://pf.kakao.com/_your_channel_id" // 실제 카카오톡 채널 이나 오픈채팅 주소로 교체하세요.
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#FFE812] text-[#3c1e1e] w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          title="카카오톡 1:1 상담"
        >
          <MessageSquare size={24} fill="#3c1e1e" />
        </a>
        <a 
          href="tel:031-656-2004" // 모바일 기기 또는 전용 프로그램에서 통화로 직접 연계됩니다.
          className="bg-brand-blue-dark text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          title="전화 상담 연결"
        >
          <Phone size={24} />
        </a>
      </div>
    </footer>
  );
}
