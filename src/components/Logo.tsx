import React from 'react';

interface LogoProps {
  /** Size of the logo icon. Defaults to 40. */
  size?: number;
  /** Whether to show the text beside the icon. Defaults to true. */
  showText?: boolean;
  /** Whether to show the subtitle underneath (only relevant if showText is true). Defaults to false. */
  showSubtitle?: boolean;
  /** Custom className for the outer wrapper. */
  className?: string;
  /** Custom className for the text container. */
  textClassName?: string;
  /** Text color variant. 'dark' for white/light bg, 'light' for dark bg. */
  variant?: 'dark' | 'light';
}

export function Logo({
  size = 40,
  showText = true,
  showSubtitle = false,
  className = '',
  textClassName = '',
  variant = 'dark'
}: LogoProps) {
  const textColorClass = variant === 'dark' ? 'text-brand-navy' : 'text-white';
  const subLineColorClass = variant === 'dark' ? 'border-gray-200' : 'border-white/20';

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <div className="flex items-center gap-3">
        {/* Stylized e-Road SVG Icon */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 hover:scale-105 transition-transform duration-300"
        >
          {/* Main blue circle (base of the 'e') */}
          <path
            d="M 50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 69.5 90 85.8 76.1 89.3 57.5 L 69.7 57.5 C 66.5 67 57.6 73.8 47.1 73.8 C 34 73.8 23.4 63.2 23.4 50 C 23.4 50 23.4 50 23.4 50 L 89 50 C 89.5 44 88.5 38 86 32.5 C 80.5 20.5 68.3 12 54 12 Z M 24.2 41.5 C 27 29.5 37.8 20.8 50.8 20.8 C 63.8 20.8 74.6 29.5 77.4 41.5 L 24.2 41.5 Z"
            fill="#0051C4"
          />

          {/* White sweeping divider mask representing the curve of the road track in 'e' */}
          <path
            d="M 12 70 C 10 70 8 68.5 8 66 L 8 64 C 18 55 45 42 90 48 C 92 48.5 93 50.5 92 52.5 C 91 54 89 55 87.5 54.5 C 45 49 20 61.5 12 70 Z"
            fill="#FFFFFF"
          />

          {/* Elegant curved asphalt road sweeping across */}
          <path
            d="M 10 75 Q 40 46 95 50 C 97 50.2 98 52 97 53.5 C 93.5 59 75 58 55 60 C 35 62 18 69.5 10 75 Z"
            fill="#232528"
          />

          {/* Dashed center lane lines */}
          <path
            d="M 11 74.2 Q 40 48.5 91.5 51.5"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
        </svg>

        {showText && (
          <div className={`flex items-center flex-wrap ${textClassName}`}>
            {/* "이편한" in bold, italic-styled blue */}
            <span className="font-extrabold italic text-2xl tracking-tight text-[#0051C4] mr-1.5 transform -skew-x-6">
              이편한
            </span>
            {/* "자동차운전전문학원" in bold dark charcoal/navy or white */}
            <span className={`font-bold text-2xl tracking-tight ${textColorClass}`}>
              자동차운전전문학원
            </span>
          </div>
        )}
      </div>

      {showText && showSubtitle && (
        <div className="w-full flex items-center justify-between mt-2 px-1">
          <div className={`flex-1 border-t ${subLineColorClass}`} />
          <span className="text-[10px] font-medium tracking-widest text-[#0051C4] mx-3 shrink-0 uppercase">
            쉽고 편한 운전의 시작, 이편한 선택!
          </span>
          <div className={`flex-1 border-t ${subLineColorClass}`} />
        </div>
      )}
    </div>
  );
}
