import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NoticePopupProps {
  forceShow?: boolean;
}

export default function NoticePopup({ forceShow = false }: NoticePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    // Check local storage for daily expiration status
    const hideUntil = localStorage.getItem('hide_notice_popup_2026_v1');
    if (hideUntil) {
      const expiry = parseInt(hideUntil, 10);
      if (Date.now() < expiry && !forceShow) {
        setIsOpen(false);
        return;
      }
    }
    setIsOpen(true);
  }, [forceShow]);

  const handleClose = () => {
    if (dontShowToday) {
      // Hide for exactly 24 hours
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('hide_notice_popup_2026_v1', expiryTime.toString());
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="notice-popup-overlay"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs font-sans"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === 'notice-popup-overlay') {
            handleClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-[460px] overflow-hidden rounded-3xl bg-white shadow-2xl border border-white/10 flex flex-col"
        >
          {/* Pop-up Image Banner */}
          <div className="relative w-full overflow-hidden bg-slate-100 aspect-[3/4.1] sm:aspect-[3/4.2]">
            <img 
              src="/popup.jpg" 
              alt="이편한자동차운전전문학원 유류지원금 사용 공지" 
              className="w-full h-full object-fill select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between bg-zinc-900 px-5 py-3.5 text-sm font-medium text-white select-none">
            <button
              onClick={() => {
                const nextState = !dontShowToday;
                setDontShowToday(nextState);
              }}
              className="flex items-center gap-2 cursor-pointer py-1 group active:opacity-80"
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                dontShowToday 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-transparent border-white/40 group-hover:border-white'
              }`}>
                {dontShowToday && (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                  </svg>
                )}
              </div>
              <span className="text-xs sm:text-sm text-zinc-300 hover:text-white transition-colors">
                오늘 하루 이 창을 열지 않음
              </span>
            </button>
            <button
              onClick={handleClose}
              className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-bold px-4 py-1.5 rounded-lg transition-colors text-xs tracking-wider"
            >
              닫기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
